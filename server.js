const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

const chants = [
"Trump (clap clap) — USA (clap clap)",
"Trump and USA — Freedom all the way",
"Thank you Trump, thank you Trump",
"Thank you BB, thank you BB",
"Stand tall — USA",
"Trump and USA — (Hey, Hey Hay) ×2",
"U S A — U S A Trump and USA",
"No more terror, No more lies — Let a free Iran rise",
"Who speaks for Iran — King Reza Pahlavi",
"Our revolution leader — King Reza Pahlavi",
"جاوید - شاه",
"پاینده - ایران",
"این آخرین نبرد — پهلوی بر میگرده",
"زنده و جاوید باد سلسله پهلوی",
"داس، چکش، عمامه — پنجاه و هفت تمامه",
"Trump, BB, King Reza Pahlavi",
"قسم به خون یاران - ایستاده ایم تا پایان"
];

let chantIndex = 0;
let repeat = 1;

function broadcastState(){
    io.emit("chantUpdate",{
        chant: chants[chantIndex],
        repeat: repeat,
        total: chants.length,
        index: chantIndex
    });
}

setInterval(()=>{

repeat++;

if(repeat > 10){

repeat = 1;
chantIndex++;

if(chantIndex >= chants.length){
chantIndex = 0;
}

}

broadcastState();

},4000);

io.on("connection",(socket)=>{

socket.emit("chantUpdate",{
    chant: chants[chantIndex],
    repeat: repeat,
    total: chants.length,
    index: chantIndex
});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
}); 
