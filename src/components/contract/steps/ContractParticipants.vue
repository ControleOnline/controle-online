<template>
  <!-- eslint-disable -->
  <q-table hide-pagination
    :loading        ="isLoading"
    :data           ="data"
    :columns        ="settings.columns"
    :pagination.sync="pagination"
    @request        ="onRequest"
    row-key         ="id"
    :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
  >
    <template v-slot:top>
      <div class="col-3 q-mb-md text-h6">
        Participantes
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name"       :props="props">
          <q-btn flat dense
            :to   ="{
              name  : 'ClientsDetails',
              params: { id: props.row.peopleId }
            }"
            :label="props.row.name"
            class ="full-width"
          />
        </q-td>
        <q-td key="roles"      :props="props">{{ props.row.roles      }}</q-td>
        <q-td key="percentage" :props="props">{{ props.cols[2].value  }}</q-td>
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
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';

const SETTINGS = {
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
      label: 'Porcentagem',
      format: (val, row) => {
        return row.peopleType == 'Payer' ? `${val}%` : '-';
      },
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

  computed: {
    ...mapGetters({
      user     : 'auth/user',
      myCompany: 'people/currentCompany',
    }),
  },

  watch: {
    contract(data) {
      if (!data) {
        return;
      }

      this.reload();
    },
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
      if (window.confirm(this.$t('Are you sure about to remove this element?'))) {
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

      this.getItems({
        id    : this.contract['@id'].replace(/\D/g, ""),
        params: { 'myCompany': this.myCompany.id }
      })
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
                'name'      : participant.people.peopleType == 'J' ? `${participant.people.name} / ${participant.people.alias}` : `${participant.people.name} ${participant.people.alias}`,
                'peopleId'  : participant.people['@id'].replace(/\D/g, ''),
                'roles'     : this.$t(`contracts.roles.${participant.peopleType}`),
                'percentage': participant.contractPercentage,
                'paymentDay': participant.peopleType == 'Payer' ? `Dia ${participant.people.paymentTerm}` : '-',
                'isProvider': participant.peopleType == 'Provider',
                'peopleType': participant.peopleType,
                '_bussy'    : false,
              });
            });

            this.data = data;

            this.$emit('loaded', data);
          }
          else {
            this.data = [];
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
