---
title: PowerShell
date: 2024-08-17 11:41:46
permalink: /pages/ae9cbd/
categories: 
  - shell
tags: 
  - shell
  - PowerShell
---

## 什么是 PowerShell？

Windows PowerShell 是一种易于使用的命令行 Shell 和脚本环境，用于自动执行基于 Windows 的系统的管理任务。 Windows PowerShell 预安装在 Windows 操作系统的所有新式版本上。

- Windows PowerShell 预安装，版本 5
- PowerShell 跨平台版，版本 7

## 配置文件位置

注意，Windows 自带的旧版本 Windows PowerShell 和自行安装的新版本 PowerShell 二者的配置文件是独立的，位置分别如下：

- Windows PowerShell: `C:\Users\Alowr\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
- PowerShell: `C:\Users\Alowr\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`

## 隐藏启动提示信息

设置路径 `Settings >> Profiles >> PowerShell >> Command line` 在启动可执行文件后面添加参数 `-nologo`。以 PowerShell 为例，设置成：`C:\Program Files\PowerShell\7-preview\pwsh.exe -nologo` 即可。这样，每次开启 PowerShell 时，前面的一堆提示信息就消失不见，清爽很多。

## Useful Terminal Commands

In Windows, we assume that PowerShell v7 has been installed. While with Linux and macOS, the commands in the table below are just listed for comparison purposes. Just note the differences.

| Windows Commands               | Description                                 | Linux + macOS      |
| ------------------------------ | ------------------------------------------- | ------------------ |
| `pwd`or `gl` or `Get-Location` | Print the path of the current directory     |                    |
| `mkdir FOLDERPATH`             | Create a new directory                      |                    |
| `ni FILEPATH`                  | Create a new file                           | `touch FILEPATH`   |
| `clear`                        | Clear the terminal window                   |                    |
| `ls`                           | List the contents of a folder               |                    |
| `ls -al`                       | List all the contents of a folder with info |                    |
| `cat TARGET`                   | Show the content of `TARGET`                |                    |
| `cd FOLDERPATH`                | Change into a directory                     |                    |
| `cd ..`                        | Change into the parent directory            |                    |
| `echo TEXT`                    | Print `TEXT` to the terminal                |                    |
| `echo TEXT > TARGET`           | Print `TEXT` to a file named `TARGET`       |                    |
| `echo TEXT >> TARGET`          | Append `TEXT` to `TARGET`                   |                    |
| `cp SOURCE TARGET`             | Copy `SOURCE` to `TARGET`                   |                    |
| `rni SOURCE TARGET`            | Rename `SOURCE` to `TARGET`                 | `mv SOURCE TARGET` |
| `python PYTHONFILE`            | Run `PYTHONFILE`                            |                    |

Note: Rename or move `SOURCE` to `TARGET` in Linux and MacOS.

To see a full list of PowerShell commands versus aliases, run `Get-Alias | ConvertTo-Html | Out-File aliases.html` and `Invoke-Item aliases.html` to view the file in a browser.

## Configuration

To change your theme, adjust the init script in `C:\Users\Alowr\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`

Example:

```ps1
oh-my-posh init pwsh --config 'C:\Users\Alowr\AppData\Local\Programs\oh-my-posh\themes\jandedobbeleer.omp.json' | Invoke-Expression
```

## Custom configuration

You can export the current theme (default, or set via `--config`) to the format you like (`json`, `yaml`, or `toml`) which can be used to tweak and store as your own custom configuration.

```ps1
oh-my-posh config export --output $env:POSH_THEMES_PATH/.mytheme.omp.json
```

This will create your configuration file in path `C:\Users\Alowr\AppData\Local\Programs\oh-my-posh\themes\.mytheme.omp.json`

In case you want to enable auto-upgrades, you need to edit your configuration file, by adding the following line to your configuration file.

```json
{
  "auto_upgrade": true
}
```

## 查看主题

```ps1
Get-PoshThemes
```

## Learning Paths

1. Learn PowerShell in a Month of Lunches, Fourth Edition

   - Before you begin
   - Meet PowerShell
   - Using the help system
   - Running commands
   - Working with providers
   - The pipeline: Connecting commands
   - Adding commands
   - Objects: Data by another name
   - A practical interlude
   - The pipeline, deeper
   - Formatting: And why it's done on the right
   - Filtering and comparisons
   - Remote control: One-to-one and one-to-many
   - Multitasking with background jobs
   - Working with many objects, one at a time
   - Variables: A place to store your stuff
   - Input and output
   - Sessions: Remote control with less work
   - You call this scripting?
   - Improving your parameterized script
   - Using regular expressions to parse text files
   - Using someone else's script
   - Adding logic and loops
   - Handling errors
   - Debugging techniques
   - Tips, tricks,and techniques
   - Never the end
