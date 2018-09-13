const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const serveStatic = require('serve-static')
const path = require('path')
const os = require('os')
const pythonShell = require('python-shell')
const qrcode = require('qrcode-terminal')

const ifaces = os.networkInterfaces()
const app = express()
let ipList = []
let port = 80

Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) return
    ipList.push({ interface: ifname, address: iface.address })
  })
})

app.use(morgan('tiny'))
app.use(cors())
app.use(serveStatic(path.join(__dirname, 'dist')))

app.post('/:key', (req, res) => {
  pythonShell.run(__dirname + '/sendKey.py', { args: [req.params.key] }, (err, res) => {
    if (err) throw err
  })
  res.end()
})

app.listen(port, () => {
  console.log(`YOUR IP's:`)
  ipList.forEach(e => {
    console.log(`${e.interface} - ${e.address}`)
    qrcode.generate(`http://${e.address}:${port}`, { small: true })
  })
  console.log('LOGS:')
})
