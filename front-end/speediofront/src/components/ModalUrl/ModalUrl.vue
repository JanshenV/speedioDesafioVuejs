<template>
  <div
    class="backdrop"
    @click.self="toggleModal"
  >
    <div class="modalContainer">
      <form
        class="modalForm"
        @submit.prevent="urlCreation(urlFormData)"
      >
        <label>Título da url: </label>
        <input
          type="text"
          v-model="urlFormData.title"
          required
        >

        <label>Endereço da url:</label>
        <input
          type="text"
          v-model="urlFormData.url_address"
          required
        >

        <button class="confirmButton">Adicionar Url</button>
      </form>
      <button
        class="closeModal"
        @click="toggleModal"
      >Cancelar</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "ModalUrl",
  props: ["toggleModal", "urlCreation"],
  data() {
    const urlFormData = {
      visits: 0,
      title: "",
      url_address: "",
    };

    return {
      urlFormData,
    };
  },
};
</script>

<style scoped>
@import "./styles.css";
</style>