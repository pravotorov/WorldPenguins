const router = require('express').Router();
const Kinds = require('../models/kinds.model');

router.get('/', async (req, res) => {
  Kinds.find()
    .then(kinds => res.json(kinds))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;

  const newKinds = new Kinds({
    title,
    description,
    img
  });

  newKinds.save()
  .then(() => res.json('Kinds added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', async (req, res) => {
  Kinds.findById(req.params.id)
    .then(kinds => res.json(kinds))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', async (req, res) => {
  Kinds.findByIdAndRemove(req.params.id)
    .then(kinds => res.json(kinds))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;