const express = require('express')
const app = express()

const NodeHL7Complete = require('node-hl7-complete') // Obviously point to internals
const nodeHL7Instance = new NodeHL7Complete()

// TODO: This is crazy! So many API changes. I'm using 'body' for
//       everything (for now). May be best to look for a totally 
//       new middleware for this...
const bodyParser = require('body-parser')
app.use(bodyParser.text());

app.post('/hl7ToJson', (req, res) => {
    nodeHL7Instance.hl7ToJs(req.body, (err, data) => {
      if (err) { return res.status(400).send(err) }

      return res.status(200).json(data)
    });
});

app.post('/jsonToHl7/:type', (req, res) => {
  nodeHL7Instance.jsToHl7(req.params.type, JSON.parse(req.body), (err, data) => {
      if (err) { return res.status(400).send(err) }

      return res.status(200).send(data)
  })
});

const port = 8000
const host = 'localhost'
app.listen(port, host)