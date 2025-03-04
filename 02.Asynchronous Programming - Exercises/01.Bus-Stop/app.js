async function getInfo() {
    const busInput = document.getElementById('stopId');
    const stopNameEl = document.getElementById('stopName');
    const busOuput = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${busInput.value}`

    try {
    const response = await fetch(url);
    const data = await response.json();
    stopNameEl.textContent = data.name;
    // console.log(data);
    busOuput.textContent = '';
    const buses = Object.entries(data.buses)
    
    for (const bus of buses) {
    const [busId, time] = bus;
    const busLi = document.createElement('li');
    busLi.textContent = `Bus ${busId} arrives in ${time} minutes`;
    busOuput.appendChild(busLi);
    }
} catch (err) {
    busOuput.textContent = '';
    stopNameEl.textContent = 'Error';
}
}