const express = require('express');
const sequenceGenerator = require('./sequenceGenerator')
const Document = require('../models/document');
const router = express.Router();

router.get('/', async (req, res, next) => {
  Document.find({})
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully.',
        documents: documents,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

//POST
router.post('/', async (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId('documents');

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document saved successfully.',
        document: createdDocument
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});


//PUT
router.put('/:id', async (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found',
          error: { document: 'Document not found' }
        });
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document saved successfully.',
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});


//DELETE
router.delete('/:id', async (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        return res.status(404).json({
          message: 'Document not found',
          error: { document: 'Document not found' }
        });
      }

      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(200).json({
            message: 'Document saved successfully.',
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
