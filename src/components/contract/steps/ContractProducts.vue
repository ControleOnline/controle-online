<template>
  <!-- eslint-disable -->
  <q-table hide-pagination
    :loading        ="isLoading"
    :data           ="data"
    :columns        ="settings.columns"
    :pagination.sync="pagination"
    @request        ="onRequest"
    row-key         ="id"
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
        <q-td key="payer"    :props="props">{{ props.row.payer    }}</q-td>
        <q-td key="parcels"  :props="props">{{ props.row.parcels  }}</q-td>
        <q-td auto-width>
          <q-btn flat round dense v-if="editMode"
            color   ="red"
            icon    ="delete"
            @click  ="removeItem(props.row)"
            :loading="props.row._bussy"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import { formatMoney }            from '../../../utils/formatter';

const SETTINGS = {
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
    {
      name : 'payer',
      field: 'payer',
      align: 'left',
      label: 'Pagador'
    },
    {
      name : 'parcels',
      field: 'parcels',
      align: 'left',
      label: 'Parcelado em'
    },
    {
      name : 'action'
    }
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    contract: {
      type    : Object,
      required: true
    },
    editMode: {
      type    : Boolean,
      required: false,
      default : true
    },
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

  computed: {
    ...mapGetters({
      myProvider: 'people/currentCompany',
      user      : 'auth/user',
    }),
  },

  methods: {
    ...mapActions({
      getItems: 'contracts/getContractProducts',
      delete  : 'contracts/deleteContractProduct',
    }),

    reload() {
      this.onRequest({
        pagination: this.pagination,
        filter    : null,
      });
    },

    removeItem(item) {
      if (window.confirm(this.$t('Are you sure about to remove this element?'))) {
        item._bussy = true;
        this.delete(`/my_contract_products/${item['@id']}`)
          .then (data => {
            if (data) {
              this.reload();
            }
          })
          .catch(error => {
            this.$q.notify({
              message : error.message,
              position: 'bottom',
              type    : 'negative',
            });
          })
          .finally(() => {
            item._bussy = false;
          });
      }
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

      let payload = {
        contractId: this.contract['@id'].replace(/\D/g, ""),
        params    : {}
      };

      payload.params[this.user.type == 'admin' ? 'myCompany' : 'myProvider'] = this.myProvider.id;

      this.getItems(payload)
        .then(response => {

          this.pagination.page        = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy      = sortBy;
          this.pagination.descending  = descending;

          // set data

          if (response.members) {
            let data = [];

            response.members.forEach(product => {
              data.push({
                '@id'     : product.id,
                'name'    : product.product_name,
                'quantity': product.quantity,
                'price'   : formatMoney(product.product_price, 'BRL', 'pt-br'),
                'payer'   : product.payer_name === null ? '-' : product.payer_name,
                'parcels' : product.parcels == 0 ? '-' : `${product.parcels} ${product.parcels == 1 ? 'vez' : 'vezes'}`,
                '_bussy'  : false,
              });
            });

            this.data = data;

            this.$emit('loaded', response.total);
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
