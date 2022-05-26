<template>
<body>
<!-- <div class="container-fluid"> -->
  <my-header></my-header>
<div class="grid-container">
  <div id="login" class="text-center">
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="invalidCredentials"
      >Invalid username and password!</div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="this.$route.query.registration"
      >Thank you for registering, please sign in.</div>
      <br>
      <div class="form-field">
      <label for="username" class="sr-only">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
        required
        autofocus
      />
      </div>  
      <br>
      <div class="form-field">
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      </div>
      <router-link class="need-account" :to="{ name: 'register' }">Need an account?</router-link>
      <button class="submit" type="submit">Sign in</button>
    </form>
    <div id="rem"></div>
  </div>
</div>
  <myfooter></myfooter>
<!-- </div>  -->
</body>
</template>

<script>
import authService from "../services/AuthService";
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue';

export default {
  name: "login",
  components: {
    'my-header':Header,
    'myfooter':Footer
    
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      invalidCredentials: false
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  }

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1C3948;
  padding: 10px;
  height: 100%;
}
  .container-fluid{
    background-color: #153438;
    height: 95vh;
  }

 form.form-signin {
  grid-column-start: 2;
  padding:20px;
  position:relative;
  
} 
.text-center {
  text-align: center;
}
h1 {
  margin: 3px 0px -20px 0px;
  font-size: 2rem;
  color: #EBA92A;
  font-family: "Playfair Display";
  
}
 .form-signin {
  background-color: hsl(0, 0%, 97%);
  background-position: center;
  background-size: 100vh;
  backdrop-filter: blur(5px);
  border-radius: 25px;
}  
#username.form-control {
  display: unset;
  width: auto;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 50;
  margin-left: .5rem;
  margin-top: 1rem;
}
#password.form-control {
  display: unset;
  width: auto;
  height: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 50;
  margin-left: .7rem;
  margin-top: 1rem;
}
.need-account {
  text-decoration: none;
  color: #1C3948;
  font-family: "Cascadia Code";
  font-size: 13px;
}
.need-account:hover {
  color: #311D00;
  text-decoration: underline;
}
.submit {
  background-color: #EBA92A;
  border: none;
  font-size: 15px;
  font-family: "Cascadia Code";
  margin-left: 10px;
  margin-top: 5px;
  width: 70px;
  padding: 3px;
  border-radius: 3px;
}
.submit:hover {
  background-color: #311D00;
  color: rgb(144, 167, 194);
}
.alert {
  margin-top: 1rem;
}
.form-field label{
  font-family: "Cascadia Code";
  color: black;
}

</style>