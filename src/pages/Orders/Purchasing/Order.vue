<template>
  <q-page padding>
    <OrderDetails />
  </q-page>
</template>

<script>
import OrderDetails from '../../../components/order/purchasing/OrderDetails';

export default {
  name      : 'OrderDetailsPage',

  components: {
    OrderDetails,
  },

  data () {
    return {

    }
  }
}
</script>
