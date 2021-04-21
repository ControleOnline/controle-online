<template>
  <q-page padding>
    <q-card style="min-height: 90vh;">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md text-h6 text-left">
            {{$t('Nova empresa')}}
          </div>
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
