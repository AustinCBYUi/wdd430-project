const express = require('express');
const Contact = require('../models/contact');
const SequenceGenerator = require('./SequenceGenerator');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).populate('group');
    res.status(200).json({
      message: 'Contacts fetched successfully.',
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});


//POST
router.post('/', async (req, res, next) => {
  try {
    const maxContactId = await Contact.findOne({ id: req.params.id });
    const contact = new Contact({
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group,
    });

    const createdContact = await contact.save();
    res.status(201).json({
      message: 'Contact saved successfully.',
      contact: createdContact
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});


//PUT
router.put('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    if (!contact) {
      return res.status(404).json({
        message: 'Document not found',
      });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    await Contact.updateOne({ id: req.params.id }, contact);
    res.status(200).json({
      message: 'Contact saved successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});


//DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    if (!contact) {
      return res.status(404).json({
        message: 'Document not found',
      });
    }

    await Contact.deleteOne({ id: req.params.id });
    res.status(200).json({
      message: 'Contact deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

module.exports = router;
