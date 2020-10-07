<template>
  <div class="row">
    <div class="col-12 q-mt-md">
      <h1>Dados da empresa</h1>
    </div>
  </div>
</template>

<script>
// import { date, extend }           from 'quasar';
// import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    console.log('teste');
  },

  data() {
    return {
      dialog  : false,
      saving  : false,
    };
  },

  mounted() {
    console.log('TESTE');
  },

  computed: {
    // ...mapGetters({
    //   isLoading: 'profile/isLoading'    ,
    //   myCompany: 'people/currentCompany',
    // }),

    // user() {
    //   return this.$store.getters['auth/user'];
    // },
  },

  watch: {
    
  },

  methods: {
    
  },
};
</script>