<template>
  <div id="q-app">
    <Analytics />
    <ThemeConfig />
    <router-view v-if="defaultCompany" />
  </div>
</template>
<script>
import Analytics from "@controleonline/quasar-legacy-ui/quasar-common-ui/src/components/Common/Analytics";
import ThemeConfig from "@controleonline/quasar-layout-ui/src/layouts/ThemeConfig";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Analytics,
    ThemeConfig
  },
  name: "App",
  methods: {
    ...mapActions({
      setIndexRoute: "auth/setIndexRoute",
      peopleDefaultCompany: "people/defaultCompany",

    }),
  },
  created() {
    this.setIndexRoute();
    this.peopleDefaultCompany();
  },
  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
  }

};
</script>
