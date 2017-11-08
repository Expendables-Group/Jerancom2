const express = require('express');
// const router = express.Router();
const app = express()
const pg = require('pg');
let http = require('http').Server(app);
var io = require('socket.io')(http);
const nodemailer = require('nodemailer');
const path = require('path');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyparser = require('body-parser')
var multer = require('multer')
var serveStatic = require('serve-static');
var upload = multer({
  dest: './src/assets/uploads/'
}).single('photo');
var port = process.env.PORT||4500;
//var upload = multer({dest: DIR}).single('photo');
// var upload = multer({ storage: storage });
var urlencodedParser = bodyparser.urlencoded({ extended: false })
const connectionString = process.env.DATABASE_URL || 'postgres://jerano:123456@localhost:5434/jerancomdb';

var ccc ;
/***************************************GET USERS FROM DATABASE***************************************************/

/*****************************************************************************************/

app.use(express.static(path.join(__dirname, "./dist")));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(morgan('dev'));
//..................................
var session = require('express-session');

app.use(session({
  secret: "shhh it's a secret",
  resave: false,
  aveUnintinalized: true
}));

// var comparePassword = function (attempedPassword, callback){
//   bcrypt.compare(attempedPassword, this.password, function(err, isMatch){
//      if(err){
//        callback(err, null)
//      }
//      else{
//         callback(null, isMatch)
//      }
//   });
// }

/*************************************** HEADERS ***************************************************/
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin',"*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  //resp.setHeader('Access-Control-Allow-Origin','*') 

  // Pass to next layer of middleware
  next();
});

// app.get('/', (req, res, next) => {
//   res.sendFile(__dirname + './');
  
// });
///////////////////////my profile  with my item and who rent item from me///////////////////////////////////////////////////////

// //app.get("/",(req, res)=>{
//   //res.sendFile('./index.html')
//  //res.sendFile(__dirname + './index.html');
 
//	//res.sendFile(path.join(__dirname + './index.html')) // to send the user the file in the path that is created by joinging __dirname and the path of the index.html in the folders.

//////////////////////////////////********?????????*??*?*?*?*??????////////////////////// */
// app.get('*', function(req, res){
// res.sendFile(__dirname + '/dist/index.html');
// })


app.get('/profiler', (req, res, next) => {
  console.log(' helo babey',ccc);
  // console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    console.log("user loged in = ", ccc)
    const query = client.query('SELECT * FROM items inner join users on users.user_id =items.owner WHERE users.username=($1)', [ccc]);
    // const query = client.query('SELECT username FROM users inner join items on users.user_id =items.renter');
  
    // Stream results back one row at a time
    query.on('row', (row) => {
      
      
      results.push(row);
      console.log("reeeeeeeees on",results)
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      // console.log('$$$$---->>>>>>>>>> ',result);
      console.log("reeeeeeeees end",results)
      
      return res.json(results);
      
      
    });
  });
  
});
///////////////////////////////////////////////////////////////////////////////

app.get('/getrents', (req, res, next) => {
  console.log(' helo babey',ccc);
  // console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    console.log("user loged in = ", ccc)
    const query = client.query('SELECT * FROM items inner join users on users.user_id =items.renter WHERE users.username=($1)', [ccc]);
  
    // Stream results back one row at a time
    query.on('row', (row) => {
      
      
      results.push(row);
      console.log("reeeeeeeees on",results)
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      // console.log('$$$$---->>>>>>>>>> ',result);
      console.log("reeeeeeeees end",results)
      
      return res.json(results);
      
      
    });
  });
  
});

////////////////////////////////////////////////////
app.get('/chatRoom',(req, res) => {
  console.log ('app.get(/)');
  ///app.use('/chatRoom', serveStatic('/src/app/components/chat/chatRoom.component.html'));
     //res.path('./app/components/chat');
     res.sendFile(__dirname + '/src/app/components/chat/chatRoom.component.html');
  //res.redirect('/src/app/components/chat/chatRoom.component.html'); // check if this path right or not
  // window.location= '/src/app/components/chat/chatRoom.component.html'
});
/////////////////////////////////////
/***************************************SAVE LOCATION IN DATABASE***************************************************/

