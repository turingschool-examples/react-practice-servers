# Veterinarian Appointments API

## Starting the server

Use the command `node vet-appts/server.js` to begin the Ideas API server.

## Endpoints

| Method | Endpoint | Request Body | Sample Response |
--- | --- | --- | ---
`GET` | `'/appointments'` | n/a | `[{id: 1, pet: 'Spot', date: 'April 23', time: '1:00'}]`
`GET` | `'/appointments/:id'` | n/a | `{id: 1, pet: 'Spot', date: 'April 23', time: '1:00'}`
`POST` | `'/appointments'` | `{pet: 'Patrice', date: 'June 4', time: '11:45'}` | `{id: 2, pet: 'Patrice', date: 'June 4', time: '11:45'}`
`DELETE` | `'/appointments/:id'` | n/a | `[{id: 2, pet: 'Something', date: '', time: 'Another'}]`

### Notes

* Assume that users will input the date and time consistently
* Just use text inputs for all the fields
* New appointments do not require an ID from the client
* DELETE requests return an array of all the appointments except the one that was deleted