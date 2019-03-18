const express = require('express');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


server.get('/gigapets', async(req,res)=>{
    try{
      const gigapets = await db('gigapets').select("gigapets.child","gigapets.username","gigapets.meal","gigapets.pet");//all records from table
      res.status(200).json(gigapets);
    }catch(error){
      res.status(500).json(error);
    }
  });

  server.get('/user/:id', async(req,res)=>{
    try{
      const gigapet = await db('gigapet').where({id:req.params.id}).first().select("gigapets.child","gigapets.username","gigapets.meal","gigapets.pet");
      res.status(200).json(gigapet);
    }catch(error){
      res.status(500).json(error);
    }
  });

  server.post('/gigapets',async(req,res)=>{
    try{
      const [id]= await db('gigapets').insert(req.body);
      const gigapet = await db('gigapets').where({ id }).first().select("gigapets.child","gigapets.username","gigapets.meal","gigapets.pet");
      res.status(201).json(gigapet);
    }catch(error){
      res.status(500).json(error);
      }
  });

  server.put('/gigapets/:id',async(req,res)=>{
    try{
      const count = await db('gigapets').where({id:req.params.id}).update(req.body);
      if(count>0){
        const gigapet = await db('gigapets').where({ id:req.params.id}).first();
      res.status(200).json(gigapet)
      }else{
        res.status(404).json('User Not Found')
      }
    }catch(error){}
  });
  
  server.delete('/gigapets/:id',async(req,res)=>{
    try{
      const count = await db('gigapets')
      .where({id:req.params.id})
      .del();
      
      if(count > 0){
      res.status(204).end();
      }else{
        res.status(404).json('User Not Found')
      }
    }catch(error){}
  });

const port = 3000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