app.post('/loc', urlencodedParser, (req, res, next) => {
  const results = [];
  const data = { longitude: req.body.longitude, latitude: req.body.latitude };
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ sucsess: false, data: err });
    }
    client.query('INSERT INTO users(longitude,latitude) values($1, $2)',
      [data.longitude, data.latitude]);

    console.log(data.longitude)
    const query = client.query('SELECT * FROM users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  })
})
////////////////////////
app.get('/prof', (req, res, next) => {
  console.log('hiii get user',ccc);
  // console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    console.log("user loged in = ", ccc)
    const query = client.query('SELECT * FROM users  WHERE username=($1)', [ccc]);
  
    // Stream results back one row at a time
    query.on('row', (row) => {
      
      
      results.push(row);
      console.log("reeeeeeeees on",results)
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      // console.log('$$$$---->>>>>>>>>> ',result);
      console.log("reeeeeeeees end",results)
      
      return res.json(results);
      
      
    });
  });
  
});
/*************************************** LOGIN ***************************************************/
app.post('/login', (req, res, next) => {
  const results = [];

  console.log("wwwwwwwwloginwwwwwwwwww", req.body.username)

  // Grab data from the URL parameters
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const data = { username: req.body.username, password: req.body.password };


    if (data.username === undefined || data.username === '')
      {res.send('No username specified');}
    //console.log(data.username);

//kjghlkjh;kj;;
    //lkh;lkhlk
    // bcrypt.hash(data.password, saltRounds, function (err, hash) {
    //console.log("hiiiii login password")
    else {
      // SQL Query > Select Data
      var query = client.query('SELECT *  FROM users WHERE username=($1) ', [data.username]);

      //console.log(data.username);


      //console.log("hiiiii password",data.password);
      // Stream results back one row at a time

      //var hash = hash;

      query.on('row', (row) => {
        results.push(row);
        console.log(" results ", row);
        req.session.username = row.username;
       //------------------------
        ccc = req.session.username
         var bool = bcrypt.compareSync(req.body.password, row.password);
      console.log(bool);

      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
         if(bool){
       //res.sendFile(__dirname + './src/app/components/home/home.html');
        return res.send(results);    
       }else{
         return res.json("not correct password man");}
     });
     };
      });
  });

//  });
// });
////////////////////////////////////
app.get('/signup',(req,res)=>{
       res.sendFile(__dirname + '/src/app/components/signup/signup.html');

})


/***************************************SIGN UP***************************************************/

app.post('/user', urlencodedParser, (req, res, next) => {
  //console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { username: req.body.username, password: req.body.password, phone: req.body.phone,  email: req.body.email,longitude: req.body.longitude, latitude: req.body.latitude };
  // Get a Postgres client from the connection pool
   var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password,salt);
  // console.log(hash);
     data.password= hash;
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    //  bcrypt.hash( data.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.

    client.query('INSERT INTO users(username, password,phone,email,longitude,latitude) values($1,$2,$3,$4,$5,$6)',
      [data.username, data.password, data.phone,data.email ,data.longitude, data.latitude]);

    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      // if(data.username.length === 0 ){
      //   console.log("empty ------------")
      // }
      // else{
      //   console.log('have -----------')
      // }
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  });
});
// });
///////////////////////////////////////////////////////////////////////////



app.post('/renter', urlencodedParser, (req, res, next) => {
  //console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { renter: req.body.renter,item_id:req.body.item_id,renter_name:req.body.renter_name};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    //  bcrypt.hash( data.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  
    client.query('UPDATE items SET renter=($1),renter_name=($2) WHERE item_id=($3)',
    [data.renter, data.renter_name ,data.item_id]);

    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      // if(data.username.length === 0 ){
      //   console.log("empty ------------")
      // }
      // else{
      //   console.log('have -----------')
      // }
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  });
});


