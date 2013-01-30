var fs = require('fs')
var path = require('path')
var mega = require('../lib/mega')
var argv = require('optimist')
  .demand(1)
  .usage('USAGE: node example/upload [email] [password] <file>')
  .argv

var email = argv._[0]
var password = argv._[1]
var filepath = argv._[2]

if (argv._.length === 1) {
  email = password = undefined
  filepath = argv._[0]
}

var storage = mega(email, password)

storage.on('ready', function() {
  fs.createReadStream(filepath).pipe(
    storage.upload({
      name: path.basename(filepath),
  //    size: fs.statSync(filepath).size
    },
  //  fs.readFileSync(filepath),
    function(err, file) {
      if (err) throw err
      console.log('Uploaded', file.name, file.size + 'B')

      file.link(function(err, link) {
        if (err) throw err
        console.log('Download from:', link)
      })
    })
  )
})
