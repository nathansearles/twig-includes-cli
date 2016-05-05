# twig-includes-cli

A simple CLI tool utilizing Twig's includes and extends. Useful for building static websites with NPM build scripts.

## Install

```
$ npm install twig-includes-cli
```

## Usage

```
$ twig 'source/**/*.html' --root source/ --output build/
```

### Options

```
Usage: twig [directory] --output [directory] --root [directory]

A simple CLI tool utilizing Twigs includes and extends.

Options:

-h, --help                output usage information
-V, --version             output the version number
-o, --output <directory>  define the output directory
-r, --root <path>         define the root path [optional]
```

## Examples

Here are some example calls using *source/index.html* and *_includes/header.html* as example files.

**Basic Twig include**

Within *source/index.html*

```
<!doctype html>
<html>
  <head>
  </head>
  <body>
    {% include '_includes/header.html' with {'page': 'home'} %}
  </body>
</html>
```

Within *_includes/header.html*

```
 <h1>Header template from page named <em>{{ page }}</em></h1>
```

CLI usage

```
$ twig 'source/**/*.html' --root source/ -output build/
```

This will find all .html files within 'source/', uses Twig to render includes, and output all .html files to 'build/'.

**Basic Twig Extends**

Within *layout.html*

```
<!DOCTYPE html>
<html>
<head>
    {% block head %}
    <title>{% block title %}{% endblock %}</title>
    {% endblock %}
</head>
<body>
    <div id="content">{% block content %}{% endblock %}</div>
    <div id="footer">
        {% block footer %} &copy; Copyright 2016 {% endblock %}
    </div>
</body>
</html>
```

Within *index.html*

```
  {% extends "layout.html" %}
  {% block title %}Homepage{% endblock %}
  {% block head %}
  {{ parent() }}
  {% endblock %}
  {% block content %}
  <h1>Homepage</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  {% endblock %}
```

CLI usage

```
$ twig index.html -output build/
```

## More information

For more information check out the [Twig Documentation](http://twig.sensiolabs.org/documentation).

## Issues

Find a bug? Hit up [Issues](https://github.com/nathansearles/twig-includes-cli/issues) to report it.

### Copyright (c) 2016 Nathan Searles

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
