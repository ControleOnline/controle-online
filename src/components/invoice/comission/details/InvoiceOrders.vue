<template>
  <q-table
      :loading        ="isLoading"
      :data           ="data"
      :columns        ="settings.columns"
      :pagination.sync="pagination"
      @request        ="onRequest"
      row-key         ="id"
      :visible-columns="settings.visibleColumns"
      style           ="min-height: 90vh;"
  >    
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id"                :props="props">
          <q-btn outline dense
            :to   ="{ name: 'SalesOrderDetails', params: { id: props.row.main_id }}"
            :label="`#${props.row.main_id}`"
            :style="{color:props.row.color_status}"
            class ="full-width"
          />		  
        </q-td>
        <q-td key="notaFiscal"        :props="props">{{ props.row.notaFiscal }}</q-td>        
        <q-td key="dataPedido"        :props="props">{{ props.cols[2].value }}</q-td>
        <q-td key="ultimaModificacao" :props="props">{{ props.cols[3].value }}</q-td>
        <q-td key="status"            :props="props" :style="{color:props.row.color_status}">
          {{ $t(`order.statuses.${props.row.status}`) }}
        </q-td>
        <q-td key="coleta"            :props="props">
          {{ props.row.localColeta  }}<br/>{{ props.row.coleta  }}
        </q-td>
        <q-td key="entrega"           :props="props">
          {{ props.row.localEntrega }}<br/>{{ props.row.entrega }}
        </q-td>
        <q-td key="transportadora"    :props="props">
          {{ props.row.transportadora }}
        </q-td>        
        <q-td key="preco"             :props="props">{{ props.cols[8].value }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { date }                   from 'quasar';
import { formatMoney  }           from '../../../../utils/formatter';
import { mapActions, mapGetters } from 'vuex';

const SETTINGS = {
  visibleColumns: [
    'id'               ,
    'notaFiscal'       ,
    'dataPedido'       ,
    'ultimaModificacao',
    'status'           ,
    'coleta'           ,
    'entrega'          ,
    'transportadora'   ,    
    'preco'            ,
  ],
  columns       : [
    {
      name  : 'id',
      field : 'id',
      align : 'left',
      label : 'ID'
    },
    {
      name : 'notaFiscal',
      field: 'notaFiscal',
      align: 'left',
      label: 'Nota Fiscal',
      format: (val, row) => {
        return val?'#'+val:''
      },
    },    
    {
      name  : 'dataPedido',
      field : 'dataPedido',
      align : 'left',
      format: (val, row) => {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
      label : 'Data do pedido'
    },
    {
      name  : 'ultimaModificacao',
      field : 'ultimaModificacao',
      align : 'left',
      format: (val, row) => {
        return date.formatDate(val, 'DD/MM/YYYY HH:mm:ss')
      },
      label : 'Ultima alteração'
    },
    {
      name  : 'status',
      field : 'status',
      align : 'left',
      label : 'Status'
    },
    {
      name : 'coleta',
      field: 'coleta',
      align: 'left',
      label: 'Coleta'
    },
    {
      name : 'localColeta',
      field: 'localColeta',
      align: 'left',
      label: 'Local de coleta'
    },
    {
      name : 'entrega',
      field: 'entrega',
      align: 'left',
      label: 'Entrega'
    },
    {
      name : 'localEntrega',
      field: 'localEntrega',
      align: 'left',
      label: 'Local de entrega'
    },
    {
      name : 'transportadora',
      field: 'transportadora',
      align: 'left',
      label: 'Transportadora'
    },    
    {
      name  : 'preco',
      field : 'preco',
      align : 'left',
      format: (val, row) => {
        return formatMoney(val, 'BRL', 'pt-br');
      },
      label: 'Comissão'
    },
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    invoiceId: {
      type    : String,
      required: false,
      default : null,
    },
  },

  created() {
    if (this.myCompany !== null) {
      this.filters.company = this.myCompany;
      this.onRequest({
        pagination: this.pagination,
        filter    : this.filters,
      });
    }
  },

  beforeDestroy() {
    this.reset();
  },

  data() {
    return {
      settings  : SETTINGS,
      data      : [],
      filters   : {
        company: null,
      },
      pagination: {
        sortBy     : 'ultimaModificacao',
        descending : false,
        page       : 1,
        rowsPerPage: 10,
        rowsNumber : 10,
      },
    }
  },

  computed: {
    ...mapGetters({
      isLoading : 'comissionOrder/isLoading' ,
      error     : 'comissionOrder/error'     ,
      violations: 'comissionOrder/violations',
      items     : 'comissionOrder/items'     ,
      totalItems: 'comissionOrder/totalItems',
      myCompany : 'people/currentCompany',
    }),
  },

  watch: {
    myCompany(company) {
      if (company !== null) {
        this.filters.company = company;
        this.onRequest({
          pagination: this.pagination,
          filter    : this.filters,
        });
      }
    },

    totalItems(val) {
      this.pagination.rowsNumber = val;
    },

    items(items) {
      if (!items)
        return;

      let data = [];

      for (let index in items) {
        let item = items[index];

        data.push({
          '@id'              : item['@id'],
          'main_id'          : item.mainOrder['@id'].match(/^\/sales\/orders\/([a-z0-9-]*)$/)[1],
          'notaFiscal'       : item.invoiceTax.length > 0 ? '#'+item.invoiceTax[0].invoiceTax.invoiceNumber : '',
          'dataPedido'       : item.orderDate,
          'ultimaModificacao': item.alterDate,
          'status'           : item.orderStatus.status,
          'color_status'     : item.orderStatus.color,
          'fornecedor'       : item.client.alias,
          'coleta'           : item.retrievePeople !== null ? item.retrievePeople.name : '',
          'localColeta'      : item.quote !== null ? `${item.quote.cityOrigin.city} / ${item.quote.cityOrigin.state.uf}` : '',
          'entrega'          : item.deliveryPeople !== null ? item.deliveryPeople.name : '',
          'localEntrega'     : item.quote !== null ? `${item.quote.cityDestination.city} / ${item.quote.cityDestination.state.uf}` : '',
          'transportadora'   : item.quote !== null ? item.quote.carrier.name : '',          
          'preco'            : item.price,
        });
      }

      this.data = data;
    },
  },

  methods: {
    ...mapActions({
      getItems: 'comissionOrder/getItems',
      reset   : 'comissionOrder/reset'   ,
    }),

    onRequest(props) {
      let {
          page,
          rowsPerPage,
          rowsNumber,
          sortBy,
          descending
      }          = props.pagination;
      let filter = props.filter;
      let params = { itemsPerPage: rowsPerPage, page };

      if (this.filters.company != null) {
        params['myProvider'] = this.filters.company.id;
      }

      if (this.invoiceId !== null) {
        params['invoice.invoice'] = this.invoiceId;
      }

      params['order[alterDate]'] = 'desc';

      this.getItems(params)
        .then(() => {
          this.pagination.page        = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy      = sortBy;
          this.pagination.descending  = descending;
        });
    },
  },
};
</script>