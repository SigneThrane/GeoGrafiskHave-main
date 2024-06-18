<template>
  <!-- Map container -->
  <div class="map-container">
    <div id="map" style="height: 100vh"></div>
    <!-- Tilføjer en tilbage-knap, som fører brugeren tilbage til startsiden -->
    <router-link to="/">
      <button class="back-button"></button>
    </router-link>

    <!-- Custom popup, der kun vises, hvis showCustomPopup er true -->
    <div v-if="showCustomPopup" class="popUp">
      <div class="popup-img-container">
        <img class="popup-img" src="/src/assets/imgSmall.png" alt="" />
        <!-- Link til en side med lydafspiller -->
        <router-link to="/audio">
          <button id="playPauseButton" class="icon-button-play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="white"
              class="bi bi-play-fill"
              viewBox="0 0 16 16"
              
              id="playIcon"
            >
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
              />
            </svg>
          </button>
        </router-link>
      </div>
      <h2>{{ $t("title2") }}</h2>
      <div class="popup-info">
        <p id="varighed">{{ $t("Varighed2minutter") }}</p>
        <p id="kina">{{ $t("Kina") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import * as L from "leaflet";
import logoUrl from "../assets/logo.png";
import { doc, getDoc } from 'firebase/firestore'; 

const { t: $t } = useI18n();

const initialMap = ref(null);
const initCoords = { lat: 55.4732873, lng: 9.4946134 };
const showCustomPopup = ref(false);

onMounted(() => {
  // Opretter og initialiserer kortet
  initialMap.value = L.map("map").setView([initCoords.lat, initCoords.lng], 20);

  // Tilføjer OpenStreetMap fliser til kortet
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(initialMap.value);

  // Sætter maks grænser for kortet
  initialMap.value.setMaxBounds([
    [initCoords.lat - 0.01, initCoords.lng - 0.01],
    [initCoords.lat + 0.01, initCoords.lng + 0.01],
  ]);

  // Definerer et custom ikon til markøren
  var logo = L.icon({
    iconUrl: '/logoUrl',
    iconAnchor: [5, 3], // Punktet som svarer til markørens position
    popupAnchor: [-3, -76] // Punktet fra hvor popuppen åbner relativt til iconAnchor
  });

  // Opretter en custom markør med klikbart område
  const markerIcon = L.divIcon({
    className: "custom-marker",
    html: `<div id="marker-background"></div><img src="${logoUrl}" style="width: 60px; height: 62px;"/></div>`,
    iconAnchor: [5, 3], // Justerer ankepositionen som nødvendigt
    icon: logo, // Brug det custom ikon
  });

  // Tilføjer markøren til kortet
  const marker = L.marker([initCoords.lat, initCoords.lng], {
    icon: markerIcon,
  }).addTo(initialMap.value);

  // Åbner popup ved klik på markøren
  marker.on("click", () => {
    showCustomPopup.value = true;
  });
});

const title = ref('');
const lande = ref('');
const varighed = ref('');

onMounted(async () => {
  try {
    // Henter dokument fra 'historieTitel' kollektion
    const docRef = doc(db, 'historieTitel', '9uFrlduAUavrtX4pxmju');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      title.value = docSnap.data().titelKina;
    } else {
      console.log('No such document in historieTitel collection!');
      title.value = 'Document not found';
    }

    // Henter dokument fra 'lande' kollektion
    const docRef2 = doc(db, 'Lande', '4BiWlzlz2Fmp743jJC59');
    const docSnap2 = await getDoc(docRef2);
    
    if (docSnap2.exists()) {
      lande.value = docSnap2.data().Land;
    } else {
      console.log('No such document in lande collection!');
      lande.value = 'Document not found';
    }

  } catch (error) {
    console.error('Error fetching document:', error);
    title.value = 'Error fetching data';
    lande.value = 'Error fetching data. Check console for details.';
  }

  try {
    // Henter dokument fra 'audioVarighed' kollektion
    const docRef3 = doc(db, 'audioVarighed', 'OJhrUUo7Lwtbazdy8StJ');
    const docSnap3 = await getDoc(docRef3);
    
    if (docSnap3.exists()) {
      varighed.value = docSnap3.data().varighedKina;
    } else {
      console.log('No such document in audioVarighed collection!');
      varighed.value = 'Document not found';
    }

  } catch (error) {
    console.error('Error fetching document:', error);
    varighed.value = 'Error fetching data. Check console for details.';
  }
})

</script>

<style scoped>
/* Your CSS styles */
.popUp {
  position: fixed;
  bottom: 0;
  background-color: #343333;
  padding: 30px;
  color: #ffffff;
  height: 20%;
  width: 89%;
  z-index: 1000;
}

.popup-info {
  display: flex;
  justify-content: space-between;
  margin-top: 12%;
  position: relative;
  top: -70%;
}

.popUp h2,
.popUp p {
  margin: 0;
  display: inline-block;
  color: white;
  font-family: "stagBold", sans-serif;
}

.popUp h2 {
  margin: 0;
  display: inline-block;
  color: white;
  position: relative;
  top: -45%;
  font-size: 35px;
}

p {
  font-size: 15px;
  font-family: "Open Sans", sans-serif;
}

.popup-img {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  border-radius: 10px;
  z-index: 1;
}

.popup-img-container {
  width: 40%;
  height: 0;
  padding-bottom: 40%;
  overflow: hidden;
  border-radius: 10px;
  z-index: 0;
}

.icon-button-play {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-45%, -280%);
  z-index: 2;
  cursor: pointer;
  background-color: #125f31;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styling for the marker background */
#marker-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/custom-marker-background.png"); /* Replace with your image path */
  background-size: cover;
  border-radius: 50%;
}

