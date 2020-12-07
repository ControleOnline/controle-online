<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <ContractSearching />
      </div>
    </div>
  </q-page>
</template>

<script>
import ContractSearching from '../../components/contract/ContractSearching';

export default {
  name      : 'ContractIndexPage',

  components: {
    ContractSearching,
  },

  data () {
    return {

    }
  }
}
</script>