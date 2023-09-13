let sendInfo = {
  // fileName: [1,2,3,4]
}

const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('node:path'),
  fs = require('node:fs'),
  bodyParser = require('body-parser');
  url = require('url')
  port = process.env.PORT || 3000,
  folder = path.join(__dirname + '/../front/public/', 'img')
  // throttle = require('express-throttle-bandwidth')
  // 이걸 사용하면 이미지 파일 첨부가 오래걸림... 도대체 왜......

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())
app.set('port', port)
// app.use(throttle(1024 * 128))

let imgNameArr = []
let keyArr = ''
let count = 0

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.post('/file', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = folder
  form.multiples = true

  form.parse(req, (err, fields, files) => {
    form.on('fileBegin', (formname, file) => {
      imgNameArr.push(file.originalFilename)
    })
    imgNameArr = Object.keys(files)
    keyArr = Object.keys(files)
    keyArr.forEach((key) => {
      let getProperty = (key) => {
        return sendInfo[key] = [rand(1,50),rand(1,50),rand(1,50)]
        // 이거 나중에 갯수도 random 하게 들어가게
      }
      getProperty(key)
      fs.rename(`${folder}/${files[key][0].newFilename}`,`${folder}/${files[key][0].originalFilename}`, (err) => {
        if (err) throw err;
        // rename complete!
      })
    })
    res.send(sendInfo)
  })
})

app.listen(port, () => {
  console.log(`Upload server running on http://localhost:${port}`)
  // console.log('\nUpload server running on http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.send("hello world")
})

app.get('/file', (req, res) => {
  res.send(sendInfo)
})

app.get('/api/account', (req, res) => {
  //
})

app.post('/api/account', (req, res) => {
  if (sendInfo) {
    if (count > 0) {
      sendInfo = req.body
      console.log('req =' , req.body)
      // 여기에 마지막 최종본이 들어온다.
      res.send(sendInfo)
    } else {
      count += 1
      res.send(sendInfo)
    }
  } else {
    res.send(404)
  }
})