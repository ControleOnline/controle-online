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
        Participantes
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name"       :props="props">{{ props.row.name       }}</q-td>
        <q-td key="roles"      :props="props">{{ props.row.roles      }}</q-td>
        <q-td key="percentage" :props="props">{{ props.row.percentage }}%</q-td>
        <q-td key="paymentDay" :props="props">{{ props.row.paymentDay }}</q-td>
        <q-td auto-width>
          <q-btn flat round dense v-if="editMode"
            color   ="red"
            icon    ="delete"
            @click  ="removeItem(props.row)"
            :disable="data.length == 1 || props.row.isProvider"
            :loading="props.row._bussy"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const SETTINGS = {
  visibleColumns: [
    'id'        ,
    'name'      ,
    'roles'     ,
    'percentage',
    'paymentDay',
    'action'    ,
  ],
  columns       : [
    {
      name : 'name',
      align: 'left',
      field: 'name',
      label: 'Participante'
    },
    {
      name : 'roles',
      field: 'roles',
      align: 'left',
      label: 'Participação'
    },
    {
      name : 'percentage',
      field: 'percentage',
      align: 'left',
      label: 'Percentagem'
    },
    {
      name : 'paymentDay',
      field: 'paymentDay',
      align: 'left',
      label: 'Dia de pagamento'
    },
    {
      name: 'action'
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
        sortBy     : 'peopleType',
        descending : false,
        page       : 1,
        rowsPerPage: 30,
        rowsNumber : 10,
      },
    }
  },

  methods: {
    ...mapActions({
      getItems: 'contracts/getParticipants',
      delete  : 'contracts/deletePeopleContract',
    }),

    reload() {
      this.onRequest({
        pagination: this.pagination,
        filter    : null,
      });
    },

    removeItem(item) {
      if (window.confirm('Tem certeza que deseja eliminar este registro?')) {
        item._bussy = true;

        this.delete(item['@id'])
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

      this.getItems(this.contract['@id'].match(/^\/my_contracts\/([a-z0-9-]*)$/)[1])
        .then(participants => {

          this.pagination.page        = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy      = sortBy;
          this.pagination.descending  = descending;

          // set data

          if (participants) {
            let data = [];

            participants.forEach(participant => {
              data.push({
                '@id'       : participant['@id'],
                'name'      : participant.people.name,
                'roles'     : this.$t(`contracts.roles.${participant.peopleType}`),
                'percentage': participant.contractPercentage,
                'paymentDay': participant.peopleType == 'Payer' ? `Dia ${participant.people.paymentTerm}` : '-',
                'isProvider': participant.peopleType == 'Provider',
                '_bussy'    : false,
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