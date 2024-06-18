/* eslint-disable no-console */ // Deaktiverer ESLint-reglen, der forbyder brugen af console.log

import { register } from 'register-service-worker'; // Importerer funktionen register fra register-service-worker

if (process.env.NODE_ENV === 'production') { // Tjekker om miljøet er produktion

  // Registrerer en servicearbejder med angivelse af service-arbejderens sti
  // `${process.env.BASE_URL}service-worker.js` er den fulde URL til servicearbejderen
  register(`${process.env.BASE_URL}service-worker.js`, {

    // ready-funktionen kaldes når servicearbejderen er klar og fungerer
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' + // Udskriver besked om at appen er i cache
        'For more details, visit https://goo.gl/AFskqB'
      );
    },

    // registered-funktionen kaldes når servicearbejderen er registreret
    registered() {
      console.log('Service worker has been registered.'); // Udskriver besked om at servicearbejderen er registreret
    },

    // cached-funktionen kaldes når indholdet er blevet cached til offline-brug
    cached() {
      console.log('Content has been cached for offline use.'); // Udskriver besked om at indholdet er cached
    },

    // updatefound-funktionen kaldes når der er nyt indhold til download
    updatefound() {
      console.log('New content is downloading.'); // Udskriver besked om at nyt indhold downloades
    },

    // updated-funktionen kaldes når der er nyt indhold tilgængeligt og brugeren bør opdatere
    updated() {
      console.log('New content is available; please refresh.'); // Udskriver besked om at nyt indhold er tilgængeligt og at siden bør opdateres
    },

    // offline-funktionen kaldes når der ikke er internetforbindelse og appen kører offline
    offline() {
      console.log('No internet connection found. App is running in offline mode.'); // Udskriver besked om at der ikke er internetforbindelse og at appen kører offline
    },

    // error-funktionen kaldes hvis der opstår en fejl under registrering af servicearbejderen
    error(error) {
      console.error('Error during service worker registration:', error); // Udskriver fejlmeddelelse med detaljer om fejlen
    }
  });
}
