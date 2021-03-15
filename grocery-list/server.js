const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Grocery List API';
app.locals.items = [];

app.set('port', 3001);
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`);
});

app.get('/items', (request, response) => {
  response.status(200).json(app.locals.items);
});

app.get('/items/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const foundItem = app.locals.items.find(item => item.id === id);

  if (!foundItem) {
    return response.status(404).json({ message: `Sorry, no item found with an id of ${id}` })
  }

  response.status(200).json(foundItem);
});

app.post('/items', (request, response) => {
  const submittedItem = request.body;

  for (let requiredParameter of ['title', 'description']) {
    if (!submittedItem[requiredParameter]) {
      return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.`})
    }
  }

  submittedItem.id = Date.now();
  app.locals.items.push(submittedItem);

  response.status(201).json(submittedItem);
});

app.delete('/items/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const filtereditems = app.locals.items.filter(item => item.id !== id);
  app.locals.items = filtereditems;

  response.status(200).json(app.locals.items);
});