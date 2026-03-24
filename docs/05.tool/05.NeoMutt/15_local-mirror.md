---
date: 2026-02-26
title: 'NeoMutt Tutorial 15: Local Mirror with mbsync'
permalink: /pages/neomutt-local-mirror
categories:
  - Tool
  - CLI
  - NeoMutt
---

Set up a local mirror of your IMAP mailbox using mbsync (isync) for offline access, faster searches, and reliable email archiving. This is the most advanced setup in the NeoMutt tutorial series.

<!-- more -->

## Overview

In this tutorial, you will:

1. Understand the benefits of local email mirroring
2. Install and configure mbsync/isync
3. Set up bidirectional synchronization
4. Configure NeoMutt for local Maildir access
5. Implement an email archiving workflow
6. Set up automatic synchronization

## 1. Why Local Mirroring?

### Benefits

| Benefit                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Offline Access**     | Read and compose emails without internet       |
| **Fast Searches**      | Search local files instantly (no IMAP latency) |
| **Reliable Backup**    | Local copy protects against server failures    |
| **Archive Management** | Move old emails to local archive folders       |
| **Bandwidth Savings**  | Reduce repeated IMAP downloads                 |
| **Privacy**            | Keep sensitive emails stored locally only      |

### Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Email Synchronization                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐         mbsync         ┌────────────────┐  │
│   │  Remote IMAP    │◄──────────────────────►│  Local Maildir │  │
│   │  Server         │    Bidirectional Sync  │  ~/.maildir/   │  │
│   │                 │                        │                │  │
│   │  - INBOX        │                        │  - INBOX       │  │
│   │  - Sent         │                        │  - Sent        │  │
│   │  - Drafts       │                        │  - Drafts      │  │
│   │  - Trash        │                        │  - Trash       │  │
│   │  - Archive      │                        │  - Archive     │  │
│   └─────────────────┘                        └────────────────┘  │
│         ▲                                              │         │
│         │                                              │         │
│         │    IMAP                                      │ Maildir │
│         │    (online)                                  │(offline)│
│         │                                              │         │
│         └──────────────────────────────────────────────┘         │
│                            NeoMutt                               │
│                    (reads from local Maildir)                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### How It Works

1. **mbsync** synchronizes emails between IMAP server and local Maildir
2. **NeoMutt** reads and writes to local Maildir (fast, offline)
3. **mbsync** propagates changes (deletions, flags) back to server
4. **Bidirectional sync** ensures both sides stay in sync

## 2. Installation

### macOS (Homebrew)

```bash
brew install isync
```

### Linux (Debian/Ubuntu)

```bash
sudo apt install isync
```

### Linux (Arch)

```bash
sudo pacman -S isync
```

### Verify Installation

```bash
mbsync --version
```

## 3. Directory Structure

Create the local mail storage directory:

```bash
mkdir -p ~/.maildir/{account-name}/{INBOX,Sent,Drafts,Trash,Archive}/{cur,new,tmp}
```

For multiple accounts:

```bash
mkdir -p ~/.maildir/{personal,work}/{INBOX,Sent,Drafts,Trash,Archive}/{cur,new,tmp}
```

### Maildir Format

The Maildir format requires three subdirectories:

| Directory | Purpose                           |
| --------- | --------------------------------- |
| `cur`     | Messages that have been read      |
| `new`     | Unread messages                   |
| `tmp`     | Temporary files (during delivery) |

**Important**: Never manually manipulate files in these directories while mbsync is running.

## 4. mbsync Configuration

Create `~/.config/isyncrc` (or `~/.mbsyncrc`):

