let Sequence = require('../models/sequence');
const mongoose = require('mongoose');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  this.sequenceId = null;
  this.maxDocumentId = 0;
  this.maxMessageId = 0;
  this.maxContactId = 0;

  // Fetch and initialize the sequence data
  Sequence.findOne()
    .then(sequences => {
      if (sequences) {
        this.sequenceId = sequences._id;
        this.maxDocumentId = sequences.maxDocumentId || 0;
        this.maxMessageId = sequences.maxMessageId || 0;
        this.maxContactId = sequences.maxContactId || 0;
      } else {
        console.error('No sequence document found in the database.');
      }
    })
    .catch(err => {
      console.error('Error initializing sequence generator:', err.message);
    });
}


SequenceGenerator.prototype.nextId = async function (collectionType) {
  if (!this.sequenceId) {
    throw new Error('Sequence generator is not initialized yet.');
  }

  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      this.maxDocumentId++;
      updateObject = { maxDocumentId: this.maxDocumentId };
      nextId = this.maxDocumentId;
      break;
    case 'messages':
      this.maxMessageId++;
      updateObject = { maxMessageId: this.maxMessageId };
      nextId = this.maxMessageId;
      break;
    case 'contacts':
      this.maxContactId++;
      updateObject = { maxContactId: this.maxContactId };
      nextId = this.maxContactId;
      break;
    default:
      throw new Error(`Invalid collection type: ${collectionType}`);
  }

  try {
    await Sequence.findOneAndUpdate({ _id: this.sequenceId }, { $set: updateObject });
    return nextId;
  } catch (err) {
    console.error('Error updating sequence in the database:', err.message);
    throw err;
  }
};

module.exports = new SequenceGenerator();
