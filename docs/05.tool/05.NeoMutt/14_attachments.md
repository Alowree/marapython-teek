---
date: 2026-02-26
title: 'NeoMutt Tutorial 14: Attachments'
permalink: /pages/neomutt-attachments
categories:
  - Tool
  - CLI
  - NeoMutt
---

Learn to view, manage, and attach files in NeoMutt. This tutorial covers mailcap configuration for viewing HTML emails, PDFs, and images, plus an efficient workflow for adding multiple attachments with fzf.

<!-- more -->

## Overview

In this tutorial, you will:

1. Configure mailcap for MIME type handling
2. View HTML emails in the terminal
3. Open PDF and image attachments
4. Create an efficient attachment workflow with fzf
5. Add multiple attachments quickly
6. Manage attachment settings

## 1. Understanding mailcap

The `mailcap` file tells NeoMutt how to handle different MIME types (file formats). When you encounter an attachment or HTML email, NeoMutt consults mailcap to determine which external program to use.

### mailcap File Location

Create `~/.config/neomutt/mailcap`:

```bash
touch ~/.config/neomutt/mailcap
```

Reference it in your `~/.config/neomutt/options`:

```muttrc
set mailcap_path = "~/.config/neomutt/mailcap"
```

### mailcap Syntax

Each line follows this format:

```
mime-type; command %s; [options]
```

- `mime-type`: The MIME type (e.g., `text/html`, `application/pdf`)
- `command`: The program to run (`%s` is replaced with the filename)
- `options`: Optional flags like `copiousoutput` for text display

## 2. Installing Required Tools

### macOS (Homebrew)

```bash
# HTML rendering
brew install w3m

# PDF viewing
brew install zathura poppler

# Image viewing (for iTerm2)
brew install imgcat

# Fuzzy finder (for attachment selection)
brew install fzf fd
```

### Linux (Debian/Ubuntu)

```bash
# HTML rendering
sudo apt install w3m

# PDF viewing
sudo apt install zathura poppler-utils

# Image viewing
sudo apt install feh

# Fuzzy finder
sudo apt install fzf fd-find
```

### Linux (Arch)

```bash
sudo pacman -S w3m zathura-poppler feh fzf fd
```

## 3. Configuring mailcap

Create or edit `~/.config/neomutt/mailcap`:

```mailcap
# =============================================================================
# HTML Emails
# =============================================================================
# Render HTML as text using w3m
text/html; w3m -T text/html -dump %s; copiousoutput;
text/html; w3m -dump %s; copiousoutput;

# Alternative: Use lynx instead of w3m
# text/html; lynx -dump %s; copiousoutput;

# =============================================================================
# PDF Documents
# =============================================================================
# View PDF with zathura (graphical viewer)
application/pdf; zathura %s;

# Alternative: Convert PDF to text for terminal viewing
# application/pdf; pdftotext %s -; copiousoutput;

# =============================================================================
# Images
# =============================================================================
# For iTerm2: display images inline
image/png; imgcat %s; copiousoutput;
image/jpeg; imgcat %s; copiousoutput;
image/gif; imgcat %s; copiousoutput;
image/webp; imgcat %s; copiousoutput;

# For other terminals: open in external viewer
# image/png; feh %s;
# image/jpeg; feh %s;
# image/gif; feh %s;

# Alternative: Display image info in terminal
# image/*; echo "Image file: %s"; copiousoutput;

# =============================================================================
# Calendar Invites
# =============================================================================
# View iCalendar files
text/calendar; cat %s; copiousoutput;
application/ics; cat %s; copiousoutput;

# =============================================================================
# Archive Files
# =============================================================================
# List archive contents
application/zip; unzip -l %s; copiousoutput;
application/x-tar; tar -tf %s; copiousoutput;
application/gzip; tar -tzf %s; copiousoutput;
application/x-rar; unrar l %s; copiousoutput;

# =============================================================================
# Office Documents
# =============================================================================
# View LibreOffice/OpenOffice documents (requires unoconv or similar)
# application/vnd.oasis.opendocument.text; odt2txt %s; copiousoutput;
# application/msword; antiword %s; copiousoutput;
# application/vnd.openxmlformats-officedocument.wordprocessingml.document; pandoc -s %s -t plain; copiousoutput;

# =============================================================================
# Plain Text
# =============================================================================
# Explicitly handle plain text (usually default)
text/plain; cat %s; copiousoutput;
text/enriched; cat %s; copiousoutput;

# =============================================================================
# Audio/Video
# =============================================================================
# Play audio files
audio/*; mpv %s;

# Play video files
video/*; mpv %s;

# =============================================================================
# Fallback
# =============================================================================
# For unknown types, just show the file
application/*; echo "Unknown attachment type: %s"; copiousoutput;
```

## 4. Configuring NeoMutt for Attachments

