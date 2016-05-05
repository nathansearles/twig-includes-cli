#! /usr/bin/env node

var fs = require('fs'),
    program = require('commander'),
    twig = require('twig').twig,
    glob = require('glob'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    pkgJSON = require("./package.json");

program
  .version(pkgJSON.version)
  .usage("[directory] --output [directory] --root [directory]")
  .description(pkgJSON.description)
  .option(
    '-o, --output <directory>',
    'define the output directory'
  )
  .option(
    '-r, --root <path>',
    'define the root path [optional]'
  )
  .action(function(input) {

    console.log("Building HTML with Twig...");

    var outputPath = program.output;

    // Check if output path exist
    try {
      var stats = fs.lstatSync(program.output);
      // Directory exist
      if (stats.isDirectory()) {}
    } catch (e) {
      // Make directory
      mkdirp(outputPath, function (err) {
        if (err) console.error(err)
      });
    }

    // Glob options
    var options = {
      ignore: [program.output + '/**', 'node_modules/**', '**/_*/**']
    };

    glob(input, options, function(er, files) {
      files.forEach(function(input) {
        var rootPath = program.root;
        var inputPath = path.dirname(input);
        var inputFile = path.parse(input).base;

        // Is a root path defined?
        if (rootPath) {
          var regex = new RegExp('^' + rootPath + '?');
          var cleanPath = inputPath.replace(regex,'').replace(/^\//,'');
          inputPath = cleanPath;
        }

        // Define output path using output and input filename
        var output = path.normalize(program.output + '/' + inputPath + '/' + inputFile);

        // Create path array and remove empty items
        var pathArray = inputPath.split('/').filter(v=>v!='');

        // Is input within a directory?
        if (pathArray.length > 0) {
          var outputPath = path.normalize(program.output + '/' + pathArray.join('/'));

          try {
            var stats = fs.lstatSync(outputPath);

            // Directory exist?
            if (stats.isDirectory()) {
              twigify(input, output);
            }
          } catch (e) {
            // Make directory
            mkdirp(outputPath, function (err) {
              if (err) console.error(err)
            });

            twigify(input, output);
          }
        } else {
          // input is at root
          twigify(input, output);
        }
      });
    });
  })
  .parse(process.argv);

function twigify(input, output) {
  console.log('Building: %s --> %s', input, output);
  twig({
    base: process.cwd(),
    path: input,
    load: function(template) {
      fs.writeFileSync(output, template.render(), {
        flags: 'w'
      });
    }
  });
}
