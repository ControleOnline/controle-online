<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <CompanySearching />
      </div>
    </div>
  </q-page>
</template>

<script>
import CompanySearching from './../../components/company/CompanySearching';

export default {
  components: {
    CompanySearching,
  },

  data () {
    return {

    }
  }
}
</script>
