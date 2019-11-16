const router = require('express').Router();
let Facts = require('../models/facts.model');

router.get('/', async (req, res) => {
  Facts.find()
    .then(facts => res.json(facts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const newFacts = new Facts({
    title,
    description,
  });
  
  newFacts.save()
  .then(() => res.json('Facts added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', async (req, res) => {
    Facts.findById(req.params.id)
    .then(facts => res.json(facts))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;