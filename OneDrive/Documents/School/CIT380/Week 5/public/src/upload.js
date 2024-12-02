// const uploadForm = document.getElementById('upload-form');
// const uploadButton = document.getElementById('upload-button');
// const artworkInput = document.getElementById('artwork');
// const artworkDisplay = document.getElementById('artwork-display');

// uploadButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   const artworkFile = artworkInput.files[0];
//   const formData = new FormData();
//   formData.append('artwork', artworkFile);

//   fetch('/upload', {
//     method: 'POST',
//     body: formData,
//   })
//   .then((response) => response.blob())
//   .then((blob) => {
//     const artworkUrl = URL.createObjectURL(blob);
//     artworkDisplay.src = artworkUrl;
//   })
//   .catch((error) => console.error(error));
// });
const uploadButton = document.getElementById('upload-button');
const artworkInput = document.getElementById('artwork');
const artworkDisplay = document.getElementById('artwork-display');

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  const artworkFiles = artworkInput.files;
  const formData = new FormData();
  for (let i = 0; i < artworkFiles.length; i++) {
    formData.append('artFiles', artworkFiles[i]);
  }

  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then((response) => response.json())
  .then((data) => {
    const artworkUrls = data.map((file) => `http://localhost:4000/uploads/${file.filename}`);
    displayArtwork(artworkUrls);
  })
  .catch((error) => console.error(error));
});

function displayArtwork(artworkUrls) {
  const artworkContainer = document.createElement('div');
  artworkUrls.forEach((url) => {
    const artworkImage = document.createElement('img');
    artworkImage.src = url;
    artworkContainer.appendChild(artworkImage);
  });
  artworkDisplay.innerHTML = '';
  artworkDisplay.appendChild(artworkContainer);
}