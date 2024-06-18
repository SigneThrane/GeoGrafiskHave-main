import './assets/main.css'
//importing necessy modules from vue, pinia, vue-i18n, vue-router, and the app itself
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { createI18n, useI18n } from 'vue-i18n'
import { ref } from 'vue'

// Registering service worker if supported by the browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
    );
}



// Creating i18n instance with Danish as default locale and Danish and English translations
const i18n = createI18n({
  legacy: false,
  locale: 'da',
  fallbackLocale: 'da',
  messages: {
    en: {
        Engelsk: 'English',
        Dansk: 'Danish',
        GeografiskHave : 'Geographic Garden',
        PlanteJægerne: 'Plant Hunters',
        Continue: 'Continue',
        Kina : 'China',
        title: 'Ambush at the Yellow River',
        story: 'It was early March 1912 on the banks of the Yellow River, 700 kilometers south of Beijing. William Purdom, a plant hunter from the Arnold Arboretum research institute and his three men entourage were traveling through a devastated landscape after the Xinhai Revolution. The roads were dangerous, filled with bandits, but so far their journey had been without any trouble. But as they approached their destination, which was the railway station in Honan, they were suddenly attacked by a group of horseback bandits. The shots flew, and two of Williams horses were killed. The bandits were most likely not aware of what Williams large, cargo consisted of, but he was a foreigner, had horses they could steal, and had money for crossing the various controlled borders. But before the bandits could act further, William grabbed his rifle and shot three of them and several of their horses. His entourage then joined the fight, and the bandits were driven away. After this thrilling scenario, William and his men galloped to the nearby town of Shenchow, after which they continued towards Beijing, without further obstacles. William Purdom went on a myriad of expeditions to China and the Tibetan region of Amdo. He sent over 550 packets of seeds and thousands of dried and carefully documented herbariums to Boston during his journey.',
        title2: 'Ambush at the Yellow River',
        Varighed2minutter: 'Duration: 2 minutes',
    },
    da: {
        Engelsk: 'Engelsk',
        Dansk: 'Dansk',
        GeografiskHave: 'Geografisk Have',
        PlanteJægerne: 'Plantejægerne',
        Continue: 'Fortsæt',
        Kina : 'Kina',
        title: 'Bagholdsangreb ved den gule flod',
        story: 'Det var tidlig marts 1912 ved bredden af den gule flod, 700 kilometer syd for Beijing. William Purdom som var plantejæger fra Arnold Arboretums forskningsinstitut og hans tre-mands følge rejste gennem et ødelagt landskab efter Xinhai-revolutionen. Vejene var farlige, fyldt med røvere, men indtil nu havde deres rejse været uden nogen former for besvær.Men da de nærmede sig deres destination, som var jernbanestationen i Honan, blev de pludselig overfaldet af en gruppe røvere til hest. Skuddene fløj, og to af Williams heste blev dræbt., Røverne var højst sandsynligt ikke klar over hvad Williams store, last bestod af, men han var udlænding, havde heste de kunne bytte og så havde han penge for det skulle man bruge for at krydse de forskellige kontrollerede grænser.Men inden røverne kunne nå at handle yderligere, greb William sit gevær og skød tre af dem og flere af deres heste. Hans følge sluttede sig derefter til kampen, og røverne blev drevet væk. Efter dette hæsblæsende scenarie galopperede William og hans mænd til den nærliggende by Shenchow, hvorefter de fortsatte mod Beijing, uden flere forhindringer.William Purdom var på et utal af ekspeditionertil Kina og den tibetanske region Amdo. Han sendte over 550 pakker frø og tusindvis af tørrede og nøje dokumenterede herbarier til Boston i løbet af sin rejse. ',
        title2: 'Bagholdsangreb ved den gule flod',
        Varighed2minutter: 'Varighed: 2 minutter',
    }
  }
})



  
// Creating Vue app instance and using Pinia, router and i18n
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
// Mounting the app to the DOM
app.mount('#app');
