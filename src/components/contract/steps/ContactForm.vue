<template>

  <q-form @submit="save" class="q-mt-sm" ref="myForm">

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
          :outlined   ="editMode"
          :borderless ="!editMode"
          :readonly   ="!editMode"
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
          :outlined   ="editMode"
          :borderless ="!editMode"
          :readonly   ="!editMode"
        />
      </div>
    </div>

    <!-- PARTICULARS -->
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label
          v-model    ="item.birthday"
          mask       ="##/##/####"
          :label     ="personType == 'PF' ? 'Data de nascimento' : 'Data de fundação'"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        >
          <template v-slot:append v-if="editMode">
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model ="item.birthday"
                  mask    ="DD/MM/YYYY"
                  @input  ="() => $refs.qDateProxy1.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div
        v-if ="personType == 'PF'"
        class="col-xs-12 col-sm-grow"
      >
        <q-input stack-label lazy-rules
          v-model    ="item.docrg"
          type       ="text"
          class      ="q-mb-sm"
          label      ="R.G."
          :rules     ="[isInvalid('document')]"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div
        v-for="(field, index) in particulars"
        :key ="index"
        class="col-xs-12 col-sm-grow"
      >
        <q-input stack-label lazy-rules
          v-model    ="field.value"
          type       ="text"
          :label     ="$t(field.label)"
          :rules     ="[isInvalid('field_text')]"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
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
          :outlined   ="editMode"
          :borderless ="!editMode"
          :readonly   ="!editMode"
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
          :outlined   ="editMode"
          :borderless ="!editMode"
          :readonly   ="!editMode"
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
          :outlined   ="editMode"
          :borderless ="!editMode"
          :readonly   ="!editMode"
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
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-xs-12">
        <q-select multiple use-chips outlined stack-label emit-value map-options
          v-model ="item.peopleType"
          label   ="Participação"
          :options="participantRoles"
        />
      </div>

      <div class="col-xs-12 col-sm-6 q-pt-md">
        <q-input outlined stack-label reverse-fill-mask
          suffix   ="%"
          v-model  ="item.percentage"
          type     ="text"
          :label   ="$t('Percentagem')"
          mask     ="#,##"
          fill-mask="0"
          :rules   ="[isInvalid('percentagem')]"
        />
      </div>

      <div class="col-xs-12 col-sm-6 q-pt-md">
        <q-select stack-label emit-value map-options :hide-dropdown-icon="!editMode"
          v-model    ="item.paymentDay"
          label      ="Dia de pagamento"
          :options   ="monthDays"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm q-pb-xs">
      <div class="col-xs-12 text-subtitle2">
        Endereço
      </div>

      <div class="col-xs-12 col-sm-grow">
        <CEPSearchInput
          ref      ="cepSearchRef"
          :editMode="editMode"
          @found   ="onCEPFound"
          @error   ="(error) => {
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
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.number"
          type       ="text"
          :label     ="$t('Número')"
          :rules     ="[isInvalid('number')]"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label
          v-model    ="item.address.complement"
          type       ="text"
          :label     ="$t('Complemento')"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.district"
          type       ="text"
          :label     ="$t('Bairro')"
          :rules     ="[isInvalid('district')]"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div class="col-xs-12 col-sm-grow">
        <q-input stack-label lazy-rules
          v-model    ="item.address.city"
          type       ="text"
          :label     ="$t('Cidade')"
          :rules     ="[isInvalid('city')]"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
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
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-input stack-label lazy-rules
          v-model    ="item.address.country"
          type       ="text"
          :label     ="$t('País')"
          :rules     ="[isInvalid('country')]"
          class      ="q-mb-sm"
          :outlined  ="editMode"
          :borderless="!editMode"
          :readonly  ="!editMode"
        />
      </div>
    </div>

    <div class="row justify-end q-mt-lg">
      <q-btn
         type     ="submit"
         color    ="primary"
         label    ="Adicionar"
         :loading ="isSaving"
      />
    </div>

  </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ListAutocomplete           from '../../common/ListAutocomplete';
import CEPSearchInput             from '../../common/CEPSearchInput';

