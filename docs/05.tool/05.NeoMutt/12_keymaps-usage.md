---
date: 2026-02-26
title: 'NeoMutt Tutorial 12: Keymaps and Daily Usage'
permalink: /pages/neomutt-keymaps-usage
categories:
  - Tool
  - CLI
  - NeoMutt
---

Master the essential keybindings and workflows for daily email management in NeoMutt. This tutorial covers navigation, composition, threading, and productivity tips.

<!-- more -->

## Overview

In this tutorial, you will:

1. Learn the NeoMutt interface components
2. Master Vim-style navigation keybindings
3. Understand email composition workflows
4. Manage threads effectively
5. Configure the sidebar for folder navigation
6. Integrate contacts with khard

## 1. NeoMutt Interface Components

NeoMutt has several "menus" or interface modes, each with its own keybindings:

| Component   | Description              | Primary Use                    |
| ----------- | ------------------------ | ------------------------------ |
| **index**   | Main email list view     | Browsing and managing messages |
| **pager**   | Message reading view     | Reading email content          |
| **compose** | Email composition screen | Writing new messages           |
| **browser** | File/folder selector     | Choosing mailboxes or files    |
| **attach**  | Attachment menu          | Managing attachments           |
| **sidebar** | Folder list panel        | Quick folder switching         |

Keybindings are context-specific. A key may do different things depending on which component is active.

## 2. Enhanced Keybindings Configuration

Replace or update your `~/.config/neomutt/mappings` with this comprehensive configuration:

```muttrc
# vim: set filetype=neomuttrc:

# =============================================================================
# Navigation (Vim-style)
# =============================================================================

# Index and Pager - Movement
bind index,pager        j       next-entry          "Next message"
bind index,pager        k       previous-entry      "Previous message"
bind index,pager        g       first-entry         "First message"
bind index,pager        G       last-entry          "Last message"

# Pager-specific scrolling
bind pager              <Space> next-page           "Scroll down one page"
bind pager              b       previous-page       "Scroll up one page"
bind pager              <Up>    previous-line       "Scroll up one line"
bind pager              <Down>  next-line           "Scroll down one line"

# =============================================================================
# Message Reading
# =============================================================================
bind index              <Enter> display-message     "Open message in pager"
bind index              l       view-attachments    "View attachments menu"
bind pager              q       exit                "Close pager, return to index"
bind pager              v       view-attachments    "View attachments from pager"

# =============================================================================
# Folder Navigation
# =============================================================================
bind index              c       change-folder       "Change to mailbox"
bind index              y       change-folder       "Show mailbox list"
bind browser            <Enter> select-entry        "Select mailbox"
bind browser            h       goto-parent         "Go to parent folder"
bind browser            l       select-entry        "Select mailbox"
bind browser            g       first-entry         "First folder"
bind browser            G       last-entry          "Last folder"

# =============================================================================
# Sidebar Navigation
# =============================================================================
bind index,pager        B       sidebar-toggle-visible  "Toggle sidebar"
bind index,pager        <Tab>   sidebar-next            "Next folder in sidebar"
bind index,pager        <BackTab> sidebar-prev          "Previous folder in sidebar"
bind index,pager        <Return> sidebar-open           "Open selected folder"

# =============================================================================
# Composing Messages
# =============================================================================
bind index              m       mail                    "Compose new message"
bind index              r       reply                   "Reply"
bind index              R       group-reply             "Reply all"
bind index              f       forward                 "Forward"

# Compose screen
bind compose            y       send-message            "Send email"
bind compose            q       quit                    "Discard draft"
bind compose            a       attach-file             "Attach file"
bind compose            d       detach-file             "Detach file"
bind compose            e       edit-description        "Edit attachment description"

# =============================================================================
# Message Management
# =============================================================================

# Delete operations
bind index,pager        d       delete-message          "Mark for deletion"
bind index,pager        u       undelete-message        "Unmark deletion"
bind index,pager        D       purge-message           "Permanently delete"

# Tag operations (for bulk actions)
bind index              t       tag-entry               "Tag/untag message"
bind index              T       tag-thread              "Tag entire thread"
bind index              *       tag-pattern             "Tag messages matching pattern"

# Save and copy
bind index,pager        s       save-message            "Save to mailbox"
bind index,pager        C       copy-message            "Copy to mailbox"

# Sync operations
bind index              $       sync-mailbox            "Sync mailbox (expunge)"
bind index              !       sync-mailbox            "Sync mailbox (alternative)"
bind index              R       reload-message          "Reload mailbox"

# =============================================================================
# Search and Limit
# =============================================================================
bind index              /       search                  "Search messages"
bind index              \       search-opposite         "Search backwards"
bind index              n       next-match              "Next search match"
bind index              N       previous-match          "Previous search match"
bind index              l       limit                   "Limit to pattern"
bind index              L       limit                   "Limit (alternative)"

# =============================================================================
# Thread Management
# =============================================================================
bind index              zt      collapse-thread         "Collapse thread"
bind index              zT      collapse-all            "Collapse all threads"
bind index              ze      expand-thread           "Expand thread"
bind index              zE      expand-all              "Expand all threads"
bind index              zp      parent-message          "Go to parent message"

# Thread navigation
bind pager,index        gt      next-thread             "Next thread"
bind pager,index        gT      previous-thread         "Previous thread"

# Thread operations
bind pager,index        dt      delete-subthread        "Delete subthread"
bind pager,index        dT      delete-thread           "Delete thread"

# =============================================================================
# Postponed Messages (Drafts)
# =============================================================================
bind index              P       recall-message          "Recall postponed message"

# =============================================================================
# Quit and Exit
# =============================================================================
bind index              q       quit                    "Quit NeoMutt"
bind pager              q       exit                    "Exit pager"
bind compose            q       quit                    "Discard and exit"
bind browser            q       exit                    "Exit browser"

# =============================================================================
# Help
# =============================================================================
bind index,pager        ?       help                    "Show help"
```

