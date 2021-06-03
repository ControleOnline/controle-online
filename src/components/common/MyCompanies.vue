<template>
  <!-- eslint-disable -->
  <q-btn-dropdown outline
    color     ="primary"
    text-color="white"
    :label    ="currentCompany !== null ? currentCompany.name : 'Loading...'"
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
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    selected: {
      type    : Number,
      required: false,
      default : -1
    }
  },

  data () {
    return {
      myCompanies   : [],
      currentCompany: null,
      menuOpen      : false,
    }
  },

  created() {
    if (this.user.type === 'salesman') {
      this.getMyCompanies();
    } else if (this.user.type === 'admin') {
      this.loadCompanies({peopleId: this.user.people})
        .then(() => {
          this.setCompanies(this.userCompanies)
        })
    }
  },

  computed: {
    ...mapGetters({
      myCompany    : 'people/currentCompany',
      companies    : 'people/companies'     ,
      user         : 'auth/user'            ,
      userCompanies: 'company/companies'    ,
    }),
  },

  watch: {
    myCompany(company) {
      this.$emit('selected', company);
    },

    companies(companies) {
      this.setCompanies(companies);
    },
  },

  methods: {
    ...mapActions({
      getCompanies      : 'people/mySaleCompanies',
      setCompany        : 'people/currentCompany' ,
      loadCompanies     : 'company/loadCompanies',
      setSelectedCompany: 'company/setSelectedCompany'
    }),

    setCompanies(companies) {
      let data = [];

      for (let index in companies) {
        let item = companies[index];
        let logo = null;

        if (item.logo) {
          logo = 'https://' + item.logo.domain + item.logo.url;
        }

        data.push({
          'id'        : item.id,
          'name'      : item.alias || item.name,
          'logo'      : logo || null,
          'commission': item.commission,
        });
      }

      this.myCompanies = data;

      if (this.selected != -1) {
        let _company = data.find(companies => companies.id === this.selected);

        this.currentCompany = _company !== undefined ?
          _company : (data.length > 0 ? data[0] : null);
      }
      else
        this.currentCompany = data.length > 0 ? data[0] : null;

      if (this.currentCompany !== null) {
        this.setCompany(this.currentCompany);
        this.setSelectedCompany(this.currentCompany);
      }
    },

    getMyCompanies() {
      this.getCompanies()
        .then(response => {
          if (response.success === true && response.data.length) {
            this.setCompanies(response.data);
          }
        });
    },

    onCompanySelection(company) {
      this.currentCompany = company;

      this.setCompany(company);
      this.setSelectedCompany(company);
    },
  },
};
</script>
