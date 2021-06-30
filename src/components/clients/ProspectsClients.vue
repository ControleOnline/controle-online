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
      :flat           ="true"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="id"                :props="props">
          <q-btn outline dense
            :label="`#${props.row.id}`"
            :style="{color:props.row.color_status}"
            class ="full-width"
            @click="$emit('selected', props.row.id)"
          />		  
        </q-td>
        <q-td key="cnpj"  :props="props">{{ props.cols[1].value }}</q-td>
        <q-td key="alias" :props="props">{{ props.row.alias     }}</q-td>
        <q-td key="name"  :props="props">{{ props.row.name      }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email     }}</q-td>
        <q-td key="phone" :props="props">{{ props.cols[5].value }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { date }                        from 'quasar';
import { mapActions, mapGetters }      from 'vuex';
import { formatDocument, formatPhone } from '@freteclick/quasar-common-ui/src/utils/formatter';

const SETTINGS = {
  visibleColumns: [
    'id'   ,
    'cnpj' ,
    'alias',
    'name' ,
    'email',
    'phone',
  ],
  columns       : [
    {
      name  : 'id',
      field : 'id',
      align : 'left',
      label : 'ID'
    },
    {
      name  : 'cnpj',
      field : 'cnpj',
      align : 'left',
      format: (val, row) => {
        return formatDocument(val);
      },
      label : 'CNPJ'
    },
    {
      name  : 'alias',
      field : 'alias',
      align : 'left',
      label : 'Nome fantasia'
    },
    {
      name : 'name',
      field: 'name',
      align: 'left',
      label: 'Razão social'
    },
    {
      name : 'email',
      field: 'email',
      align: 'left',
      label: 'Email'
    },
    {
      name  : 'phone',
      field : 'phone',
      align : 'left',
      format: (val, row) => {
        return formatPhone(val);
      },
      label : 'Telefone'
    },
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    fromDate: {
      type    : String,
      required: false,
    },
    toDate  : {
      type    : String,
      required: false,
    },
    searchBy: {
      type    : String,
      required: false,
    },
  },

  created() {
    if (this.myProvider !== null)
      this.onRequest({
        pagination: this.pagination
      });
  },

  data() {
    return {
      settings       : SETTINGS,
      data           : [],
      pagination     : {
        sortBy     : 'cnpj',
        descending : false,
        page       : 1,
        rowsPerPage: 30,
        rowsNumber : 10,
      },
    };
  },

  computed: {
    ...mapGetters({
      isLoading : 'client/isLoading' ,
      error     : 'client/error'     ,
      violations: 'client/violations',
      items     : 'client/items'     ,
      totalItems: 'client/totalItems',
      myProvider: 'people/currentCompany',
    }),
  },

  watch: {
    myProvider(provider) {
      if (provider !== null) {
        this.onRequest({
          pagination: this.pagination
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
        let item   = items[index];
        let client = {};

        client = {
          '@id'  : item['@id'],
          'id'   : item['@id'].match(/^\/clients\/([0-9]+)$/)[1],
          'cnpj' : item.document.length > 0 ? item.document[0].document : '',
          'alias': item.alias,
          'name' : item.name,
          'email': '',
          'phone': '',
        };

        if (item.peopleEmployee.length > 0) {
          if (item.peopleEmployee[0].employee.email.length > 0)
            client.email = `${item.peopleEmployee[0].employee.email[0].email}`;

          if (item.peopleEmployee[0].employee.phone.length > 0)
            client.phone = `${item.peopleEmployee[0].employee.phone[0].ddd}${item.peopleEmployee[0].employee.phone[0].phone}`;
        }

        data.push(client);
      }

      this.data = data;
    },

    fromDate() {
      this.onRequest({
        pagination: this.pagination
      });
    },

    toDate  () {
      this.onRequest({
        pagination: this.pagination
      });
    },

    searchBy(text) {
      this.onRequest({
        pagination: this.pagination
      });
    },
  },

  methods: {
    ...mapActions({
      getClients: 'client/getClients',
    }),

    formatDate(dateString) {
      return date.formatDate(date.extractDate(dateString, 'DD-MM-YYYY'), 'YYYY-MM-DD');
    },

    reload() {
      this.onRequest({
        pagination: this.pagination
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
      let params = { itemsPerPage: rowsPerPage, page };

      if (this.myProvider != null) {
        params['myProvider'] = this.myProvider.id;
      }

      params['type'] = 'prospect';
      params['from'] = this.formatDate(this.fromDate);
      params['to']   = this.formatDate(this.toDate  );

      if (this.searchBy.length > 1)
        params['searchBy'] = this.searchBy;

      this.getClients(params)
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