/***************************************POST ITEM IN DATABASE***************************************************/
app.post('/item', urlencodedParser, (req, res, next) => {
  console.log("----------------------------",req.body.owner_name)
  
  const results = [];
  // Grab data from http request
  const data = {owner_name:req.body.owner_name,longitude:req.body.longitude,latitude:req.body.latitude, owner:req.body.owner,itemname: req.body.itemname, itemtype: req.body.itemtype, info: req.body.info, price: req.body.price,picture:req.body.picture };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(owner_name,longitude,latitude,owner,itemname, itemtype,info,price,picture) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [data.owner_name,data.longitude,data.latitude,data.owner,data.itemname, data.itemtype, data.info, data.price,data.picture]);
    // SQL Query > Select Data
    const query = client.query('SELECT email from users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    console.log("emmmm",results)
    
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'jerancomrbk@gmail.com',
            pass: 'jeran123',
        },
    });
    //results[results.length-1].email
    const mailOptions = {
        from: 'jerancomrbk@gmail.com',
        to:  
        function aya(){
          var str = "";
          for(i=0;i<results.length;i++){
            if(results[i].email !== null){
            str = str + results[i].email +","
          }
        }
        return str;
        }(),
        subject: 'new Items added in the websit',
        html: '<h1> hi customer because we care about you</h1> <p>We send this massege for you to tell you thier is new item added in our websit(jerancom website)  </p> <h2>thanx u :)</h2>',
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("erooooooooooooooooooor////////",error);
        }
        console.log("Message sent:",info );
    });
      return res.send(results);
    });
  });
 });
 
/***************************************UPLOUDE IMAGE IN DATABASE***************************************************/

app.post('/upload', function (req, res, next) {
  
  var path = '';
  var newpath='';
  upload(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
   // No error occured.
     path = req.file.path;
     newpath=path.slice(4,path.length);
     return res.send(newpath); 
 });
  });
  
/***************************************GET USERS FROM DATABASE***************************************************/
app.get('/user', (req, res, next) => {
  console.log('hiiiiiiiii')
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************GET TOOLS FROM DATABASE***************************************************/
app.get('/tools', (req, res, next) => {
  //console.log(req.files)
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items where itemtype=($1) and renter_name IS null' ,['Tools']);
    // Stream results back one row at a time
    query.on('row', (row) => {
      console.log("reeeeeeeees",results)
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      console.log("reeeeeeeees",results)
      
      return res.json(results);
    });
  });
});
/***************************************GET CLOTHES FROM DATABASE***************************************************/

app.get('/clothes', (req, res, next) => {
  //console.log(req.files)
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    //const query = client.query('SELECT * FROM items where itemtype=($1)', ['Clothes']);
    const query = client.query('SELECT * FROM items where itemtype=($1) and renter_name IS null' ,['Clothes']);

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************GET FURNUTURE FROM DATABASE***************************************************/

app.get('/fernuture', (req, res, next) => {
  //console.log(req.files)
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    //const query = client.query('SELECT * FROM items where itemtype=($1)', ['Fernuture']);
    const query = client.query('SELECT * FROM items where itemtype=($1) and renter_name IS null' ,['Fernuture']);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************GET MAINTAINANCE FROM DATABASE***************************************************/

app.get('/maintenance', (req, res, next) => {
  //console.log(req.files)
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items where itemtype=($1) and renter_name IS null', ['Maintenance']);
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************GET OTHERS FROM DATABASE***************************************************/

app.get('/others', (req, res, next) => {
  //console.log(req.files)
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items where itemtype=($1) and renter_name IS null', ['Others']);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************DELETE FROM DATABASE***************************************************/

app.delete('/delete', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const user_id = req.body.user_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM users WHERE user_id=($1)', [user_id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM users');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/***************************************UPDATE DATABASE***************************************************/

app.put('/putt', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const user_id = req.body.user_id;
  // Grab data from http request
  const data = { username: req.body.username, password: req.body.password };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Update Data
    client.query('UPDATE users SET username=($1), password=($2) WHERE user_id=($3)',
      [data.username, data.password, user_id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM users");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
});

/***************************************Socket.io***************************************************/


io.on('connection', (socket) => {
  console.log('connected');
  socket.on('disconnect', function(){
    console.log('disconnected');
  });
   socket.on('giveChat', (message) => {
     console.log("msg not send",message)

    io.emit('newChat', {type:'new-message', text: message , session : ccc });   
  });
});

/***************************************LISTENER***************************************************/

http.listen(port, function () {
  console.log('server started on port 4500');
});

module.exports = app



/******************Aya**************Mazen****************Esraa*****************Maisaa*************************/