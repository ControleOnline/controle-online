<template>
  <div class="row q-pa-md">
    <div class="col-12">
      <OrderSearching :search="false" :invoiceId="invoiceId" />
    </div>
  </div>
</template>

<script>
import { date, extend } from 'quasar';
import OrderSearching   from '../../order/OrderSearching';

export default {
  components: {
    OrderSearching,
  },

  props: {
    invoiceId: {
      type    : String,
      required: true,
    }
  },

  created() {

  },

  data() {
    return {

    };
  },

  computed: {

  },

  watch: {

  },

  methods: {

  },
};
</script>