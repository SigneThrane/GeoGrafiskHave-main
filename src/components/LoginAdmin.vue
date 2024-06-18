<template>
  <!-- Container til login-formularen -->
  <div class="login-container">
    <!-- Formular til login. Ved indsendelse forhindres standardindsendelse og funktionen handleLogin kaldes -->
    <form @submit.prevent="handleLogin">
      <div>
        <!-- Titel for login-sektionen -->
        <h2>Admin Login</h2>
        <!-- Container til centreret billede -->
        <div class="centered-image">
          <!-- Logo billede -->
          <img src="../assets/logohvid.png" alt="logo" />
        </div>
      </div>
      <div>
        <!-- Label og input-felt for email -->
        <label for="email">Email</label>
        <!-- To-vejs binding af input-værdi og email variablen -->
        <input type="email" v-model="email" required />
      </div>
      <div>
        <!-- Label og input-felt for password -->
        <label for="password">Password</label>
        <!-- To-vejs binding af input-værdi og password variablen -->
        <input type="password" v-model="password" required />
      </div>
      <!-- Login-knap -->
      <button type="submit">Login</button>
      <!-- Viser fejlmeddelelse hvis errorMessage er sat -->
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'; // Importerer ref for at kunne oprette reaktive variabler
import { useRouter } from 'vue-router'; // Importerer useRouter for at kunne navigere til andre sider
import { auth } from '../firebase/init.js'; // Importerer auth-objektet fra Firebase konfigurationsfil
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importerer signInWithEmailAndPassword-funktionen fra Firebase Auth

export default {
  setup() {
    const router = useRouter(); // Opretter router-objekt for at kunne navigere
    const email = ref(''); // Reaktiv variabel til email
    const password = ref(''); // Reaktiv variabel til password
    const errorMessage = ref(null); // Reaktiv variabel til fejlmeddelelser

    // Funktion til at håndtere login
    const handleLogin = async () => {
      try {
        // Forsøger at logge ind med email og password
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(userCredential); // Logger brugeroplysninger ved succesfuldt login
        router.push('/NewRoute'); // Navigerer til en ny side ved succesfuldt login
      } catch (error) {
        errorMessage.value = error.message; // Sætter fejlmeddelelse ved fejl
        console.error('Login error:', error); // Logger fejlen til konsollen
      }
    };

    // Returnerer variabler og funktioner til brug i template
    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>


  
  <style scoped>
  body, html {
    height: 100%;
    margin: 0;
  }
  
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to top, #125F31, transparent), url(../assets/loginAdmin.PNG);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .login-container h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border: 5px;
    border-radius: 10px;
    color: white;
  }
  
  form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  
  form label {
    margin-bottom: 5px;
    font-size: 17px;
  }
  
  form input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 50px;
    font-size: larger;
  }
  
  form button {
    padding: 7px;
    border-style: none;
    background-color: white;
    font-family: 'stagBold', sans-serif;
    color: #125F31;
    font-size: 23px;
    cursor: pointer;
    width: 100%;
    border-radius: 50px;
    margin-top: 5%;
  }
  
  form button:hover {
    background-color: #28834c;
    color: white;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  
  .centered-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1px;
    transform: translate(1%, -10%);
  }
  
  h2 {
    font-size: 28px;
    font-family: 'stagBold', sans-serif;
    font-weight: bold;
    margin: 0;
    color: white;
    padding-top: 5%;
    padding-bottom: 15%;
  }
  </style>
  