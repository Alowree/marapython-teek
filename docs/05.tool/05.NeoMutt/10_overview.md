---
date: 2026-02-26
title: NeoMutt Tutorial Series Overview
permalink: /pages/neomutt-overview
categories:
  - Tool
  - CLI
  - NeoMutt
---

A progressive tutorial series for configuring NeoMutt, from basic IMAP connection to advanced local mirroring with mbsync.

<!-- more -->

## Series Roadmap

This tutorial series is designed to guide you through setting up a complete terminal-based email workflow with NeoMutt. Each tutorial builds upon the previous one, gradually introducing more advanced features and optimizations.

```
┌─────────────────────────────────────────────────────────────────┐
│                    NeoMutt Tutorial Series                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [10] Overview  ────────────────────────────────►  You are here │
│    │                                                            │
│    ▼                                                            │
│  [11] Basic IMAP Setup                                          │
│    • Install NeoMutt and dependencies                           │
│    • Configure IMAP/SMTP connection                             │
│    • Set up email accounts                                      │
│    • Basic folder navigation                                    │
│                                                                 │
│    ▼                                                            │
│  [12] Keymaps & Daily Usage                                     │
│    • Essential keybindings                                      │
│    • Vim-style navigation                                       │
│    • Compose, reply, forward emails                             │
│    • Thread management                                          │
│    • Sidebar configuration                                      │
│                                                                 │
│    ▼                                                            │
│  [13] Search & Filtering                                        │
│    • Pattern modifiers (~s, ~f, ~b, etc.)                       │
│    • Limit vs Search                                            │
│    • Combining patterns (AND, OR, NOT)                          │
│    • Date-based searches                                        │
│    • Message caching for performance                            │
│                                                                 │
│    ▼                                                            │
│  [14] Attachments                                               │
│    • Viewing attachments (HTML, PDF, images)                    │
│    • mailcap configuration                                      │
│    • Adding attachments with fzf                                │
│    • Multi-file attachment workflow                             │
│                                                                 │
│    ▼                                                            │
│  [15] Local Mirror with mbsync                                  │
│    • Install and configure isync/mbsync                         │
│    • Set up bidirectional sync                                  │
│    • Local Maildir structure                                    │
│    • Archive workflow                                           │
│    • Offline email access                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before starting this series, ensure you have:

- **Operating System**: macOS, Linux, or any Unix-like system
- **Terminal**: Any terminal emulator (iTerm2, Kitty, Alacritty, etc.)
- **Text Editor**: Neovim or Vim (for editing emails and config files)
- **Email Account**: An IMAP-enabled email account (Gmail, Fastmail, ProtonMail with bridge, etc.)

## Installation Summary

All tutorials assume you have the following tools installed. Installation commands for macOS (Homebrew):

```bash
# Core email client
brew install neomutt

# For attachment viewing
brew install w3m zathura

# For attachment selection
brew install fzf fd

# For contact management
brew install khard

# For local mirroring (Tutorial 15)
brew install isync
```

## Directory Structure

We recommend organizing your NeoMutt configuration as follows:

```
~/.config/neomutt/
├── neomuttrc              # Main entry point (sources all other files)
├── options                # General settings (editor, cache, display)
├── mappings               # Keybindings and macros
├── mailboxes              # Account configurations and folder lists
├── mailcap                # MIME type handlers for attachments
├── accounts/              # Per-account settings (optional for multiple accounts)
│   ├── personal           # Personal email account
│   └── work               # Work email account
└── themes/                # Color schemes (optional)
    └── default.neomuttrc
```

## Configuration Philosophy

This series follows these principles:

1. **Modular Configuration**: Split settings into logical, reusable files
2. **Progressive Complexity**: Start simple, add features as needed
3. **Keyboard-Centric**: Optimize for efficient keyboard navigation
4. **Offline-First**: Eventually set up local caching for speed and reliability

## Quick Start Guide

If you want to get NeoMutt running quickly before diving deep:

1. **Install NeoMutt**: `brew install neomutt`
2. **Create minimal config** (`~/.config/neomutt/neomuttrc`):

   ```muttrc
   set imap_user = "your.email@gmail.com"
   set imap_pass = "your-app-password"
   set smtp_url = "smtp://your.email@gmail.com@smtp.gmail.com:587/"
   set smtp_pass = "your-app-password"
   set folder = "imaps://imap.gmail.com/"
   set spoolfile = "+INBOX"
   set mailbox_type = "Maildir"
   ```

3. **Run NeoMutt**: `neomutt -F ~/.config/neomutt/neomuttrc`

This minimal setup will connect to your IMAP server and let you read/send email. The rest of this series will help you build a much more powerful and efficient workflow.

## Series Progression

| Tutorial             | Focus                      | Skill Level           | Estimated Time |
| -------------------- | -------------------------- | --------------------- | -------------- |
| [11] Basic IMAP      | Connection & accounts      | Beginner              | 30 min         |
| [12] Keymaps & Usage | Navigation & composition   | Beginner-Intermediate | 45 min         |
| [13] Search & Filter | Finding emails efficiently | Intermediate          | 30 min         |
| [14] Attachments     | MIME handling & files      | Intermediate          | 30 min         |
| [15] Local Mirror    | Offline access & archiving | Advanced              | 60 min         |

## Related Tools

Throughout this series, we'll mention several complementary tools:

| Tool             | Purpose                    | Tutorial         |
| ---------------- | -------------------------- | ---------------- |
| **khard**        | Contact management         | [12]             |
| **fzf**          | Fuzzy file selection       | [14]             |
| **w3m**          | HTML email rendering       | [14]             |
| **zathura**      | PDF viewer                 | [14]             |
| **mbsync/isync** | IMAP synchronization       | [15]             |
| **notmuch**      | Fast email indexing/search | (Advanced topic) |

## Troubleshooting

Common issues you might encounter:

1. **IMAP Authentication Fails**: Use app-specific passwords for Gmail/Outlook
2. **Slow Search**: Enable message caching (covered in [13])
3. **HTML Emails Display Poorly**: Configure mailcap properly (covered in [14])
4. **Sync Conflicts**: Use `Expunge Both` in mbsync config (covered in [15])

## Next Steps

Ready to begin? Start with **[Tutorial 11: Basic IMAP Setup](11_basic-imap.md)** to get your NeoMutt configuration up and running.

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
