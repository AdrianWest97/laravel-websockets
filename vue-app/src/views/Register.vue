<template>
<div class="container my-16">
<v-row justify="center" dense>
    <v-col cols="12" class="justify-content-center" md="4" lg="4">
    <v-card outlined>
     <v-card-title headline>Register</v-card-title>
      <v-card-text>
         <v-form
         @submit.prevent="register"
          v-model="valid"
           lazy-validation
           ref="form"
         >
          <v-text-field 
          outlined dense
           label="Username"
            required 
            v-model="form.name"
             :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          <span class="text-danger" v-if="errors.name">
            {{ errors.name[0] }}
          </span>
            <v-text-field 
          outlined dense
           label="Email address"
            required 
            v-model="form.email"
             :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
             <v-text-field 
          outlined dense
           label="Password"
           type="password"
            required 
            v-model="form.password"
             :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
             <v-text-field 
          outlined dense
           label="Confirm password"
            required 
            type="password"
            v-model="form.password_confirmation"
             :rules="[v => !!v || 'This field is required']"
            ></v-text-field>
          <span class="text-danger" v-if="errors.password_confirmation">
            {{ errors.password_confirmation[0] }}
          </span>
        <v-btn
           :loading="loading"
            type="submit"
             :disabled="!valid"
              color="primary">Register</v-btn>
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
  data() {
    return {
         valid:true,
        loading:false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: []
    };
  },

  methods: {
    register() {
      User.register(this.form)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>
