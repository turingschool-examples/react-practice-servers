# Ideas API

## Starting the server

Use the command `node ideas/server.js` to begin the Ideas API server.

## Endpoints

| Method | Endpoint | Request Body | Sample Response |
--- | --- | --- | ---
`GET` | `'/ideas'` | n/a | `[{id: 1, title: '', description: ''}]`
`GET` | `'/ideas/:id'` | n/a | `{id: 1, title: '', description: ''}`
`POST` | `'/ideas'` | `{title: 'Something', description: 'Another'}` | `{id: 2, title: 'Something', description: 'Another'}`
`DELETE` | `'/ideas/:id'` | n/a | `[{id: 2, title: 'Something', description: 'Another'}]`

### Notes

* new ideas do not require an ID from the client
* DELETE requests return an array of all the ideas except the one that was deleted