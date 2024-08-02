<template>
    <div class="quiz-wrapper">
      <router-link to="/map">
        <button class="back-button"> < </button> 
      </router-link>
      <div class="image-container">
        <img src="../assets/featured.png" alt="Kina Billede" class="quiz-image">
      </div>
      <div class="quiz-container">
        <h1>Quiz Om Kina</h1>
        <div v-if="currentQuestionIndex < questions.length">
          <h2>{{ questions[currentQuestionIndex].question }}</h2>
          <ul>
            <li v-for="(option, index) in questions[currentQuestionIndex].options" :key="index">
              <input 
                type="radio" 
                :id="`option-${index}`" 
                :value="option" 
                v-model="selectedAnswer"
              >
              <label :for="`option-${index}`">{{ option }}</label>
            </li>
          </ul>
          <button @click="submitAnswer">Næste</button>
        </div>
        <div v-else>
          <h2>Færdig!!</h2>
          <p>Du fik {{ score }} rigtige ud af {{ questions.length }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const questions = ref([
    {
      question: 'Hvad er hovedstaden i Kina?',
      options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
      answer: 'Beijing',
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
      options: ['Det Kaspiske Hav', ' Det Arabiske Hav', 'Det Røde Hav', 'Det Østkinesiske Hav'],
      answer: 'Det Østkinesiske Hav',
    },
  ]);
  
  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref('');
  const score = ref(0);
  
  const submitAnswer = () => {
    if (selectedAnswer.value === questions.value[currentQuestionIndex.value].answer) {
      score.value++;
    }
    selectedAnswer.value = '';
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
    padding: 15px;
    background-color: #125F31;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0d4725;
  }
  </style>
  