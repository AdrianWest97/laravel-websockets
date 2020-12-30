<template>
<div class="container my-16">
<v-row justify="center" dense>
  <v-col cols="12" class="justify-content-center" md="5" lg="4">
    <v-card outlined>
      <v-card-title headline>Login</v-card-title>
      <v-card-text>
        <v-form
         @submit.prevent="login"
          v-model="valid"
       lazy-validation
         >
          <v-text-field 
          outlined dense
           label="Email address"
            required 
            v-model="form.email"
             :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          <v-text-field
           type="password"
            outlined 
            dense 
            label="Password"
            required v-model="form.password"
            :rules="[v => !!v || 'This field is required']"
             ></v-text-field>
            <div class="text-danger" v-if="errors.email">{{ errors.email[0] }}</div>

          <v-btn
           :loading="loading"
            type="submit"
             :disabled="!valid"
              color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</div>
</template>

<script>
import User from "../apis/User";

export default {
  data:() => ({
        valid:true,
        loading:false,
      form: {
        email:null,
        password:null,
      },
      errors: []
  }),

  methods: {
    login() {
      this.loading = true;
      User.login(this.form)
        .then(response => {
          this.$store.commit("LOGIN", true);
          //set token
          localStorage.setItem("token", response.data.token);
          //set user
          this.$store.commit("AUTH_USER", response.data.user);
          this.loading = false
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
                    this.loading = false

        });
    }
  }
};
</script>
