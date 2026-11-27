/**
 * Local sandbox helper: this machine forbids node from creating child processes
 * (child_process.spawn/fork -> EPERM), while `next build` forks workers for type
 * checking and static page generation. This wrapper replaces next/dist/lib/worker
 * with an in-process implementation so the whole build runs in one node process.
 *
 * Usage: node scripts/build-inprocess.cjs build
 * Not needed on a normal machine (`npm run build` works there).
 */
const Module = require("module");
const { PassThrough } = require("stream");

const WORKER_PATH = require.resolve("next/dist/lib/worker");
const realWorker = require(WORKER_PATH);

class InProcessWorker {
  constructor(workerPath, options = {}) {
    this._workerPool = { _workers: [] };
    this._stdout = new PassThrough();
    this._stderr = new PassThrough();
    const mod = require(workerPath);
    for (const method of options.exposedMethods || []) {
      this[method] = (...args) =>
        Promise.resolve().then(() => {
          const fn = mod[method] || (mod.default && mod.default[method]);
          if (typeof fn !== "function") {
            throw new Error("[in-process worker] " + workerPath + " missing " + method);
          }
          return fn(...args);
        });
    }
  }
  getStdout() { return this._stdout; }
  getStderr() { return this._stderr; }
  async end() { this._stdout.end(); this._stderr.end(); }
  async close() {}
}

const shim = {
  Worker: InProcessWorker,
  getNextBuildDebuggerPortOffset: realWorker.getNextBuildDebuggerPortOffset,
};

const load = Module._load;
Module._load = function (request, parent, isMain) {
  let resolved = null;
  try {
    resolved = Module._resolveFilename(request, parent, isMain);
  } catch {}
  if (resolved === WORKER_PATH) return shim;
  return load.apply(this, arguments);
};

process.argv = [process.argv[0], require.resolve("next/dist/bin/next"), ...process.argv.slice(2)];
require("next/dist/bin/next");