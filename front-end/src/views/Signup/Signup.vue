 <template>
  <div class="signup-container">

    <form
      class="signup-form"
      @submit.prevent="handleSubmit"
    >
      <label>Username:</label>
      <input
        type="text"
        v-model="signUpData.username"
        @click="handleError"
        required
      >
      <div
        v-if="errorUsername"
        :class="{error: errorUsername}"
      >
        <p>{{errorUsername}}</p>
      </div>

      <label>Email:</label>
      <input
        type="email"
        v-model="signUpData.email"
        @click="handleError"
        required
      >
      <div
        v-if="errorEmail"
        :class="{error: errorEmail}"
      >
        <p>{{errorEmail}}</p>
      </div>

      <label>Senha:</label>
      <input
        type="password"
        @click="handleError"
        v-model="signUpData.password"
        required
      >
      <div
        v-if="errorPassword"
        :class="{error: errorPassword}"
      >
        <p>{{errorPassword}}</p>
      </div>

      <button type="submit">
        Criar conta
      </button>

    </form>
    <div class="links">
      <div class="login-link">
        Já é cadastrado?
        <router-link :to="{name: 'Login'}">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    const signUpData = {
      username: "",
      email: "",
      password: "",
    };

    return {
      signUpData,
      errorPassword: "",
      errorEmail: "",
      errorUsername: "",
    };
  },

  methods: {
    async handleSubmit() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.signUpData),
      };

      const promise = await fetch(
        "http://localhost:8000/users",
        requestOptions
      );
      const response = await promise.json();

      if (promise.status !== 201) {
        if (response.message.includes("password"))
          return (this.errorPassword =
            "Senha deve ter no mínimo oito caracteres.");

        if (response.message.includes("Email"))
          return (this.errorEmail = response.message);

        if (response.message.includes("Username"))
          return (this.errorUsername = response.message);

        return console.log(response);
      }
      alert("cadastro realizado com sucesso.");
      this.$router.push({ name: "Login" });
    },

    handleError(e) {
      const targetedClick = e.target.type;

      if (targetedClick === "text") return (this.errorUsername = "");
      if (targetedClick === "email") return (this.errorEmail = "");
      if (targetedClick === "password") return (this.errorPassword = "");
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