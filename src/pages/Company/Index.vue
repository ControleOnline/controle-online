<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card style="min-height: 90vh;">
          <div class="q-pa-md text-h6">
            Minha empresa
          </div>

          <div class="q-pa-md text-subtitle1 text-center">
            <q-avatar size="80px">
              <img :src="gravatar()">
            </q-avatar>
            <div class="q-pa-md text-subtitle1">
              {{ myCompany ? myCompany.name : '' }}
            </div>
          </div>

          <q-tabs
            :horizontal="$q.screen.gt.xs"
            align      ="justify"
            v-model    ="currentTab"
            class      ="bg-white text-primary"
          >
            <q-tab
              name ="employees"
              label="Funcionários"
            />
            <q-tab
              name ="address"
              label="Endereços"
            />
            <q-tab
              name ="documents"
              label="Documentos"
            />
            <q-tab
              name ="invoicement"
              label="Faturamento"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="currentTab"
          >
            <q-tab-panel name="employees">
              <CompanyEmployees   />
            </q-tab-panel>

            <q-tab-panel name="address">
              <CompanyAddress     />
            </q-tab-panel>

            <q-tab-panel name="documents">
              <CompanyDocuments   />
            </q-tab-panel>

            <q-tab-panel name="invoicement">
              <CompanyInvoicement />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import CompanyEmployees   from '../../components/company/CompanyEmployees';
import CompanyAddress     from '../../components/company/CompanyAddress';
import CompanyDocuments   from '../../components/company/CompanyDocuments';
import CompanyInvoicement from '../../components/company/CompanyInvoicement';
import { mapActions, mapGetters } from 'vuex';

export default {
  name      : 'CompanyIndexPage',

  components: {
    CompanyEmployees  ,
    CompanyAddress    ,
    CompanyDocuments  ,
    CompanyInvoicement,
  },

  data () {
    return {
      currentTab: 'employees',
      gravatar: function(){
        var md5 = require('md5');
        var user = this.$store.getters['auth/user'] || {};        
        return  'https://www.gravatar.com/avatar/' + md5(user.email)+'?s=400';
      }
    }
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
    }),
  },
}
</script>