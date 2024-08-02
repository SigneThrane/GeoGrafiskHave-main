import { createRouter, createWebHistory } from 'vue-router'
import Forside from './components/forside.vue'
import Audio from './components/audio.vue'
import AudioTekst from './components/audioTekst.vue'
import Map from './components/Map.vue'
import LoginAdmin from './components/LoginAdmin.vue'
import NewRoute from './components/NewRoute.vue'
import Quiz from './components/Quiz.vue'



export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forside',
      component: Forside
    },
    {
      path: '/audioTekst',
      name: 'audioTekst',
      component: AudioTekst
    },
    {
      path: '/audio',
      name: 'audio',
      component: Audio
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/LoginAdmin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/NewRoute',
      name: 'NewRoute',
      component: NewRoute
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: Quiz
    },

  ]
})
