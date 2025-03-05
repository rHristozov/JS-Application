async function solution() {
    const mainEl = document.getElementById('main');

    const url = 'http://localhost:3030/jsonstore/advanced/articles'
    const response = await fetch(`${url}/list`);
    const data = await response.json();

    for (const {_id, title} of data) {
        const divAccordioun = document.createElement('div');
        divAccordioun.setAttribute('class', 'accordion');

        const response = await fetch(`${url}/details/${_id}`);
        const data = await response.json();
        
        divAccordioun.innerHTML = `
            <div class="head">
                <span>${title}</span>
                <button class="button" id="${_id}">More</button>
                <div class="extra">
                <p>${data.content}</p>
                </div>
            </div>`
        mainEl.appendChild(divAccordioun)
    }
    
    const buttonsEls = document.querySelectorAll('button');
    buttonsEls.forEach((btn) => btn.addEventListener('click', onClick))
    
    async function onClick(e) {
        const button = e.target;
        const condition = e.target.textContent;
        const divExtra = e.target.nextElementSibling;
        
        if(condition === 'More') {
            divExtra.style.display = 'block';
            button.textContent = 'Less';
            
        } else {
            divExtra.style.display = 'none';
            button.textContent = 'More';
        }
    }
}

solution();