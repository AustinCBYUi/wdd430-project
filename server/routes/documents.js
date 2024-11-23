const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Retrieve all documents' });
});

//POST
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Add a new document' });
});

//PUT
router.put('/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Update document with ID ${id}` });
});

//DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Delete document with ID ${id}` });
});

module.exports = router;