```isyncrc
# =============================================================================
# Global Settings
# =============================================================================

# IMAP account configuration (Far = remote server)
IMAPAccount twine
Host imap.gmail.com
User your.email@gmail.com
PassCmd "pass show email/imap-password"
# Or use Passwd for plain text (less secure):
# Passwd "your-app-password"
Port 993
SSLType IMAPS
SSLVersions TLSv1.2+
AuthMechs LOGIN

# Local mail storage (Near = local machine)
IMAPStore twine-local
Driver Maildir
Path ~/.maildir/twine/
Inbox ~/.maildir/twine/INBOX/

# Remote mail storage (Far = server)
IMAPStore twine-remote
Driver IMAP
Account twine

# =============================================================================
# Channel Configuration
# =============================================================================
# A channel defines how to sync between Near and Far

Channel twine
Far :twine-remote:
Near :twine-local:
Patterns *
Sync All
Expunge Both
Create Near
Remove Near
SyncState *

# =============================================================================
# Additional Accounts
# =============================================================================

# Work account example
IMAPAccount work
Host imap.company.com
User you@company.com
PassCmd "pass show work/imap-password"
Port 993
SSLType IMAPS
SSLVersions TLSv1.2+

IMAPStore work-local
Driver Maildir
Path ~/.maildir/work/
Inbox ~/.maildir/work/INBOX/

IMAPStore work-remote
Driver IMAP
Account work

Channel work
Far :work-remote:
Near :work-local:
Patterns *
Sync All
Expunge Both
Create Near
Remove Near
SyncState *

# =============================================================================
# Group Configuration (sync multiple channels at once)
# =============================================================================

Group main
Channel twine
Channel work
```

### Configuration Options Explained

| Option          | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `PassCmd`       | Command to retrieve password (more secure than plain text)        |
| `SSLType IMAPS` | Use SSL/TLS encryption                                            |
| `Patterns *`    | Sync all folders (use `Patterns INBOX Sent` for specific folders) |
| `Sync All`      | Sync both new and old messages                                    |
| `Expunge Both`  | Deletions sync both ways (critical for archiving)                 |
| `Create Near`   | Create local folders that exist on server                         |
| `Remove Near`   | Remove local folders deleted from server                          |
| `SyncState *`   | Store sync state in Maildir                                       |

### Password Management

**Option 1: Using pass (recommended)**

```bash
# Install pass
brew install pass  # macOS
sudo apt install pass  # Linux

# Initialize pass with GPG
pass init "your-gpg-id"

# Store password
pass insert email/imap-password
```

**Option 2: Plain text in config (less secure)**

```isyncrc
Passwd "your-app-password"
```

Set restrictive permissions:

```bash
chmod 600 ~/.config/isyncrc
```

## 5. Initial Synchronization

### Test Configuration

```bash
mbsync -a --dry-run
```

This shows what would happen without making changes.

### First Sync

```bash
# Sync all channels
mbsync -a

# Or sync specific channel
mbsync twine
```

**First sync may take a while** depending on mailbox size. Subsequent syncs are incremental and fast.

### Verify Sync

```bash
# Check local maildir structure
ls -la ~/.maildir/twine/

# Count messages
find ~/.maildir/twine/INBOX/cur -type f | wc -l
find ~/.maildir/twine/INBOX/new -type f | wc -l
```

## 6. Configure NeoMutt for Local Maildir

Update your NeoMutt configuration to use local Maildir instead of IMAP.

### Update `~/.config/neomutt/mailboxes`

```muttrc
# vim: set filetype=neomuttrc:

# =============================================================================
# Local Maildir Configuration
# =============================================================================

# Disable IMAP settings (no longer needed for reading)
# set imap_user = ...
# set imap_pass = ...
# set folder = ...

# Set mailbox type to Maildir
set mailbox_type = "Maildir"

# Local mailbox paths
set folder = "~/.maildir/twine/"
set spoolfile = "~/.maildir/twine/INBOX"
set postponed = "~/.maildir/twine/Drafts"
set record = "~/.maildir/twine/Sent"
set trash = "~/.maildir/twine/Trash"

# SMTP settings still needed for sending
set smtp_url = "smtp://your.email@gmail.com@smtp.gmail.com:587/"
set smtp_pass = "$(pass show email/smtp-password)"

# =============================================================================
# Mailbox Subscriptions
# =============================================================================

mailboxes "~/.maildir/twine/INBOX" \
          "~/.maildir/twine/Sent" \
          "~/.maildir/twine/Drafts" \
          "~/.maildir/twine/Trash" \
          "~/.maildir/twine/Archive"

# =============================================================================
# Local Maildir Optimizations
# =============================================================================

# Faster checks for local mail
set mail_check = 5
set mail_check_stats = yes
set mail_check_stats_interval = 60

# No need for IMAP keepalive
# unset imap_keepalive
```

