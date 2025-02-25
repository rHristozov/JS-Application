function loadRepos() {
	const reposUlEl = document.getElementById('repos');
	const nameEl = document.getElementById('username');
	const username = nameEl.value;

	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then((response) => response.json())
		.then((reposData) => {
			reposUlEl.innerHTML = '';
	
			for (const repo of reposData) {
				const repoLi = document.createElement('li');
				const repoLink = document.createElement('a');
				repoLink.href = repo.url;
				repoLink.textContent = repo.name;
				repoLi.appendChild(repoLink)
				reposUlEl.appendChild(repoLi)
			}
		})
		.catch((error) => console.error(error))
	
}