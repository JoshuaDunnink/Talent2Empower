#!/usr/bin/env bash
# deploy.sh - Manual FTP deployment for Talent2Empower (requires lftp)
# Usage: ./deploy.sh

set -euo pipefail

if [ ! -f .env ]; then
  echo "Error: .env file not found. Copy .env.example and fill in your credentials."
  exit 1
fi

# shellcheck disable=SC1091
source .env

echo "==> Building site..."
npm run build

echo "==> Deploying to ${FTP_HOST}..."

# ensure lftp is installed; otherwise bail with instructions
if ! command -v lftp >/dev/null 2>&1; then
  cat <<'MSG'
Error: lftp is not installed. This deployment script requires lftp for
secure FTP transfers.

On Debian/Ubuntu:
  sudo apt update && sudo apt install lftp

On Windows (Git Bash/WSL):
  Use WSL and install lftp via apt, or use an FTP client like FileZilla.

Alternatively, adjust this script to use another tool such as sftp/sshpass.
MSG
  exit 1
fi

# try to add the host key to the user's known_hosts (quietly).
if command -v ssh-keyscan >/dev/null 2>&1; then
  ssh-keyscan -H "${FTP_HOST}" >> "${HOME}/.ssh/known_hosts" 2>/dev/null || true
fi

# determine remote directory locally so it expands correctly
remote_dir="${FTP_REMOTE_DIR:-/httpdocs/}"

lftp -u "${FTP_USER},${FTP_PASS}" sftp://"${FTP_HOST}" <<LFTP
set ssl:verify-certificate no
set sftp:auto-confirm yes
mirror --reverse --delete --verbose --parallel=4 \
  dist/ "${remote_dir}"
bye
LFTP

echo "==> Deployment complete!"
