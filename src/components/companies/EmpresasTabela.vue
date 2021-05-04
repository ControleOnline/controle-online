<template>
  <div class="row">
    <div class="col-12 q-mt-md">
      <q-table flat
        :data   ="items"
        :columns="settings.columns"
        row-key ="id"
        :loading="loading"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nome"    :props="props">{{ props.row.nome    }}</q-td>
            <q-td key="cnpj"    :props="props">{{ props.row.cnpj    }}</q-td>
            <q-td key="cliente" :props="props">{{ props.row.cliente }}</q-td>
            <q-td key="plano"   :props="props">{{ props.row.plano   }}</q-td>
            <q-td auto-width>
              <q-btn
                size  ="sm"
                color ="secondary"
                @click=""
                :label="$t('Contrato')"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                color ="secondary"
                size  ="sm"
                @click=""
                :label="$t('Dados da empresa')"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                color ="secondary"
                size  ="sm"
                @click=""
                :label="$t('Funcionários')"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                color ="secondary"
                size  ="sm"
                @click=""
                :label="$t('Sócios')"
              />
            </q-td>
            <q-td auto-width>
              <q-btn outline
                color ="primary"
                size  ="sm"
                :label="$t('Editar')"
                :to   ="{
                  name  : 'CompaniesDetails',
                  params: {
                    id: props.row.id
                  }
                }"
              />
            </q-td>
            <q-td auto-width>
              <q-btn
                color ="blue"
                size  ="sm"
                @click=""
                :label="$t('Visualizar')"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const SETTINGS = {
  columns       : [
    {
      name : 'nome',
      field: row => row.nome,
      align: 'left',
      label: 'Nome da Empresa'
    },
    {
      name : 'cnpj',
      field: row => row.cnpj,
      align: 'left',
      label: 'CNPJ'
    },
    {
      name : 'cliente',
      field: row => row.cliente,
      align: 'left',
      label: 'Cliente'
    },
    {
      name : 'plano',
      field: row => row.plano,
      align: 'left',
      label: 'Plano'
    },
    { name: 'export_contract'  },
    { name: 'export_data'      },
    { name: 'export_employees' },
    { name: 'export_socios'    },
    {
      name : 'id',
      field: row => row.id,
    },
    { name: 'view_company'     },
  ],
};

Object.freeze(SETTINGS);

export default {
  data() {
    return {
      items   : [],
      settings: SETTINGS,
      saving  : false,
      loading : false,
    };
  },

  created() {
    this.onRequest();
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
    }),

    user() {
      return this.$store.getters['auth/user'];
    },
  },

  watch: {
    myCompany(company) {
      this.onRequest();
    },
  },

  methods: {
    onRequest() {
      let params = {};
      let items  = [];

      items.push({
        id     : 1,
        nome   : 'ABERTURA DE EMPRESA - MICHELLE TEIXEIRA',
        cnpj   : '00.000.000/0000-00',
        cliente: 'Vinicius Cavalcante',
        plano  : 'MEI - Bronze',
      });

      items.push({
        id     : 2,
        nome   : 'ABERTURA DE EMPRESA - MICHELLE TEIXEIRA',
        cnpj   : '00.000.000/0000-00',
        cliente: 'Vinicius Cavalcante',
        plano  : 'MEI - Bronze',
      });

      items.push({
        id     : 3,
        nome   : 'ABERTURA DE EMPRESA - MICHELLE TEIXEIRA',
        cnpj   : '00.000.000/0000-00',
        cliente: 'Vinicius Cavalcante',
        plano  : 'MEI - Bronze',
      });

      items.push({
        id     : 4,
        nome   : 'ABERTURA DE EMPRESA - MICHELLE TEIXEIRA',
        cnpj   : '00.000.000/0000-00',
        cliente: 'Vinicius Cavalcante',
        plano  : 'MEI - Bronze',
      });

      this.items = items;
    },
  },
};
</script>
