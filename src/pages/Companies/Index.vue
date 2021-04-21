<template>
  <q-page padding>
    <q-card style="min-height: 90vh;">
      <q-card-section>
        <div class="row">
          <div class="col-4 q-mb-md text-h6 text-left">
            {{ $t('Empresas') }}
          </div>
          <div class="col-8 q-mb-md">
            <div class="row justify-end">
              <q-btn
                :label ="$t('Nova empresa')"
                icon   ="add"
                size   ="md"
                color  ="primary"
                class  ="q-ml-sm"
                :to    ="{
                  name: 'CompaniesCreate'
                }"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <EmpresasTabela />
    </q-card>
  </q-page>
</template>

<script>
import EmpresasTabela from './../../components/companies/EmpresasTabela';

export default {
  name      : 'CompaniesIndex',

  components: {
    EmpresasTabela,
  },

  computed: {
    user() {
      return this.$store.getters['auth/user'] || {};
    },
  },

  data () {
    return {

    }
  },

  methods: {

  },
}
</script>
