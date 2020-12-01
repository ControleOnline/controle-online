<template>

  <q-form @submit="onSubmit" class="q-mt-sm" ref="myForm">

    <div class="row justify-center q-pb-md">
      <q-btn-toggle no-caps
        v-model     ="personType"
        toggle-color="primary"
        :options    ="[
          { label: 'Pessoa Jurídica', value: 'PJ' },
          { label: 'Pessoa Física'  , value: 'PF' },
        ]"
      />
    </div>

    <q-input outlined stack-label lazy-rules unmasked-value
      v-model     ="item.document"
      type        ="text"
      class       ="q-mb-sm"
      :label      ="personType == 'PJ' ? $t('CNPJ') : $t('CPF')"
      :mask       ="personType == 'PJ' ? '##.###.###/####-##' : '###.###.###-##'"
      :placeholder="personType == 'PJ' ? 'Digite o CNPJ' : 'Digite o CPF'"
      :rules      ="[isInvalid('document')]"
      :loading    ="isSearching"
      @input      ="searchByDocument"
    />

    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model     ="item.name"
          type        ="text"
          class       ="q-mb-sm"
          :label      ="personType == 'PJ' ? $t('Razão social') : $t('Nome')"
          :placeholder="personType == 'PJ' ? 'Digite a Razão social' : 'Digite seu nome'"
          :rules      ="[isInvalid('name')]"
          :outlined   ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model     ="item.alias"
          type        ="text"
          class       ="q-mb-sm"
          :label      ="personType == 'PJ' ? $t('Nome Fantasia') : $t('Sobrenome')"
          :placeholder="personType == 'PJ' ? 'Digite o Nome fantasia' : 'Digite seu sobrenome'"
          :rules      ="[isInvalid('alias')]"
          :outlined   ="true"
        />
      </div>
    </div>

    <!-- PARTICULARS -->
    <div class="row q-col-gutter-sm">
      <div
        v-if ="personType == 'PF'"
        class="col-xs-12"
      >
        <q-input stack-label lazy-rules
          v-model    ="item.docrg"
          type       ="text"
          class      ="q-mb-sm"
          label      ="R.G."
          :rules     ="[isInvalid('document')]"
          :outlined  ="true"
        />
      </div>
      <div
        v-if ="personType == 'PJ'"
        class="col-xs-12"
      >
        <!--
        <q-file
          v-model     ="item.reqfile"
          label       ="Requerimento"
          :outlined   ="true"
          :stack-label="true"
          class       ="q-mb-sm"
          :rules      ="[val => val !== null || 'Deve anexar um arquivo']"
          accept      =".pdf"
        >
          <template v-slot:append>
            <q-icon name="attachment" />
          </template>
        </q-file>
        -->
      </div>
      <div
        v-for="(field, index) in particulars"
        :key ="index"
        class="col-xs-12 col-sm-grow"
      >
        <!--
        <q-file v-if="field.type === 'file'"
          v-model     ="field.value"
          :label      ="$t(field.label)"
          :outlined   ="true"
          :stack-label="true"
          class       ="q-mb-sm"
          :rules      ="field.required ? [val => val !== null || 'Deve anexar um arquivo'] : [true]"
          :accept     ="field.configs.accept || ''"
          @input      ="(file) => {
            if (file !== null) {
              file.arrayBuffer()
                .then(content => {
                  field.content = content;
                });
            }
          }"
        >
          <template v-slot:append>
            <q-icon name="attachment" />
          </template>
        </q-file>
        -->

        <q-input
          v-model     ="field.value"
          type        ="text"
          :label      ="$t(field.label)"
          :rules      ="field.required ? [isInvalid('field_text')] : [true]"
          class       ="q-mb-sm"
          :outlined   ="true"
          :stack-label="true"
        />
      </div>
    </div>

    <div v-if="personType == 'PJ'"
      class="row q-col-gutter-sm"
    >
      <div class="col-xs-12 text-subtitle2">
        Dados de contato
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model     ="item.contact_name"
          type        ="text"
          class       ="q-mb-sm"
          :label      ="$t('Nome do contato')"
          :placeholder="'Digite o nome do contato'"
          :rules      ="[isInvalid('contact_name')]"
          :outlined   ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model     ="item.contact_alias"
          type        ="text"
          class       ="q-mb-sm"
          :label      ="$t('Sobrenome do contato')"
          :placeholder="'Digite seu sobrenome do contato'"
          :rules      ="[isInvalid('contact_alias')]"
          :outlined   ="true"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model     ="item.email"
          type        ="text"
          class       ="q-mb-sm"
          :label      ="$t('Email')"
          placeholder ="Digite o email"
          :rules      ="[isInvalid('email')]"
          :outlined   ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules unmasked-value
          v-model    ="item.phone"
          type       ="text"
          class      ="q-mb-sm"
          :label     ="$t('Telefone')"
          mask       ="(##) #####-####"
          placeholder="Digite seu telefone"
          :rules     ="[isInvalid('phone')]"
          :outlined  ="true"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm q-pb-xs">
      <div class="col-xs-12 text-subtitle2">
        Endereço
      </div>

      <div class="col-xs-12 col-sm-grow">
        <InputSearchPostalcode
          ref   ="cepSearchRef"
          :api  ="api"
          @found="onCEPFound"
          @error="(error) => {
            this.item.address
              .postalCode = error.postalCode;

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
          v-model    ="item.address.street"
          type       ="text"
          :label     ="$t('Rua')"
          :rules     ="[isInvalid('street')]"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.number"
          type       ="text"
          :label     ="$t('Número')"
          :rules     ="[isInvalid('number')]"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label
          v-model    ="item.address.complement"
          type       ="text"
          :label     ="$t('Complemento')"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.district"
          type       ="text"
          :label     ="$t('Bairro')"
          :rules     ="[isInvalid('district')]"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.city"
          type       ="text"
          :label     ="$t('Cidade')"
          :rules     ="[isInvalid('city')]"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-input stack-label lazy-rules
          v-model    ="item.address.state"
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
          v-model    ="item.address.country"
          type       ="text"
          :label     ="$t('País')"
          :rules     ="[isInvalid('country')]"
          class      ="q-mb-sm"
          :outlined  ="true"
        />
      </div>
    </div>

    <div class="row justify-end q-mt-lg">
      <q-btn
         type     ="submit"
         color    ="primary"
         label    ="Salvar"
         :loading ="isSaving"
      />
    </div>

  </q-form>
