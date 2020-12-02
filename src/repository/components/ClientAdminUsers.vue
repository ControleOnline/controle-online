<template>
  <div class="row">
    <div class="col-12 q-mt-md">
      <q-table flat
        :data           ="items"
        :columns        ="settings.columns"
        :visible-columns="settings.visibleColumns"
        row-key         ="id"
        :loading        ="isLoading"
      >
        <template v-slot:top>
          <div class="col-3 q-mb-md text-h6">
            Lista de usuários
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

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">{{ props.cols[0].value }}</q-td>
            <q-td key="apikey"   :props="props">{{ props.cols[1].value }}</q-td>
            <q-td auto-width>
              <q-btn flat round dense
                color   ="red"
                icon    ="delete"
                @click  ="removeItem(props.row)"
                :disable="items.length == 1"
                :loading="props.row._bussy"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Novo usuário</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form ref="myForm" @submit="onSubmit" class="q-mt-md">
            <q-input lazy-rules stack-label
              v-model="item.username"
              type   ="text"
              label  ="Nome de usuário"
              class  ="q-mt-md"
              :rules ="[isInvalid('username')]"
            />

            <q-input lazy-rules stack-label
              v-model="item.password"
              type   ="password"
              label  ="Senha"
              class  ="q-mt-md"
              :rules ="[isInvalid('password')]"
            />

            <q-input lazy-rules stack-label
              v-model="item.confirm"
              type   ="password"
              label  ="Confirme sua senha"
              class  ="q-mt-md"
              :rules ="[isInvalid('confirm')]"
            />

            <div class="row justify-end">
              <q-btn
                :loading="saving"
                icon    ="save"
                type    ="submit"
                label   ="Salvar"
                size    ="md"
                color   ="primary"
                class   ="q-mt-md"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Api from '../utils/api';

const SETTINGS = {
  visibleColumns: [
    'username',
    'apikey'  ,
    'action'  ,
  ],
  columns       : [
    {
      name : 'username',
      field: row => row.username,
      align: 'left',
      label: 'Nome de usuário'
    },
    {
      name : 'apikey',
      field: row => row.apikey,
      align: 'left',
      label: 'Chave da API'
    },
    { name: 'action' },
  ],
};

Object.freeze(SETTINGS);

export default {
  props: {
    id: {
      required: true,
    },
    api: {
      type    : Api,
      required: true
    },
  },

  data() {
    return {
      items    : [],
      dialog   : false,
      settings : SETTINGS,
      saving   : false,
      isLoading: false,
      item     : {
        username: null,
        password: null,
        confirm : null,
      }
    };
  },

  created() {
    this.onRequest();
  },

  methods: {
    // store method
    getItems() {
      return this.api.private('/users', { params: { 'people': this.id } })
        .then(response => response.json())
        .then(data => {
          return data['hydra:member'];
        });
    },

    // store method
    save(values) {
      let options = {
        method : 'PUT',
        headers: new Headers({ 'Content-Type': 'application/ld+json' }),
        body   : JSON.stringify(values),
      };

      return this.api.private(`people/${this.id}/profile/user`, options)
        .then(response => response.json())
        .then(data => {

          return data;
        });
    },

    onSubmit() {
      this.$refs.myForm.validate()
        .then(success => {
          if (success) {
            this.saving = true;

            this.save({
              "operation": "post",
              "payload"  : {
                "username": this.item.username,
                "password": this.item.password
              }
            })
              .then (data => {
                if (data) {
                  this.$refs.myForm.reset();

                  this.onRequest();

                  this.$emit('saved', data);
                }
              })
              .catch(error => {
                this.$refs.myForm.reset();

                this.$emit('error', { message: error.message });
              })
              .finally(() => {
                this.saving = false;
              });
          }
      })
    },

    removeItem(item) {
      if (window.confirm('Tem certeza que deseja eliminar este registro?')) {
        item._bussy = true;

        this.save({
          "operation": "delete",
          "payload"  : {
            "id": item.id
          }
        })
        .then (data => {
          if (data) {
            this.cleanItem(item['id']);
          }
        })
        .catch(error => {
          this.$emit('error', { message: error.message });
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
      if (this.isLoading)
        return;

      this.isLoading = true;

      this.getItems()
        .then(items => {
          let _items = [];

          if (items.length) {
            for (let index in items) {
              _items.push({
                id      : items[index]['@id'].match(/^\/users\/([a-z0-9-]*)$/)[1],
                username: items[index].username,
                apikey  : items[index].apiKey,
                _bussy  : false,
              });
            }
          }

          this.items = _items;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    isInvalid(key) {
      return val => {
        switch (key) {
          case 'email'   :
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
              return 'O email informado não é válido';
          break;
          case 'password':
            if (!val || val.length < 6)
              return 'A senha deve ser no mínimo de 6 caracteres';
          break;
          case 'confirm' :
            if (this.item.password != this.item.confirm)
              return 'As senhas não coincidem';
          break;
          default:
            if (!(val && val.length > 0))
              return 'Este campo é obrigatório';
        }
        return true;
      };
    },
  },
};
</script>