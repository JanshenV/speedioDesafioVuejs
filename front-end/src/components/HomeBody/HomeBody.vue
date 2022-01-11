<template>
  <div class="homeBody-container">
    <div
      class="createUrl"
      @click="toggleModal"
    >
      Adicionar Url
    </div>
    <div class="tableContainer">
      <h1 class="topHundreTitle"> TOP 100 URL </h1>
      <div class="tableHeader">
        <span>Título</span>
        <span>Url</span>
        <span>Visitas</span>
        <img
          class="deleteIconDisplayNone"
          :src="deleteIcon"
          :alt="deleteIcon"
        />
      </div>
      <div
        class="tableLine"
        v-for="url in urlData"
        :key="url.title"
      >
        <span>{{url.title}}</span>
        <a
          class="urlAddress"
          :href="url.url_address"
          target="_blank"
          @click="countVisits(url)"
        >{{url.url_address}}
        </a>
        <span>
          {{url.visits}}
        </span>

        <img
          class="deleteIcon"
          :src="deleteIcon"
          :alt="deleteIcon"
          @click="deleteUrl(url.id, url.url_address)"
        />
      </div>
    </div>

    <template v-if="modalUp">
      <ModalUrl
        :toggleModal="toggleModal"
        :urlCreation="urlCreation"
      />
    </template>
  </div>
</template>

<script>
import deleteIcon from "../../assets/thrashcan.svg";
import ModalUrl from "../ModalUrl/ModalUrl.vue";

export default {
  name: "HomeBody",
  components: { ModalUrl },
  props: ["urlData", "biltyToken"],
  data() {
    return {
      deleteIcon,
      modalUp: false,
    };
  },

  methods: {
    toggleModal() {
      this.modalUp = !this.modalUp;
    },

    async urlCreation(data) {
      const biltyPromise = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: String(this.biltyToken),
        },
        body: JSON.stringify({
          long_url: `${data.url_address}`,
          domain: "bit.ly",
        }),
      });
      const biltyResponse = await biltyPromise.json();

      const newLinkData = {
        visits: data.visits,
        title: data.title,
        url_address: biltyResponse.link,
      };
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(newLinkData),
      };

      const promise = await fetch("http://localhost:8000/url", requestOptions);
      const response = await promise.json();

      if (promise.status !== 201) {
        if (response.message.includes("Url")) {
          return alert(response.message);
        }
        return console.log(response);
      }
      window.location.reload(true);
    },

    async deleteUrl(id, urlAddress) {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: token },
      };

      const promise = await fetch(
        `http://localhost:8000/url/${id}`,
        requestOptions
      );

      const response = await promise.json();

      if (promise.status !== 200) {
        return console.log(response.message);
      }
      localStorage.removeItem(`${urlAddress}-Visits`);
      window.location.reload(true);
    },

    async fetchPutVisits(data) {
      const token = localStorage.getItem("token");
      const urlLocalStorage = localStorage.getItem(
        `${data.url_address}-Visits`
      );

      const requestOptions = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      };

      const promise = await fetch(
        `http://localhost:8000/url/${data.id}/?visit=${Number(
          urlLocalStorage
        )}`,
        requestOptions
      );

      const response = await promise.json();
      if (promise.status !== 200) {
        return console.log(response);
      }
      this.$router.go();
    },

    async countVisits(url) {
      let urlLocalStorage = localStorage.getItem(`${url.url_address}-Visits`);

      if (!urlLocalStorage) {
        localStorage.setItem(`${url.url_address}-Visits`, 1);
        await this.fetchPutVisits(url);
        return;
      }

      urlLocalStorage = Number(urlLocalStorage) + 1;
      localStorage.setItem(`${url.url_address}-Visits`, urlLocalStorage);

      await this.fetchPutVisits(url);
    },
  },
};
</script>

<style>
@import "./styles.css";
</style>