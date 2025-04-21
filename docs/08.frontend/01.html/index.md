---
title: HTML
date: 2024-05-15 22:40:49
permalink: /pages/76b51d/
categories: 
  - frontend
tags: 
  - frontend
  - html
---

## Web 标准组成

> Web 标准不是某一个标准，而是由 W3C 和其他标准化组织制定的一系列标准的集合。主要包括结构（Structure）、表现（Presentation）和行为（Behavior）三个方面。Web 标准提出的最佳体验方案：结构、样式、行为相分离。简单理解：结构写到 HTML 文件中，表现写到 CSS 文件中，行为写到 Javascript 文件中。

| WEB 标准 | 作用                                                                  |
| -------- | --------------------------------------------------------------------- |
| 结构     | 用于对网页元素进行整理和分类，主要包括 XML 和 XHTML 两个部分          |
| 表现     | 用于设置网页元素的版式、颜色、大小等外观样式，主要指的是 CSS          |
| 行为     | 用于对网页模型的定义及交互的编写，主要包括 DOM 和 ECMAScript 两个部分 |

## HTML 概述

HTML（HyperText Markup Language，超文本标记语言）是一种用来告知浏览器如何组织页面的标记语言。HTML 由一系列的元素组成，这些元素可以用来包围或标记不同部分的内容，使其以某种方式呈现或者工作。

- 超文本：它可以加入图片、声音、动画、多媒体等内容（超越文本限制）；也可以从一个文件跳转到另一个文件，与世界各地主机的文件连接（超级链接文本）。
- 标记语言：由标签构成的语言。注意：标记语言不是编程语言。

## HTML 基础语法

- html 文档后缀名 .html 或者 .htm
- html 的标签不区分大小写，但是建议使用小写
- 在开始标签中可以定义属性。属性是由键值对构成，值需要用引号（单双都可）引起来
- 当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格

## HTML 历史线

- 1993 年 6 月：HTML 第一个版本发布
- 1995 年 11 月：HTML2.0
- 1997 年 1 月：HTML3.2（W3C 推荐）
- 1999 年 12 月：HTML4.01（W3C 推荐）
- 2000 年底：XHTML1.0（W3C 推荐）
- 2014 年 10 月：HTML5（W3C 推荐）

## 元素标签

> 整个元素即指开始标签、内容、结束标签三部分组成的整体。元素名不区分大小写，但常使用小写。

- 开始标签：包含元素的名称（本例为 p），被左、右角括号所包围。开头标签标志着元素开始或开始生效的地方。在这个示例中，它在段落文本的开始之前。
- 内容：元素的内容，本例中就是段落的文本。
- 结束标签：与开始标签相似，只是其在元素名之前包含了一个斜杠。这标志着该元素的结束。没有包含关闭标签是一个常见的初学者错误，它可能会产生奇特的结果。

![HTML 元素](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/grumpy-cat-small.png)

## 元素属性

元素也可以有属性（Attribute）：属性包含元素的额外信息，这些信息不会出现在实际的内容中。

- 有些属性是公共的：每一个元素都可以设置，比如 class、id、title 属性。
- 有些属性是元素特有的：不是每一个元素都可以设置，比如 meta 元素的 charset 属性、img 元素的 alt 属性等。

一个属性必须包含如下内容：

- 一个空格：它在属性和元素名称之间。如果一个元素具有多个属性，则每个属性之间必须由空格分隔
- 属性名称：后面跟着一个等于号
- 一个属性值：由一对引号 "" 引起来

![元素属性](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started/grumpy-cat-attribute-small.png)

## HTML 骨架格式

```html
<!DOCTYPE html>
<!-- 页面中最大的标签 根标签 -->
<html lang="en">
  <!-- 头部标签 -->
  <head>
    <!-- 页面字符编码 -->
    <meta charset="UTF-8" />
    <!-- 设置http-equiv -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- 设置视窗、视口 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 标题标签 -->
    <title>Document</title>
  </head>
  <!-- 文档的主体 -->
  <body></body>
</html>
```

## 文档声明

`<!DOCTYPE html>` 表示文档类型，告诉浏览器如何解析网页。文档声明必须放在 HTML 文档的最前面，不能省略，省略了会出现兼容性问题。只有这样浏览器才能按指定的文档类型进行解析。

## html 元素

`<html>` 标签是网页的顶层容器，即标签树结构的顶层节点，也称为根元素（root element），其他元素都是它的子元素。一个网页只能有一个 `<html>` 标签。

