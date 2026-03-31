---
date: 2026-02-26
title: 'NeoMutt Tutorial 13: Search and Filtering'
permalink: /pages/neomutt-search-filter
categories:
  - Tool
  - CLI
  - NeoMutt
---

Master NeoMutt's powerful search and filtering capabilities to quickly find and manage emails. Learn pattern modifiers, logical operators, and performance optimization techniques.

<!-- more -->

## Overview

In this tutorial, you will:

1. Understand the difference between search and limit
2. Learn all pattern modifiers (~s, ~f, ~b, ~d, etc.)
3. Combine patterns with logical operators
4. Search by date ranges
5. Optimize search performance with caching
6. Create useful search macros

## 1. Search vs. Limit

NeoMutt provides two primary ways to find messages:

### Search (`/`)

**Purpose**: Navigate to matching messages while keeping all messages visible.

| Key | Command         | Action                                |
| --- | --------------- | ------------------------------------- |
| `/` | search          | Jump to **next** matching message     |
| `\` | search-opposite | Jump to **previous** matching message |
| `n` | next-match      | Find next match of last pattern       |
| `N` | previous-match  | Find previous match of last pattern   |

**Use case**: "Find the next email from John in my current view"

```
/ ~f john
```

### Limit (`l`)

**Purpose**: Filter the view to show **only** matching messages.

| Key | Command | Action                              |
| --- | ------- | ----------------------------------- |
| `l` | limit   | Show only messages matching pattern |
| `L` | limit   | Limit (alternative binding)         |

**Use case**: "Show me only unread emails from this week"

```
l ~U ~d >1w
```

**To remove a limit:**

- Press `l` and type `~A` (matches all)
- Press `l` and enter an empty pattern

### When to Use Each

| Scenario         | Use          | Example                                |
| ---------------- | ------------ | -------------------------------------- |
| Quick navigation | Search (`/`) | Find next attachment                   |
| Bulk operations  | Limit (`l`)  | Delete all spam from a sender          |
| Focused work     | Limit (`l`)  | Work only on unread messages           |
| Context needed   | Search (`/`) | Find message while seeing surroundings |

## 2. Pattern Modifiers

All search patterns use a tilde (`~`) prefix followed by a letter indicating what to search.

### Header Patterns

| Pattern              | Searches        | Example               |
| -------------------- | --------------- | --------------------- |
| `~s "expr"`          | Subject         | `/~s "invoice"`       |
| `~f "expr"`          | From (sender)   | `l~f "amazon"`        |
| `~t "expr"`          | To (recipient)  | `/~t "support@"`      |
| `~c "expr"`          | Cc/Bcc          | `l~c "team"`          |
| `~h "Header: value"` | Specific header | `l~h 'X-Priority: 1'` |
| `~L "expr"`          | Mailing list    | `/~L "notifications"` |

### Body Patterns

| Pattern     | Searches                        | Example                  |
| ----------- | ------------------------------- | ------------------------ |
| `~b "expr"` | Message body                    | `/~b "meeting tomorrow"` |
| `~B "expr"` | Entire message (headers + body) | `l~B "project-alpha"`    |

> **Performance Note**: Body searches (`~b`, `~B`) are slower than header searches. Enable caching (see section 5) for better performance.

### Status Patterns

| Pattern | Description                      | Example |
| ------- | -------------------------------- | ------- |
| `~N`    | New messages (never viewed)      | `l~N`   |
| `~U`    | Unread messages                  | `l~U`   |
| `~O`    | Old messages (viewed but unread) | `l~O`   |
| `~D`    | Deleted messages                 | `l~D`   |
| `~F`    | Flagged messages                 | `/~F`   |
| `~T`    | Tagged messages                  | `l~T`   |
| `~r`    | Replied messages                 | `l~r`   |
| `~Q`    | Queued/Postponed (drafts)        | `l~Q`   |
| `~a`    | Has attachments                  | `l~a`   |

### Date Patterns

| Pattern      | Description                | Example     |
| ------------ | -------------------------- | ----------- |
| `~d [range]` | Messages in date range     | `l~d ">2d"` |
| `~R [range]` | Messages received in range | `l~R "<1m"` |
| `~S [range]` | Messages sent in range     | `l~S ">1y"` |

See section 4 for detailed date range syntax.

### Address Patterns

| Pattern | Description                     | Example |
| ------- | ------------------------------- | ------- |
| `~p`    | Messages where you are in To/Cc | `l~p`   |
| `~P`    | Messages where you sent (From)  | `l~P`   |
| `~v`    | Messages where you are in To    | `l~v`   |
| `~V`    | Messages where you are in Cc    | `l~V`   |

### Size Patterns

| Pattern      | Description               | Example      |
| ------------ | ------------------------- | ------------ |
| `~z [range]` | Message size in bytes     | `l~z ">1M"`  |
| `~Z [range]` | Message size in kilobytes | `l~Z "<100"` |

## 3. Combining Patterns

Use logical operators to create complex search queries.

### Logical Operators

| Operator       | Meaning  | Example                     |
| -------------- | -------- | --------------------------- |
| (space) or `&` | AND      | `l~s report ~f boss`        |
| `\|`           | OR       | `/~s bug \| ~s error`       |
| `!`            | NOT      | `l~U !~f newsletter`        |
| `()`           | Grouping | `l (~f john \| ~f jane) ~U` |

### Operator Precedence

1. `!` (NOT) - highest precedence
2. (space) or `&` (AND)
3. `\|` (OR) - lowest precedence

**Use parentheses to override default precedence:**

```muttrc
# Find unread emails from John OR Jane
l ~U (~f "John" | ~f "Jane")

