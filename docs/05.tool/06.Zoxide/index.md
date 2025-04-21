---
title: Zoxide
date: 2025-02-14 10:21:30
permalink: /pages/2e2e3a/
categories: 
  - tool
tags: 
  - tool
  - Zoxide
---

Zoxide is a smarter `cd` command, inspired by `z` and `autojump`. It remembers which directories you use most frequently, so you can "jump" to them in just a few keystrokes. Zoxide works on all major shells.

## What is Zoxide?

- Smart `cd` replacement that remembers your most-used directories
- Works like `autojump`/`z.sh` but faster and simpler
- Learns as you use it - no manual bookmarking needed

## Installation

For Windows (PowerShell):

```sh
winget install zoxide
```

## Basic Setup

Add this to the end of your shell config file (usually `~/.bashrc` or `~/.zshrc`):

```sh
eval "$(zoxide init bash)"  # For bash
eval "$(zoxide init zsh)"   # For zsh
eval "$(zoxide init fish)"  # For fish
```

## Essential Commands

Same as how you use the `cd` command:

- `z ..`: 返回上一级
- `z`: 返回家目录
- `z -`: 返回上一次进入的目录

See `zoxide --help`

- Go to the highest-ranked directory that contains "foo" in the name:
  `zoxide query foo`

- Go to the highest-ranked directory that contains "foo" and then "bar":
  `zoxide query foo bar`

- Start an interactive directory search (requires fzf):
  `zoxide query --interactive`

- Add a directory or increment its rank:
  `zoxide add path/to/directory`

- Remove a directory from zoxide's database interactively:
  `zoxide remove path/to/directory --interactive`

- Generate shell configuration for command aliases (z, za, zi, zq, zr):
  `zoxide init bash|fish|zsh`

  | Command     | Description        | Example                          |
  | ----------- | ------------------ | -------------------------------- |
  | `z <query>` | Jump to directory  | `z docu` → goes to `~/Documents` |
  | `zi`        | Interactive search | `zi` → fuzzy find directories    |

  Other commands such as `za`, `zq`, `zr` do not work. `zsh: command not found: za`

## Database Location

| OS      | Path             | Example                                     |
| ------- | ---------------- | ------------------------------------------- |
| Windows | `%LOCALAPPDATA%` | `C:\Users\Alice\AppData\Local\zoxide\db.zo` |