### Update `~/.config/neomutt/options`

```muttrc
# =============================================================================
# Local Maildir Settings
# =============================================================================

# Cache settings still useful for search performance
set header_cache = "~/.cache/neomutt/headers"
set message_cachedir = "~/.cache/neomutt/bodies"

# Local mail doesn't need timeout settings
# set timeout = 30
# set imap_keepalive = 300
```

### Test NeoMutt Configuration

```bash
neomutt -C -F ~/.config/neomutt/neomuttrc
neomutt -F ~/.config/neomutt/neomuttrc
```

## 7. Automated Synchronization

### Manual Sync Habit

Get in the habit of syncing before and after using NeoMutt:

```bash
# Before opening NeoMutt
mbsync -a

# Open NeoMutt, read/compose/send

# After closing NeoMutt
mbsync -a
```

### Automatic Sync Script

Create `~/.local/bin/neomutt-sync.sh`:

```bash
#!/usr/bin/env bash

# Sync before opening NeoMutt
echo "📥 Syncing email..."
mbsync -a

# Open NeoMutt
echo "📧 Opening NeoMutt..."
neomutt -F ~/.config/neomutt/neomuttrc

# Sync after closing NeoMutt
echo "📤 Syncing changes..."
mbsync -a

echo "✅ Done!"
```

Make it executable:

```bash
chmod +x ~/.local/bin/neomutt-sync.sh
```

Add alias to shell config (`~/.zshrc` or `~/.bashrc`):

```bash
alias neomutt='~/.local/bin/neomutt-sync.sh'
```

### Background Sync with cron

Set up automatic background sync:

```bash
crontab -e
```

Add this line to sync every 10 minutes:

```cron
*/10 * * * * mbsync -a >> ~/.local/log/mbsync.log 2>&1
```

Create the log directory:

```bash
mkdir -p ~/.local/log
```

### Background Sync with systemd (Linux)

Create `~/.config/systemd/user/mbsync.service`:

```ini
[Unit]
Description=mbsync email synchronization

[Service]
Type=oneshot
ExecStart=/usr/bin/mbsync -a
```

Create `~/.config/systemd/user/mbsync.timer`:

```ini
[Unit]
Description=Run mbsync every 10 minutes

[Timer]
OnBootSec=1min
OnUnitActiveSec=10min
Unit=mbsync.service

[Install]
WantedBy=timers.target
```

Enable the timer:

```bash
systemctl --user daemon-reload
systemctl --user enable mbsync.timer
systemctl --user start mbsync.timer
```

## 8. Email Archiving Workflow

With local mirroring and `Expunge Both` configured, you can archive emails by moving them locally and syncing deletions to the server.

### Create Archive Structure

```bash
# Year-based archive
mkdir -p ~/.maildir/archive/2025/{cur,new,tmp}
mkdir -p ~/.maildir/archive/2024/{cur,new,tmp}

# Or project-based archive
mkdir -p ~/.maildir/archive/project-alpha/{cur,new,tmp}
mkdir -p ~/.maildir/archive/project-beta/{cur,new,tmp}
```

### Add Archive to NeoMutt

In `~/.config/neomutt/mailboxes`:

```muttrc
mailboxes "~/.maildir/archive/2025" \
          "~/.maildir/archive/2024"
```

