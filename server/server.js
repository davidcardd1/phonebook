const express = require('express');
const PORT = process.env.PORT || 3001;
const knex = require('./knex/knex.js');
const app = express();
const queries = require('./queries')

//create
app.post('/persons', (req, res) =>{
    queries.insert(req.body).then(data =>{
        resp.send(data);
    });
});
//read
app.get('/persons', (request, response) => {
    queries.getAll().then(results => response.send(results))
});

app.get('/persons/:id', (req, res) => {
    queries.getById(req.params.id).then(data =>{
        res.send(data);
    })
});


//update
app.patch('/persons/:id', (req,res) => {
    queries.update(req.params.id, req.body).then(data => {
        res.status(204).end();
      });
})

//delete
app.delete('/persons/:id', (req,res) => {
    queries.delete(req.params.id).then(data => {
        res.status(204).end();
      });
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});