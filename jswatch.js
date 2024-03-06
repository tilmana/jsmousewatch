array1 = []

let socket1 = new WebSocket ("ws://localhost:8001");

socket1.onopen = function (event) {
    socket1.send("T:" + btoa(screen.width + " " + screen.height))
}

onmousemove = function(e){
    let xPos = e.clientX;
    let yPos = e.clientY;
    const time = btoa(new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''));
    let message = btoa(time + " " + xPos + " " + yPos);

    socket1.send("M:" + message);
    array1.push("M:" + message)
}

function sendArray(){
    const time = btoa(new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ''));
    socket1.send("A:" + btoa(array1));
    array1 = [];
    array1.push(btoa("T:" + time))
}

setInterval(sendArray, 60000)