</template>

<script>
import Api                   from '../utils/api';
import InputSearchPostalcode from './InputSearchPostalcode';

export default {
  props: {
    api: {
      type    : Api,
      required: true
    },
  },

  components: {
    InputSearchPostalcode,
  },

  created() {
    this.loadParticulars();
  },

  data() {
    return {
      clientId  : null,
      contactId : null,
      personType: 'PJ',
      item      : {
        id           : null,
        name         : null,
        alias        : null,
        type         : null,
        document     : null,
        docrg        : null,
        email        : null,
        phone        : null,
        peopleType   : null,
        contact_name : null,
        contact_alias: null,
        reqfile      : null,
        address   : {
          id         : null,
          country    : '',
          state      : '',
          city       : '',
          district   : '',
          postalCode : '',
          street     : '',
          number     : '',
          complement : '',
        },
        particulars: [],
      },
      isSaving   : false,
      isSearching: false,
      particulars: [],
    };
  },

  watch: {
    personType(type) {
      this.loadParticulars();
      this.reset();
    },
  },

  methods: {
    saveClient(values) {
      let params = {};

      this.$emit('before', params);

      let options = {
        method: 'POST',
        body  : JSON.stringify(values),
        params: params
      };

      return this.api.private('/clients', options)
        .then(response => response.json())
        .then(data => {
          if (data.response) {
            if (data.response.success === false)
              throw new Error(data.response.error);

            return data.response.data;
          }

          return null;
        });
    },

    searchClient(document) {
      return this.api.private('/people/client-company', { params: { document } })
        .then(response => response.json())
        .then(data => {
          if (data.response) {
            if (data.response.success === false)
              throw new Error(data.response.error);

            return data.response.data;
          }

          return null;
        });
    },

    getParticularTypes(params) {
      return this.api.private('/particulars_types', { params })
        .then(response => response.json())
        .then(data => {
          if (data['hydra:member'])
            return data['hydra:member'];

          return [];
        });
    },

    searchByDocument(document) {
      if (document !== null) {
        let documentMaxLength = this.personType == 'PJ' ? 14 : 11;

        if (document.length == documentMaxLength) {
          this.isSearching = true;

          this.searchClient(document)
            .then(data => {
              this.clientId   = null;
              this.contactId  = null;

              this.item.id    = data.id;
              this.item.name  = data.name;
              this.item.alias = data.alias;
              this.item.type  = data.type;

              // set documents

              if (data.documents) {
                data.documents.forEach(document => {
                  if (document.type == 'R.G') {
                    this.item.docrg = document.document;
                  }
                });
              }

              if (data.contact) {
                this.item.contact_name  = data.contact.name;
                this.item.contact_alias = data.contact.alias;
                this.item.email         = data.contact.email;
                this.item.phone         = data.contact.phone;
              }

              // set address

              if (data.address) {
                this.item.address.id         = data.address.id ? data.address.id : null;
                this.item.address.country    = data.address.country;
                this.item.address.state      = data.address.state;
                this.item.address.city       = data.address.city;
                this.item.address.district   = data.address.district;
                this.item.address.postalCode = data.address.postalCode;
                this.item.address.street     = data.address.street;
                this.item.address.number     = data.address.number.toString();
                this.item.address.complement = data.address.complement;

                this.$refs.cepSearchRef.setPostalCode(data.address.postalCode);
              }
              else {
                this.item.address.id         = null;
                this.item.address.country    = '';
                this.item.address.state      = '';
                this.item.address.city       = '';
                this.item.address.district   = '';
                this.item.address.postalCode = '';
                this.item.address.street     = '';
                this.item.address.number     = '';
                this.item.address.complement = '';
              }

              // set particulars

              if (data.particulars) {
                data.particulars.forEach(particular => {
                  let field = this.particulars.find(f => f.id == particular.type.id);
                  let index = this.particulars.indexOf(field);

                  if (field)
                    this.particulars[index].value = particular.value;
                });
              }
            })
            .catch(error => {
              this.$emit('error', { message: error.message });
            })
            .finally(() => {
              this.isSearching = false;
            });
        }
      }
    },

    onCEPFound(address) {
      this.item.address.id         = null;
      this.item.address.country    = address.country;
      this.item.address.state      = address.state;
      this.item.address.city       = address.city;
      this.item.address.district   = address.district;
      this.item.address.postalCode = address.postalCode;
      this.item.address.street     = address.street;
      this.item.address.number     = '';
      this.item.address.complement = '';
    },

    setData(data) {
      this.clientId           = data.id;
      this.item.name          = data.name;
      this.item.alias         = data.alias;
      this.item.document      = data.document;
      this.item.contact.id    = data.contact.id;
      this.item.contact.name  = data.contact.name;
      this.item.contact.alias = data.contact.alias;
      this.item.contact.email = data.contact.email;
      this.item.contact.phone = data.contact.phone;
    },

    onSubmit() {
      this.isSaving = true;

      // adding particulars data

      this.particulars.forEach(field => {
        this.item.particulars
          .push({
            id   : field.id,
            value: field.type === 'file' ? field.content : field.value,
          });
      });

      this.saveClient(this.getValues())
        .then(data => {
          this.clientId  = data.clientId;
          this.contactId = data.contactId;

          this.$emit('saved', data);
        })
        .catch(error => {
          this.$emit('error', { message: error.message });
        })
        .finally(() => {
          this.isSaving = false;
        });
    },

    getValues() {
      return {
        "name"    : this.item.name,
        "alias"   : this.item.alias,
        "document": this.item.document,
        "docrg"   : this.item.docrg,
        "contact" : {
          "id"   : this.contactId,
          "name" : this.item.contact_name  || this.item.name,
          "alias": this.item.contact_alias || this.item.alias,
          "email": this.item.email,
          "phone": this.item.phone,
        },
        "address" : {
          "country"    : this.item.address.country,
          "state"      : this.item.address.state,
          "city"       : this.item.address.city,
          "district"   : this.item.address.district,
          "complement" : this.item.address.complement,
          "street"     : this.item.address.street,
          "number"     : this.item.address.number,
          "postal_code": this.item.address.postalCode
        },
        "particulars": this.item.particulars,
      };
    },

    loadParticulars() {
      this.getParticularTypes({
        'peopleType': this.personType == 'PJ' ? 'J' : 'F',
        'context'   : 'clients'
      })
        .then(types => {
          let _types = [];

          types.forEach(type => {
            if (type.fieldType !== 'file')
              _types.push({
                id      : type['@id'].match(/^\/particulars_types\/([a-z0-9-]*)$/)[1],
                label   : type.typeValue,
                value   : null,
                required: type.required === null ? false : ((type.required.split(':')).includes('clients')),
                type    : type.fieldType,
                configs : type.fieldConfigs !== null ? JSON.parse(type.fieldConfigs) : {},
              });
          });

          this.particulars = _types;
        });
    },

    reset() {
      this.$refs.myForm.resetValidation();

      this.item.id                 = null;
      this.item.name               = null;
      this.item.alias              = null;
      this.item.docrg              = null;
      this.item.contact_name       = null;
      this.item.contact_alias      = null;
      this.item.type               = null;
      this.item.email              = null;
      this.item.phone              = null;
      this.item.reqfile            = null;
      this.item.particulars        = [];

      this.item.address.id         = null;
      this.item.address.country    = '';
      this.item.address.state      = '';
      this.item.address.city       = '';
      this.item.address.district   = '';
      this.item.address.postalCode = '';
      this.item.address.street     = '';
      this.item.address.number     = '';
      this.item.address.complement = '';

      this.isSaving                = false;
    },

    isInvalid(key) {
      return val => {
        if (!(val && val.length > 0))
          return this.$t('messages.fieldRequired');

        if (key == 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t('messages.emailInvalid');

        if (key == 'phone' && !/^\d{10,11}$/.test(val))
          return this.$t('messages.phoneInvalid');

        if (key == 'password' && val.length < 6)
          return this.$t('A senha deve ter no mínimo 6 caracteres');

        if (key == 'confirm' && (this.item.password != this.item.confirmPassword))
          return this.$t('As senhas não coincidem');

        return true;
      };
    },
  },
};
</script>
