---
date: 2026-02-26
title: 'NeoMutt Tutorial 11: Basic IMAP Setup'
permalink: /pages/neomutt-basic-imap
categories:
  - Tool
  - CLI
  - NeoMutt
---

This tutorial covers the fundamentals of connecting NeoMutt to your email provider via IMAP/SMTP. By the end, you'll be able to read and send emails directly from your terminal.

<!-- more -->

## Overview

In this tutorial, you will:

1. Install NeoMutt and essential dependencies
2. Create a modular configuration structure
3. Configure IMAP for receiving emails
4. Configure SMTP for sending emails
5. Test your connection and send your first email

## 1. Installation

### macOS (Homebrew)

```bash
brew install neomutt
```

### Linux (Debian/Ubuntu)

```bash
sudo apt install neomutt
```

### Linux (Arch)

```bash
sudo pacman -S neomutt
```

Verify installation:

```bash
neomutt -v
```

## 2. Directory Structure

Create a well-organized configuration directory:

```bash
mkdir -p ~/.config/neomutt/{accounts,themes}
mkdir -p ~/.cache/neomutt/{headers,bodies}
```

The structure:

```
~/.config/neomutt/
├── neomuttrc              # Main entry point
├── options                # General settings
├── mappings               # Keybindings
├── mailboxes              # Account and folder config
├── accounts/              # Per-account settings
└── themes/                # Color themes
```

## 3. Create the Main Configuration File

Create `~/.config/neomutt/neomuttrc`:

```muttrc
# vim: set filetype=neomuttrc:

# Main entry point - sources all other configuration files
source ~/.config/neomutt/options
source ~/.config/neomutt/mappings
source ~/.config/neomutt/mailboxes
```

This modular approach keeps your configuration organized and maintainable.

## 4. Configure General Options

Create `~/.config/neomutt/options`:

```muttrc
# vim: set filetype=neomuttrc:

# =============================================================================
# Editor Settings
# =============================================================================
set editor = "nvim"                    # Use Neovim for composing emails
set tmpdir = "/tmp/$USER/neomutt"      # Temporary files location

# =============================================================================
# IMAP Settings
# =============================================================================
set imap_check_subscribed              # Only check subscribed folders
set imap_keepalive = 300               # Keep connection alive (seconds)
set timeout = 30                       # Network timeout

# =============================================================================
# Cache Settings (improves search performance)
# =============================================================================
set header_cache = "~/.cache/neomutt/headers"
set message_cachedir = "~/.cache/neomutt/bodies"

# =============================================================================
# Display Settings
# =============================================================================
set pager_index_lines = 10             # Show 10 lines of index in pager view
set pager_context = 5                  # Lines of context when paging
set pager_stop                         # Don't wrap to beginning at end
set markers = no                       # Don't show + for wrapped lines
set allow_ansi                         # Allow ANSI color codes

# =============================================================================
# Email Composition
# =============================================================================
set edit_headers                       # Show headers when composing
set askcc                              # Ask for CC field
set envelope_from                      # Use envelope-from for sending
set charset = "utf-8"                  # Default character set
set send_charset = "utf-8"
set assumed_charset = "utf-8:us-ascii"

# =============================================================================
# Message Handling
# =============================================================================
set text_flowed = yes                  # Proper text wrapping
set mime_forward = no                  # Don't forward attachments as MIME
set forward_attachments = yes          # Include attachments when forwarding
set fcc_attach = yes                   # Save attachments with sent messages
set forward_quote = yes                # Quote message when forwarding
set include = yes                      # Include message in replies
set reverse_name = yes                 # Reply as the recipient
set fast_reply = yes                   # Skip to compose after reply

# =============================================================================
# Index and Folder Settings
# =============================================================================
set sort = reverse-date                # Newest emails first
set sort_re = yes                      # Thread sorting respects reply-to
set collapse_all = yes                 # Collapse threads by default
set uncollapse_jump = yes              # Jump to thread on uncollapse
set mail_check = 10                    # Check for new mail every 10 seconds
set mark_old = yes                     # Mark as old when exiting mailbox
set sleep_time = 0                     # No delay after operations
set wait_key = no                      # Don't wait for key after actions

# =============================================================================
# Sidebar Settings
# =============================================================================
set sidebar_visible = yes              # Show folder sidebar
set sidebar_width = 30                 # Sidebar width in characters
set sidebar_format = "%B %<N?(%N)>%* %S"  # Folder name, new count, size
set sidebar_folder_indent = no         # Don't indent folders
set sidebar_next_new_wrap = yes        # Wrap to next new folder
set sidebar_short_path = yes           # Show short folder names

# =============================================================================
# Status Bar
# =============================================================================
set status_chars = " *%A"
set status_format = "[ Folder: %f ] [%r%m messages%?n? (%n new)?%?d? (%d to delete)?%?t? (%t tagged)? ]%>─%?p?( %p postponed )?"

# =============================================================================
# Headers Display
# =============================================================================
ignore *                               # Ignore all headers by default
unignore from: to: cc: date: subject:  # Show only these headers
hdr_order from: to: cc: date: subject: # Header display order

# =============================================================================
# Search and Threading
# =============================================================================
set thorough_search = yes              # Search headers and body
set auto_tag = yes                     # Apply actions to tagged messages
set flag_safe = yes                    # Don't delete flagged messages

# =============================================================================
# Date Format
# =============================================================================
set date_format = "%d.%m.%Y %H:%M"
set index_format = "%4C %Z %{%b %d} %-15.15L (%?l?%4l&%4c?) %s"
```

