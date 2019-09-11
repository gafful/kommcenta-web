<template>
  <v-card>
    <v-card-title class="headline">LOG0 HeRe</v-card-title>
    <v-row justify="space-around" v-if="step !== 3">
      <v-icon large color="green darken-2">mdi-google</v-icon>
      <v-icon large color="blue darken-2">mdi-facebook</v-icon>
      <v-icon large color="purple darken-2">mdi-twitter</v-icon>
      <v-icon large color="teal darken-2">mdi-linkedin</v-icon>
    </v-row>

    <v-window v-model="step">
      <v-window-item :value="1">
        <!-- <v-card-text> -->
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="showPass ? 'text' : 'password'"
            name="password"
            hint="At least 8 characters"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-form>
        <!-- </v-card-text> -->
      </v-window-item>

      <v-window-item :value="2">
        <!-- <v-card-text> -->
        <v-form ref="form1" v-model="svalid" lazy-validation>
          <v-text-field
            label="Username"
            v-model="username"
            :counter="12"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field label="Email" v-model="email" :rules="emailRules"></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="showPass ? 'text' : 'password'"
            name="password"
            hint="At least 8 characters"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            v-model="cpassword"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.emailMatch]"
            :type="showPass ? 'text' : 'password'"
            name="cpassword"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">Please enter a password for your account</span>
        </v-form>
        <!-- </v-card-text> -->
      </v-window-item>

      <v-window-item :value="3">
        <v-card>
          <v-card-text>
            A verification email has been sent.
            Verify your email to continue.
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <div>
      <v-alert
        type="error"
        text
        prominent
        dismissible
        :value="authenticationError !== ''"
        transition="scale-transition"
      >{{ authenticationError }}</v-alert>
    </div>

    <div class="text-center" v-if="step !== 3">
      <v-btn
        class="mr-4"
        color="indigo"
        tile
        :disabled="!isFormValid"
        :loading="authenticating"
        loader="authenticating"
        @click="handleSubmit"
      >
        <span>{{ currentBtn }}</span>
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <v-card-actions v-if="step !== 3">
      <v-btn text x-small @click="step--">Forgot Password</v-btn>
      <div class="flex-grow-1"></div>
      <v-btn text x-small @click="step++">{{ otherBtn }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  //   name: "login",
  data() {
    return {
      valid: true,
      svalid: true,
      email: "",
      password: "",
      cpassword: "",
      username: "",
      step: 1,
      showPass: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: v => {
          return v === this.password || "The passwords you entered don't match";
        }
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "emailVerified",
      "shouldVerifyEmail",
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ]),
    currentBtn() {
      switch (this.step) {
        case 1:
          return "LOGIN";
        case 2:
          return "SIGN UP";
        default:
          return "LOGIN";
      }
    },
    otherBtn() {
      switch (this.step) {
        case 1:
          return "SIGN UP";
        case 2:
          return "LOGIN";
        default:
          return "SIGN UP";
      }
    },
    isFormValid() {
      if (this.step === 1) {
        return this.valid;
      } else {
        return this.svalid;
      }
    }
  },
  methods: {
    ...mapActions("auth", ["login", "signUp"]),
    handleSubmit(e) {
      this.showPass = false;
      if (e.target.innerText === "LOGIN") {
        if (this.$refs.form.validate()) {
          // this.snackbar = true;
          // return;
          this.login({ email: this.email, password: this.password });
          // return
          // this.email = "";
          // this.password = "";
          // (this.cpassword = ""), (this.username = "");
        }
      }

      if (e.target.innerText === "SIGN UP") {
        if (this.$refs.form1.validate()) {
          this.signUp({ email: this.email, password: this.password });
        }
      }
    }
  },
  watch: {
    shouldVerifyEmail() {
      this.step = 3;
    }
  }
};
</script>
<style scoped>
.link {
  text-decoration: none;
}
</style>