Add these settings to `~/.config/neomutt/options`:

```muttrc
# =============================================================================
# Attachment Settings
# =============================================================================

# Automatically view certain MIME types as text
auto_view text/html text/calendar application/ics

# Prefer HTML over plain text when both are available
alternative_order text/html text/plain text/enriched text/*

# MIME type detection
set mime_type_query_command = "file --mime-type -b %s"

# Forward attachments as part of message body (not as separate MIME)
set mime_forward = no

# Include attachments when forwarding
set forward_attachments = yes

# Save attachments when saving sent messages
set fcc_attach = yes

# Show attachment count in index
set include_only_first = no
```

## 5. Viewing Attachments

### Accessing the Attachment Menu

When viewing a message with attachments:

1. Press `v` in the pager to open the attachment menu
2. Or press `l` from the index to view attachments directly

### Attachment Menu Commands

| Key          | Action                         |
| ------------ | ------------------------------ |
| `<Enter>`    | View selected attachment       |
| `s`          | Save attachment to file        |
| `S`          | Save all attachments           |
| `d`          | Delete attachment (from draft) |
| `m`          | View MIME info                 |
| `\| command` | Pipe attachment to command     |
| `q`          | Return to message              |

### Viewing HTML Emails

With the mailcap configuration above, HTML emails will automatically render as text:

1. Open an HTML email
2. NeoMutt uses `w3m -dump` to convert HTML to text
3. Read the formatted text in the pager

**If HTML doesn't render automatically:**

1. Press `v` to view attachments
2. Select the `text/html` part
3. Press `<Enter>` to view

### Viewing PDFs

**Graphical (zathura):**

1. Open attachment menu with `v`
2. Select the PDF attachment
3. Press `<Enter>` - zathura opens in a new window

**Terminal (pdftotext):**
If you prefer terminal viewing, use this mailcap entry instead:

```mailcap
application/pdf; pdftotext %s -; copiousoutput;
```

### Viewing Images

**iTerm2 with imgcat:**
Images display inline in the terminal:

```mailcap
image/png; imgcat %s; copiousoutput;
```

**Other terminals:**
Images open in an external viewer:

```mailcap
image/png; feh %s;
```

## 6. Adding Attachments

### Basic Attachment Workflow

The default NeoMutt workflow for adding attachments:

1. Compose a message (`m`)
2. Fill in headers and write body
3. Save and exit editor
4. Press `a` to attach a file
5. Browse to file, press `<Enter>`
6. Repeat for each additional attachment

**Problem**: Adding multiple attachments requires repeating steps 4-5 for each file.

### Efficient Multi-Attachment with fzf

Create a script for selecting multiple files with fzf.

**Step 1: Create the script**

Create `~/.config/neomutt/scripts/fzf-attach.sh`:

```bash
#!/usr/bin/env bash

# Navigate to home directory (or change to your default attachment location)
cd "$HOME"

# Define file types to include (customize as needed)
export FZF_DEFAULT_COMMAND='fd -t f \
    -e pdf -e doc -e docx -e xls -e xlsx \
    -e ppt -e pptx -e zip -e tar -e gz \
    -e png -e jpg -e jpeg -e gif \
    -e txt -e md -e csv \
    --absolute-path'

# Use fzf to select multiple files
# -m: multiple selection
# --prompt: custom prompt
fzf -m --prompt='Select attachment(s) > ' | while IFS=$'\n' read -r file; do
    # Output NeoMutt commands to attach each file
    # Escape special characters in filename
    escaped_file=$(printf '%s\n' "$file" | sed "s/'/'\\\\''/g")
    echo "push 'a'$escaped_file'<enter>'"
done
```

**Step 2: Make it executable**

```bash
chmod +x ~/.config/neomutt/scripts/fzf-attach.sh
```

**Step 3: Add keybinding to NeoMutt**

Add to `~/.config/neomutt/mappings`:

```muttrc
# Multi-file attachment with fzf
# Press Ctrl+A in compose screen to select attachments
macro compose \Ca ":source ~/.config/neomutt/scripts/fzf-attach.sh<enter>" "Attach files with fzf"
```

**Step 4: Usage**

1. Compose a message (`m`)
2. Fill headers and write body
3. Save and exit editor
4. Press `Ctrl+A` to open fzf file selector
5. Use arrow keys to navigate
6. Press `Tab` to select multiple files
7. Press `Enter` to confirm
8. All selected files are attached at once

### Customizing fzf Appearance

Add these environment variables to your shell config (`~/.zshrc` or `~/.bashrc`) to customize fzf:

