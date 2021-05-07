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
            <q-td key="cliente"  :props="props">{{ props.row.cliente }}</q-td>
            <q-td key="empresa"  :props="props">{{ props.row.empresa }}</q-td>
            <q-td key="regime"   :props="props">{{ props.row.regime }}</q-td>
            <q-td key="situacao" :props="props">
              <q-badge
                :color     ="props.row.situacao ? 'green' : 'yellow'"
                :text-color="props.row.situacao ? 'white' : 'black'"
                :label     ="props.row.situacao ? 'Ativo' : 'Inativo'"
              />
            </q-td>
            <q-td key="plano" :props="props">{{ props.row.plano }}</q-td>
            <q-td key="acoes" :props="props" auto-width>
              <div class="row q-gutter-xs items-center justify-center">
                <q-btn v-if="!props.row.situacao"
                  color   ="green"
                  :label  ="$t('Reativar')"
                  size    ="sm"
                  @click  =""
                  :loading="false"
                />
                <q-btn v-if="props.row.situacao"
                  color   ="red"
                  :label  ="$t('Cancelar')"
                  size    ="sm"
                  @click  =""
                  :loading="false"
                />
              </div>
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
      name : 'empresa',
      field: row => row.empresa,
      align: 'left',
      label: 'Empresa'
    },
    {
      name : 'regime',
      field: row => row.regime,
      align: 'left',
      label: 'Regime de Tribitação'
    },
    {
      name : 'situacao',
      field: row => row.situacao,
      align: 'left',
      label: 'Situação'
    },
    {
      name : 'plano',
      field: row => row.plano,
      align: 'left',
      label: 'Plano'
    },
    {
      name : 'acoes',
    },
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
        id      : 1,
        cliente : 'Alinne Rocha',
        empresa : 'ABERTURA DE EMPRESA - Alinne Rocha',
        regime  : 'Simples Nacional',
        situacao: true,
        plano   : 'Ouro - R$ 149,90',
      });

      items.push({
        id      : 2,
        cliente : 'Regiane Nishikawa',
        empresa : 'REGIANE NISHIKAWA 01071499111',
        regime  : 'MEI',
        situacao: false,
        plano   : 'Bronze - R$ 29,90',
      });

      items.push({
        id      : 3,
        cliente : 'Verônica Barros',
        empresa : 'VERONICA BARROS DOS SANTOS 33369323832',
        regime  : 'MEI',
        situacao: true,
        plano   : 'Mensal - R$ 39,99',
      });

      items.push({
        id      : 4,
        cliente : 'Verônica Barros',
        empresa : 'VERONICA BARROS DOS SANTOS 33369323832',
        regime  : 'MEI',
        situacao: true,
        plano   : 'Mensal - R$ 39,99',
      });

      items.push({
        id      : 5,
        cliente : 'Verônica Barros',
        empresa : 'VERONICA BARROS DOS SANTOS 33369323832',
        regime  : 'MEI',
        situacao: true,
        plano   : 'Mensal - R$ 39,99',
      });

      items.push({
        id      : 6,
        cliente : 'Regiane Nishikawa',
        empresa : 'REGIANE NISHIKAWA 01071499111',
        regime  : 'MEI',
        situacao: false,
        plano   : 'Bronze - R$ 29,90',
      });

      this.items = items;
    },
  },
};
</script>
