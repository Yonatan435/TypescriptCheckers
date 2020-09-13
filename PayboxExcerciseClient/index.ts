const readline = require("readline");
var socket = require('socket.io-client')('http://localhost:3000');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let _playerId: string = Generate();
let _gameName : string;
socket.on('connect', () => {
   
    rl.question("Welcome, Please Enter Command:\n1. Begin Game\n2. Join Game\n", function(commandNumber) {
    if (commandNumber ==1)
    {
        rl.question("Please enter new game name:\n", function(gameName) {
           
            _gameName = gameName;
            socket.emit('InitGame', {_playerId, gameName});
        });
        
    }
    else
    {
        if (commandNumber ==2)
        {
            socket.emit('GetOpenGames');
        }
    }
    });
 
  });
  socket.on('GameInitiated',()=>
  {
      console.log('Game initiated, waiting for a second player...');
  })
  socket.on('GetOpenGamesResult', (parameter) => {
    let gameNames: string = "";
    parameter.forEach(element => {
       gameNames = gameNames.concat('*' + element + '\n');
   });
    rl.question("Please enter game name to join:\n" + gameNames, function(gameName) {
        socket.emit('JoinGame', {_playerId, gameName});

    });
    });
    socket.on('AdvanceTurn', (data) => {
        
        if (data['currentPlayerId'] == _playerId)
        {
            RequestAdvanceTurnInput();
        }
        else
            console.log('Please wait for other player to make a move...\n');
    });
    function RequestAdvanceTurnInput()
    {
        rl.question("Please enter move details (e.g. 0 2 0 4):\n", function(input) {
            try{
            var split = input.split(" ");
            var sourceX: number  = Number(split[0]);
            var sourceY : number  = Number(split[1]);
            var destinationX: number  = Number(split[2]);
            var destinationY: number  = Number(split[3]);
            if (isNaN(sourceX )||isNaN(sourceY )||isNaN(destinationX )||isNaN(destinationY ))
                throw Error;
            socket.emit('MakeAMove', {_playerId, _gameName, sourceX, sourceY, destinationX, destinationY});
            }
            catch(error)
            {
                console.log('input error');
                RequestAdvanceTurnInput();
            }
        });
    }
    socket.on('GameJoined', (data) => {
        console.log('joined game: ' + data['gameName'])
        _gameName = data['gameName'];
    });
rl.on("close", function() {
    console.log("\nThanks for playing!");
    process.exit(0);
});
function Generate() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}