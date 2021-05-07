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
            <q-td key="cliente"   :props="props">{{ props.row.cliente   }}</q-td>
            <q-td key="cadastro"  :props="props">{{ props.row.cadastro  }}</q-td>
            <q-td key="atendente" :props="props">{{ props.row.atendente }}</q-td>
            <q-td key="canal"     :props="props">{{ props.row.canal     }}</q-td>
            <q-td key="midia"     :props="props">{{ props.row.midia     }}</q-td>
            <q-td key="status"    :props="props">{{ props.row.status    }}</q-td>
            <q-td key="motivo"    :props="props">{{ props.row.motivo    }}</q-td>
            <q-td auto-width>
              <q-btn outline
                :label="$t('Editar')"
                size  ="sm"
                :to   ="{
                  name  : 'VendasEdit',
                  params: {
                    id: props.row.id
                  }
                }"
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
      name : 'cliente',
      field: row => row.cliente,
      align: 'left',
      label: 'Cliente'
    },
    {
      name : 'cadastro',
      field: row => row.cadastro,
      align: 'left',
      label: 'Tipo Cadastro'
    },
    {
      name : 'atendente',
      field: row => row.atendente,
      align: 'left',
      label: 'Atendente'
    },
    {
      name : 'canal',
      field: row => row.canal,
      align: 'left',
      label: 'Canal'
    },
    {
      name : 'midia',
      field: row => row.midia,
      align: 'left',
      label: 'Mídia'
    },
    {
      name : 'status',
      field: row => row.status,
      align: 'left',
      label: 'Status'
    },
    {
      name : 'motivo',
      field: row => row.motivo,
      align: 'left',
      label: 'Motivo'
    },
    { name: 'acoes' },
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    status: {
      type    : String,
      required: true,
    },
  },

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
    onSave(data) {
      this.onRequest();

      this.$q.notify({
        message : 'Os dados foram salvos com sucesso',
        position: 'bottom',
        type    : 'positive',
      });
    },

    removeItem(item) {
      if (window.confirm('Tem certeza que deseja eliminar este registro?')) {
        item._bussy = true;
      }
    },

    cleanItem(id) {
      let item   = this.items.find(obj => obj['id'] == id);
      let indx   = this.items.indexOf(item);
      this.items = [...this.items.slice(0, indx), ...this.items.slice(indx + 1)];
    },

    onRequest() {
      let params = {};
      let items  = [];

      items.push({
        id       : 1,
        cliente  : 'André Luiz Borkowske',
        cadastro : 'Migração de Contabilidade',
        atendente: 'Julia Ramos',
        canal    : 'Redes Sociais',
        midia    : 'Instagram',
        status   : 'Contratado',
        motivo   : 'Contratado - Boleto',
        _bussy   : false,
      });

      items.push({
        id       : 2,
        cliente  : 'João Morais',
        cadastro : 'Abertura de Empresa',
        atendente: 'Julia Ramos',
        canal    : 'Outros',
        midia    : 'Outros',
        status   : 'Contratado',
        motivo   : 'Contratado - Boleto',
        _bussy   : false,
      });

      items.push({
        id       : 3,
        cliente  : 'Fernanda Pinheiro',
        cadastro : 'Migração de Contabilidade',
        atendente: 'Julia Ramos',
        canal    : 'Redes Sociais',
        midia    : 'Whatsapp',
        status   : 'Contratado',
        motivo   : 'Contratado - Boleto',
        _bussy   : false,
      });

      items.push({
        id       : 4,
        cliente  : 'MARIA DA GLÓRIA WEISSHEIMER',
        cadastro : 'Migração de Contabilidade',
        atendente: 'Julia Ramos',
        canal    : 'Redes Sociais',
        midia    : 'Instagram',
        status   : 'Contratado',
        motivo   : 'Contratado - Boleto',
        _bussy   : false,
      });

      items.push({
        id       : 5,
        cliente  : 'Regiane Nishikawa',
        cadastro : 'Migração de Contabilidade',
        atendente: 'Julia Ramos',
        canal    : 'Redes Sociais',
        midia    : 'Instagram',
        status   : 'Contratado',
        motivo   : 'Contratado - Boleto',
        _bussy   : false,
      });

      this.items = items;
    },
  },
};
</script>
