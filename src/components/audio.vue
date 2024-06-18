<template>
  <div class="locale.changer">
    <!-- Container til lydafspilning -->
    <div class="audio-container">
      <!-- Link til en anden side med ruteindstillingen '/map' -->
      <router-link to="/map">
        <button class="back-button"> </button> <!-- Tilbage-knap -->
      </router-link>
      <!-- Billede og tekster -->
      <img src="../assets/featured.png" alt="">
      <p>{{ $t('Kina') }}</p> <!-- Viser oversat tekst 'Kina' -->
      <h1>{{ $t('title2') }}</h1> <!-- Viser oversat titel 'title2' -->

      <!-- Lydafspiller -->
      <div class="audio">
        <audio id="audioPlayer"></audio> <!-- Lydafspiller element -->
        <!-- Fremdriftsindikator -->
        <div class="progress">
          <div id="progressBar"></div>
        </div>
        <!-- Tid og varighed -->
        <div class="time-info">
          <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
        </div>
        <!-- Kontrolknapper -->
        <div class="controls">
          <button id="speedButton" class="icon-button-speed"></button> <!-- Hastighedsjusteringsknap -->
          <button id="skipBackButton" class="icon-button-back"></button> <!-- Spring tilbage knap -->
          <button id="playPauseButton" class="icon-button-play"> <!-- Afspil/pause knap -->
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16" id="playIcon">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16" id="pauseIcon" style="display: none;">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
            </svg>
          </button>
          <button id="skipForwardButton" class="icon-button-forward"></button> <!-- Spring fremad knap -->
          <!-- Link til en anden side med ruteindstillingen '/audioTekst' -->
          <router-link to="/audioTekst">
            <button id="textButton" class="icon-button-text"></button> <!-- Tekstvisningsknap -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'; // Importerer onMounted hook fra vue
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'; // Importerer Firebase Storage funktioner

const storage = getStorage(); // Initialiserer Firebase Storage

// onMounted hook kører koden, når komponenten er monteret
onMounted(async () => {
  // Referencer til DOM-elementer
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPauseButton');
  const pauseIcon = document.getElementById('pauseIcon');
  const playIcon = document.getElementById('playIcon');
  const skipBackButton = document.getElementById('skipBackButton');
  const skipForwardButton = document.getElementById('skipForwardButton');
  const speedButton = document.getElementById('speedButton');
  const progressBar = document.getElementById('progressBar');

  let isPlaying = false; // Status for afspilning
  let isNormalSpeed = true; // Status for afspilningshastighed

  // Funktion til at skifte mellem afspilning og pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioPlayer.pause();
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
    } else {
      audioPlayer.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
    }
    isPlaying = !isPlaying;
  };

  // Funktion til at skifte afspilningshastighed
  const toggleSpeed = () => {
    if (isNormalSpeed) {
      audioPlayer.playbackRate = 1.5;
      speedButton.textContent = '1.5x';
    } else {
      audioPlayer.playbackRate = 1.0;
      speedButton.textContent = '1x';
    }
    isNormalSpeed = !isNormalSpeed;
    
    speedButton.style.backgroundImage = 'none';
    speedButton.style.fontSize = '19px';
  };

  // Funktion til at opdatere fremdriftsindikatoren
  const updateProgressBar = () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    console.log('Progress updated:', progress);
  };

  // Event listeners for knapper og lydafspiller
  playPauseButton.addEventListener('click', togglePlayPause);
  skipBackButton.addEventListener('click', () => {
    audioPlayer.currentTime -= 15;
  });
  skipForwardButton.addEventListener('click', () => {
    audioPlayer.currentTime += 30;
  });
  speedButton.addEventListener('click', toggleSpeed);

  speedButton.style.display = 'inline-block';

  audioPlayer.addEventListener('timeupdate', updateProgressBar);
  audioPlayer.addEventListener('play', updateProgressBar);

  // Hent lydfilen fra Firebase Storage og sæt den som kilde til audioPlayer
  try {
    const audioRef = storageRef(storage, 'kina.mp3');
    const url = await getDownloadURL(audioRef);
    audioPlayer.src = url;
  } catch (error) {
    console.error('Error fetching audio:', error);
  }

  // Start afspilning med det samme
  togglePlayPause();
});
</script>



