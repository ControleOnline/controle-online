<template>
  <q-card class="q-pa-sm">
    <q-table flat grid hide-header
      :loading="isLoading"
      :data   ="items"
      @request="onRequest"
      row-key ="id"
      style   ="min-height: 90vh;"
    >
      <template v-slot:top>
        <div class="col-3 q-mb-md text-h6">
          Minhas empresas
        </div>
        <div class="col-9 q-mb-md">
          <div class="row justify-end">
            <q-btn
              label ="Adicionar"
              icon  ="add"
              size  ="md"
              color ="primary"
              class ="q-ml-sm"
              @click="dialog = !dialog"
            />
          </div>
        </div>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-4 col-md-3 col-lg-2">
          <q-card>
            <q-img basic v-if="props.row.logo == null"
              src="./../../assets/business.png"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ props.row.alias }}
              </div>
            </q-img>
            <q-img basic v-else
              :src="props.row.logo"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ props.row.alias }}
              </div>
            </q-img>
            <q-card-section>
              <q-list>
                <q-item dense>
                  <q-item-section avatar>
                    <q-icon name="business" />
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ props.row.document }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator />
            <q-card-actions align="around">
              <q-btn flat round dense
                color   ="primary"
                icon    ="edit"
                @click  ="editItem(props.row)"
                :disable="props.row._bussy"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
            </q-card-actions>             
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Nova empresa</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <FormCompany
            @saved  ="onSaved"
            :person ="false"
            address ="bycep"
            saveBtn ="Salvar"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-card>
</template>

<script>
import { date, extend }           from 'quasar';
import { mapActions, mapGetters } from 'vuex';
import FormCompany                from '../user/signup/Company';
import { formatDocument }         from '../../utils/formatter';

export default {
  components: {
    FormCompany,
  },

  data() {
    return {
      items    : [],
      dialog   : false,
      saving   : false,
      isLoading: false,
    };
  },

  created() {
    this.onRequest();
  },

  computed: {
    ...mapGetters({
      companies: 'people/companies',
    }),
  },

  methods: {
    ...mapActions({
      getItems: 'people/myCompanies',
      save    : 'people/company'    ,
    }),

    editItem(company) {
      this.$router.push({ name: 'CompanyDetailsPage', params: { id: company.id }});
    },

    onSaved(hasErrors) {
      if (hasErrors == false) {
        this.dialog = false;
        this.onRequest();
      }
    },

    setCompanies(companies) {
      this.items = [];

      for (let index in companies) {
        this.items.push({
          id      : companies[index].id,
          alias   : companies[index].alias,
          logo    : (
            companies[index].logo !== null ?
              `https://${companies[index].logo.domain}${companies[index].logo.url}` : null
          ),
          document: companies[index].document !== null ? formatDocument(companies[index].document) : null,
          _bussy  : false,
        });
      }
    },

    onRequest() {
      this.items = [];

      this.isLoading = true;

      this.getItems()
        .then(response => {
          if (response.data) {
            this.setCompanies(response.data);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>