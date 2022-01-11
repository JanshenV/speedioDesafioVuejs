<template>
  <div class="login-container">
    <form
      @submit.prevent="handleSubmit"
      class="login-form"
    >
      <label>Email:</label>
      <input
        type="email"
        v-model="loginData.email"
        required
      >
      <label>Password:</label>
      <input
        type="password"
        v-model="loginData.password"
        required
      >
      <button type="submit">Login</button>
    </form>
    <div class="links">
      <div class="signup-link">
        <router-link :to="{name: 'Signup'}">
          Cadastrar-se
        </router-link>

        <div
          class="anonymous-button"
          @click="handleAnonymousLogin"
        >
          Login Anônimo
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const loginData = {
      email: "",
      password: "",
    };

    const anonymousLoginData = {
      email: "anonimo@email.com",
      password: "anonimo1",
    };

    return {
      loginData,
      anonymousLoginData,
    };
  },

  methods: {
    async fetchLogin(bodyData) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      };
      const promise = await fetch(
        "http://localhost:8000/users/login",
        requestOptions
      );

      const response = await promise.json();

      if (promise.status !== 200) {
        return alert(response.message);
      }
      const token = response.token;
      localStorage.setItem("token", token);
    },

    async handleSubmit() {
      await this.fetchLogin(this.loginData);
      this.$router.push({ name: "Home" });
    },

    async handleAnonymousLogin() {
      await this.fetchLogin(this.anonymousLoginData);
      this.$router.push({ name: "Home" });
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
@import "./styles.css";
</style>