<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card style="min-height: 90vh;">
          <q-card-section>
            <div class="row justify-end q-mb-md">
              <q-btn
                label ="Adicionar"
                icon  ="add"
                size  ="md"
                color ="primary"
                class ="q-ml-sm"
                @click="dialog = !dialog"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-4 q-pa-sm">
                <q-input v-model="dateFrom" label="Data inicio" stack-label>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model ="dateFrom"
                          mask    ="DD-MM-YYYY"
                          @input  ="() => $refs.qDateProxy1.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4 q-pa-sm">
                <q-input v-model="dateTo" label="Data fim" stack-label>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model ="dateTo"
                          mask    ="DD-MM-YYYY"
                          @input  ="() => $refs.qDateProxy2.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4 q-pa-sm">
                <q-input stack-label
                    label   ="Buscar por"
                    debounce="1000"
                    v-model ="searchBy"
                    class   ="full-width"
                />
              </div>
            </div>
          </q-card-section>

          <q-tabs
            :horizontal="$q.screen.gt.xs"
            align      ="justify"
            v-model    ="currentTab"
            class      ="bg-white text-primary"
          >
            <q-tab
              name ="inactiveClient"
              label="Clientes inativos"
            />
            <q-tab
              name ="prospectsClient"
              label="Prospects"
            />
            <q-tab
              name ="activeClient"
              label="Clientes ativos"
            />
            <q-tab
              name ="newClient"
              label="Clientes novos"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="currentTab"
          >
            <q-tab-panel name="inactiveClient">
              <InactiveClients
                ref      ="inactiveClient"
                :fromDate="dateFrom"
                :toDate  ="dateTo"
                :searchBy="searchBy"
                @selected="onClientSelected"
              />
            </q-tab-panel>

            <q-tab-panel name="prospectsClient">
              <ProspectsClients
                ref      ="prospectsClient"
                :fromDate="dateFrom"
                :toDate  ="dateTo"
                :searchBy="searchBy"
                @selected="onClientSelected"
              />
            </q-tab-panel>

            <q-tab-panel name="activeClient">
              <ActiveClients
                 ref     ="activeClient"
                :fromDate="dateFrom"
                :toDate  ="dateTo"
                :searchBy="searchBy"
                @selected="onClientSelected"
              />
            </q-tab-panel>

            <q-tab-panel name="newClient">
              <NewClients
                ref      ="newClient"
                :fromDate="dateFrom"
                :toDate  ="dateTo"
                :searchBy="searchBy"
                @selected="onClientSelected"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>

      <q-dialog v-model="dialog" @show="onDialogShow" @hide="clientId = null">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ this.clientId === null ? 'Cadastro de cliente' : 'Atualização de cadastro' }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <FormClient ref="myForm" @saved="onClientSaved" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { date }                   from 'quasar';
import InactiveClients            from '../../components/clients/InactiveClients';
import ProspectsClients           from '../../components/clients/ProspectsClients';
import ActiveClients              from '../../components/clients/ActiveClients';
import NewClients                 from '../../components/clients/NewClients';
import FormClient                 from '../../components/clients/FormClient';

export default {
  name      : 'ClientsIndexPage',

  components: {
    InactiveClients ,
    ProspectsClients,
    ActiveClients   ,
    NewClients      ,
    FormClient      ,
  },

  beforeDestroy() {
    this.reset();
  },

  data () {
    return {
      currentTab: 'inactiveClient',
      dialog    : false,
      dateFrom  : date.formatDate(date.subtractFromDate(Date.now(), { month: 1 }), 'DD-MM-YYYY'),
      dateTo    : date.formatDate(Date.now(), 'DD-MM-YYYY'),
      searchBy  : '',
      clientId  : null,
    }
  },

  methods: {
    ...mapActions({
      getClient: 'client/getClient',
      reset    : 'client/reset',
    }),

    onClientSelected(clientId) {
      if (!clientId)
        return;

      this.clientId = clientId;
      this.dialog   = true;
    },

    onClientSaved(clientId) {
      this.$refs[this.currentTab].reload();
    },

    onDialogShow() {
      if (this.clientId === null)
        return;

      this.getClient(this.clientId)
        .then(client => {
          if (!client['@id'])
            return;

          let data = {
            '@id'      : client['@id'],
            'id'       : client['@id'].match(/^\/clients\/([0-9]+)$/)[1],
            'cnpj'     : client.document.length > 0 ? client.document[0].document : '',
            'alias'    : client.alias,
            'name'     : client.name,
            'contact': {
              'id'   : null,
              'name' : '',
              'alias': '',
              'email': '',
              'phone': '',
            },
          };

          if (client.peopleEmployee.length > 0) {
            if (client.peopleEmployee[0].employee['@id']) {
              data.contact.id    = client.peopleEmployee[0].employee['@id'].match(/^\/people\/([0-9]+)$/)[1];
              data.contact.name  = client.peopleEmployee[0].employee.name;
              data.contact.alias = client.peopleEmployee[0].employee.alias;

            if (client.peopleEmployee[0].employee.email.length > 0)
              data.contact.email = `${client.peopleEmployee[0].employee.email[0].email}`;

            if (client.peopleEmployee[0].employee.phone.length > 0)
              data.contact.phone = `${client.peopleEmployee[0].employee.phone[0].ddd}${client.peopleEmployee[0].employee.phone[0].phone}`;
            }
          }

          this.$refs.myForm.setData({
            "id"      : data.id,
            "document": data.cnpj,
            "name"    : data.name,
            "alias"   : data.alias,
            "contact" : {
              "id"   : data.contact.id,
              "name" : data.contact.name,
              "alias": data.contact.alias,
              "email": data.contact.email,
              "phone": data.contact.phone,
            },
          });
        })
        .catch(error => {

        });
    },
  },
}
</script>