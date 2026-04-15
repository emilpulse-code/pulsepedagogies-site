# Pulse Pedagogies Sync Scripts

Save these as `.ps1` files on your local machine to quickly sync between your Claude CLI environments.

## 1. Push Changes (Save as `push.ps1`)
```powershell
# Stage all changes
git add .

# Prompt for a commit message
$msg = Read-Host -Prompt "Enter commit message"
if (-not $msg) { $msg = "Update from Claude CLI" }

# Commit
git commit -m $msg

# Push to main
git push origin main

Write-Host "✅ Changes pushed to main successfully!" -ForegroundColor Green
```

## 2. Pull Changes (Save as `pull.ps1`)
```powershell
# Fetch and merge from main
git pull origin main

# Clean up any local artifacts if needed
# npm install

Write-Host "✅ Local environment is now in sync with main!" -ForegroundColor Green
```

## Usage
1. Open PowerShell in your project directory.
2. Run `.\push.ps1` before switching to your other CLI.
3. Run `.\pull.ps1` when you start working on the other CLI.
