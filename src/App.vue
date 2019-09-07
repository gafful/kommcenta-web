<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>KOMM</span>
        <span class="font-weight-light">CENTA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn text href="#login" target="_blank" class="ma-2" outlined>
        <span class="mr-2">Login</span>
      </v-btn>-->
      <v-dialog v-model="dialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Login</v-btn>
        </template>
        <AuthModal />
      </v-dialog>
      <!-- <v-btn class="ma-2" outlined color="indigo">Sign Up</v-btn> -->
    </v-app-bar>

    <v-content>
      <Main />
    </v-content>
  </v-app>
</template>

<script>
import Main from "./views/Main";
import AuthModal from "./views/Auth";

export default {
  name: "App",
  components: {
    Main,
    AuthModal
  },
  data: () => ({
    dialog: false
  })
};
</script>
