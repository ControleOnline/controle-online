<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <InvoiceSearching />
      </div>
    </div>
  </q-page>
</template>

<script>
import InvoiceSearching from './../../components/invoice/pay/InvoiceSearching';

export default {
  components: {
    InvoiceSearching,
  },

  data () {
    return {

    }
  }
}
</script>