export default {
  props     : {
    contract: {
      type    : Object,
      required: true,
    },
  },

  components: {
    ListAutocomplete,
    CEPSearchInput  ,
  },

  created() {
    this.loadMonthDays();
    this.loadParticipantRoles();
    this.loadParticulars();
  },

  data() {
    return {
      isSearching  : false,
      personType   : 'PJ',
      isSaving     : false,
      editMode     : true,
      item         : {
        id           : null,
        name         : null,
        alias        : null,
        type         : null,
        document     : null,
        docrg        : null,
        email        : null,
        phone        : null,
        peopleType   : null,
        percentage   : null,
        contact_name : null,
        contact_alias: null,
        paymentDay   : null,
        birthday     : null,
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
      participantRoles: [],
      monthDays       : [],
      particulars     : [],
    };
  },

  computed: {
    logged() {
      return this.$store.getters['auth/user'];
    },
  },

  watch: {
    personType(type) {
      this.loadParticulars();
      this.reset();
    },

    'item.document'(document) {
      if (document !== null) {
        let documentMaxLength = this.personType == 'PJ' ? 14 : 11;

        if (document.length == documentMaxLength) {
          this.isSearching = true;

          this.searchClient(document)
            .then(response => {
              if (response.success === false) {
                this.$q.notify({
                  message : response.error,
                  position: 'bottom',
                  type    : 'warning',
                });

                this.reset();

                return;
              }

              this.editMode        = false;

              this.item.id         = response.data.id;
              this.item.name       = response.data.name;
              this.item.alias      = response.data.alias;
              this.item.type       = response.data.type;
              this.item.paymentDay = response.data.payment.dueDay;

              if (response.data.birthday) {
                this.item.birthday = response.data
                  .birthday.replace(/^(\d{4})\-(\d{2})\-(\d{2})[\W\w\d]*$/g, "\$3\-\$2\-\$1");
              }

              // set documents

              if (response.data.documents) {
                response.data.documents.forEach(document => {
                  if (document.type == 'R.G') {
                    this.item.docrg = document.document;
                  }
                });
              }

              if (response.data.contact) {
                this.item.contact_name  = response.data.contact.name;
                this.item.contact_alias = response.data.contact.alias;
                this.item.email         = response.data.contact.email;
                this.item.phone         = response.data.contact.phone;
              }

              // set address

              if (response.data.address) {
                this.item.address.id         = response.data.address.id ? response.data.address.id : null;
                this.item.address.country    = response.data.address.country;
                this.item.address.state      = response.data.address.state;
                this.item.address.city       = response.data.address.city;
                this.item.address.district   = response.data.address.district;
                this.item.address.postalCode = response.data.address.postalCode;
                this.item.address.street     = response.data.address.street;
                this.item.address.number     = response.data.address.number.toString();
                this.item.address.complement = response.data.address.complement;

                this.$refs.cepSearchRef.setPostalCode(response.data.address.postalCode);
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

              if (response.data.particulars) {
                response.data.particulars.forEach(particular => {
                  let field = this.particulars.find(f => f.id == particular.type.id);
                  let index = this.particulars.indexOf(field);

                  if (field)
                    this.particulars[index].value = particular.value;
                });
              }
            })
            .catch(error => {

            })
            .finally(() => {
              this.isSearching = false;
            });
        }
      }
    },
  },

  methods: {
    ...mapActions({
      searchClient      : 'people/getClientContact',
      getParticipants   : 'contracts/getParticipantRoles',
      getParticularTypes: 'particulars/getParticularsTypes',
    }),

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

    loadMonthDays() {
      for (let day = 1; day < 32; day++) {
        this.monthDays.push({
          label: day,
          value: day,
        });
      }
    },

    loadParticipantRoles() {
      this.participantRoles
        .push({
          label: this.$t(`contracts.roles.Beneficiary`),
          value: 'Beneficiary',
        });
      this.participantRoles
        .push({
          label: this.$t(`contracts.roles.Witness`),
          value: 'Witness',
        });
      this.participantRoles
        .push({
          label: this.$t(`contracts.roles.Payer`),
          value: 'Payer',
        });
    },

    loadParticulars() {
      this.getParticularTypes({
        'peopleType': this.personType == 'PJ' ? 'J' : 'F'
      })
        .then(types => {
          let _types = [];

          types.forEach(type => {
            _types.push({
              id   : type['@id'].match(/^\/particulars_types\/([a-z0-9-]*)$/)[1],
              label: type.typeValue,
              value: null,
            });
          });

          this.particulars = _types;
        });
    },

    save() {
      this.isSaving = true;

      // adding particulars data

      this.particulars.forEach(field => {
        this.item.particulars
          .push({
            id   : field.id,
            value: field.value,
          });
      });

      this.$emit('save', this.item);
    },

    reset() {
      this.$refs.myForm.resetValidation();

      this.item.id                 = null;
      this.item.name               = null;
      this.item.alias              = null;
      this.item.birthday           = null;
      this.item.docrg              = null;
      this.item.contact_name       = null;
      this.item.contact_alias      = null;
      this.item.type               = null;
      this.item.email              = null;
      this.item.phone              = null;
      this.item.peopleType         = [];
      this.item.percentage         = null;
      this.item.paymentDay         = null;
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
      this.editMode                = true;
    },

    setAsNotSaving() {
      this.isSaving = false;
    },

    isInvalid(key) {
      return val => {
        if (!(val && val.length > 0))
          return this.$t('messages.fieldRequired');

        if (key == 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t('messages.emailInvalid');

        if (key == 'phone' && !/^\d{10,11}$/.test(val))
          return this.$t('messages.phoneInvalid');

        return true;
      };
    },
  },
};
</script>
