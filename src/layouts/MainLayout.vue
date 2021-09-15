<template>
  <q-layout view="lHh Lpr lFf" class="bg-image" :style="style()">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name   : "MainLayout",

  methods: {
    ...mapActions({
      peopleDefaultCompany: "people/defaultCompany",
    }),

    style() {
      if (this.defaultCompany && this.defaultCompany.background) {
        return "background-image: url('"+this.defaultCompany.background+"')";
      }
    },

    discoveryDefaultCompany() {
      this.peopleDefaultCompany().then((response) => {
        let data = [];
        if (response.success === true && response.data.length) {
          for (let index in response.data) {
            let item = response.data[index];
            let logo = null;
            let background = null;

            if (item.logo !== null) {
              logo = "https://" + item.logo.domain + item.logo.url;
            }
            if (item.background !== null) {
              background = "https://" + item.background.domain + item.background.url;
            }
            data.push({
              id: item.id,
              name: item.alias,
              logo: logo || null,
              background: background || null
            });
          }
        }
        this.defaultCompany = data[0];
      });
    },
  },

  mounted() {
    this.discoveryDefaultCompany()
  },

  data() {
    return {
      defaultCompany: [],
    };
  },
};
</script>