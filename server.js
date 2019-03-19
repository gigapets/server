const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('./db-functions');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

const secret="temporary secret";


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

  server.post('/registration', (req,res) =>{
    let user = req.body;
    if(!user.username || !user.password){
        res.status(422).json({message:'username and password required'})
    }else{
      const hash = bcrypt.hashSync(user.password, 5);
      user.password = hash;
  
      Users.add(user)
      .then(saved =>{
          res.status(201).json(saved)
      }).catch(error => {
        res.status(500).json(error);
      })
    }
    
  });

  function generateToken(user) {
    const payload = {
      subject: user.id, 
      username: user.username
      
    };
    const options = {
      expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
  }

  server.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user); 
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


  
      //to be used when completed with new get endpoint
  function authentication(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          
          res.status(401).json( "Not Authorized" );
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json('no access');
    }
  }

  server.get('/', (req,res)=>{
    Users.findMain()
      .then(users => {
        res.json({ users });
      })
      .catch(err => res.send(err));
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

  const PORT = process.env.PORT || 5000;

  server.listen(5000, () => console.log('=== server on port -->Heroku<-- ===')); 