## 3. Daily Usage Workflows

### Reading Email

1. **Launch NeoMutt**: `neomutt`
2. **Navigate inbox**: Use `j`/`k` to move through messages
3. **Open a message**: Press `<Enter>`
4. **Scroll through content**: Use `<Space>` (down) and `b` (up)
5. **Return to inbox**: Press `q`

### Composing a New Email

1. Press `m` from the index
2. Fill in headers:
   - `To:` - Recipient email address
   - `Cc:` - Carbon copy (optional, press `Tab` to skip)
   - `Bcc:` - Blind carbon copy (optional)
   - `Subject:` - Email subject
3. Write your message in Neovim
4. Save and exit Neovim (`:wq`)
5. Review the email, press `y` to send or `q` to discard

### Replying to an Email

1. Select the message in the index
2. Press `r` for reply, `R` for reply-all, or `f` for forward
3. Edit the quoted message if needed
4. Write your response above the quoted text
5. Save, exit, and send with `y`

### Deleting Emails

**Single message:**

1. Select the message
2. Press `d` (marks with 'D' for deletion)
3. Press `$` to sync (moves to Trash)

**Multiple messages:**

1. Tag messages with `t` (marks with '\*')
2. Press `d` to delete all tagged messages
3. Press `$` to sync

**Undo deletion:**

1. Before syncing, press `u` to undelete
2. Or go to Trash folder and save back to INBOX

### Managing Folders

**Using the sidebar (recommended):**

1. Toggle sidebar with `B`
2. Navigate with `<Tab>` (next) and `<BackTab>` (previous)
3. Press `<Return>` to open selected folder

**Using the browser:**

1. Press `c` or `y`
2. Navigate with `j`/`k` or `g`/`G`
3. Press `<Enter>` to select
4. Press `h` to go to parent folder

## 4. Thread Management

NeoMutt can group related emails into threads for easier conversation tracking.

### Thread Display

Threads are enabled by default with the settings in our `options` file:

```muttrc
set sort = reverse-date
set collapse_all = yes
set uncollapse_jump = yes
```

### Thread Operations

| Key  | Action                         |
| ---- | ------------------------------ |
| `zt` | Collapse/expand current thread |
| `zT` | Collapse/expand all threads    |
| `T`  | Tag entire thread              |
| `dt` | Delete subthread               |
| `dT` | Delete entire thread           |

### Threading Tips

- Collapsed threads show only the latest message
- Use `zp` to jump to parent message in a thread
- Tagging a thread (`T`) applies actions to all messages in it

## 5. Contact Management with khard

### Install khard

```bash
# macOS
brew install khard

# Linux
pip install khard
```

### Configure khard

Create `~/.config/khard/khard.conf`:

```ini
[addressbooks]
[[contacts]]
path = ~/.contacts/contacts
```

Create the contacts directory:

```bash
mkdir -p ~/.contacts/contacts
```

### Add Contacts

```bash
# Add a new contact interactively
khard new

# Or add from an email
echo "From: John Doe <john@example.com>" | khard add-email
```

### Integrate with NeoMutt

Add to `~/.config/neomutt/options`:

```muttrc
# Query command for email completion
set query_command = "khard email --parsable --search-in-source-files '%s'"

# Bind Tab for completion in address fields
bind editor <Tab> complete-query
```

### Usage

When composing an email:

1. Start typing a name in the `To:` field (e.g., `john`)
2. Press `<Tab>` to complete
3. If multiple matches, select from the list

### Quick Add Contact

Add this macro to `~/.config/neomutt/mappings`:

