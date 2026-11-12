const fortuneEl = document.getElementById('fortune');
const nextButton = document.getElementById('new-fortune');

let fortunes = [];

async function loadFortunes() {
  const response = await fetch('./fortunes.json');
  if (!response.ok) {
    throw new Error(`Failed to load fortunes: ${response.status}`);
  }
  fortunes = await response.json();
  renderFortune();
}

function pickRandomFortune() {
  if (!fortunes.length) {
    return 'No fortunes available.';
  }

  const index = Math.floor(Math.random() * fortunes.length);
  return fortunes[index];
}

function renderFortune() {
  fortuneEl.textContent = pickRandomFortune();
}

nextButton.addEventListener('click', renderFortune);

loadFortunes().catch((error) => {
  console.error(error);
  fortuneEl.textContent = 'Failed to load fortunes.';
});