```bash
export FZF_DEFAULT_OPTS='
  --height 40%
  --layout=reverse
  --border
  --info=inline
  --header="Tab: select multiple, Enter: confirm"
  --prompt="📎 Attach: "
  --pointer="▶"
  --marker="✓"
  --color=bg+:#363a4f,bg:#24283b,spinner:#f7768e,hl:#7aa2f7
  --color=fg:#a9b1d6,header:#7aa2f7,info:#9ece6a,pointer:#f7768e
  --color=marker:#bb9af7,fg+:#c0caf5,prompt:#7dcfff,hl+:#7aa2f7
'
```

### Alternative: Using a File Browser

If you prefer a full file browser, you can use `ranger` or `vifm`:

**With ranger:**

```bash
# Install ranger
brew install ranger  # macOS
sudo apt install ranger  # Linux
```

Create `~/.config/neomutt/scripts/ranger-attach.sh`:

```bash
#!/usr/bin/env bash
cd "$HOME"
ranger --choosefile=/tmp/ranger_choice --selectfile="$PWD"
if [ -f /tmp/ranger_choice ]; then
    file=$(cat /tmp/ranger_choice)
    rm /tmp/ranger_choice
    echo "push 'a$file<enter>'"
fi
```

## 7. Attachment Tips and Tricks

### View Attachment Before Sending

After attaching files, press `v` to view the attachment list and verify:

- Correct files are attached
- File sizes are reasonable
- No sensitive files accidentally included

### Remove Attachments

In the compose screen:

1. Press `v` to view attachments
2. Select the attachment to remove
3. Press `d` to detach

### Save Attachments Quickly

**Save all attachments at once:**

1. Press `v` for attachment menu
2. Press `S` (capital) to save all
3. Choose destination directory

**Save specific attachment:**

1. Press `v` for attachment menu
2. Select the attachment
3. Press `s` to save
4. Confirm filename

### Pipe Attachments to Commands

Process attachments without saving:

```
# In attachment menu, select file and press |
# Enter command to pipe the attachment
```

**Examples:**

- `| cat` - View content
- `| wc -l` - Count lines
- `| gpg -d` - Decrypt GPG file

### Automatic Attachment Handling

For specific senders or subjects, you can use hooks:

```muttrc
# Always save attachments from boss
auto_view application/pdf

# Never automatically view attachments from newsletters
ignore *
```

## 8. Troubleshooting

### HTML Emails Show Raw HTML

**Problem**: HTML tags visible instead of rendered text

**Solution**: Check mailcap configuration:

```mailcap
text/html; w3m -T text/html -dump %s; copiousoutput;
```

Ensure `w3m` is installed and the `auto_view` setting includes `text/html`.

### PDF Opens Wrong Application

**Problem**: PDF opens in Preview instead of zathura

**Solution**: Check mailcap file order - first matching entry wins:

```mailcap
application/pdf; zathura %s;
```

### fzf Script Doesn't Work

**Problem**: Pressing Ctrl+A does nothing or shows error

**Solutions**:

1. Check script is executable: `chmod +x ~/.config/neomutt/scripts/fzf-attach.sh`
2. Verify fzf is installed: `which fzf`
3. Check fd is installed: `which fd`
4. Test script manually: `~/.config/neomutt/scripts/fzf-attach.sh`

### Attachment Too Large

**Problem**: Email won't send due to large attachments

**Solutions**:

1. Compress files before attaching:

   ```bash
   tar -czf archive.tar.gz largefile/
   ```

2. Use cloud storage and share links instead
3. Check your SMTP server's size limits

### Character Encoding Issues

**Problem**: Attachment filenames with special characters cause errors

**Solution**: The fzf script includes escaping, but for manual attachment:

- Avoid special characters in filenames
- Use ASCII filenames when possible
- Quote filenames properly

## 9. Complete mailcap Example

Here's a production-ready mailcap file:

```mailcap
# ~/.config/neomutt/mailcap

# HTML - render as text
text/html; w3m -T text/html -dump %s; copiousoutput;

# PDF - graphical viewer
application/pdf; zathura %s;

# Images - iTerm2 inline display
image/png; imgcat %s; copiousoutput;
image/jpeg; imgcat %s; copiousoutput;
image/gif; imgcat %s; copiousoutput;
image/webp; imgcat %s; copiousoutput;

# Calendar
text/calendar; cat %s; copiousoutput;
application/ics; cat %s; copiousoutput;

# Archives (list contents)
application/zip; unzip -l %s; copiousoutput;
application/gzip; tar -tzf %s; copiousoutput;

# Plain text
text/plain; cat %s; copiousoutput;
```

## 10. What's Next?

You can now handle attachments like a pro! In the final tutorial, we'll cover:

- **Setting up mbsync/isync** for local email mirroring
- **Bidirectional synchronization** with IMAP servers
- **Offline email access** and archiving workflows
- **Performance optimization** for large mailboxes

Continue to **[Tutorial 15: Local Mirror with mbsync](15_local-mirror.md)**.

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
