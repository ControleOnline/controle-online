<template>
  <q-layout view="lHh Lpr lFf" class="bg-image" :style="style">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fetch } from '../boot/myapi';

export default {
  name: 'MainLayout',

  components: {

  },

  computed: {
    style() {
      return 'background: #182840'
    },

    /*
    style: function() {      
      const bg = fetch('/configs/app-theme', { method: 'GET' })
        .then(response => {
          if (response.data)
          return response.data;

          return null;
        })
        .then(data => {
          if (data.response)
            return data.response;

          return null;
        });

      return 'background: #182840'
    }
    */
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.bg-image {
  background-position: center    !important;
  background-repeat  : no-repeat !important;
  background-size    : cover     !important;  
}
</style>
