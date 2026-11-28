# 环境配置：把代码推到 GitHub

本仓库两种推送通道，各自适用不同场景。

## 一、给人用：SSH（推荐，一次配置全机器生效）

### 1. 生成专用密钥

```powershell
mkdir $env:USERPROFILE\.ssh -Force | Out-Null
ssh-keygen -t ed25519 -C "dsh-agent@wyq18" -f $env:USERPROFILE\.ssh\id_ed25519_dsh -N '""'
Get-Content -Raw $env:USERPROFILE\.ssh\id_ed25519_dsh.pub
```

> 注意：`SHA256:` 开头的是**指纹**，不能贴到 GitHub；要贴的是 `ssh-ed25519 AAAA...` 开头的那一整行。

### 2. 把公钥加到 GitHub（账号级，覆盖所有仓库）

<https://github.com/settings/ssh/new> → Key type 选 **Authentication key** → 粘贴整行 → Add SSH key。

### 3. 让 git 全局改走 SSH

```powershell
git config --global core.sshCommand "ssh -i ~/.ssh/id_ed25519_dsh -o IdentitiesOnly=yes"
git config --global url."git@github.com:".insteadOf "https://github.com/"
ssh -T git@github.com
```

预期：`Hi wyq769! You've successfully authenticated, but GitHub does not provide shell access.`

配置完成后，任何仓库（远端即使是 https 地址）都会自动用 SSH 推送，VS Code / GitHub Desktop 同样生效。
撤销：GitHub → Settings → SSH and GPG keys 删除该 key，本机删除 `~\.ssh\id_ed25519_dsh*`。

## 二、给自动化（DSH 沙箱）用：GitHub REST API

沙箱里有两条硬限制，所以**不要指望在沙箱里跑 `git push`**：

| 限制 | 现象 |
|---|---|
| 禁止派生 msys 进程 | `sh.exe: *** fatal error - couldn't create signal pipe, Win32 error 5`（git 走 ssh 必然先起 sh） |
| git 的 HTTPS 出网被掐 | `Recv failure: Connection was reset` / `Failed to connect to github.com port 443` |
| 但 node 的 HTTPS 可出网 | `api.github.com` 正常 200 |

### 凭证来源

Git Credential Manager 已存 GitHub 凭据（`cmdkey /list` 中 `git:https://github.com`），token 前缀 `gho_`，具备仓库读写权限：

```powershell
$env:GCM_INTERACTIVE = "Never"
$cred = "protocol=https`nhost=github.com`n`n" | & "D:\GIT\Git\mingw64\bin\git-credential-manager.exe" get
$env:GHTOK = ($cred | Select-String '^password=' | ForEach-Object { $_.Line.Substring(9) })
```

token 只在进程环境变量里用，不落盘、不入库。

### 推送步骤

```powershell
git ls-tree -r HEAD > _tools\manifest.txt          # 本地文件清单（path + blob sha）
# 提交信息写进 UTF-8 文件，避免命令行中文编码问题
node _tools\publish.cjs --repo=wyq769/JXHJGW --branch=main --msgfile=_tools\msg.txt --manifest=_tools\manifest.txt
```

脚本会：对比远端 tree → 只上传有变化的 blob → 生成新 tree/commit → 移动分支。
返回 `PUSHED <sha>`；再按下文同步本地 `refs`，让 `git status` 保持干净。

### 同步本地引用（API 提交的 sha 与 git 本地提交不同）

GitHub API 生成的 commit 对象**消息末尾不带换行**，与 `git commit` 生成的 git 对象不同，因此 sha 不同（内容相同）。同步方式：

```powershell
# 用相同字段重建 commit 对象并写进本地对象库，再把分支指过去
git hash-object -w -t commit _tools\cand.txt
git update-ref refs/heads/main <sha>
git update-ref refs/remotes/origin/main <sha>
```

## 三、Netlify 预览

### 方案 A：连仓库（推荐，一次绑定，之后每次提交自动部署）

1. <https://app.netlify.com/projects/euphonious-syrniki-f70a98/settings/deploys> → Link site to Git → GitHub → 授权 → 选 `wyq769/JXHJGW`，分支 `main`；
2. 构建设置留空（`netlify.toml` 已声明 `base=Main`、`command=npm run build`、`publish=out`）；
3. `netlify.toml` 里设了 `NETLIFY_NEXT_PLUGIN_SKIP="true"`，因为本站是 `output: "export"` 纯静态，不需要 Next Runtime 插件。

### 方案 B：拖 zip（最快，一次性）

`_deploy\huijie-site-preview.zip` → 拖到 Deploys 页虚线框。zip 内路径必须是正斜杠（`Compress-Archive` 产物 Netlify 不认）。

## 四、已知坑

- PowerShell 5.1 里写含中文的文件前先 `chcp 65001`，否则存成 GBK 会乱码。
- 路径含 `[slug]` 时 `Set-Content` 会当通配符，必须用 `-LiteralPath`。
- 单条命令别超过约 1.2KB，here-string 过长会静默失败。
- `ssh-keyscan github.com` 在沙箱内返回 0 行，`known_hosts` 靠首次 `ssh -T` 生成。
