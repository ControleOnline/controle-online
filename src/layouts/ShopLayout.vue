<template>
    <q-layout view="lHh lpr lFf" class="bg-image" :style="style()">
      <q-header elevated class="shadow-2 q-pa-sm">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-toolbar-title>
            Controle Online
          </q-toolbar-title>

        <q-space />

          <q-input dark dense standout class="q-ml-md" style="min-width:30%;">
            <template v-slot:append>
              <q-icon name="search" />
              <q-icon  class="cursor-pointer"  />
            </template>
          </q-input>

          <q-space />

          <q-btn to="/login" flat label="Login" icon="person" />
          <q-btn to="/shop/categories" flat label="Favoritos" icon="favorite" />
          <q-btn to="/shop/cart" flat icon="shopping_cart" />

        </q-toolbar>

       <q-toolbar>
        Aqui vai as categorias do menu
       </q-toolbar>

      </q-header>

      <q-page-container>
          <router-view />
      </q-page-container>

    </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { fetch } from "../boot/myapi";
import Analytics from "@controleonline/quasar-common-ui/src/utils/analytics";

export default {
  name: "ShopLayout",
  components: {},

  methods: {
    ...mapActions({
      config: "config/appConfig",
      peopleDefaultCompany: "people/defaultCompany",
    }),

    style() {
      if (this.defaultCompany && this.defaultCompany.background) {
        return "background-image: url('" + this.defaultCompany.background + "')";
      }
    },

    discoveryDefaultCompany() {
      this.peopleDefaultCompany().then((response) => {
        let data = [];
        if (response.success === true && response.data) {
          for (let index in response.data) {
            let item = response.data;
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
    /*
    this.config().then((config) => {
      if (config.gtmId !== null)
        Analytics.init({
          gtmId: config.gtmId,
        });
    });
    */

    this.discoveryDefaultCompany();
  },

  /*
  computed: {
    ...mapGetters({
      cfLoading: "config/isLoading",
    })
  },
  */

  data() {
    return {
      defaultCompany: [],
    };
  },
};
</script>
