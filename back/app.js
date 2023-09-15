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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())
app.set('port', port)

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
        return sendInfo[key] = [rand(1,50),rand(1,50)]
      }
      getProperty(key)
      fs.rename(`${folder}/${files[key][0].newFilename}`,`${folder}/${files[key][0].originalFilename}`, (err) => {
        if (err) throw err;
      })
    })
    res.send(sendInfo)
  })
})

app.listen(port, () => {
  console.log(`Upload server running on http://localhost:${port}`)
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
      const date = new Date();
      const hour = date.getHours()
      const min = date.getMinutes()
      const milli = date.getMilliseconds()

      sendInfo = req.body
      fs.writeFile(`tagging_${hour}${min}${milli}.json`, JSON.stringify(sendInfo), function(err) {})
      fs.readFile(`tagging_${hour}${min}${milli}.json`, (err, data) => {
        if (err) throw err;
        // const readFMjson = JSON.parse(data.toString());
        // console.log('readFMjson =' , readFMjson)
      })
      res.send(sendInfo)
    } else {
      count += 1
      res.send(sendInfo)
    }
  } else {
    res.send(404)
  }
})