<template>
  <q-layout view="lHh Lpr lFf" class="bg-image" :style="style()">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MyCompanies from "../components/common/MyCompanies";
import { mapActions, mapGetters } from "vuex";
import { fetch } from "../boot/myapi";
import Analytics from "../utils/analytics";

export default {
  name: "MainLayout",  
  components: {},
  methods: {
    ...mapActions({
      config: "config/appConfig",
      peopleDefaultCompany: "people/defaultCompany",
    }),
    style() {
      console.log(this.defaultCompany);
      if (this.defaultCompany && this.defaultCompany.background){
        return "background: #182840 url('"+this.defaultCompany.background+"')";
      }else{
        return "background: #182840";
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
    this.config().then((config) => {
      if (config.gtmId !== null)
        Analytics.init({
          gtmId: config.gtmId,
        });
    });
    this.discoveryDefaultCompany()
  },
  computed: {
    ...mapGetters({
      cfLoading: "config/isLoading",
    })    
  },
  data() {
    return {
      defaultCompany: [],  
    };
  },
};
</script>

<style lang="scss">
.bg-image {
  background-color: #182840;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  -webkit-transition: background opacity 3s ease-in-out;
  -moz-transition: background opacity 3s ease-in-out;
  -o-transition: background opacity 3s ease-in-out;
  transition: background opacity 3s ease-in-out;
}
</style>
