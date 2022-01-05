const { clipboard, ipcRenderer } = require('electron');

const randomToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const waitLoadingAllImages = (): void => {
  const allImagesLoaded = () => {
    ipcRenderer.send('allImagesLoaded');
  };

  const imageDOMs = document.querySelectorAll('img');
  let imagesLoaded = 0;
  const totalImages = imageDOMs.length;

  imageDOMs.forEach((imageDOM) => {
    imageDOM.addEventListener('load', () => {
      imagesLoaded += 1;

      if (imagesLoaded === totalImages) allImagesLoaded();
    });
  });
};

const tokenDOM: HTMLInputElement = document.getElementById('token') as HTMLInputElement;

document.getElementById('close-btn').addEventListener('click', () => {
  ipcRenderer.send('close');
});

document.getElementById('copy-btn').addEventListener('click', () => {
  const token = tokenDOM.value;
  clipboard.writeText(token);
});

document.getElementById('generate-btn').addEventListener('click', () => {
  const newToken = randomToken();
  tokenDOM.value = newToken;
});

document.getElementById('save-btn').addEventListener('click', () => {
  const token = tokenDOM.value;
  ipcRenderer.send('token', token);
});

document.getElementById('set-shortcut-btn').addEventListener('click', () => {
  ipcRenderer.send('shortcut');
});

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.sendSync('requestToken', '');
  ipcRenderer.once('responseToken', (_, token) => {
    tokenDOM.value = token;
  });
});

waitLoadingAllImages();
