const express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

const router = express.Router();

router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully.',
        messages: messages,
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
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId('messages');

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message saved successfully.',
        messages: createdMessage
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
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      if (!message) {
        return res.status(404).json({
          message: 'Document not found',
          error: { document: 'Document not found' }
        });
      }

      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(201).json({
            message: 'Message saved successfully.',
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
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
    if (!message) {
      return res.status(404).json({
        message: 'Document not found',
        error: { document: 'Document not found' }
      });
    }

    Message.deleteOne({ id: req.params.id })
      .then(result => {
        res.status(201).json({
          message: 'Message saved successfully.',
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
