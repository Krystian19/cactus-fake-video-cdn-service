const express = require('express')
const app = express()
const pathLib = require('path')
const fs = require('fs')
const PORT = process.env.SERVER_PORT || 3000;

app.get('/videos/:video', function (req, res) {
  const { video } = req.params;
  const path = pathLib.join(__dirname, 'videos', video) + '.mp4';

  try {
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1
      const chunksize = (end - start) + 1
      const file = fs.createReadStream(path, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`App listening @ port ${PORT}`)
});