#kina {
  position: relative;
  z-index: 1;
  width: 9%;
  height: 10%;
  padding: 10px 30px;
  border: 2px solid white;
  border-radius: 50px;
  font-family: "stagBold", sans-serif;
}

#varighed {
  position: relative;
  left: -6%;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: #606060;
  font-family: "stagBold", sans-serif;
}

.back-button {
  position: absolute;
  top: 14px;
  left: 50px;
  background-color: #404040;
  border: none;
  border-radius: 50%;
  height: 38px;
  width: 38px;
  cursor: pointer;
  background-image: url("/src/assets/backButton.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25%;
  z-index: 1001;
  
}

.leaflet-control-container {
  display: none !important;
}

@media only screen and (max-width: 767px){ 
.popUp {
  height: 21%;
  width: 87%;
}

.popUp h2 {
  top: -80px; 
  font-size: x-large;
}

.back-button {
  height: 38px;
  width: 38px;
  background-size: 20%; 
}

.map {
  overflow-y: hidden;
  overflow-x: hidden;
}


#kina {
margin-top: -1%;
margin-right: 10%;
}

.icon-button-play {
  top: 49%;
}
    }

    /* Laptops */
@media only screen and (min-width: 1280px) and (max-width: 1440px) { 
  .popUp {
  padding: 35px; 
  height: 20%;
  width: 95.2%;
}

.icon-button-play {
  top: 40%;
}

.back-button {
  top: 15px; 
  left: 20px; 
  height: 7%;
  width: 4%;
  background-size: 15%; 
}
.popup-img {
  top: -60%; 
  left: 50%;
  transform: translateX(-50%);
  width: 18%; 
  border-radius: 10px; 
}
.popUp h2 {
  top: -305%; 
  left: 36%;
}

#kina {
  width: 2.5%;
  right: 37%;
}

#varighed {
  left: 34.5%;; 
}

.popup-info {
  top: -412%; 
}
.map {
  overflow-y: hidden;
  overflow-x: hidden;
}

}


/* For Samsung Galaxy S22 Ultra */
@media only screen and (min-width: 768px) { 
.popUp {
  height: 25%;
  width: 100%;
}

.popUp h2 {
  top: -80px; 
  font-size: x-large;
}

.back-button {
  height: 38px;
  width: 38px;
  background-size: 20%; 
}

.map {
  overflow-y: hidden;
  overflow-x: hidden;
}


#kina {
margin-top: -1%;
margin-right: 10%;
}

.icon-button-play {
  top: 49%;
}
    }
</style>
