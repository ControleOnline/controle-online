<template>
  <q-page padding>
    <q-card style="min-height: 90vh;">
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mb-md text-h6 text-left">
            {{$t('Novo plano')}}
          </div>
          <div class="col-12 q-mb-md">
            <FormPlano />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import FormPlano      from '../../components/plans/FormPlano';

export default {
  components: {
    FormPlano
  },

  data () {
    return {
    }
  },
}
</script>
