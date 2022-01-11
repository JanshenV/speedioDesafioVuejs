<template>
  <div class="homepage">
    <HomeHeader
      :username="userData.username"
      :handleLogOut="handleLogOut"
    />
    <HomeBody
      :urlData="urlData"
      :biltyToken="biltyToken"
    />
  </div>
</template>

<script>
import HomeHeader from "../../components/HomeHeader/HomeHeader.vue";
import HomeBody from "../../components/HomeBody/HomeBody.vue";

export default {
  name: "Home",
  components: { HomeHeader, HomeBody },
  data() {
    const userData = {};
    const urlData = [];
    const biltyToken = "";
    const token = localStorage.getItem("token");

    return {
      userData,
      urlData,
      biltyToken,
      token,
    };
  },

  methods: {
    pushToLogin() {
      this.$router.push({ name: "Login" });
    },

    handleLogOut() {
      localStorage.removeItem("token");
      this.pushToLogin();
    },

    async fetchUserData(token) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const promise = await fetch(
        "http://localhost:8000/users/profile",
        requestOptions
      );

      const response = await promise.json();
      if (promise.status !== 200) {
        if (response.message.includes("jwt")) {
          return this.handleLogOut();
        }
        return console.log(response);
      }

      this.userData = response.userData;
      this.biltyToken = response.biltyToken;
    },
    async fetchUserUrls(token) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const promise = await fetch("http://localhost:8000/url", requestOptions);
      const response = await promise.json();

      if (promise.status !== 200) {
        return console.log(response);
      }
      const localUrl = response.sort((a, b) => b.visits - a.visits);

      console.log(localUrl);
      this.urlData = localUrl;
    },
  },

  async mounted() {
    if (!this.token) {
      return this.pushToLogin();
    }
    await this.fetchUserData(this.token);
    await this.fetchUserUrls(this.token);
  },
};
</script>

<style scoped>
@import "./styles.css";
</style>