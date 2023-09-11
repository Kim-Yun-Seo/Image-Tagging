const members = [
  { id: 3,
    name: "도서관",
    loginId: "lib",
    loginPw:"africa",
    url: '',
    tag: ['a place', 'lib', 'book', 'silent'] },
  { id: 3,
    name: "사자",
    loginId: "lion",
    loginPw:"cute",
    url: '',
    tag: ['a lion', 'big', 'mammuls', 'predator'] },
  { id: 3,
    name: "펭귄",
    loginId: "peng",
    loginPw:"cold",
    url: '',
    tag: ['a penguin', 'cute', 'Antarctica', 'swim'] },
  { id: 4,
    name: "홍길동",
    loginId: "a",
    loginPw:"1",
    url: '',
    tag: ['a person', 'hero', 'past', 'brave']  }
]

const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('node:path'),
  fs = require('node:fs'),
  throttle = require('express-throttle-bandwidth')
  bodyParser = require('body-parser');
  url = require('url')

const
  port = process.env.PORT || 3000,
  // folder = path.join('C:/Users/ssamk/reps/Image-Tagging/front/public')
  folder = path.join(__dirname + '/../front/public')
console.log('dirname =' , __dirname + '/../front/public')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.set('view engine', 'ejs')

let test = []
let loginId = ''
let loginPw = ''
let tag = []
const urlArr = []

app.post('/file', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = folder
  form.multiples = true

  form.parse(req, (err, fields, files) => {
    form.on('fileBegin', (formname, file) => {
      test.push(file.originalFilename)
      // console.log('file -----------------------=' , file.path)
      // console.log('file.newFilename =' , file.newFilename)
      // file.newFilename = file.originalFilename
      // console.log('file change =' , file.newFilename)
      // console.log(' file.originalFilename ' , file.originalFilename)
    })
    test = Object.keys(files)
    // console.log('files =' , files[test[0]][0].newFilename)
    fs.rename(`${folder}/${files[test[0]][0].newFilename}`,`${folder}/${files[test[0]][0].originalFilename}`, (err) => {
      if (err) throw err;
      // rename complete!
    })
    // console.log('`folder/${files[test[0]][0].newFilename}` =' , `folder/${files[test[0]][0].newFilename}`)
    // console.log('s-s-s-s-s-s-s =' , files[test[0]][0].filepath)
    console.log('test =' , test)
    res.send(test)
  })
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.send("hello world!!!!!!!!!!!!!!")
})

app.get('/file', (req, res) => {
  res.send(test)
})

app.get('/api/account', (req, res) => {
  // res.send(401)
})

app.get('upload', (req, res) => {
  //
})

app.post('/api/account', (req, res) => {
  loginId = req.body.loginId
  loginPw = req.body.loginPw
  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw)
  members[0].url = req.body.url
  if (req.body.tag) {
    members[0].tag = req.body.tag
  }
  if (member) {
    // console.log('member =' , member)
    res.send(member)
  } else {
    res.send(404)
  }
})