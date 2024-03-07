const time = btoa(new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''));
array1 = []
array1.push(time)

let socket1 = new WebSocket ("ws://localhost:8001");

socket1.onopen = function (event) {
    socket1.send("I:" + btoa(screen.width + " " + screen.height))
}

onmousemove = function(e){
    const time = btoa(new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''));
    let xPos = e.clientX;
    let yPos = e.clientY;
    let message = btoa(time + " " + xPos + " " + yPos);
    socket1.send("M:" + message);
    array1.push(message)
}

function sendArray(){
    const time = btoa(new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''));
    socket1.send("A:" + btoa(array1));
    array1 = [];
    array1.push(time)
}

setInterval(sendArray, 3000)
