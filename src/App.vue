<template>
  <div id="q-app">
    <Analytics />
    <ThemeConfig />
    <router-view v-if="defaultCompany" />
  </div>
</template>
<script>
import Analytics from "@controleonline/ui-common/src/components/Common/Analytics";
import ThemeConfig from "@controleonline/ui-layout/src/layouts/ThemeConfig";
import { mapActions, mapGetters } from "vuex";
import { ENTRYPOINT } from "./../config/entrypoint.js";


export default {
  components: {
    Analytics,
    ThemeConfig,
  },
  name: "App",
  data() {
    return {
      icons: [],
    };
  },
  methods: {
    ...mapActions({
      setIndexRoute: "auth/setIndexRoute",
      peopleDefaultCompany: "people/defaultCompany",
    }),
    setZoom() {
      let zoom = 0.8;
      var size = zoom < 1 ? parseFloat(100 / zoom) : 100;
      document.documentElement.style.setProperty("--zoom-width", size + "vw");
      document.documentElement.style.setProperty("--zoom-height", size + "vh");
      document.documentElement.style.setProperty("--zoom-level", zoom);
    },
    setIcon() {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/ico";
      link.href = ENTRYPOINT+"/files/download/1";
      document.head.appendChild(link);
    },
  },
  created() {
    this.setIcon();
    this.setIndexRoute();
    this.peopleDefaultCompany();
    this.setZoom();
  },
  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
  },
};
</script>
<style>
body {
  zoom: var(--zoom-level);
}
</style>
