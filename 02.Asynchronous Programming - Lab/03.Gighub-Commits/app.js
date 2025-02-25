function loadCommits() {
    const usernameEl = document.getElementById('username');
    const repoNameEl = document.getElementById('repo');
    const commitsEl = document.getElementById('commits');

    const username = usernameEl.value;
    const repoName = repoNameEl.value;
    const url = `https://api.github.com/repos/${username}/${repoName}/commits`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            commitsEl.innerHTML = '';
            for (const element of data) {
                const message = element.commit.message;
                const name = element.commit.author.name;
                
                const listEl = document.createElement('li');
                listEl.textContent = `${name}: ${message}`
                commitsEl.appendChild(listEl)

            }
        })
        .catch(err => {
            commitsEl.innerHTML = '';
            const listEl = document.createElement('li');
            listEl.textContent = `Error: ${err.status} (Not Found)`;
            commitsEl.appendChild(listEl)
        })
    
}