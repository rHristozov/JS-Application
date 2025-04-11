export default function showErrorMessage(message) {
  const errorBox = document.getElementById('errorBox');
  const spanError = document.querySelector('#errorBox span');

  spanError.textContent = message;
  errorBox.style.display = 'block';

  setTimeout(() => {
    errorBox.style.display = 'none';
    spanError.textContent = '';
  }, 3000);
}
