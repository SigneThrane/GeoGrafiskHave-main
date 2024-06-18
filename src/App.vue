<template>
  <div>
    <!-- Skjulte RouterLinks til forskellige ruter -->
    <RouterLink to="/" style="display: none;"></RouterLink>
    <RouterLink to="/audio" style="display: none;"></RouterLink>
    <RouterLink to="/audioTekst" style="display: none;"></RouterLink>
    <RouterLink to="/Map" style="display: none;"></RouterLink>

    <!-- Viser RouterView, som dynamisk viser den komponent der matcher den aktuelle rute -->
    <RouterView></RouterView>
  </div>
</template>


<script>
import { RouterView, RouterLink } from 'vue-router';

export default {
  name: 'App', // Navnet på Vue-komponenten
  components: {
    RouterView, // Importerer RouterView fra vue-router som en komponent
    RouterLink  // Importerer RouterLink fra vue-router som en komponent
  }
};
</script>


<style lang="scss" scoped>

</style>
