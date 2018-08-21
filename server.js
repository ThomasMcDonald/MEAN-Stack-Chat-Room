var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var http = require('http').Server(app)
var bodyPaser = bodyParser.json()
const fs = require('fs');
var port = process.env.PORT || 8080;

var Group = require('./server/models/group');
var Channel = require('./server/models/channel');
var User = require('./server/models/user');

var Groups = [];
var Channels = [];
var Users = [];

try {
  fs.accessSync('./server/Utils/serverCache.txt');
} catch (e) {
 fs.closeSync(fs.openSync('./server/Utils/serverCache.txt', 'w'));
}

loadserverCache()

app.use(express.static(__dirname + '/dist/Chat-Factory'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);
app.get('/', function(req,res){
    res.sendFile(express.static(__dirname + '/dist/Chat-Factory'));
});

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on %s", port)
})
var io = require('socket.io').listen(server);


app.post('/loginVerify', function (req, res) {
    var realUser = { status: false, id:0 };
    for(var i=0;i<Users.length;i++){
        if(Users[i]._username == req.body.username){
            realUser.status = true;
            realUser.id = i;
            break;
        }
    }
    if(!realUser.status){
        return res.send({statusCode: "UserError", msg: "User doesnt Exist" })
    }
    else{
      return res.send({ user: Users[realUser.id], statusCode: "initiateSocket" })
    }
})

app.post('/createUser', function (req, res) { 
    console.log(req.body)
    for(var i=0;i<Users.length;i++){
        if(Users[i]._username == req.body.username){
              return res.send({statusCode: "UserError", msg: "User Already Exists" })
        }
    }
    Users.push(new User(Users.length+1,req.body.username,req.body.email,req.body.role));
    res.send({statusCode: "User", msg: "User Created" })
    io.emit('newUser',{users: Users})
    fs.writeFile('./server/Utils/serverCache.txt', JSON.stringify({groups: Groups, channels: Channels, users: Users}), (err) => {  
    if (err) throw err;
    console.log('Server saved!');
});
});






io.on('connection', function(socket){
  console.log('a user connected');
  var userID;

  socket.on('loginSetup', function(id){
     userID = id;
     Users[userID]._socket = socket.id;
    socket.emit('loginDetails',{groups: Groups, channels: Channels, users: Users})
  });

  socket.on('disconnect', function(){
      Users[userID]._socket = '';
      io.emit('User Disconnected', {disconnectedUser: Users[userID]._username, users: Users})
      console.log("User Disconnected (Logged out)");
  });
});




//
// Reads in the server data and assigns the contents to the appropriate variables
// Loop over the Users array to remove any socket data that may be present, no socket connections will be present when server is starting up.
// 
function loadserverCache () {
    var data = fs.readFileSync('./server/Utils/serverCache.txt','utf8')
    if(data == '') {
        Users.push(new User(0,"Super","Super@gmail.com","Super"));
        Groups.push(new Group(0,"Meme Group","memes",0));
        return { Users, Groups, Channels };
    }
    
    data = JSON.parse(data)
    Groups = data.groups;
    Channels = data.channels;
    Users = data.users;
      
    for(var i=0;i<Users.length;i++){
        if(Users[i]._socket !== undefined){
            delete Users[i]._socket;
          }
      }
      return { Users, Groups, Channels };
}