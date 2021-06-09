<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <contract-list
          :config="setConfig"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ENTRYPOINT } from './../../config/entrypoint'

export default {
  methods: {
    setConfig(configs) {

      // config api

      configs.Api.setAsFake (false);
      configs.Api.setBaseUrl(ENTRYPOINT);
      configs.Api.setToken  (this.$store.getters['auth/user'].token);

      // config routes

      configs.Routes.Details.name = 'ContractDetails';

      // config params

      configs.Params.Company
        .getter = () => {
          return this.$store.getters['company/selectedCompany'].id;
        };
    },
  },
};
</script>
