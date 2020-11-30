<template>
  <q-table hide-pagination
    :loading        ="isLoading"
    :data           ="data"
    :columns        ="settings.columns"
    :pagination.sync="pagination"
    @request        ="onRequest"
    row-key         ="id"
    :visible-columns="settings.visibleColumns"
  >
    <template v-slot:top>
      <div class="col-3 q-mb-md text-h6">
        Produtos
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name"     :props="props">{{ props.row.name     }}</q-td>
        <q-td key="quantity" :props="props">{{ props.row.quantity }}</q-td>
        <q-td key="price"    :props="props">{{ props.row.price    }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatMoney }            from '../../../utils/formatter';

const SETTINGS = {
  visibleColumns: [
    'id'      ,
    'name'    ,
    'quantity',
    'price'   ,
  ],
  columns       : [
    {
      name : 'name',
      align: 'left',
      field: 'name',
      label: 'Produto'
    },
    {
      name : 'quantity',
      field: 'quantity',
      align: 'left',
      label: 'Quantidade'
    },
    {
      name : 'price',
      field: 'price',
      align: 'left',
      label: 'Preço'
    },
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    contract: {
      type    : Object,
      required: true
    }
  },

  data() {
    return {
      settings  : SETTINGS,
      data      : [],
      isLoading : false,
      pagination: {
        sortBy     : 'price',
        descending : false,
        page       : 1,
        rowsPerPage: 30,
        rowsNumber : 10,
      },
    }
  },

  methods: {
    ...mapActions({
      getItems: 'contracts/getContractProducts',
    }),

    reload() {
      this.onRequest({
        pagination: this.pagination,
        filter    : null,
      });
    },

    onRequest(props) {
      if (this.isLoading)
        return;

      let {
          page,
          rowsPerPage,
          rowsNumber,
          sortBy,
          descending
      }          = props.pagination;
      let filter = props.filter;
      let params = { itemsPerPage: rowsPerPage, page };

      this.isLoading = true;

      this.getItems(this.contract['@id'].match(/^\/my_contracts\/([a-z0-9-]*)$/)[1])
        .then(products => {

          this.pagination.page        = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy      = sortBy;
          this.pagination.descending  = descending;

          // set data

          if (products) {
            let data = [];

            products.forEach(product => {
              data.push({
                '@id'     : product.product['@id'],
                'name'    : product.product.product,
                'quantity': product.quantity,
                'price'   : formatMoney(product.price, 'BRL', 'pt-br'),
              });
            });

            this.data = data;

            this.$emit('loaded', data.length);
          }
        })
        .catch(error => {

        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>