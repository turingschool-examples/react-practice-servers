const express = require('express');
const appointments = require('./data.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.locals.title = 'Appointments API';
app.locals.appointments = appointments;

app.set('port', 3001);
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on ${app.get('port')}!`);
});

app.get('/appointments', (request, response) => {
  response.status(200).json(app.locals.appointments);
});

app.get('/appointments/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const foundAppointment = app.locals.appointments.find(idea => idea.id === id);

  if (!foundAppointment) {
    return response.status(404).json({ message: `Sorry, no idea found with an id of ${id}` })
  }

  response.status(200).json(foundAppointment);
});

app.post('/appointments', (request, response) => {
  const submittedAppointment = request.body;

  for (let requiredParameter of ['pet', 'date', 'time']) {
    if (!submittedAppointment[requiredParameter]) {
      return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.`})
    }
  }

  submittedAppointment.id = Date.now();
  app.locals.appointments.push(submittedAppointment);

  response.status(201).json(submittedAppointment);
});

app.delete('/appointments/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const filteredAppointments = app.locals.appointments.filter(idea => idea.id !== id);
  app.locals.appointments = filteredAppointments;

  response.status(200).json(app.locals.appointments);
});