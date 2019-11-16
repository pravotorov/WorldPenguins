const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const factsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const Facts = mongoose.model('Facts', factsSchema);

module.exports = Facts;