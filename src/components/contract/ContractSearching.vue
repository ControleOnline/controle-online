<template>
  <div>
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
      <template v-slot:top>
        <div class="col-3 q-mb-md text-h6">
          Contratos
        </div>
        <div class="col-9 q-mb-md">
          <div class="row justify-end">
            <q-btn
              label   ="Novo contrato"
              icon    ="add"
              size    ="md"
              color   ="primary"
              class   ="q-ml-sm"
              @click  ="createNewContract"
              :loading="isCreating"
            />
          </div>
        </div>

        <div class="col-sm-6 col-xs-12 q-pa-md">
          <q-input stack-label
              label   ="Buscar por"
              debounce="1000"
              v-model ="filters.text"
              class   ="full-width"
          />
        </div>
        <div class="col-sm-6 col-xs-12 q-pa-md">
          <q-select stack-label
              label   ="Status do contrato"
              v-model ="filters.status"
              :options="statuses"
              class   ="full-width"
          >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                    Sem resultados
                    </q-item-section>
                </q-item>
            </template>
          </q-select>
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id"            :props="props">
            <q-btn outline dense
              :to   ="{ name: 'ContractDetails', params: { id: props.row.id } }"
              :label="props.cols[0].value"
              class ="full-width"
            />
          </q-td>
          <q-td key="beneficiario" :props="props">{{ props.row.beneficiario }}</q-td>
          <q-td key="dataInicio"   :props="props">{{ props.cols[2].value    }}</q-td>
          <q-td key="dataFim"      :props="props">{{ props.cols[3].value    }}</q-td>
          <q-td key="status"       :props="props">
            {{ $t(`contracts.statuses.${props.row.status}`) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const SETTINGS = {
  visibleColumns: [
    'id'          ,
    'beneficiario',
    'dataInicio'  ,
    'dataFim'     ,
    'status'      ,
  ],
  columns       : [
    {
      name  : 'id',
      field : 'id',
      align : 'left',
      format: (val, row) => {
        return `#${val}`;
      },
      label : 'ID'
    },
    {
      name : 'beneficiario',
      align: 'left',
      field: 'beneficiario',
      label: 'Contratante'
    },
    {
      name  : 'dataInicio',
      field : 'dataInicio',
      align : 'left',
      format: (val, row) => {
        return val.replace(/^(\d{4})\-(\d{2})\-(\d{2})T00:00:00\+00:00$/g,"\$3\/\$2\/\$1");
      },
      label : 'Data inicio'
    },
    {
      name  : 'dataFim',
      field : 'dataFim',
      align : 'left',
      format: (val, row) => {
        if (typeof val == 'string'){
          return val.replace(/^(\d{4})\-(\d{2})\-(\d{2})T00:00:00\+00:00$/g,"\$3\/\$2\/\$1");
        }else{
          return '-';
        }
      },
      label : 'Data fim'
    },
    {
      name : 'status',
      field: 'status',
      align: 'left',
      label: 'Status'
    },
  ],
};

Object.freeze(SETTINGS);

export default {
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
    let statuses = [
      {
        'label': 'Todos',
        'value': -1
      },
      {
        'label': 'Proposta',
        'value': 'Draft'
      },
      {
        'label': 'Aguardando assinatura',
        'value': 'Waiting approval'
      },
      {
        'label': 'Ativo',
        'value': 'Active'
      },
      {
        'label': 'Cancelado',
        'value': 'Canceled'
      },
      {
        'label': 'Alterado',
        'value': 'Amended'
      },
    ];

    return {
      settings  : SETTINGS,
      statuses  : statuses,
      data      : [],
      isCreating: false,
      filters   : {
        text   : null,
        status : statuses[0],
        company: null,
      },
      pagination: {
        sortBy     : 'dataInicio',
        descending : false,
        page       : 1,
        rowsPerPage: 10,
        rowsNumber : 10,
      },
    }
  },

  computed: {
    ...mapGetters({
      isLoading : 'contracts/isLoading' ,
      error     : 'contracts/error'     ,
      violations: 'contracts/violations',
      items     : 'contracts/items'     ,
      totalItems: 'contracts/totalItems',
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

      for (let i in items) {
        let item = items[i];

        let beneficiario = item.contractPeople.find(people => people.peopleType == 'Beneficiary');

        data.push({
          '@id'         : item['@id'],
          'id'          : item['@id'].match(/^\/my_contracts\/([a-z0-9-]*)$/)[1],
          'beneficiario': beneficiario ? beneficiario.people.name : '',
          'dataInicio'  : item.startDate,
          'dataFim'     : item.endDate,
          'status'      : item.contractStatus,
        });
      }

      this.data = data;
    },

    'filters.text'() {
      this.onRequest({
        pagination: this.pagination,
        filter    : this.filters,
      });
    },

    'filters.status'() {
      this.onRequest({
        pagination: this.pagination,
        filter    : this.filters,
      });
    },
  },

  methods: {
    ...mapActions({
      getItems: 'contracts/getItems',
      reset   : 'contracts/reset'   ,
      create  : 'contracts/saveContract',
    }),

    createNewContract() {
      this.isCreating = true;

      this.create({
        values: {},
        params: {
          'myProvider': this.myCompany.id
        }
      })
        .then(contract => {
          if (contract['@id']) {
            let id = contract['@id'].match(/^\/my_contracts\/([a-z0-9-]*)$/)[1];

            this.$router.push({
              name  : 'ContractDetails',
              params: { id }
            });
          }
        })
        .finally(() => {
          this.isCreating = false;
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

      if (this.filters.text != null && this.filters.text.length > 0) {
        if (this.filters.text.length < 2)
          return;

        if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(this.filters.text)) {
          params['searchBy'] = this.filters.text.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/,"\$3\-\$2\-\$1");
        }
        else {
          params['searchBy'] = this.filters.text;
        }
      }
      else {
        if (this.filters.status != null && this.filters.status.value != -1) {
          params['contractStatus'] = this.filters.status.value;
        }
      }

      if (this.filters.company != null) {
        params['myProvider'] = this.filters.company.id;
      }

      params['mycontract[startDate]'] = 'desc';

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