const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kindsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: {type: String, required: true}
}, {
  timestamps: true,
});

const Kinds = mongoose.model('Kinds', kindsSchema);

module.exports = Kinds;