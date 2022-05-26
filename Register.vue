<template>
  <body>
      <my-header></my-header>
    <div class="grid-container">
      
        <form class="form-register" @submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
          <div class="alert alert-danger" role="alert" v-if="registrationErrors">
          {{ registrationErrorMsg }}
      </div>
      <br>
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
      <br>
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <br>
      <input
        type="password"
        id="confirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        v-model="user.confirmPassword"
        required
      />
      <router-link :to="{ name: 'login' }">Have an account?</router-link>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Submit
      </button> 
    </form>
      </div>
    
    <myfooter></myfooter>
</body>
</template>
<script>
import authService from '../services/AuthService';
import Header from "../components/Header.vue"
import Footer from '../components/Footer.vue';

export default {
  name: 'register',
  components: {
    'my-header':Header,
    'myfooter':Footer
    
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      },
      registrationErrors: false,
      registrationErrorMsg: 'There were problems registering this user.',
    };
  },
  methods: {
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = 'Password & Confirm Password do not match.';
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: '/login',
                query: { registration: 'success' },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = 'Bad Request: Validation Errors';
            }
          });
      }
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = 'There were problems registering this user.';
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.grid-container {
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c3948;
  padding: 10px;
  height: 100%;
}

form.form-register {
  -ms-grid-column-span: unset;
  padding: 20px;
  position: relative;
}

h1 {
  margin: 3px 0px -20px 0px;
  font-size: 2rem;
  color: #EBA92A;
  font-family: "Playfair Display";
}
.form-register {
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
#confirmPassword.form-control {
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
.btn{
  background-color: #EBA92A;
  border: none;
  font-size: 15px;
  font-family: "Cascadia Code";
  margin-left: 10px;
  margin-top: 5px;
  margin-right: 5px;
  width: 70px;
  padding: 3px;
  border-radius: 3px;
}
.btn:hover {
  background-color: #311D00;
  color: #153438;
}
.sr-only{
  color: #c7831d;
}
</style>
