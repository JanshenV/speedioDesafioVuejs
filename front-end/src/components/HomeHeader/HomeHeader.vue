<template>
  <div class="headerhome-container">
    <div class="profile">
      <img
        class="profilepic-icon"
        :src="profilePic"
        :alt='profile_pic'
      />
      <span>{{username}}</span>
      <img
        class="logout-icon"
        :src="iconLogout"
        :alt='iconLogout'
        @click="handleLogOut"
      />
    </div>
  </div>
</template>

<script>
import profilePic from "../../assets/profilepic.png";
import iconLogout from "../../assets/logout.png";

export default {
  name: "HeaderHome",
  props: ["username", "handleLogOut"],
  data() {
    return {
      profilePic,
      iconLogout,
    };
  },
};
</script>

<style>
@import "./styles.css";
</style>