W3C 标准建议为 html 元素增加一个 `lang` 属性，表示网页内容默认的语言。

```
<html lang="zh-CN">
<html lang="en">
```

## head 元素

`<head>` 标签是一个容器标签，用于放置网页的元信息。它的内容不会出现在网页上，而是为网页渲染提供额外信息。`<head>` 是 `<html>` 的第一个子元素。如果网页不包含 `<head>`，浏览器会自动创建一个。

head 的子元素一般有下面七个：

- `<meta>`：设置网页的元数据
- `<link>`：连接外部样式表
- `<title>`：设置网页标题
- `<style>`：放置内嵌的样式表
- `<script>`：引入脚本
- `<noscript>`：浏览器不支持脚本时，所要显示的内容
- `<base>`：设置网页内部相对 URL 的计算基准

```html
<!-- 页面中最大的标签：根标签 -->
<html>
  <!-- 头部标签 -->
  <head>
    <!-- 标题标签 -->
    <title></title>
  </head>
  <!-- 文档的主体 -->
  <body></body>
</html>
```

### meta 标签

`<meta>` 标签用于设置或说明网页的元数据，必须放在 `<head>` 里面。一个 `<meta>` 标签就是一项元数据，网页可以有多个 `<meta>`。`<meta>` 标签约定放在 `<head>` 内容的最前面。

不管什么样的网页，一般都可以放置以下两个 `<meta>` 标签。

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page Title</title>
</head>
```

#### charset 属性

charset 属性，用来指定网页的编码方式。该属性非常重要，如果设置得不正确，浏览器可能无法正确解码，就会显示乱码。

```html
<meta charset="utf-8" />
```

utf-8 是一个通用的字符集，它包含了任何人类语言中的大部分的字符，上面代码声明，意味着该 web 页面可以显示任意的语言。

注意：这里声明的编码方式，应该与网页实际的编码方式一致，即声明了 utf-8，网页就应该使用 UTF-8 编码保存。如果这里声明了 utf-8，实际却是使用另一种编码（比如 GB2312），并不会导致浏览器的自动转码，网页可能会显示为乱码。

#### name 属性，content 属性

name 属性表示元数据的名字，content 属性表示元数据的值。它们合在一起使用，就可以为网页指定一项元数据。

```html
<!-- 网页内容的描述 -->
<meta name="description" content="Free Web tutorials on HTML, CSS, XML" />
<!-- 网页内容的关键字 -->
<meta name="keywords" content="HTML, CSS, XML" />
<!-- 网页作者 -->
<meta name="author" content="sbgong" />
<!-- 
  viewport 元素向浏览器提供有关如何控制页面尺寸和缩放的说明
  width=device-width 将页面的宽度设置为跟随设备的屏幕宽度（这将因设备而异）
  initial-scale=1.0 设置浏览器首次加载页面时的初始缩放级别
-->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="application-name" content="Application Name" />
<!-- 为搜索引擎提供编辑器类型 -->
<meta name="generator" content="program" />
<meta name="subject" content="your document's subject" />
<meta name="referrer" content="no-referrer" />
```

#### http-equiv 属性，content 属性

`<meta>` 标签的 http-equiv 属性用来补充 HTTP 回应的头信息字段，如果服务器发回的 HTTP 回应缺少某个字段，就可以用它补充。`<meta>` 标签的 content 属性是对应的字段内容。

```html
<!-- 设置字符集 -->
<meta http-equiv="Content-Type" content="Type=text/html; charset=utf-8" />
<!-- 在HTML5中，简化了字符集的写法 -->
<meta charset="UTF-8" />
<!-- 设置页面自动刷新与跳转：每 30 秒刷新一次文档 -->
<meta http-equiv="refresh" content="30" />
<!-- 页面停留20秒后跳转到 http://website.com -->
<meta http-equiv="refresh" content="30;URL='http://website.com'" />
```

### title 标签

> title 标签用于指定网页的标题，会显示在浏览器窗口的标题栏。

```html
<head>
  <title>网页标题</title>
