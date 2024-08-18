<template>
  <!-- Container for hele dashboardet -->
  <div class="dashboard-container">
    <!-- Sidebar sektionen -->
    <div class="sidebar">
      <!-- Logo billede -->
      <img src="../assets/logohvid.png" alt="logo" style="width: 70px; height: auto;">
      <!-- Navigationsmenu -->
      <ul>
        <li>
          <!-- Link til Firebase dashboard -->
          <a href="https://console.firebase.google.com/u/1/project/test-3b4f1/analytics/app/web:NGNmZmI2MzktZjVhNS00Yjk5LWEzOWItMmNmMzEyYjNmYTlm/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D131030931772" target="_blank" rel="noopener noreferrer">Dashboard</a>
        </li>
        <li>
          <!-- Link til ny route ved hjælp af router-link -->
          <router-link to="/NewRoute">Add New Data</router-link>
        </li>
      </ul>
    </div>
    <!-- Hovedindholdet -->
    <div class="main-content">
      <h1>Add New Data</h1>
      <!-- Sektion til upload af indhold -->
      <div class="upload-content">
        <h2>Upload Content</h2>
        <!-- Formular til indsendelse af data. Ved indsendelse forhindres standardindsendelse og funktionen handleSubmit kaldes -->
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <!-- Label og input-felt til upload af billede -->
            <label for="image">Upload Image (For audio):</label>
            <input type="file" id="image" accept="image/*" @change="handleImageUpload" />
          </div>
          <div class="form-group">
            <!-- Label og input-felt til upload af lyd -->
            <label for="audio">Upload Audio:</label>
            <input type="file" id="audio" accept="audio/*" @change="handleAudioUpload" />
          </div>
          <div class="form-group">
            <!-- Label og input-felt til titel på historien -->
            <label for="textTitle">Historie Titel:</label>
            <input type="text" id="textTitle" v-model="textTitle" />
          </div>
          <div class="form-group">
            <!-- Label og tekstområde til historien -->
            <label for="text">Historer:</label>
            <textarea id="text" v-model="text" rows="5"></textarea>
          </div>
          <div class="form-group">
            <!-- Label og input-felt til titel på lydfilen -->
            <label for="audioTitle">Lande:</label>
            <input type="text" id="audioTitle" v-model="audioTitle" />
          </div>
          <!-- Submit-knap -->
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Importerer ref for at kunne oprette reaktive variabler
import { db, storage } from '../firebase/init.js'; // Importerer Firebase database og storage konfiguration
import { addDoc, collection } from 'firebase/firestore'; // Importerer nødvendige Firestore funktioner
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importerer nødvendige Storage funktioner

export default {
  setup() {
    const textTitle = ref(''); // Reaktiv variabel til teksttitel
    const text = ref(''); // Reaktiv variabel til teksten
    const audioTitle = ref(''); // Reaktiv variabel til lyden titel
    const location = ref(''); // Reaktiv variabel til lokationen
    const imageFile = ref(null); // Reaktiv variabel til billedfilen
    const audioFile = ref(null); // Reaktiv variabel til lydfilen

    // Håndterer billedupload, hvor der er en event som bliver udløst når brugerne klikker på den. 
    const handleImageUpload = (event) => {
      imageFile.value = event.target.files[0]; // Sætter den valgte billedfil,  bruger den første fil valgt.
    };

    // Håndterer lydupload
    const handleAudioUpload = (event) => {
      audioFile.value = event.target.files[0]; // Sætter den valgte lydfil, bruger den første fil valgt.
    };

    // Asynkron funktion til at uploade filer til Firebase Storage
    const uploadFile = async (file, folder) => {
      if (!file) return null; // Returnerer null hvis ingen fil er valgt

      try {
        const storageReference = storageRef(storage, `${folder}/${file.name}`); // Opretter en reference til filen i Storage
        await uploadBytes(storageReference, file); // Uploader filen
        return await getDownloadURL(storageReference); // Henter download-URLen til den uploadede fil
      } catch (error) {
        console.error('Error uploading file:', error); // Logger fejl hvis upload mislykkes
        return null;
      }
    };

    // Funktion til at håndtere indsendelse af formular
    const handleSubmit = async () => {
      try {
        // Uploader billede og lyd og gemmer URLerne
        const imageUrl = await uploadFile(imageFile.value, 'images');
        const audioUrl = await uploadFile(audioFile.value, 'audio');

        // Opretter nyt objekt med data til historien
        const newEntry = {
          textTitle: textTitle.value,
          text: text.value,
          audioTitle: audioTitle.value,
          location: location.value,
          imageUrl: imageUrl || '',
          audioUrl: audioUrl || '',
        };

        // Tilføjer historien til 'historier' kollektionen
        await addDoc(collection(db, 'historier'), newEntry);

        // Tilføjer data til 'Lande' kollektionen
        await addDoc(collection(db, 'Lande'), {
          audioTitle: audioTitle.value,
          location: location.value,
          imageUrl: imageUrl || '',
          audioUrl: audioUrl || '',
        });

        // Tilføjer teksttitel til 'historieTitel' kollektionen
        await addDoc(collection(db, 'historieTitel'), {
          textTitle: textTitle.value,
        });

        // Nulstiller formularen efter succesfuld indsendelse
        textTitle.value = '';
        text.value = '';
        audioTitle.value = '';
        location.value = '';
        imageFile.value = null;
        audioFile.value = null;
        alert('Data successfully added to all collections!');
      } catch (error) {
        console.error('Error adding document: ', error); // Logger fejl hvis indsendelse mislykkes
      }
    };

    // Returnerer variabler og funktioner til brug i template
    return {
      textTitle,
      text,
      audioTitle,
      location,
      handleImageUpload,
      handleAudioUpload,
      handleSubmit,
    };
  },
};
</script>

  
  <style scoped>
  .dashboard-container {
    display: flex;
    height: 100vh;
    background-color: #fff9e8;
    font-family: 'Arial', sans-serif;
  }
  
  .sidebar {
    width: 220px;
    background-color: #125F31;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }
  
  .sidebar ul li {
    width: 100%;
    text-align: center;
  }
  
  .sidebar ul li a {
    display: block;
    padding: 15px;
    color: white;
    text-decoration: none;
    transition: background-color 0.3s, border-radius 0.3s;
    border-radius: 10px;
  }
  
  .sidebar ul li a:hover {
    background-color: #0d4725;
    border-radius: 10px;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .upload-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
  }
  
  .upload-content h2 {
    margin-bottom: 20px;
    color: #125F31;
  }
  
  .form-group {
    margin-bottom: 40px; /* Increased margin for more space */
  }
  
  .form-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input[type="file"],
  .form-group input[type="text"],
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s;
    display: block;
    margin-top: 5px; /* Add margin-top to move the boxes under the labels */
  }
  
  .form-group input[type="file"]:focus,
  .form-group input[type="text"]:focus,
  .form-group textarea:focus {
    border-color: #125F31;
  }
  
  button {
    background-color: #125F31;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #0d4725;
  }
  
  #image, #audio, #audioTitle, #textTitle, #location {
    margin-bottom: 1%;
    margin-left: 5px;
  }
  
  #audioTitle, #textTitle, #text, #location {
    border-radius: 10px;
  }
  </style>
  