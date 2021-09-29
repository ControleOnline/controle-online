<template>
  <div class="row">
    <div class="col-12">
      <q-table
        flat
        :pagination="{
          page: 1,
          rowsPerPage: 30
        }"
        :data="items"
        :columns="settings.columns"
        row-key="id"
        :loading="loading">
        <template v-slot:top>
          <div class="col-xs-12">
            <q-input stack-label
                     label="Buscar por empresa"
                     debounce="1000"
                     v-model="filters.empresa"
                     class="full-width"
            />
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :ref="'linha' + props.row.id">
            <q-td key="id" :props="props" class="format_id">#{{ props.row.id }}</q-td>
            <q-td key="type" :props="props">{{ props.row.type }}</q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="company" :props="props">{{ props.row.company }}</q-td>
            <q-td key="date_period" :props="props">{{ props.row.date_period }}</q-td>
            <q-td key="paid" :props="props">
              <q-badge
                :color="props.row.paid === 'sim' ? 'green' : 'yellow'"
                :text-color="props.row.paid === 'sim' ? 'white' : 'black'"
                :label="props.row.paid === 'sim' ? 'Sim' : 'Não'"
              />
            </q-td>
            <q-td key="arquivo" :props="props" auto-width>
              <q-btn
                color="secondary"
                label="Baixar"
                size="sm"
                @click=""
                :loading="false"
              />
            </q-td>
            <q-td key="acoes" :props="props">
              <div class="row q-gutter-xs items-center justify-center">
                <q-btn
                  outline
                  color="primary"
                  label="Editar"
                  size="sm"
                  :to="{name : 'AuditFiscalDetails', params: { id: props.row.id } }"
                />
                <q-btn
                  color="red"
                  label="Apagar"
                  size="sm"
                  @click="deleteConfirm(props.row.id)"
                  :loading="false"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="confirmDelete"
      persistent>
      <q-card style="width: 600px;">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="delete" color="red" text-color="white"/>
          <div class="text-h6 q-ml-md">
            Apagar Registro
          </div>
          <q-space/>
          <q-btn icon="close" @click="setClassRow(idRowToDelete, false);" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm" v-html="msgDelete"></span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="setClassRow(idRowToDelete, false);" v-close-popup/>
          <q-btn flat label="Sim" color="primary" @click="nowDelete(idRowToDelete);" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {fetch} from 'boot/myapi';
import {mapActions, mapGetters} from 'vuex';


const SETTINGS = {
  columns: [
    {
      name: 'id',
      field: row => row.id,
      align: 'center',
      label: 'ID'
    },
    {
      name: 'type',
      field: row => row.type,
      align: 'left',
      label: 'Tipo'
    },
    {
      name: 'name',
      field: row => row.name,
      align: 'left',
      label: 'Nome'
    },
    {
      name: 'company',
      field: row => row.company,
      align: 'left',
      label: 'Empresa'
    },
    {
      name: 'date_period',
      field: row => row.date_period,
      align: 'center',
      label: 'Período'
    },
    {
      name: 'paid',
      field: row => row.paid,
      align: 'left',
      label: 'Pago'
    },
    {
      name: 'arquivo',
      field: row => row.id,
      align: 'center',
      label: 'Arquivo'
    },
    {
      name: 'acoes',
      field: row => row.id,
      align: 'center',
      label: 'Ações'
    },
  ],
};

Object.freeze(SETTINGS);

export default {
  data() {
    return {
      idRowToDelete: null,
      msgDelete: null,
      confirmDelete: false,
      myCompanyLocal: null,
      myCompanyLocalLoaded: false,
      items: [],
      settings: SETTINGS,
      saving: false,
      loading: false,
      filters: {
        empresa: ''
      }
    };
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
    myCompany(company) { // Quando o usuário altera a "Company"
      this.checkIfChangeMyCompany();
    },
    '$data': { // Monitora alteração de determinada variável, OBS: Resolve o BUG do delay no watch da myCompany
      handler: function (objNew) {
        if (!this.myCompanyLocalLoaded) {
          if (objNew.myCompanyLocal !== null) {
            this.getValuesToLoad();
            this.myCompanyLocalLoaded = true;
          }
        }
      },
      deep: true
    }
  },

  methods: {
    nowDelete(id){
      this.setClassRow(id, false);
    },
    setClassRow(id, action) {
      if (action) {
        this.idRowToDelete = id;
        this.$refs['linha' + id].$el.classList.value = 'bg-deep-orange-10 text-white';
      } else {
        this.idRowToDelete = null;
        this.$refs['linha' + id].$el.classList.value = '';
      }
    },
    deleteConfirm(id) {
      let data = this.items.find(i => i.id === id);
      this.setClassRow(id, true);
      let company = data.company;
      let msg = ''
      msg += 'Você deseja realmente Excluir o Arquivo:<br>';
      msg += `ID: ${id} - ${company}`;
      console.log("data: " + id);
      this.msgDelete = msg;
      this.confirmDelete = true;
    },
    getCollectionFiles() {

      let params = {
        method: 'GET',
        params: {'myProvider': this.myCompanyLocal}
      };

      fetch('/filesb', params)
        .then(response => response.json())
        .then(data => {

          if (data !== null) {
            let success = data.response.success;
            let message = data.response.message;

            if (success) {
              this.items = data.response.data;
            } else {
              this.items = [];
              console.log("message: " + message);
            }

            // console.table(data);

          }

        }).catch(error => {
        console.error('Error: ' + error);
      }).finally(error => {
        this.$q.loading.hide();
      });

    },
    checkIfChangeMyCompany() {
      if (this.myCompanyLocal !== null) {
        if (this.myCompany.id !== this.myCompanyLocal) {
          this.myCompanyLocal = this.myCompany.id;
          this.getValuesToLoad();
        }
      }
      if (this.myCompany !== null) {
        if (this.myCompanyLocal !== this.myCompany.id) {
          this.myCompanyLocal = this.myCompany.id;
        }
      }
    },
    onRequest() {
      let params = {};
      let items = [];

      items.push({
        id: 1,
        name: 'DAS',
        company: 'MARIA22 NISHIKAWO 81071499904',
        type: 'Imposto',
        date_period: 'Jan 2021',
        paid: true,
        file_name_guide: 'askjhdjh.pdf',
        file_name_receipt: null,
      });

      /*
      items.push({
        id: 2,
        nome: 'PIS',
        empresa: 'MARCELO AUGUSTO PINTO 11110607847',
        tipo: 'Declaração',
        periodo: 'Jan 2021',
        pago: false,
      });

      items.push({
        id: 3,
        nome: 'CONFINS',
        empresa: 'Julio Cesar Monte2',
        tipo: 'Declaração',
        periodo: 'Mar 2021',
        pago: true,
      });

      items.push({
        id: 4,
        nome: 'DAS',
        empresa: 'ADRIANA MELINO FRANCA 99906148860',
        tipo: 'Imposto',
        periodo: 'Abr 2021',
        pago: true,
      });

       */

      this.items = items;
    },
    getValuesToLoad() {
      console.log('entrou aqui');
      console.log("this.myCompany.id: " + this.myCompany.id);
      console.log("this.myCompanyLocal: " + this.myCompanyLocal);
      // debugger;
      this.$q.loading.show();

      //this.onRequest();
      this.getCollectionFiles();


    }
  },
  created() {
    this.$q.loading.show();
    this.checkIfChangeMyCompany();
  }
};
</script>
<style type="text/css" scoped>
.format_id {
  font-size: 16px;
  font-weight: bold;
}
</style>
