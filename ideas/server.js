const express = require('express');
const ideas = require('./data.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Ideas API';
app.locals.ideas = ideas;

app.set('port', 3001);
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`);
});

app.get('/ideas', (request, response) => {
  response.status(200).json(app.locals.ideas);
});

app.get('/ideas/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const foundIdea = app.locals.ideas.find(idea => idea.id === id);

  if (!foundIdea) {
    return response.status(404).json({ message: `Sorry, no idea found with an id of ${id}` })
  }

  response.status(200).json(foundIdea);
});

app.post('/ideas', (request, response) => {
  const submittedIdea = request.body;

  for (let requiredParameter of ['title', 'description']) {
    if (!submittedIdea[requiredParameter]) {
      return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.`})
    }
  }

  submittedIdea.id = Date.now();
  app.locals.ideas.push(submittedIdea);

  response.status(201).json(submittedIdea);
});

app.delete('/ideas/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const filteredIdeas = app.locals.ideas.filter(idea => idea.id !== id);
  app.locals.ideas = filteredIdeas;

  response.status(200).json(app.locals.ideas);
});