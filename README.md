# Node.js PostgreSQL CRUD example with Express Rest APIs
We will build Rest Apis that can create, retrieve, update, delete and find Tutorials by title.

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/tutorials`	            get all Tutorials
- GET     `api/tutorials/:id`         get Tutorial by id
- POST    `api/tutorials`             add new Tutorial
- PUT     `api/tutorials/:id`         update Tutorial by id
- DELETE  `api/tutorials/:id`         remove Tutorial by id
- DELETE  `api/tutorials`             remove all Tutorials
- GET     `api/tutorials/published`   find all published Tutorials
- GET     `api/tutorials?title=[kw]`  find all Tutorials which title contains 'kw'

## Project setup
```
npm install
```

### Run
```
node server.js or npm start
```
