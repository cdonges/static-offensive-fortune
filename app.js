const fortuneEl = document.getElementById('fortune');
const nextButton = document.getElementById('new-fortune');
const copyButton = document.getElementById('copy-fortune');

let fortunes = [];
let copyResetTimer = null;

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
  if (copyResetTimer) {
    clearTimeout(copyResetTimer);
  }
  copyButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/>
    </svg>
  `;
}

function fallbackCopy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  tempTextArea.setAttribute('readonly', '');
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.top = '-9999px';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

async function copyFortune() {
  const text = fortuneEl.textContent.trim();
  if (!text) {
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    copyButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19l10-10-1.4-1.4L9 16.2Z"/>
      </svg>
    `;
    if (copyResetTimer) {
      clearTimeout(copyResetTimer);
    }
    copyResetTimer = setTimeout(() => {
      copyButton.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/>
        </svg>
      `;
    }, 1200);
  } catch (error) {
    console.error('Failed to copy fortune:', error);
    copyButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/>
      </svg>
    `;
    if (copyResetTimer) {
      clearTimeout(copyResetTimer);
    }
    copyResetTimer = setTimeout(() => {
      copyButton.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"/>
        </svg>
      `;
    }, 1200);
  }
}

nextButton.addEventListener('click', renderFortune);
copyButton.addEventListener('click', copyFortune);

window.addEventListener('keydown', (event) => {
  const activeTag = document.activeElement?.tagName;
  const isFormField = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';

  if (isFormField || event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  if (['a', 'n'].includes(event.key.toLowerCase())) {
    event.preventDefault();
    renderFortune();
  }
});

loadFortunes().catch((error) => {
  console.error(error);
  fortuneEl.textContent = 'Failed to load fortunes.';
});