# Find emails with attachments NOT from spam
l ~a !~f "spam@"

# Complex: Unread emails about "project" from team, excluding newsletters
l ~U & ~s "project" & (~f "team@" | ~c "team@") & !~L "newsletter"
```

### Practical Examples

**Find all unread work emails from this week:**

```
l ~U ~d >1w ~f "@company.com"
```

**Find emails with invoices that haven't been replied to:**

```
l ~s "invoice" ~a !~r
```

**Find flagged messages from a specific person:**

```
/ ~F ~f "manager@"
```

**Find all messages in a thread about a topic:**

```
l ~s "budget meeting"
```

## 4. Date Range Syntax

The `~d` pattern supports flexible date ranges.

### Basic Format

```
~d [operator][number][unit]
```

### Operators

| Operator | Meaning             |
| -------- | ------------------- |
| `>`      | After (newer than)  |
| `<`      | Before (older than) |
| (none)   | On (exact date)     |

### Units

| Unit | Meaning |
| ---- | ------- |
| `d`  | Days    |
| `w`  | Weeks   |
| `m`  | Months  |
| `y`  | Years   |

### Examples

| Pattern                    | Description                    |
| -------------------------- | ------------------------------ |
| `~d >2d`                   | Newer than 2 days ago          |
| `~d <1w`                   | Older than 1 week ago          |
| `~d >1m`                   | Newer than 1 month ago         |
| `~d <1y`                   | Older than 1 year ago          |
| `~d 15/01/2025`            | On January 15, 2025            |
| `~d 01/01/2025-31/01/2025` | Between Jan 1 and Jan 31, 2025 |
| `~d >01/01/2025`           | After January 1, 2025          |
| `~d <01/01/2025`           | Before January 1, 2025         |

### Date Format Variations

NeoMutt accepts multiple date formats:

```
~d DD/MM/YYYY        # 15/01/2025
~d MM/DD/YYYY        # 01/15/2025 (US format)
~d YYYY-MM-DD        # 2025-01-15 (ISO format)
```

### Practical Date Searches

**Today's emails:**

```
l ~d >0d
```

**This week:**

```
l ~d >7d
```

**Last month:**

```
l ~d >1m <2m
```

**Older than 6 months (for archiving):**

```
l ~d <6m
```

**Year-to-date:**

```
l ~d >01/01/2025
```

## 5. Performance Optimization

Body searches can be slow, especially over IMAP. Caching dramatically improves performance.

### Enable Message Caching

Add to `~/.config/neomutt/options`:

```muttrc
# Cache headers for faster searching
set header_cache = "~/.cache/neomutt/headers"