## 5. Configure Your Email Account

Create `~/.config/neomutt/mailboxes`:

```muttrc
# vim: set filetype=neomuttrc:

# =============================================================================
# Account Configuration
# =============================================================================

# Gmail Example
# --------------
# For Gmail, you must use an App Password:
# https://support.google.com/accounts/answer/185833

set imap_user = "your.email@gmail.com"
set imap_pass = "your-app-password"
set smtp_url = "smtp://your.email@gmail.com@smtp.gmail.com:587/"
set smtp_pass = "your-app-password"
set folder = "imaps://imap.gmail.com/"
set spoolfile = "+INBOX"
set postponed = "+[Gmail]/Drafts"
set record = "+[Gmail]/Sent Mail"
set trash = "+[Gmail]/Trash"

# Alternative: Generic IMAP Configuration
# ---------------------------------------
# Uncomment and modify for other providers (Fastmail, ProtonMail, etc.)

# set imap_user = "your.email@domain.com"
# set imap_pass = "your-password"
# set smtp_url = "smtp://your.email@domain.com@smtp.domain.com:587/"
# set smtp_pass = "your-password"
# set folder = "imaps://imap.domain.com/"
# set spoolfile = "+INBOX"
# set postponed = "+Drafts"
# set record = "+Sent"
# set trash = "+Trash"

# =============================================================================
# Mailbox Subscriptions (Gmail)
# =============================================================================
# Subscribe to specific folders for faster checking

mailboxes "+INBOX" \
          "+[Gmail]/Sent Mail" \
          "+[Gmail]/Drafts" \
          "+[Gmail]/Trash" \
          "+[Gmail]/Spam" \
          "+[Gmail]/All Mail"

# For generic IMAP:
# mailboxes "+INBOX" "+Sent" "+Drafts" "+Trash"

# =============================================================================
# Account Switching (Multiple Accounts)
# =============================================================================
# Define additional accounts and bind keys to switch between them

# Example: Work account
# macro index <F2> ":source ~/.config/neomutt/accounts/work<enter>" "Switch to Work Account"

# Example: Personal account
# macro index <F3> ":source ~/.config/neomutt/accounts/personal<enter>" "Switch to Personal Account"
```

### Security Note: Using Credentials Safely

For better security, consider these alternatives to storing passwords in plain text:

**Option 1: Using a password manager (pass)**

```muttrc
# In ~/.config/neomutt/mailboxes
set imap_pass = "$(pass show email/imap-password)"
set smtp_pass = "$(pass show email/smtp-password)"
```

**Option 2: Using a credentials file**

```muttrc
# In ~/.config/neomutt/neomuttrc
source ~/.config/neomutt/credentials
```

Then create `~/.config/neomutt/credentials` with restricted permissions:

```bash
echo "set imap_pass = \"secret\"" > ~/.config/neomutt/credentials
echo "set smtp_pass = \"secret\"" >> ~/.config/neomutt/credentials
chmod 600 ~/.config/neomutt/credentials
```

## 6. Create Basic Keybindings

Create `~/.config/neomutt/mappings`:

