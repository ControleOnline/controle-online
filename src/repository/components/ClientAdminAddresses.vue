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
            Lista de endereços
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
            <q-td key="nickname"    :props="props">{{ props.row.nickname    }}</q-td>
            <q-td key="postalCode"  :props="props">{{ props.cols[1].value   }}</q-td>
            <q-td key="street"      :props="props">{{ props.row.street      }}</q-td>
            <q-td key="number"      :props="props">{{ props.row.number      }}</q-td>
            <q-td key="complement"  :props="props">{{ props.row.complement  }}</q-td>
            <q-td key="district"    :props="props">{{ props.row.district    }}</q-td>
            <q-td key="cityName"    :props="props">{{ props.row.cityName    }}</q-td>
            <q-td key="stateName"   :props="props">{{ props.row.stateName   }}</q-td>
            <q-td key="countryName" :props="props">{{ props.row.countryName }}</q-td>
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
          <div class="text-h6">Novo endereço</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form
            ref    ="myForm"
            @submit="onSubmit"
          >
            <div class="row q-col-gutter-xs q-pb-xs">
              <div class="col-xs-12">
                <q-input stack-label lazy-rules
                  v-model    ="item.nickname"
                  type       ="text"
                  :label     ="$t('Apelido')"
                  :rules     ="[isInvalid('nickname')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <SearchCEPAddress
                  :api  ="api"
                  @found="onCEPFound"
                  @error="(error) => {
                    this.item.postalCode = error.postalCode;

                    this.$q.notify({
                      message : error.message,
                      position: 'bottom',
                      type    : 'warning',
                    });
                  }"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <q-input stack-label lazy-rules
                  v-model    ="item.street"
                  type       ="text"
                  :label     ="$t('Rua')"
                  :rules     ="[isInvalid('street')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <q-input stack-label lazy-rules
                  v-model    ="item.number"
                  type       ="text"
                  :label     ="$t('Número')"
                  :rules     ="[isInvalid('number')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <q-input stack-label
                  v-model    ="item.complement"
                  type       ="text"
                  :label     ="$t('Complemento')"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <q-input stack-label lazy-rules
                  v-model    ="item.district"
                  type       ="text"
                  :label     ="$t('Bairro')"
                  :rules     ="[isInvalid('district')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-grow">
                <q-input stack-label lazy-rules
                  v-model    ="item.city"
                  type       ="text"
                  :label     ="$t('Cidade')"
                  :rules     ="[isInvalid('city')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input stack-label lazy-rules
                  v-model    ="item.state"
                  type       ="text"
                  :label     ="$t('UF')"
                  mask       ="AA"
                  :rules     ="[isInvalid('state')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-input stack-label lazy-rules
                  v-model    ="item.country"
                  type       ="text"
                  :label     ="$t('País')"
                  :rules     ="[isInvalid('country')]"
                  class      ="q-mb-sm"
                  :outlined  ="true"
                />
              </div>
            </div>

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
import Api              from '../utils/api';
import { formatCEP }    from '../utils/formatters';
import SearchCEPAddress from './SearchCEPAddress';

const SETTINGS = {
  visibleColumns: [
    'nickname'   ,
    'postalCode' ,
    'street'     ,
    'number'     ,
    'complement' ,
    'district'   ,
    'cityName'   ,
    'stateName'  ,
    'countryName',
    'action'     ,
  ],
  columns       : [
    {
      name : 'nickname',
      align: 'left',
      label: 'Apelido'
    },
    {
      name  : 'postalCode',
      field : 'postalCode',
      format: (val, row) => {
        return formatCEP(`${val}`);
      },
      align : 'left',
      label : 'CEP'
    },
    {
      name : 'street',
      align: 'left',
      label: 'Rua / Avenida'
    },
    {
      name : 'number',
      align: 'left',
      label: 'Número'
    },
    {
      name : 'complement',
      align: 'left',
      label: 'Complemento'
    },
    {
      name : 'district',
      align: 'left',
      label: 'Bairro'
    },
    {
      name : 'cityName',
      field: row => row.city,
      align: 'left',
      label: 'Cidade'
    },
    {
      name : 'stateName',
      field: row => row.state,
      align: 'left',
      label: 'Estado'
    },
    {
      name : 'countryName',
      field: row => row.country,
      align: 'left',
      label: 'País'
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

  components: {
    SearchCEPAddress,
  },

  data() {
    return {
      items    : [],
      dialog   : false,
      settings : SETTINGS,
      saving   : false,
      isLoading: false,
      item     : {
        nickname  : '',
        country   : '',
        state     : '',
        city      : '',
        district  : '',
        postalCode: '',
        street    : '',
        number    : '',
        complement: '',
      },
    };
  },

  created() {
    this.onRequest();
  },

  methods: {
    // store method
    getItems() {
      return this.api.private('/addresses', { params: { 'people': this.id } })
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

      return this.api.private(`people/${this.id}/profile/address`, options)
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
                nickname   : this.item.nickname,
                country    : this.item.country,
                state      : this.item.state,
                city       : this.item.city,
                district   : this.item.district,
                postal_code: this.item.postalCode,
                street     : this.item.street,
                number     : this.item.number,
                complement : this.item.complement,
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
                id        : items[index]['@id'].match(/^\/addresses\/([a-z0-9-]*)$/)[1],
                nickname  : items[index].nickname,
                country   : items[index].street.district.city.state.country.countryname,
                state     : items[index].street.district.city.state.uf,
                city      : items[index].street.district.city.city,
                district  : items[index].street.district.district,
                postalCode: items[index].street.cep.cep,
                street    : items[index].street.street,
                number    : items[index].number,
                complement: items[index].complement,
                _bussy    : false,
              });
            }
          }

          this.items = _items;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    onCEPFound(address) {
      this.item.id         = null;
      this.item.country    = address.country;
      this.item.state      = address.state;
      this.item.city       = address.city;
      this.item.district   = address.district;
      this.item.postalCode = address.postalCode;
      this.item.street     = address.street;
      this.item.number     = '';
      this.item.complement = '';
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