### Manual Archive Workflow

1. **Sync first**: `mbsync twine`
2. **Open NeoMutt**: Navigate to INBOX
3. **Find old emails**: Use search/limit (`l~d <6m`)
4. **Tag messages**: Press `T` to tag thread, or `*` to tag pattern
5. **Save to archive**: Press `s`, enter `~/.maildir/archive/2025`
6. **Sync changes**: `mbsync twine` (removes from server)

### Automated Archive Script

Create `~/bin/archive-old-emails.sh`:

```bash
#!/usr/bin/env bash

# Configuration
SOURCE_INBOX="$HOME/.maildir/twine/INBOX"
ARCHIVE_DIR="$HOME/.maildir/archive/2025"
CUTOFF_DATE="2025-01-01"

# Convert cutoff date to seconds since epoch (macOS/BSD)
CUTOFF_SECONDS=$(date -j -f "%Y-%m-%d" "$CUTOFF_DATE" "+%s")

echo "Archiving emails older than $CUTOFF_DATE"
echo "From: $SOURCE_INBOX"
echo "To: $ARCHIVE_DIR"
echo "---"

# Ensure archive directories exist
mkdir -p "$ARCHIVE_DIR/cur"
mkdir -p "$ARCHIVE_DIR/new"
mkdir -p "$ARCHIVE_DIR/tmp"

# Find and move old emails
count=0
find "$SOURCE_INBOX/cur" "$SOURCE_INBOX/new" -type f | while read -r email_file; do
    # Extract Date header
    date_header=$(grep -i -m 1 '^Date:' "$email_file" 2>/dev/null)

    if [[ -n "$date_header" ]]; then
        # Clean up date string
        email_date_str=$(echo "$date_header" | sed -E 's/^Date: //; s/\(.*\)//; s/\s+$//')

        # Convert to epoch (try multiple formats)
        email_seconds=$(date -j -f "%a, %d %b %Y %H:%M:%S %z" "$email_date_str" "+%s" 2>/dev/null)
        if [[ -z "$email_seconds" ]]; then
            email_seconds=$(date -j -f "%d %b %Y %H:%M:%S %z" "$email_date_str" "+%s" 2>/dev/null)
        fi

        # Compare and move
        if [[ -n "$email_seconds" && "$email_seconds" -lt "$CUTOFF_SECONDS" ]]; then
            mv "$email_file" "$ARCHIVE_DIR/cur/"
            ((count++))
            echo "Moved: $(basename "$email_file")"
        fi
    fi
done

echo "---"
echo "Archive complete: $count messages moved"
echo ""
echo "Next step: Run 'mbsync twine' to sync deletions to server"
```

Make it executable:

```bash
chmod +x ~/bin/archive-old-emails.sh
```

### Archive Workflow

```bash
# 1. Sync current state
mbsync twine

# 2. Run archive script
~/bin/archive-old-emails.sh

# 3. Sync deletions to server (IMPORTANT: this removes from server!)
mbsync twine

# 4. Verify in NeoMutt
neomutt
```

## 9. Hybrid Setup: Local + IMAP

For best of both worlds, configure NeoMutt to use local Maildir for reading but IMAP for sending:

```muttrc
# Local mail for reading
set folder = "~/.maildir/twine/"
set spoolfile = "~/.maildir/twine/INBOX"

# SMTP for sending (still needed)
set smtp_url = "smtp://your.email@gmail.com@smtp.gmail.com:587/"
set smtp_pass = "$(pass show email/smtp-password)"

# Sent messages go to local Maildir
set record = "~/.maildir/twine/Sent"
```

Then sync Sent folder to server:

```bash
mbsync twine
```

## 10. Troubleshooting

### Sync Conflicts

**Problem**: "Conflict: message exists on both sides"

**Solution**: This usually means the sync state is corrupted. Reset it:

