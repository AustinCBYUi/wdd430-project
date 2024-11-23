const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Retrieve all message' });
});

//POST
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Add a new message' });
});

//PUT
router.put('/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Update message with ID ${id}` });
});

//DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `Delete message with ID ${id}` });
});

module.exports = router;