<style scoped>
.audio-container {
  background-color: #343333;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1 {
  font-family: 'stagBold', sans-serif;
  margin: 8%;
  margin-top: 20px; 
  font-size: 35px;
}

p {
  margin-bottom: 22%; 
  font-size: 15px; 
  color: #FFFFFF;
  margin-top: -40%;
  font-family: "Open Sans", sans-serif;
}

h1, p {
  color: #FFFFFF;
  margin-left: 13%;
  margin-top: -90px; 
}

.audio-container p {
  position: relative;
  width: 8%;
  padding: 10px 20px; 
  border: 2px solid white; 
  border-radius: 50px; 
}

.back-button {
  position: absolute;
  top: 14px; 
  left: 14px; 
  background-color: #404040;
  border: none;
  border-radius: 50%;
  height: 38px;
  width: 38px;
  cursor: pointer;
  background-image: url('/src/assets/backButton.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-size: 25%; 
}

.back-button:hover {
  background-color: #696969;
}

.audio {
  position: relative;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 30px; 
  margin-bottom: 20px;
}

.progress {
  width: 75%;
  background-color: #ffffff;
  height: 10px;
  margin: 10px auto;
  border-radius: 5px; 
}

#progressBar {
  width: 0%;
  height: 100%;
  background-color: #125F31;
}

.time-info {
  width: 75%;
  margin: 10px auto; 
  font-size: small;
  font-family: open sans;
  color: #848484;
}

.icon-button-text,
.icon-button-forward,
.icon-button-back,
.icon-button-speed,
.icon-button-play {
  padding: 15px 22px;
  background-color: RGB(52 51 51);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: -25px; 
}

.icon-button-text {
  background-image: url('/src/assets/Døv_Hvid.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-size: 28px; 
  margin-top: 17%;
  margin-left: 17%;
  opacity: 50%;
}

.router-link {
  margin-top: 16px; 
}


.icon-button-forward{
  background-image: url('/src/assets/30_Hvid.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-size: 36px; 
}

.icon-button-back{
  background-image: url('/src/assets/15_Hvid.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-size: 36px; 
}

.icon-button-speed {
  background-image: url('/src/assets/1x_hvid.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-size: 37px; 
  opacity: 50%;
}

/* Small mobile */
@media only screen and (max-width: 767px)
{ 
img{
  height: 70%;
}
.back-button {
  height: 38px;
  width: 38px;
  background-size: 20%; 
}

.icon-button-forward{
  background-size: 26px; 
}

.icon-button-back{
  background-size: 30px; 
}

.icon-button-speed { 
  background-size: 30px; 
}

.icon-button-text {
  background-size: 18px; 
}

h1 {
margin-top: -70px;
  font-size: 25px;
}

.icon-button-text,
.icon-button-forward,
.icon-button-back,
.icon-button-speed,
.icon-button-play {
  padding: 10px 17px;
  background-color: RGB(52 51 51);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: -25px; 
}
}

    /* Laptops */
    @media only screen and (min-width: 1280px) and (max-width: 1440px) { 
      .back-button {
  top: 14px; 
  left: 14px; 
  border-radius: 50%;
  height: 38px;
  width: 38px;
  background-size: 25%; 
}

.audio-container {
  height: 100vh;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

img{
  height: 70%;
}
.back-button {
  top: 15px; 
  left: 20px; 
  height: 7%;
  width: 4%;
  background-size: 15%; 
}

p {
  margin-bottom: 10%; 
  margin-top: -7%;
}

h1 {
  margin-top: -9%; 
}

#progressBar {
  margin-top: -6%;
}

}


/* For Samsung Galaxy S22 Ultra */
@media only screen and (min-width: 768px)
{ 
img{
  height: 60%;
}
.back-button {
  height: 38px;
  width: 38px;
  background-size: 20%; 
}

.icon-button-forward{
  background-size: 26px; 
}

.icon-button-back{
  background-size: 30px; 
}

.icon-button-speed { 
  background-size: 30px; 
}

.icon-button-text {
  background-size: 18px; 
}

h1 {
margin-top: -70px;
  font-size: 25px;
}

.icon-button-text,
.icon-button-forward,
.icon-button-back,
.icon-button-speed,
.icon-button-play {
  padding: 10px 17px;
  background-color: RGB(52 51 51);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: -25px; 
}
}
</style>