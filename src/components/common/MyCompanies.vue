<template>
  <q-btn-dropdown outline
    color     ="primary"
    text-color="white"
    :label    ="currentCompany !== null ? currentCompany.name : 'Loading...'"
    :loading  ="isLoading"
    class     ="ellipsis full-width"
  >
    <q-list>
      <q-item clickable v-close-popup dense
        v-for="(company, index) in myCompanies"
        :key  ="index"
        @click="onCompanySelection(company)"
      >
        <q-item-section>
          <q-item-label lines="1">{{ company.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data () {
    return {
      myCompanies   : [],
      currentCompany: null,
      menuOpen      : false,
    }
  },

  created() {
    this.getMyCompanies();
  },

  computed: {
    ...mapGetters({
      isLoading: 'people/isLoading',
    }),
  },

  methods: {
    ...mapActions({
      getCompanies: 'people/myCompanies'   ,
      setCompany  : 'people/currentCompany',
    }),

    getMyCompanies() {
      this.getCompanies()
        .then(response => {
          let data = [];

          if (response.success === true && response.data.length) {
            for (let index in response.data) {
              let item = response.data[index];
              let logo = null;

              if (item.logo !== null) {
                logo = '//' + item.logo.domain + item.logo.url;
              }

              data.push({
                'id'  : item.id,
                'name': item.alias,
                'logo': logo || null
              });
            }
          }

          this.myCompanies    = data;
          this.currentCompany = data.length > 0 ? data[0] : null;

          if (this.currentCompany !== null)
            this.setCompany(data[0]);
        });
    },

    onCompanySelection(company) {
      this.currentCompany = company;

      this.setCompany(company);

      this.$emit('selected', company);
    },
  },
};
</script>
