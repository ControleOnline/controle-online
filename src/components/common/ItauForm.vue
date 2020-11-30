<template>
  <q-card style="width: 815px !important; height: 100%">
    <q-form
      ref    ="myForm"
      :action="invoiceUrl"
      method ="post"
      class  ="q-mt-sm"
      target ="SHOPLINE"
    >
      <input type="hidden" name="DC" :value="itauHash" />
    </q-form>

    <q-card-section style="height: 500px !important;">
      <iframe name="SHOPLINE" width="100%" height="100%" frameBorder="0">
        <p>This browser does not support IFrame.</p>
      </iframe>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props     : {
    invoiceUrl: {
      type    : String,
      required: true,
    },
    itauHash : {
      type    : String,
      required: true,
    },
  },

  mounted() {
    this.$refs.myForm.$el.submit();
  },

  data() {
    return {

    };
  },
};
</script>
