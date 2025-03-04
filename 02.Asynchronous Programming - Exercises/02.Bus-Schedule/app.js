function solve() {
    const spanResult = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let busId = 'depot';
    let busName = '';

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${busId}`)
            const data = await response.json();
            busId = data.next;
            busName = data.name;
            spanResult.textContent = `Next stop ${busName}`
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch(error) {
            console.error(error)
        }
    }

    function arrive() {
        spanResult.textContent = `Arriving at ${busName}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();