# Cache message bodies for faster body searches
set message_cachedir = "~/.cache/neomutt/bodies"
```

### Create Cache Directories

```bash
mkdir -p ~/.cache/neomutt/{headers,bodies}
chmod 700 ~/.cache/neomutt
```

### How Caching Works

1. **First search**: NeoMutt downloads and caches message bodies (slow)
2. **Subsequent searches**: NeoMutt searches the local cache (fast)

### Cache Maintenance

**Clear cache if needed:**

```bash
rm -rf ~/.cache/neomutt/headers/*
rm -rf ~/.cache/neomutt/bodies/*
```

**Cache size management:**
NeoMutt automatically manages cache size, but you can manually prune old caches periodically.

### Search Performance Tips

1. **Use specific patterns**: `~s "invoice"` is faster than `~B "invoice"`
2. **Limit scope first**: Use `l~f sender` then search within results
3. **Cache enabled**: Always enable caching for IMAP accounts
4. **Avoid `~B` when possible**: Search specific fields instead

## 6. Quote Handling in Patterns

Understanding when to use quotes in search patterns.

### No Quotes Needed

When your search term has **no spaces**:

```muttrc
/~s invoice          # Single word
l~f ^user@           # Regex without spaces
l~U&~a               # Combined status patterns
```

### Single Quotes (Recommended)

For **literal phrases** with spaces:

```muttrc
l~b 'quarterly report'           # Exact phrase
/~f 'John Smith <john@example>'  # Full name + email
```

### Double Quotes

When you need **variable expansion**:

```muttrc
l~s "Invoice from $USER"         # $USER is expanded
```

> **Best Practice**: Use single quotes by default. Use double quotes only when you need variable or command substitution.

## 7. Regular Expressions

All search patterns support POSIX Extended Regular Expressions (ERE).

### Common Regex Patterns

| Pattern | Meaning         | Example                                         |
| ------- | --------------- | ----------------------------------------------- |
| `^`     | Start of line   | `/~s "^Re:"` (subjects starting with "Re:")     |
| `$`     | End of line     | `/~s "report$"` (subjects ending with "report") |
| `.`     | Any character   | `/~b "v1.0"` (matches v1.0, v120, etc.)         |
| `\.`    | Literal period  | `/~b "v1\.0"` (matches only v1.0)               |
| `*`     | Zero or more    | `/~f "support.*"`                               |
| `+`     | One or more     | `/~s "error+"`                                  |
| `?`     | Zero or one     | `/~s "colou?r"` (matches color or colour)       |
| `[]`    | Character class | `/~f "[ae]@company"`                            |
| `()`    | Grouping        | `/~s "(bug \| error)"`                          |

### Regex Examples

**Subjects starting with "Fwd:":**

```
/~s "^Fwd:"
```

**Emails containing version numbers:**

```
/~b "v[0-9]+\.[0-9]+\.[0-9]+"
```

**From specific domain or subdomain:**

```
l~f "@(.+\.)?company\.com$"
```

## 8. Useful Search Macros

Add these to `~/.config/neomutt/mappings`:

```muttrc
# =============================================================================
# Search Macros
# =============================================================================

# Quick limit: Unread only
macro index lu "<limit>~U\n" "Limit to unread"

# Quick limit: This week
macro index lw "<limit>~d >7d\n" "Limit to this week"

# Quick limit: This month
macro index lm "<limit>~d >1m\n" "Limit to this month"

# Quick limit: With attachments
macro index la "<limit>~a\n" "Limit to messages with attachments"

# Quick limit: From specific sender (prompts for input)
macro index lf "<limit>~f " "Limit by sender"

# Quick limit: By subject (prompts for input)
macro index ls "<limit>~s " "Limit by subject"

# Show all messages (remove any limit)
macro index lA "<limit>~A\n" "Show all messages"

# Find next unread from current sender
macro index nu "<limit>~U ~f " "Next unread from sender"

# Search body for term (with caching)
macro index sb "<search>~b " "Search body"

# Find all drafts (postponed messages)
macro index qd "<limit>~Q\n" "Show drafts"

# Find flagged messages
macro index qf "<limit>~F\n" "Show flagged"

# Find messages where I'm in To field
macro index qp "<limit>~v\n" "Messages addressed to me"

# Complex: Unread, to me, this week
macro index complex "<limit>~U & ~v & ~d >7d\n" "Unread to me this week"
```

## 9. Practical Workflows

### Inbox Triage

```
1. l~U                    # Limit to unread
2. Process each message:
   - r to reply
   - d to delete
   - s to save/archive
3. l~A                    # Remove limit
4. $                      # Sync
```

### Finding Old Conversations

```
1. l~d <6m                # Older than 6 months
2. /~s "project name"     # Search within old messages
3. <Enter> to read
```

### Bulk Delete Spam

```
1. l~f "spam-sender@"     # Limit to spam sender
2. *                      # Tag all matching
3. d                      # Delete tagged
4. l~A                    # Remove limit
5. $                      # Sync
```

### Archive Old Messages

```
1. l~d <1y                # Messages older than 1 year
2. *                      # Tag all
3. s +Archive<Enter>      # Save to Archive folder
4. l~A                    # Remove limit
5. $                      # Sync deletions
```

### Find Unanswered Emails

```
1. l~U !~r                # Unread and not replied
2. ~v                     # Also where I'm in To field
3. Process as needed
```

## 10. Troubleshooting

### Search Returns No Results

**Possible causes:**

- Pattern syntax error
- Wrong field (searching subject when term is in body)
- Messages don't match criteria

**Solutions:**

- Try `~B` for whole-message search
- Check for typos in search term
- Use broader pattern first, then narrow down

### Body Search is Very Slow

**Cause**: Searching uncached message bodies over IMAP

**Solution:**

```muttrc
set message_cachedir = "~/.cache/neomutt/bodies"
```

### Pattern with Spaces Not Working

**Cause**: Spaces interpreted as AND operator

**Solution**: Use quotes

```
# Wrong:
l~b quarterly report

# Correct:
l~b 'quarterly report'
```

### Case Sensitivity Issues

NeoMutt searches are generally case-insensitive by default. For case-sensitive searches, use explicit regex:

```
# Case-sensitive subject search
/~s "^IMPORTANT:"
```

## 11. What's Next?

You've now mastered searching and filtering in NeoMutt. In the next tutorial, we'll cover:

- **Viewing attachments** (HTML, PDF, images)
- **mailcap configuration** for MIME types
- **Adding attachments** efficiently with fzf
- **Multi-file attachment workflows**

Continue to **[Tutorial 14: Attachments](14_attachments.md)**.

---

**Series Navigation**: [Overview](10_overview.md) → [11: Basic IMAP](11_basic-imap.md) → [12: Keymaps](12_keymaps-usage.md) → [13: Search](13_search-filter.md) → [14: Attachments](14_attachments.md) → [15: Local Mirror](15_local-mirror.md)