</head>
```

搜索引擎根据这个标签，显示每个网页的标题。它对于网页在搜索引擎的排序，有很大的影响，应该精心安排，反映网页的主题。

`<title>` 标签的内部，不能再放置其他标签，只能放置无格式的纯文本。

### link 标签

> link 标签可引用外部文件。它是单标签，一个页面允许使用多个 link 标签引用多个外部文件。

| 属性               | 说明                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `href="URL链接"`   | 规定被链接文档的位置                                               |
| `rel`              | 规定当前文档与被链接文档之间的关系；常用取值：stylesheet（样式表） |
| `type="MIME_type"` | 规定被链接文档的 MIME 类型；常用取值：text/css                     |

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

**favicon.ico**：为了进一步丰富你的网站设计，你可以在元数据中添加对自定义图标的引用，它们会在某些场景下显示。最常见的用例为 favicon（为“favorites icon”的缩写，在浏览器的“收藏夹”及“书签”列表中显示）。这个不起眼的图标已经存在很多年了，16 像素的方形图标是第一种类型。

```html
<link rel="icon" type="image/x-icon" href="favicon.ico" />
```

### style 标签

> style 标签用于为 HTML 文档定义样式信息。type 属性是必需的，定义 style 元素的内容。唯一可能的值是 "text/css"

| 属性    | 说明                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| `type`  | 规定样式表的 MIME 类型；常用取值：text/css <Badge text="必需" type="danger" /> |
| `media` | 为不同的媒介类型规定不同的样式                                                 |

```html
<style type="text/css">
  body {
    background-color: yellow;
  }
  p {
    color: blue;
  }
</style>
```

### script 标签

script 标签用于定义客户端脚本，比如 JavaScript。

- 必需的 type 属性规定脚本的 MIME 类型
- script 元素既可以包含脚本语句，也可以通过 src 属性指向外部脚本文件

```html
<script type="text/javascript">
  document.write("Hello World!");
</script>
```

<!-- prettier-ignore-start -->
| script 属性   | 说明                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| `type`        | 指示脚本的 MIME 类型 <Badge text="必需" type="danger" />                                |
| `src`         | 规定外部脚本文件的 URL                                                                  |
| `charset`     | 规定在外部脚本文件中使用的字符编码                                                      |
| `crossorigin` | 将请求模式设置为 HTTP CORS 请求。规定 CORS 请求的模式                                   |\
|               | - `anonymous`：执行跨域请求。不发送凭据                                                 |\
|               | - `use-credentials`：执行跨域请求。发送凭据（例如 cookie、证书、HTTP 基本身份验证）     |
| `async`       | 规定异步执行脚本（仅适用于外部脚本，即仅应在存在 src 属性时使用）                       |
| `defer`       | 规定是否对脚本执行进行延迟，直到页面加载为止（仅适用于外部脚本，即需同时存在 src 属性） |
<!-- prettier-ignore-end -->

```html
<!-- 将在可用时立即异步运行的脚本 -->
<script src="demo_async.js" async></script>
<!-- 在页面加载之前不会运行脚本，即在页面完成解析时执行脚本 -->
<script src="demo_defer.js" defer></script>
<!-- 定义外部脚本文件中所使用的字符编码 -->
<script type="text/javascript" src="script.js" charset="UTF-8"></script>
<!-- 这是指向另一个服务器上的 .js 文件的链接。这里同时使用了 integrity 和 crossorigin 属性 -->
<script
  src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
  crossorigin="anonymous"
></script>
```

### base 标签

`<base>` 标签指定网页内部的所有相对 URL 的计算基准。整张网页只能有一个 `<base>` 标签，而且只能放在 `<head>` 里面。它是单独使用的标签，没有闭合标签。

- href 属性：给出计算的基准网址
- target 属性：如何打开链接

```html
<head>
  <base href="https://www.example.com/files/" target="_blank" />
</head>
```

一旦设置了 `<base>`，就对整个网页都有效。如果要改变某个链接的行为，只能用绝对链接替代相对链接。尤其需要注意锚点，这时锚点也是针对 `<base>` 计算的，而不是针对当前网页的 URL。

| target 属性 | 说明                                         |
| ----------- | -------------------------------------------- |
| `_self`     | 在被点击时的同一框架中打开被链接文档（默认） |
| `_blank`    | 在新窗口中打开被链接文档                     |
| `_parent`   | 在父框架中打开被链接文档                     |
| `_top`      | 在整个窗口中打开被链接文档                   |
| `framename` | 在指定的框架中打开被链接文档                 |

## body 元素

`<body>` 标签是一个容器标签，用于放置网页的主体内容。浏览器显示的页面内容，都放置在它的内部。它是 `<html>` 的第二个子元素，紧跟在 `<head>` 后面。

```html
<html>
  <head>
    <title>网页标题</title>
  </head>
  <body>
    <p>hello world</p>
  </body>
</html>
```
