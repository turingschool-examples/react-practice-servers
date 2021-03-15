# Grocery List API

## Starting the server

Use the command `node grocery-list/server.js` to begin the Ideas API server.

## Endpoints

| Method | Endpoint | Request Body | Sample Response |
--- | --- | --- | ---
`GET` | `'/item'` | n/a | `[{id: 1, name: 'Tortillas', amount: '1 bag'}, ...]`
`GET` | `'/item/:id'` | n/a | `{id: 2, name: 'Cotija cheese', amount: '1 wheel'}`
`POST` | `'/item'` | `{name: 'Lime', amount: '2 pieces'}` | `{id: 3, name: 'Lime', amount: '2 pieces'}`
`DELETE` | `'/item/:id'` | n/a | `[{id: 2, name: 'Cotija cheese', amount: '1 wheel'}, ...]`

### Notes

* There are no items in the list when the app begins
* new items do not require an ID from the client
* DELETE requests return an array of all the items except the one that was deleted