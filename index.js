
const {    exec
  } = require('child_process')
  
const fs = require('fs')
 
const postCssConfig = `const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './src/**/*.html'
    ],
  
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  });
  
  module.exports = {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
      ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ]
  }`

  const tailwindConfig = `module.exports = {
    prefix: '',
    important: false,
    separator: ':',
  
    theme: {},
    variants: {},
    corePlugins: {},
    plugins: [],
  }
  `

  const postHtmlConfig = `module.exports = {
    plugins: [
      require('posthtml-include')({ root: 'src' }),
      require('posthtml-expressions')({}),
    ],
  }
  `
  
  const html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title>Tailwind CSS + Parcel Boilerplate</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link href="assets/css/style.css" rel="stylesheet" />
  </head>
  
  <body class="font-sans">
    <include src="partials/header.html"></include>
    <content>
      <div class="text-5xl font-bold text-center">
       You're all set!
      </div>
    </content>
  </body>
  
  <script src="assets/js/index.js"></script>
  
  </html>`
  

  const header = `<header class="text-xl font-bold text-center my-10 text-gray-600">
  <div>
      Tailwind CSS + Parcel Starter
  </div>
</header>
  `
  const css = `/* purgecss start ignore */
  @tailwind  base;
  @tailwind  components;
  /* purgecss end ignore */
  
  @tailwind  utilities;
  `
  
  const json = `{
    "scripts": {
        "parcel:dev": "parcel src/index.html",
        "parcel:build": "parcel build src/index.html",
        "clean": "rimraf dist .cache",
        "start": "npm-run-all -s clean parcel:dev",
        "prod": "npm-run-all -s clean parcel:build"
    }
  }
  `

  const js = `console.log('hello');`
  
  const commands = 'npm install --save-Dev tailwindcss parcel-bundler @fullhuman/postcss-purgecss autoprefixer npm-run-all postcss posthtml-expressions posthtml-include posthtml-load-config rimraf'
  
  function dependencies() {
    console.log('📦  Installing dependencies from NPM... this will take a bit.');
    console.log('✌ Configuring files in the meantime.');
  
    exec(commands, (err) => {
      if (err) {
        throw err
      } else {
        console.log('✅  All done! \n');
      }
    })
  }
  
  function postcss() {
    console.log(`  ↳ Creating PostCSS config...`);
  
    fs.writeFile('postcss.config.js', postCssConfig, (err) => {
      if (err) {
        throw err
      } else {
        return console.log('      ✅  postcss.config.js\n')
      }
    })
  }


  function tailwind() {
    console.log(`  ↳ Creating Tailwind config...`);
  
    fs.writeFile('tailwind.config.js', tailwindConfig, (err) => {
      if (err) {
        throw err
      } else {
        return console.log('      ✅  tailwind.config.js\n')
      }
    })
  }

  function posthtml() {
    console.log(`  ↳ Creating PostHtml config...`);
  
    fs.writeFile('posthtml.config.js', postHtmlConfig, (err) => {
      if (err) {
        throw err
      } else {
        return console.log('      ✅  posthtml.config.js\n')
      }
    })
  }
  
  function treeHTML() {
    console.log(`  ↳ Creating index.html...`);
  
    fs.writeFile('src/index.html', html, (err) => {
      if (err) {
        throw err
      } else {
        console.log('      ✅  src/index.html\n')
      }
    })

    fs.writeFile('src/partials/header.html', header, (err) => {
        if (err) {
          throw err
        } else {
          console.log('      ✅  src/partials/header.html\n')
        }
      })
  
  }
  
  function treeDirs() {
    console.log(`  ↳ Creating file structure...`);
  
    fs.mkdir('src/partials', {
        recursive: true
      }, err => {
        if (err) {
          throw err
        } else {
          console.log('      ✅  src/partials\n')
        }
      })

    fs.mkdir('src/assets/css', {
      recursive: true
    }, err => {
      if (err) {
        throw err
      } else {
        console.log('      ✅  src/assets/css\n')
      }
    })
  
    fs.mkdir('src/assets/js', {
      recursive: true
    }, err => {
      if (err) {
        throw err
      } else {
        console.log('      ✅  src/assets/js\n')
      }
    })
  }
  
  function treeCSS() {
    console.log(`  ↳ Creating style.css...`);
  
    fs.writeFile('src/assets/css/style.css', css, (err) => {
      if (err) {
        throw err
      } else {
        console.log('      ✅  style.css\n')
      }
    })
  }
  
  function treeJS() {
    console.log('  ↳ Creating index.js...');
  
    fs.writeFile('src/assets/js/index.js', js, (err) => {
      if (err) {
        throw err
      } else {}
  
      console.log('      ✅  index.js\n')
    })
  }
  
  function treePkg() {
    console.log('  ↳ Creating package.json...');
  
    fs.writeFile('package.json', json, (err) => {
      if (err) {
        throw err
      } else {}
  
      console.log('      ✅  package.json\n')
    })
  }
  
  async function install() {
    treePkg()
  
    await setTimeout(async () => {
      dependencies()
    }, 0)
  
    await setTimeout(async () => {
      postcss()
    }, 10)

    await setTimeout(async () => {
        tailwind()
      }, 10)

    await setTimeout(async () => {
        posthtml()
      }, 10)
  
    await setTimeout(async () => {
      treeDirs()
    }, 250)
  
    await setTimeout(async () => {
      treeHTML()
    }, 500)
  
    await setTimeout(async () => {
      treeCSS()
    }, 750)
  
    await setTimeout(async () => {
      treeJS()
    }, 1000)
  
    await setTimeout(async () => {
      treePkg()
    }, 1250)
  
    await setTimeout(async () => {
      console.log('Waiting for dependencies to finish installing...');
    }, 1500)
  
  }
  
  install()