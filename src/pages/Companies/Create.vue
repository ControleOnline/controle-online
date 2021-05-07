<template>
  <q-page padding>
    <q-card class="q-mb-sm">
      <q-card-section>
        <q-breadcrumbs>
          <q-breadcrumbs-el
            icon="home"
            :to ="{ name: 'DashboardIndex' }"
          />
          <q-breadcrumbs-el
            label="Empresas"
            icon ="business"
            :to  ="{ name: 'CompaniesIndex' }"
          />
          <q-breadcrumbs-el
            label="Nova empresa"
          />
        </q-breadcrumbs>
      </q-card-section>
    </q-card>

    <q-card style="min-height: 90vh;">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md">
            <FormEmpresa />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import FormEmpresa    from '../../components/companies/FormEmpresa';

export default {
  components: {
    FormEmpresa
  },

  data () {
    return {
    }
  },
}
</script>
