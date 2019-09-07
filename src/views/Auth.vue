<template>
  <v-card>
    <v-card-title class="headline">LOG0 HeRe</v-card-title>
    <v-row justify="space-around">
      <v-icon large color="green darken-2">mdi-google</v-icon>

      <v-icon large color="blue darken-2">mdi-facebook</v-icon>

      <v-icon large color="purple darken-2">mdi-twitter</v-icon>

      <v-icon large color="teal darken-2">mdi-linkedin</v-icon>
    </v-row>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Password" type="password"></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field label="Username"></v-text-field>
          <v-text-field label="Email"></v-text-field>
          <v-text-field label="Password" type="password"></v-text-field>
          <v-text-field label="Confirm Password" type="password"></v-text-field>
          <span class="caption grey--text text--darken-1">Please enter a password for your account</span>
        </v-card-text>
      </v-window-item>
    </v-window>

    <div class="text-center">
      <v-btn class="ma-2" tile color="indigo" dark>
        <span>{{ currentTitle }}</span>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text x-small @click="step--">Forgot Password</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn text x-small @click="step++">{{ currentBtn }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  //   name: "login",
  data() {
    return {
      email: "",
      password: "",
      step: 1
    };
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ]),
    currentTitle() {
      switch (this.step) {
        case 1:
          return "LOGIN";
        case 2:
          return "SIGN UP";
        default:
          return "LOGIN";
      }
    },
    currentBtn() {
      switch (this.step) {
        case 1:
          return "SIGN UP";
        case 2:
          return "LOGIN";
        default:
          return "SIGN UP";
      }
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleSubmit() {
      // Perform a simple validation that email and password have been typed in
      if (this.email != "" && this.password != "") {
        this.login({ email: this.email, password: this.password });
        this.password = "";
      }
    }
  }
};
</script>
<style scoped>
.link {
  text-decoration: none;
}
</style>