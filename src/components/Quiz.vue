<template>
  <!-- Tilbage knap ved vue router -->
  <div class="quiz-wrapper">
    <router-link to="/audio">
      <button class="back-button"> </button>
    </router-link>

    <div>
        <!-- Titel til quiz -->
      <h1 class="quiz-title">Quiz Om Kina</h1>
    </div>

    <div class="image-container">
        <!-- image -->
      <img src="../assets/featured.png" alt="Kina Billede" class="quiz-image">
    </div>
 
    <div class="quiz-container">
        <!-- v-if (boolean), hvor langt er vi, mængde spørgsmål, ikke længere true -->
      <div v-if="currentQuestionIndex < questions.length">
       <!-- indsat data i {{ }}, question i script, currentQuestionIndex hvor er vi, .question kalder the aktuelle objekt   -->
        <h2>{{ questions[currentQuestionIndex].question }}</h2>

        <ul>
            <!-- v-for (loop), option: mulighed i listen, index: angiver placering -->
          <li v-for="(option, index) in questions[currentQuestionIndex].options" :key="index">
        
            <!-- input: radio knap, id: tilknyttes label, value: aktuelle mulighed, v-model: tilknyttet script og muligheder -->
            <input 
              type="radio" 
              :id="`option-${index}`" 
              :value="option" 
              v-model="selectedAnswer"
            >
            <!-- Binder til den rigtig radio knap, :for="option-${index}": matcher id'en, option: aktuelle mulighed  -->
            <label :for="`option-${index}`">{{ option }}</label>
          </li>
        </ul>
        <!-- vue.js click metode, kalder script funktion -->
        <button @click="submitAnswer">Næste</button>
      </div>  

        <!-- v-else tjekker om der flere spørgsmål tilbage, hvis den ikke er sand -->
      <div v-else>
        <h2>Færdig!!</h2>

          <!-- script score, viser mængden af spørgsmål -->
        <p>Du fik {{ score }} rigtige ud af {{ questions.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
 // Henter funktion ref i vue.js bibliotekt
  import { ref } from 'vue';
  
   // variabel question, refernce til en liste af objects
  const questions = ref([
    {
      question: 'Hvad er hovedstaden i Kina?', // String
      options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'], // Array af strings
      answer: 'Beijing', // String
    },
    {
      question: 'Hvilket kendt monument strækker sig over 21.000 km i Kina?',
      options: ['Den Forbudte By', 'Terrakottahæren', 'Den Store Mur', 'Sommerpaladset'],
      answer: 'Den Store Mur',
    },
    {
      question: 'Hvad kaldes den traditionelle kinesiske kampkunst, som også er kendt som "Wu Shu"?',
      options: ['Tai Chi', 'Karate', 'Kung Fu', 'Judo'],
      answer: 'Kung Fu',
    },
    {
      question: 'Hvilken af disse er en vigtig kinesisk højtid, der fejres med lanterner og fyrværkeri?',
      options: ['Chuseok', 'Diwali', 'Mid-Autumn Festival', 'Kinesisk Nytår'],
      answer: 'Kinesisk Nytår',
    },
    {
      question: 'Hvilket hav grænser op til det østlige Kina?',
      options: ['Det Kaspiske Hav', 'Det Arabiske Hav', 'Det Røde Hav', 'Det Østkinesiske Hav'],
      answer: 'Det Østkinesiske Hav',
    },
  ]);

 // const: forbliver det samme, ref(0): start værdi 0 (reaktiv varibel)
  const currentQuestionIndex = ref(0);

 // Gemmer svar, tom string, bliver opdateret hvis værdien ændres.
  const selectedAnswer = ref('');

 // start værdi 0
  const score = ref(0);
  
  // Tjekker brugerens svar ved klik
  const submitAnswer = () => {
      // selectedAnswer.value: indeholder det svar brugeren har valgt. 
      // questions.value[currentQuestionIndex.value].answer er det korrekte svar for det nuværende spørgsmål.
      // hvis ens vil den være true og kører if funktion  
    if (selectedAnswer.value === questions.value[currentQuestionIndex.value].answer) {
      // øger score med 1
      score.value++; 
    }
      // Nulstiller svar til en tom string, så det næste spørgsmål kan køres
    selectedAnswer.value = ''; 

      // Går videre til næste spørgsmål ved at øge index med en.
    currentQuestionIndex.value++; 
  };
</script>
  
  <style scoped>
  .quiz-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .image-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .quiz-image {
    max-width: 100%;
    max-height: 470px;
    margin-top: 5%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-size: 18px;
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-size: 36px;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #555;
    font-size: 24px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
    font-size: 20px;
  }
  
  label {
    margin-left: 10px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 13px;
    background-color: #125F31;
    color: #fff;
    border: none;
    border-radius: 7px;
    font-size: 17.5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0d4725;
  }
  .back-button {
  position: absolute;
  top: 23px;
  left: 18px;
  background-color: #404040;
  border: none;
  border-radius: 50%;
  height: 38px;
  width: 39px;
  cursor: pointer;
  background-image: url("/src/assets/backButton.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 22%;
}

.quiz-title {
            margin-top: 20px; 
        }
  </style>
  