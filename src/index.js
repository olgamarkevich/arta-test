import './style.css';
import 'normalize.css';

const continueBtn = document.getElementById('continueBtn');

continueBtn.addEventListener('click', function () {
  const radio = document.querySelector('.radio-input:checked');
  const link = radio.getAttribute('data-link');
  window.location.href = link;
});
