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
    setZoom() {
      const zoom = 0.80;
      var adjustedWidth = window.innerWidth * 100 / (zoom * 100);
      var adjustedHeight = window.innerHeight * 100 / (zoom * 100);
      document.documentElement.style.setProperty('--zoom-level', zoom);
      document.documentElement.style.setProperty('--zoom-width', adjustedWidth + 'px');
      document.documentElement.style.setProperty('--zoom-height', adjustedHeight + 'px');
    }
  },
  created() {
    this.setIndexRoute();
    this.peopleDefaultCompany();
    this.setZoom();

  },
  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
  }

};
</script>
<style>
body {
  zoom: var(--zoom-level);
}
</style>