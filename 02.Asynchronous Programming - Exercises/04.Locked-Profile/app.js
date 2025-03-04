async function lockedProfile() {
  const mainEl = document.getElementById('main');
  mainEl.innerHTML = '';

  const response = await fetch(
    'http://localhost:3030/jsonstore/advanced/profiles'
  );
  const data = await response.json();
  const profileData = Object.entries(data);
  for (const [, { username, email, age }] of profileData) {
    const profileDiv = document.createElement('div');
    profileDiv.setAttribute('class', 'profile');
    profileDiv.innerHTML = `
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${username}" disabled readonly />
				<div class="user1Username" style="display:none">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${email}" disabled readonly />
					<label>Age:</label>
					<input type="number" name="user1Age" value="${age}" disabled readonly />
				</div>
				
				<button>Show more</button>`;

    // console.log(showMoreBtn);

    mainEl.appendChild(profileDiv);
  }
  let buttonElements = Array.from(document.querySelectorAll('button'));

  for (let btn of buttonElements) {
    btn.addEventListener('click', show);
  }

  function show(e) {
    let divChildren = Array.from(e.target.parentElement.children);

    let locked = divChildren[2].checked;

    if (locked == false) {
      console.log(e.target.previousElementSibling);

      let hiddenFieldsElement = e.target.previousElementSibling;

      if (e.target.textContent == 'Show more') {
        hiddenFieldsElement.style.display = 'block';
        e.target.textContent = 'Hide it';
      } else {
        hiddenFieldsElement.style.display = 'none';
        e.target.textContent = 'Show more';
      }
    }
  }
}
