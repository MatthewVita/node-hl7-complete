const express = require('express')
const app = express()

const NodeHL7Complete = require('node-hl7-complete')
const nodeHL7Instance = new NodeHL7Complete()

// Latest Express middleware approach
app.use(express.json())
app.use(express.text())

app.post('/hl7ToJson', (req, res) => {
    nodeHL7Instance.hl7ToJs(req.body, (err, data) => {
      if (err) { return res.status(400).send(err) }

      return res.status(200).json(data)
    });
});

app.post('/jsonToHl7/:type', (req, res) => {
  nodeHL7Instance.jsToHl7(req.params.type, req.body, (err, data) => {
      if (err) { return res.status(400).send(err) }

      return res.status(200).send(data)
  })
});

const port = 8000

app.listen(port)
