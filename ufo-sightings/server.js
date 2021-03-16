const express = require('express');
const sightings = require('./data.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'UFO Sightings API';
app.locals.sightings = sightings;

app.set('port', 3001);
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`);
});

app.get('/sightings', (request, response) => {
  response.status(200).json(app.locals.sightings);
});

app.get('/sightings/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const foundSighting = app.locals.sightings.find(idea => idea.id === id);

  if (!foundSighting) {
    return response.status(404).json({ message: `Sorry, no idea found with an id of ${id}` })
  }

  response.status(200).json(foundSighting);
});

app.post('/sightings', (request, response) => {
  const submittedSighting = request.body;

  for (let requiredParameter of ['title', 'description']) {
    if (!submittedSighting[requiredParameter]) {
      return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.`})
    }
  }

  submittedSighting.id = Date.now();
  app.locals.sightings.push(submittedSighting);

  response.status(201).json(submittedSighting);
});

app.delete('/sightings/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const filteredSightings = app.locals.sightings.filter(idea => idea.id !== id);
  app.locals.sightings = filteredSightings;

  response.status(200).json(app.locals.sightings);
});