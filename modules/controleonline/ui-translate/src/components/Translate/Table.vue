<template>
  <DefaultTable :configs="configs" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
    configs() {
      return {
        externalFilters: false,
        store: "translates",
        categories: ["translates"],
        add: true,
        delete: true,
        filters: true,
        selection: false,
        search: false,
        columns: {
          category: {
            filters: {
              context: "translates",
              company: "/people/" + this.defaultCompany.id,
            },
          },
        },
      };
    },
  },
};
</script>