```bash
# Remove sync state
rm ~/.maildir/twine/.mbsync-state

# Re-sync from scratch
mbsync twine
```

### Messages Not Syncing

**Problem**: New emails don't appear locally

**Solutions**:

1. Run `mbsync -a` manually
2. Check cron/systemd is running
3. Verify IMAP credentials are correct
4. Check `mbsync` logs for errors

### Deletions Not Syncing

**Problem**: Deleted emails reappear after sync

**Solutions**:

1. Ensure `Expunge Both` is in isyncrc
2. Run `mbsync -a` after deleting in NeoMutt
3. Check you're deleting from local Maildir, not just marking

### SSL/TLS Errors

**Problem**: "SSL connection failed" or certificate errors

**Solutions**:

1. Update CA certificates: `brew update && brew upgrade ca-certificates`
2. Verify SSLVersions in isyncrc: `SSLVersions TLSv1.2+`
3. For testing only (not recommended): `SSLType STARTTLS`

### Permission Errors

**Problem**: "Cannot create directory" or "Permission denied"

**Solutions**:

```bash
# Fix ownership
chown -R $(whoami) ~/.maildir/

# Fix permissions
chmod -R 700 ~/.maildir/
chmod 600 ~/.config/isyncrc
```

### Slow Initial Sync

**Problem**: First sync takes hours

**Solutions**:

1. This is normal for large mailboxes
2. Use `Patterns INBOX Sent` to sync only important folders first
3. Let it run overnight
4. Subsequent syncs will be fast

## 11. Advanced: Integration with notmuch

For even faster searching, integrate notmuch with your local Maildir.

### Install notmuch

```bash
brew install notmuch  # macOS
sudo apt install notmuch  # Linux
```

### Configure notmuch

```bash
notmuch setup
```

Point to your local Maildir: `~/.maildir/twine/`

### Index Emails

```bash
notmuch new
```

### Search with notmuch

```bash
notmuch search "from:john and subject:invoice"
```

### Integrate with NeoMutt

```muttrc
# Use notmuch for virtual mailboxes
virtual-mailboxes "inbox" "notmuch://?query=tag:inbox and tag:unread"
virtual-mailboxes "flagged" "notmuch://?query=tag:flagged"
```

This is an advanced topic beyond this tutorial's scope. See the notmuch documentation for details.

## 12. Summary

You've now completed the full NeoMutt tutorial series! Here's what you've accomplished:

| Tutorial          | Skill Acquired                    |
| ----------------- | --------------------------------- |
| [11] Basic IMAP   | Connect to email servers          |
| [12] Keymaps      | Efficient keyboard navigation     |
| [13] Search       | Find emails with pattern matching |
| [14] Attachments  | View and attach files             |
| [15] Local Mirror | Offline access and archiving      |

### Complete Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    Daily Email Workflow                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. mbsync -a           # Sync new emails                   │
│                                                             │
│  2. neomutt             # Read, compose, manage             │
│     - j/k navigate      # Browse inbox                      │
│     - / search          # Find specific emails              │
│     - l limit           # Filter view                       │
│     - m compose         # Write new email                   │
│     - r reply           # Respond to messages               │
│     - v attachments     # View/manage files                 │
│                                                             │
│  3. mbsync -a           # Sync sent/deletions               │
│                                                             │
│  4. (Optional)          # Archive old emails                │
│     ~/bin/archive-old-emails.sh                             │
│     mbsync -a                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Files Summary

| File                          | Purpose              |
| ----------------------------- | -------------------- |
| `~/.config/neomutt/neomuttrc` | Main entry point     |
| `~/.config/neomutt/options`   | General settings     |
| `~/.config/neomutt/mappings`  | Keybindings          |
| `~/.config/neomutt/mailboxes` | Account config       |
| `~/.config/neomutt/mailcap`   | MIME handlers        |
| `~/.config/isyncrc`           | mbsync configuration |
| `~/.maildir/`                 | Local email storage  |

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
