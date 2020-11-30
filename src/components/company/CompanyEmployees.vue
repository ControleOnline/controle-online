<template>
  <div class="row">
    <div class="col-12">
      <q-table flat grid hide-header
        :loading="isLoading"
        :data   ="items"
        @request="onRequest"
        row-key ="id"
      >
        <template v-slot:top>
          <div class="col-3 q-mb-md text-h6">
            Lista de funcionários
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
              <q-img basic :src="props.row.image">
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{ `${props.row.name} ${props.row.alias}` }}
                </div>
              </q-img>
              <q-card-section>
                <q-list>
                  <q-item dense>
                    <q-item-section avatar>
                      <q-icon name="call" />
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>
                        {{
                          props.row.phone.ddd.length == 0 ? '' : `(${props.row.phone.ddd}) ${props.row.phone.phone}`
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section avatar>
                      <q-icon name="email" />
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ props.row.email.email }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-separator />
              <q-card-actions align="around">
                <!--
                <q-btn flat round dense
                  color   ="primary"
                  icon    ="edit"
                  @click  ="editItem(props.row)"
                  :disable="props.row._bussy"
                >
                  <q-tooltip>Editar</q-tooltip>
                </q-btn>
                -->

                <q-btn flat round dense
                  color   ="red"
                  icon    ="delete"
                  @click  ="removeItem(props.row)"
                  :loading="props.row._bussy"
                >
                  <q-tooltip>Eliminar</q-tooltip>
                </q-btn>
              </q-card-actions>             
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Novo funcionário</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <FormEmployee ref="myForm" @save="onSave" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date, extend }           from 'quasar';
import { mapActions, mapGetters } from 'vuex';
import FormEmployee               from './FormEmployee';
import md5                        from 'md5';

export default {
  props: {
    companyId: {
      type    : Number,
      required: true,
    },
  },

  components: {
    FormEmployee,
  },

  created() {
    this.onRequest();
  },

  data() {
    return {
      items : [],
      dialog: false,
      saving: false,       
    };
  },

  computed: {
    ...mapGetters({
      isLoading: 'profile/isLoading',
    }),
  },

  methods: {
    ...mapActions({
      getItems: 'profile/getEmployees',
      save    : 'profile/updateProfile',
    }),

    editItem() {

    },

    gravatar(email) {
      return 'https://www.gravatar.com/avatar/' + md5(email) + '?s=400';
    },

    onSave(data) {
      this.save({
        id       : this.myCompany.id,
        component: 'employee',
        payload  : {
          "operation": "post",
          "payload"  : {
            "name"     : data.name,
            "alias"    : data.lastname,
            "type"     : "F",
            "phone"    : {
              "ddd"  : data.phone.ddd,
              "phone": data.phone.phone
            },
            "email"    : data.email,
            "documents": data.documents,
            "user"     : {
              "username": data.username,
              "password": data.password
            },
          }
        }
      })
        .then (data => {
          if (data) {
            this.onRequest();

            this.$q.notify({
              message : 'Os dados foram salvos com sucesso',
              position: 'bottom',
              type    : 'positive',
            });
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
          this.$refs.myForm.reset();
        });
    },

    removeItem(item) {
      if (window.confirm('Tem certeza que deseja eliminar este registro?')) {
        item._bussy = true;

        this.save({
          id       : this.myCompany.id,
          component: 'employee',
          payload  : {
            "operation": "delete",
            "payload"  : {
              "id": item.id
            }
          }
        })
          .then (data => {
            if (data) {
              this.cleanItem(item['id']);
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

    cleanItem(id) {
      let item   = this.items.find(obj => obj['id'] == id);
      let indx   = this.items.indexOf(item);
      this.items = [...this.items.slice(0, indx), ...this.items.slice(indx + 1)];
    },

    onRequest() {
      let params = {};

      this.items = [];

      params['myCompany'] = this.companyId;

      this.getItems(params)
        .then(items => {
          if (items.length) {
            for (let index in items) {
              this.items.push({
                id      : items[index]['@id'].match(/^\/people\/([a-z0-9-]*)$/)[1],
                name    : items[index].name,
                alias   : items[index].alias,
                image   : items[index].image !== null ? items[index].image.url : this.gravatar(items[index].email[0].email),
                document: items[index].document,
                phone   : items[index].phone.length ? items[index].phone[0] : { ddd  : '', phone: '' },
                email   : items[index].email.length ? items[index].email[0] : { email: '' },
                _bussy  : false,
              });
            }
          }
        });
    },
  },
};
</script>