```muttrc
# Add sender to khard contacts
macro index,pager A "<pipe-message>khard add-email --skip-already-added<enter>" "Add sender to contacts"
```

Press `A` while viewing a message to add the sender to your contacts.

## 6. Productivity Macros

Add these powerful macros to your `~/.config/neomutt/mappings`:

```muttrc
# =============================================================================
# Productivity Macros
# =============================================================================

# Show all messages (undo any limit)
macro index x "<limit>all\n" "Show all messages"

# Quick limit by sender
macro index L "<limit>~f " "Limit by sender"

# Quick limit by subject
macro index S "<limit>~s " "Limit by subject"

# Mark all messages in current view as read
macro index W "<tag-entry><tag-pattern>~U<enter><clear-flag>new<clear-flag>unread<exit>" "Mark all as read"

# Archive current message (move to Archive folder)
macro index ZA "<save-message>+Archive<enter>" "Archive message"

# Report spam (move to Spam and sync)
macro index SP "<save-message>+Spam<enter><sync-mailbox>" "Report as spam"

# View raw message source
macro index,pager V "<view-raw-message>" "View raw message"
```

## 7. Customizing the Index Display

The index format shows email metadata in columns. Customize it in `options`:

```muttrc
# Index format explanation:
# %4C  - Color status indicator
# %Z   - Status flags (N=new, O=old, D=deleted, etc.)
# %{%b %d} - Date (e.g., "Jan 15")
# %-15.15L - From field, 15 chars max
# %?l?%4l&%4c? - Line count or char count
# %s   - Subject

set index_format = "%4C %Z %{%b %d} %-15.15L (%?l?%4l&%4c?) %s"

# Alternative: Show thread information
# set index_format = "%4C %Z %{%b %d} %-15.15L %t %s"
```

### Status Flags

| Flag | Meaning                 |
| ---- | ----------------------- |
| `N`  | New (never viewed)      |
| `O`  | Old (viewed but unread) |
| `U`  | Unread                  |
| `D`  | Deleted                 |
| `F`  | Flagged                 |
| `T`  | Tagged                  |
| `r`  | Replied                 |
| `!`  | Important               |

## 8. Multiple Account Setup

For managing multiple email accounts, create separate account files:

`~/.config/neomutt/accounts/personal`:

```muttrc
# Personal account settings
set imap_user = "personal@gmail.com"
set imap_pass = "$(pass show personal/imap)"
set smtp_url = "smtp://personal@gmail.com@smtp.gmail.com:587/"
set smtp_pass = "$(pass show personal/smtp)"
set folder = "imaps://imap.gmail.com/"
set realname = "Your Name"
set from = "personal@gmail.com"
set signature = "~/.config/neomutt/signatures/personal"
```

`~/.config/neomutt/accounts/work`:

```muttrc
# Work account settings
set imap_user = "you@company.com"
set imap_pass = "$(pass show work/imap)"
set smtp_url = "smtp://you@company.com@smtp.company.com:587/"
set smtp_pass = "$(pass show work/smtp)"
set folder = "imaps://imap.company.com/"
set realname = "Your Name"
set from = "you@company.com"
set signature = "~/.config/neomutt/signatures/work"
```

Add account switching macros to `mailboxes`:

```muttrc
macro index <F1> ":source ~/.config/neomutt/accounts/personal<enter><change-folder>+INBOX" "Switch to Personal"
macro index <F2> ":source ~/.config/neomutt/accounts/work<enter><change-folder>+INBOX" "Switch to Work"
```

## 9. Essential Workflows Summary

### Morning Email Check

```
1. neomutt                          # Launch
2. B                                # Show sidebar
3. <Tab> to INBOX                   # Select inbox
4. j/k to navigate                  # Browse new emails
5. <Enter> to read                  # Open interesting messages
6. r/R to reply                     # Respond as needed
7. d to delete spam                 # Mark unwanted mail
8. $ to sync                        # Apply deletions
```

### Inbox Zero Approach

```
1. l~U                              # Limit to unread only
2. Process each: reply (r), delete (d), or archive (s)
3. l all                            # Remove limit
4. $                                # Sync changes
```

### Quick Search and Act

```
1. /pattern                         # Search for something
2. t                                # Tag the result
3. n                                # Find next match
4. t                                # Tag it too
5. <action>                         # Delete, save, forward, etc.
6. $                                # Sync
```

## 10. What's Next?

You now have a solid foundation for daily NeoMutt usage. In the next tutorial, we'll dive deep into:

- **Pattern modifiers** for precise searching
- **Combining patterns** with logical operators
- **Date-based searches** for finding old emails
- **Performance optimization** with caching

Continue to **[Tutorial 13: Search and Filtering](13_search-filter.md)**.

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
