// Cross-platform (Windows-native) deploy for Talent2Empower — no bash, no make,
// no lftp. Mirrors dist/ to Strato over SFTP using WinSCP's scripting CLI, which
// handles Strato's keyboard-interactive password auth (the same thing the old
// lftp-based deploy.sh did on WSL). Reads credentials from .env.
//
//   npm run deploy    # deploy an existing build
//   npm run release   # build + deploy
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const isWin = process.platform === 'win32';

// --- load .env (simple KEY=VALUE parser, no dependency) ---
const envPath = join(ROOT, '.env');
if (!existsSync(envPath)) {
  console.error('Error: .env not found. Copy .env.example to .env and fill in your credentials.');
  process.exit(1);
}
const env = {};
for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { FTP_HOST, FTP_USER, FTP_PASS } = env;
const REMOTE_DIR = env.FTP_REMOTE_DIR || '/httpdocs/';
const PORT = env.FTP_PORT || '22';
if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
  console.error('Error: FTP_HOST, FTP_USER and FTP_PASS must all be set in .env.');
  process.exit(1);
}

const distDir = join(ROOT, 'dist');
if (!existsSync(distDir)) {
  console.error('Error: dist/ not found. Run "npm run build" (or "npm run release") first.');
  process.exit(1);
}

// --- locate WinSCP.com (scripting CLI). execFileSync needs a real path. ---
function resolveWinscp() {
  if (process.env.WINSCP && existsSync(process.env.WINSCP)) return process.env.WINSCP;
  const known = [
    join(process.env.LOCALAPPDATA || '', 'Programs', 'WinSCP', 'WinSCP.com'),
    'C:\\Program Files (x86)\\WinSCP\\WinSCP.com',
    'C:\\Program Files\\WinSCP\\WinSCP.com',
  ];
  for (const p of known) if (p && existsSync(p)) return p;
  for (const dir of (process.env.PATH || '').split(delimiter)) {
    const p = join(dir, 'WinSCP.com');
    if (dir && existsSync(p)) return p;
  }
  return null;
}
const WINSCP = isWin ? resolveWinscp() : null;
if (!WINSCP) {
  console.error(
    'Error: WinSCP.com not found. Install with: winget install WinSCP.WinSCP\n' +
      '(or set WINSCP to the full path of WinSCP.com).'
  );
  process.exit(1);
}

// Credentials go in the sftp:// URL — URL-encode so special characters survive.
const url = `sftp://${encodeURIComponent(FTP_USER)}:${encodeURIComponent(FTP_PASS)}@${FTP_HOST}:${PORT}/`;
// No trailing slash — WinSCP appends its own separator and a trailing "/" breaks the listing.
const remote = REMOTE_DIR.replace(/\/+$/, '') || '/';

console.log(`==> Deploying dist/ to ${FTP_HOST}:${remote} over SFTP (WinSCP) ...`);

// `synchronize remote -delete` pushes local -> remote and removes remote files
// not present locally — the same effect as lftp `mirror --reverse --delete`.
// `lcd` + "." avoids WinSCP mangling an absolute Windows local path.
// -hostkey=* accepts any host key (matches the old `sftp:auto-confirm yes`);
// batch/confirm off so an error aborts instead of waiting on an interactive prompt.
// WinSCP mangles absolute paths passed as synchronize arguments ("\C:\...",
// "\/talent2empower\"). Avoid that entirely: the process cwd is set to dist/ (so
// WinSCP's local working dir is dist/), we `cd` into the remote dir, then run
// `synchronize remote` with no path args — it uses both working directories.
const commands = [
  'option batch abort',
  'option confirm off',
  `open ${url} -hostkey=*`,
  // No quotes around the remote path — WinSCP.com mangles embedded quotes into
  // backslashes ("\/talent2empower\"). Strato paths contain no spaces.
  `cd ${remote}`,
  'synchronize remote -delete',
  'exit',
];

try {
  execFileSync(WINSCP, ['/ini=nul', '/command', ...commands], { stdio: 'inherit', cwd: distDir });
  console.log('==> Deployment complete!');
} catch (e) {
  console.error(
    '\n==> Deployment FAILED.\n' +
      'If the server reports "no supported authentication methods", SSH/SFTP access is\n' +
      'not enabled for this Strato account, or the SSH username/password is wrong.\n' +
      'Enable SSH access in the Strato control panel and verify FTP_USER/FTP_PASS in .env.'
  );
  process.exit(e.status || 1);
}
