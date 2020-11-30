<template>
  <q-page padding>
    <InvoiceDetails />
  </q-page>
</template>

<script>
import InvoiceDetails from '../../../components/invoice/comission/InvoiceDetails';

export default {
  name      : 'ComissionDetailsPage',

  components: {
    InvoiceDetails,
  },

  data () {
    return {

    }
  }
}
</script>
