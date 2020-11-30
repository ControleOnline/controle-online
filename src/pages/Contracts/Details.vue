<template>
  <q-page padding>
    <ContractDetails />
  </q-page>
</template>

<script>
import ContractDetails from '../../components/contract/ContractDetails';

export default {
  name      : 'ContractDetailsPage',

  components: {
    ContractDetails,
  },

  data () {
    return {

    }
  }
}
</script>
