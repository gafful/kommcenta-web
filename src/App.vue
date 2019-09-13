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
      <!-- <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address">
      </template>-->
      <v-dialog v-model="dialog" max-width="290" v-if="!emailVerified">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Login</v-btn>
        </template>
        <AuthModal />
      </v-dialog>
      <v-menu top :offset-y="offsetY" v-else>
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="primary" dark v-on="on">Dropdown</v-btn> -->
          <v-icon large color="blue-grey darken-2" v-on="on">mdi-account-circle</v-icon>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="profile(index)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <h1 v-if="!true">Vue is awesome!</h1>
      <h1 v-else>Oh no 😢</h1>-->
    </v-app-bar>

    <v-content>
      <Main />
    </v-content>
  </v-app>
</template>

<script>
import Main from "./views/Main";
import AuthModal from "./views/Auth";
import { mapActions, mapGetters } from "vuex";
import { AUTH_STATUS } from "./utils/app.utils";

export default {
  name: "App",
  components: {
    Main,
    AuthModal
  },
  data: () => ({
    dialog: false,
    offsetY: true,
    items: [{ title: "Sign out" }]
  }),
  computed: {
    ...mapGetters("auth", ["status", "emailVerified"])
  },
  methods: {
    ...mapActions("auth", ["clearErrors", "logOut"]),
    profile(idx) {
      switch (idx) {
        case 0:
          this.logOut();
          break;
        default:
          break;
      }
    }
  },
  watch: {
    dialog() {
      this.clearErrors();
    },
    status() {
      // Same in effect as !emailVerified
      // Issa workaround for the dialog showing on logout automagically
      // Set it on login success
      if (AUTH_STATUS.LOGGED_OUT === this.status) {
        this.dialog = false
        // this.step = 1;
      }
    }
  }
};
</script>
