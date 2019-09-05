<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>KOMM</span>
        <span class="font-weight-light">CENTA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="#login" target="_blank" class="ma-2" outlined>
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn class="ma-2" outlined color="indigo">Sign Up</v-btn>
    </v-app-bar>

    <v-content>
      <MainContent />
    </v-content>
  </v-app>
</template>

<script>
import MainContent from "./components/MainContent";

export default {
  name: "App",
  components: {
    MainContent
  },
  data: () => ({
    //
  })
};
</script>
