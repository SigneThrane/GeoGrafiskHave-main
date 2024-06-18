<script setup>
import { useRouter } from 'vue-router'; // Importerer useRouter fra vue-router for at kunne navigere mellem sider
import { useI18n } from 'vue-i18n'; // Importerer useI18n fra vue-i18n til internationalisering (sprogskift)

const i18n = useI18n({}); // Initialiserer i18n uden nogen specifikke indstillinger
const { t: $t } = i18n; // Destrukturerer t-funktionen fra i18n og omdøber den til $t for at bruge den til oversættelser

const router = useRouter(); // Initialiserer routeren for at kunne navigere til forskellige sider

// Funktion til at vise brugerens position i konsollen
const showPosition = (position) => {
  console.log("Latitude: " + position.coords.latitude + 
  ", Longitude: " + position.coords.longitude);  
}

// Funktion til at få brugerens aktuelle position
const getLocation = () => {
  if (navigator.geolocation) { // Tjekker om browseren understøtter geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      showPosition(position); // Viser brugerens position i konsollen
      router.push({ name: 'map' }); // Navigerer til 'map' siden
    }, (error) => {
      console.log(error); // Logger fejl, hvis geolocation ikke kunne hentes
    });
  } else {
    console.log("Geolocation is not supported by this browser."); // Logger besked, hvis geolocation ikke understøttes
  }  
}
</script>


<template>   
<div class="locale.changer">  
    <div class="container">
    <div>
   <img src="../assets/logohvid.png" alt="logo" class="centered-image">
   </div>
      <div class="forside">    
        <div class="text">
        <p class="overskrift2">{{ $t('GeografiskHave') }}</p>
      
        <p class="overskrift">{{ $t('PlanteJægerne') }}</p>
       
        <RouterLink to="/map">
        <button class="big-button" @click="getLocation">{{ $t('Continue') }}</button>
        
        </RouterLink>

        <div class="small-buttons">
       
          <button class="small-button1" @click="$i18n.locale = 'da'">{{ $t('Dansk') }}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-globe" viewBox="-4 -4 20 20">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg></button>
                           
          <button class="small-button2" @click="$i18n.locale = 'en'">{{ $t('Engelsk') }}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-globe" viewBox="-4 -4 20 20">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
          </svg></button>
        
        </div>
      </div>
     </div>
    </div>
  </div>
    <button id="install" hidden>Install</button>

  </template>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-image: url(../assets/bg.PNG);
    background-position: center;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: hidden;
  overflow-x: hidden;
  }
  
  .container::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to top, #125F31, transparent);
    opacity: 90%;
  }
  
  .forside {
    top: 13%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  
  .centered-image {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 50%;
    height: 23%;
    
  }

  .text {
    position: relative;
    padding: 10px;
    text-align: center;
    z-index: 1;
    margin-top: 40px; 
  }
  
  .overskrift {
    text-align: center;
    font-size: 40px;
    font-family: 'stagBold', sans-serif;
    font-weight: bold;
    margin: 0;
    color: white;
    padding-top: 10%;
    padding-bottom: 17%;
}

.overskrift2 {
    text-align: center;
    font-size: 30px;
    font-family: 'stagReg';
    margin: 0;
    color: white;
    margin-top: -75px; 
}
  

  .big-button {
    margin-top: 3px;
    background-color: white;
    font-family: 'stagBold', sans-serif;
    color: #125F31;
    font-size: 25px;
    width: 215px;
    height: 50px;
    margin-bottom: 45px;
    border-radius: 50px;
    border-style: none;

}

.small-buttons {
  display: flex;
  justify-content: center;
  width: 350px;
  
}


.small-button1, .small-button2 {
    margin: 0 30px;  /* This adds 10px of space to the left and right of each button */
    color: white;
    background-color: transparent;
    border-color: white; 
    font-size: 15px;
    font-family: 'stagBold', sans-serif;
    height: 45px;
    border-radius: 50px;
    border-style: solid;
    width: 100px; 
}

.small-button1:hover, .small-button2:hover {
    background-color: #125F31; 
    border-color: transparent; 
}

.small-button1 {
 margin-left: 8%;
}

/* Laptops */
@media only screen and (min-width: 1280px) and (max-width: 1440px) { 
.centered-image {
    top: 29%;
    width: 11%;
    height: 20%;
  }

}

/* Small mobile */
@media only screen and (max-width: 767px)
{ 
  .centered-image {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 30%;
    height: 15%;
    
  }
  .small-button1, .small-button2 {
    margin: 0 10px;
    height: 40px;
    border-radius: 50px;
    width: 120px; 
}
}

 /* For Samsung Galaxy S22 Ultra */
 @media only screen and (min-width: 768px) {
  .centered-image {
    position: absolute;
    top: 27%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 30%;
    height: 15%;   
  }
  .small-button1, .small-button2 {
    margin: 0 10px;
    height: 40px;
    border-radius: 50px;
    width: 120px; 
}
}
</style>