```muttrc
# vim: set filetype=neomuttrc:

# =============================================================================
# Basic Navigation (Vim-style)
# =============================================================================
bind index,pager j next-entry
bind index,pager k previous-entry
bind index,pager g first-entry
bind index,pager G last-entry

# =============================================================================
# Folder Navigation
# =============================================================================
bind index c change-folder           # Change to a different mailbox
bind index y change-folder           # Show mailbox list (sidebar alternative)

# =============================================================================
# Reading Messages
# =============================================================================
bind index <Enter> display-message   # Open message in pager
bind index l view-attachments        # View attachments
bind pager q exit                    # Close pager, return to index

# =============================================================================
# Composing Messages
# =============================================================================
bind index m mail                    # Compose new message
bind index r reply                   # Reply to message
bind index g group-reply             # Reply all
bind index f forward                 # Forward message

# =============================================================================
# Message Management
# =============================================================================
bind index d delete-message          # Mark message for deletion
bind index u undelete-message        # Unmark deletion
bind index s save-message            # Save message to mailbox
bind index # expunge-message         # Permanently delete

# =============================================================================
# Sync and Refresh
# =============================================================================
bind index ! sync-mailbox            # Sync current mailbox with server
bind index R reload-message          # Reload current mailbox

# =============================================================================
# Quit
# =============================================================================
bind index q quit                    # Quit NeoMutt
```

## 7. Provider-Specific Settings

### Gmail

Gmail requires special handling due to its label-based system:

```muttrc
# In ~/.config/neomutt/mailboxes
set folder = "imaps://imap.gmail.com/"
set spoolfile = "+INBOX"
set postponed = "+[Gmail]/Drafts"
set record = "+[Gmail]/Sent Mail"
set trash = "+[Gmail]/Trash"

# Gmail-specific optimizations
set imap_keepalive = 300
set timeout = 30
```

**Important**: Gmail requires an App Password if you have 2FA enabled. Generate one at: <https://myaccount.google.com/apppasswords>

### Fastmail

```muttrc
set imap_user = "your.email@fastmail.com"
set imap_pass = "your-password"
set smtp_url = "smtp://your.email@fastmail.com@smtp.fastmail.com:465/"
set smtp_pass = "your-password"
set folder = "imaps://imap.fastmail.com/"
set spoolfile = "+INBOX"
set record = "+Sent"
set trash = "+Trash"
```

### ProtonMail (via Bridge)

ProtonMail requires the ProtonMail Bridge application:

```muttrc
set imap_user = "your.email@protonmail.com"
set imap_pass = "your-bridge-password"  # From ProtonMail Bridge
set smtp_url = "smtp://127.0.0.1:1025/"
set smtp_pass = "your-bridge-password"
set folder = "imaps://127.0.0.1:1143/"
set spoolfile = "+INBOX"
```

## 8. Test Your Configuration

### Check Configuration Syntax

```bash
neomutt -C -F ~/.config/neomutt/neomuttrc
```

This validates your configuration without launching NeoMutt.

### Launch NeoMutt

```bash
neomutt -F ~/.config/neomutt/neomuttrc
```

Or set it as your default by creating a symlink:

```bash
ln -sf ~/.config/neomutt/neomuttrc ~/.neomuttrc
neomutt
```

### First Launch Checklist

When NeoMutt starts:

1. **Check the sidebar** - You should see your folders listed
2. **Wait for connection** - Initial IMAP connection may take a moment
3. **Verify INBOX loads** - You should see your email list
4. **Test navigation** - Use `j`/`k` to move, `<Enter>` to read

### Send a Test Email

1. Press `m` to compose a new message
2. Fill in the `To:` field (your own email for testing)
3. Fill in the `Subject:` field
4. Write a test message in your editor
5. Save and exit the editor (`:wq` in Neovim)
6. Press `y` to send

## 9. Troubleshooting

### Authentication Failed

**Problem**: NeoMutt reports "Authentication failed"

**Solutions**:

- For Gmail: Use an App Password, not your regular password
- Check that IMAP is enabled in your email provider settings
- Verify username and password are correct

### Connection Timeout

**Problem**: NeoMutt hangs or reports "Connection timed out"

**Solutions**:

- Check your internet connection
- Verify IMAP/SMTP server addresses and ports
- Try increasing timeout: `set timeout = 60`

### SSL Certificate Errors

**Problem**: SSL certificate verification fails

**Solutions**:

- Ensure your system's CA certificates are up to date
- For testing only (not recommended): `set ssl_verify_host = no`

### Folder Not Found

**Problem**: "Mailbox not found" errors

**Solutions**:

- Check folder names match your provider's convention (Gmail uses `[Gmail]/Sent Mail`)
- Use `y` to browse available folders
- Verify folder subscriptions in `mailboxes` directive

## 10. What's Next?

You now have a working NeoMutt setup! In the next tutorial, we'll cover:

- **Essential keybindings** for efficient navigation
- **Thread management** for organizing conversations
- **Composition workflows** with Neovim
- **Contact integration** with khard

Continue to **[Tutorial 12: Keymaps & Daily Usage](12_keymaps-usage.md)**.

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
