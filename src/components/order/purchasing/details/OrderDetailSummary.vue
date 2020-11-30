<template>
  <div class="row items-center justify-center">
    <div class="flex flex-center" v-if="isLoading">
      <q-circular-progress :indeterminate="isLoading"
        size ="sm"
        color="primary"
        class="q-ma-md"
      />
      Carregando...
    </div>

    <div class="col-12 q-pa-md" v-if="summary !== null">
      <!-- WHO IS THE PAYER -->

      <div class="row justify-center q-mb-md">
        <div class="col-xs-12 text-center text-subtitle2 q-mb-md">
          Quem pagará pelo frete?
        </div>
        <div class="col-xs-12 text-center q-mb-md">
          <q-btn-toggle no-caps
            v-model     ="payer"
            toggle-color="primary"
            :options    ="options"
            :disable    ="!editable"
          />
        </div>
      </div>

      <ContactForm
        v-if     ="payer === null"
        :itemData="payerContact"
        :withSave="false"
        :canEdit ="editable"
      />

      <q-separator />

      <div v-if="payer !== false">
        <!-- RETRIEVE DATA -->

        <div class="row justify-center items-stretch q-mt-lg">
          <div class="col-xs-12 col-sm-5">
            <q-markup-table flat
              separator="none"
              class    ="bg-grey-2 q-mb-md full-height"
            >
              <thead>
                <tr>
                  <th colspan="2">
                    <div class="text-subtitle2 text-blue">Dados da coleta</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left text-bold">Nome</td>
                  <td class="text-left">
                    {{ this.retrieve.name }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-bold">Documento</td>
                  <td class="text-left">
                    {{ formatDoc(this.retrieve.document) }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-bold">Cidade</td>
                  <td class="text-left">
                    {{ `${this.retrieve.address.city} / ${this.retrieve.address.state}` }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">
                    <q-btn
                      size  ="sm"
                      color ="primary"
                      label ="Detalhes da coleta"
                      @click="seeDetails(retrieve)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          <div class="col-xs-12 col-sm-2 gt-xs">
            <div class="row justify-center items-center full-height">
              <q-icon name="local_shipping" class="text-primary" style="font-size: 3em" />
            </div>
          </div>
          <div class="col-xs-12 col-sm-5">
            <q-markup-table flat
              separator="none"
              class    ="bg-grey-2 q-mb-md full-height"
            >
              <thead>
                <tr>
                  <th colspan="2">
                    <div class="text-subtitle2 text-blue">Dados da entrega</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left text-bold">Nome</td>
                  <td class="text-left">
                    {{ this.delivery.name }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-bold">Documento</td>
                  <td class="text-left">
                    {{ formatDoc(this.delivery.document) }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left text-bold">Cidade</td>
                  <td class="text-left">
                    {{ `${this.delivery.address.city} / ${this.delivery.address.state}` }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">
                    <q-btn
                      size  ="sm"
                      color ="primary"
                      label ="Detalhes da entrega"
                      @click="seeDetails(delivery)"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>

        <!-- PRODUCT INFO -->

        <div class="row q-mt-lg">
          <div class="col-xs-12">
            <q-markup-table flat class="q-mb-md">
              <thead>
                <tr>
                  <th>Cubagem</th>
                  <th>Tipo de material</th>
                  <th>Valor da nota fiscal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    {{ `${ (new Intl.NumberFormat('pt-br')).format(this.product.sumCubage) } kg` }}
                  </td>
                  <td class="text-center">
                    {{ this.product.type }}
                  </td>
                  <td class="text-center">
                    {{ formatMoney(this.product.totalPrice) }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <div v-if="product.packages.length > 0" class="col-xs-12">
            <div class="col-xs-12 text-subtitle2 q-mb-sm">
              Detalhes dos produtos
            </div>
            <q-markup-table class="q-mb-md">
              <thead>
                <tr>
                  <th>Quantidade</th>
                  <th>Peso</th>
                  <th>Altura</th>
                  <th>Largura</th>
                  <th>Profundidade</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(myPackage, index) in product.packages"
                  :key ="index"
                >
                  <td class="text-center">{{ myPackage.qtd    }}</td>
                  <td class="text-center">{{ `${myPackage.weight} kg` }}</td>
                  <td class="text-center">{{ `${myPackage.height} m`  }}</td>
                  <td class="text-center">{{ `${myPackage.width } m`  }}</td>
                  <td class="text-center">{{ `${myPackage.depth } m`  }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>

        <!-- SOME COMMENTS ABOUT THIS ORDER -->

        <div class="row q-mt-lg">
          <div class="col-xs-12">
            <q-input outlined stack-label
              v-model ="comments"
              type    ="textarea"
              label   ="Observações"
              :disable="!editable"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="dialogs.details.visible" transition-show="scale" transition-hide="scale">
        <q-card class="text-white" style="background-color: #00519b">
          <q-card-section>
            <div class="row items-center">
              <div class="text-h6">Detalhes</div>
              <q-space />
              <q-btn icon="close" color="white" flat round dense v-close-popup />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-markup-table>
              <tbody>
                <tr>
                  <td class="text-left">Nome</td>
                  <td class="text-left">{{ dialogs.details.data.name        }}</td>
                </tr>
                <tr>
                  <td class="text-left">Email</td>
                  <td class="text-left">{{ dialogs.details.data.email       }}</td>
                </tr>
                <tr>
                  <td class="text-left">Telefone</td>
                  <td class="text-left">{{ dialogs.details.data.phone       }}</td>
                </tr>
                <tr>
                  <td class="text-left">Estado</td>
                  <td class="text-left">{{ dialogs.details.data.state       }}</td>
                </tr>
                <tr>
                  <td class="text-left">Cidade</td>
                  <td class="text-left">{{ dialogs.details.data.city        }}</td>
                </tr>
                <tr>
                  <td class="text-left">Bairro</td>
                  <td class="text-left">{{ dialogs.details.data.district    }}</td>
                </tr>
                <tr>
                  <td class="text-left">CEP</td>
                  <td class="text-left">{{ dialogs.details.data.postal_code }}</td>
                </tr>
                <tr>
                  <td class="text-left">Rua</td>
                  <td class="text-left">{{ dialogs.details.data.street      }}</td>
                </tr>
                <tr>
                  <td class="text-left">Número</td>
                  <td class="text-left">{{ dialogs.details.data.number      }}</td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div class="col-12" v-if="summary === null && incomplete">
      <div 
        class="row items-center justify-center"
        style="min-height: 90vh;"
      >
        <q-banner class="text-white bg-red text-center text-h3" rounded>
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          Os dados do pedido estão incompletos
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script>
import { date, extend }           from 'quasar';
import { mapActions, mapGetters } from 'vuex';
import {
  formatDocument,
  formatMoney   ,
  formatTelefone,
  formatCEP     ,
} from '../../../../utils/formatter';
import ContactForm                from './../../../common/ContactForm';

export default {
  props: {
    orderId: {
      type    : String,
      required: true,
    }
  },

  components: {
    ContactForm,
  },

  created() {
    if (this.myCompany !== null && this.orderId !== null) {
      this.requestSummary(this.orderId)
        .then(result => {
          if (result === false)
            this.incomplete = true;
        });
    }
  },

  data() {
    return {
      summary     : null,
      isLoading   : false,
      options     : [],
      comments    : '',
      editable    : false,
      incomplete  : false,
      payerContact: null,
      product     : {
        sumCubage : null,
        type      : null,
        totalPrice: null,
        packages  : [],
      },
      payer       : -1,
      retrieve    : {
        id      : 11,
        name    : null,
        document: null,
        contact : {
          name : null,
          email: null,
          phone: null
        },
        address  : {
          district   : null,
          postal_code: null,
          street     : null,
          number     : null,
          city       : null,
          state      : null,
        },
      },
      delivery  : {
        id      : null,
        name    : null,
        document: null,
        contact : {
          name : null,
          email: null,
          phone: null
        },
        address : {
          district   : null,
          postal_code: null,
          street     : null,
          number     : null,
          city       : null,
          state      : null,
        },
      },
      dialogs  : {
        details: {
          visible: false,
          data   : {
            name       : null,
            email      : null,
            phone      : null,
            country    : null,
            state      : null,
            city       : null,
            district   : null,
            postal_code: null,
            street     : null,
            number     : null,
            complement : null,
          },
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
    }),

    payerIsOther() {
      return this.summary.payer.id != this.summary.retrievePeople.id && this.summary.payer.id != this.summary.deliveryPeople.id;
    }
  },

  watch: {
    myCompany(company) {
      if (company !== null) {
        this.requestSummary(this.orderId)
          .then(result => {
            if (result === false)
              this.incomplete = true;
          });
      }
    },

    summary(data) {
      if (!data)
        return;

      this.options  = this.getPayerOptions();
      this.payer    = this.payerIsOther ? null : this.summary.payer.id;

      this.retrieve = {
        id      : this.summary.retrievePeople.id,
        name    : this.summary.retrievePeople.document.type == 'CNPJ' ? this.summary.retrievePeople.alias : `${this.summary.retrievePeople.name} ${this.summary.retrievePeople.alias}`,
        document: this.summary.retrievePeople.document.document,
        contact : {
          name : `${this.summary.retrievePeople.contact.name} ${this.summary.retrievePeople.contact.alias}`,
          email: this.summary.retrievePeople.contact.email,
          phone: this.summary.retrievePeople.contact.phone,
        },
        address : {
          district   : this.summary.retrievePeople.address.district,
          postal_code: this.summary.retrievePeople.address.postalCode,
          street     : this.summary.retrievePeople.address.street,
          number     : this.summary.retrievePeople.address.number,
          city       : this.summary.retrievePeople.address.city,
          state      : this.summary.retrievePeople.address.state,
        },
      };

      this.delivery = {
        id      : this.summary.deliveryPeople.id,
        name    : this.summary.deliveryPeople.document.type == 'CNPJ' ? this.summary.deliveryPeople.alias : `${this.summary.deliveryPeople.name} ${this.summary.deliveryPeople.alias}`,
        document: this.summary.deliveryPeople.document.document,
        contact : {
          name : `${this.summary.deliveryPeople.contact.name} ${this.summary.deliveryPeople.contact.alias}`,
          email: this.summary.deliveryPeople.contact.email,
          phone: this.summary.deliveryPeople.contact.phone,
        },
        address : {
          district   : this.summary.deliveryPeople.address.district,
          postal_code: this.summary.deliveryPeople.address.postalCode,
          street     : this.summary.deliveryPeople.address.street,
          number     : this.summary.deliveryPeople.address.number,
          city       : this.summary.deliveryPeople.address.city,
          state      : this.summary.deliveryPeople.address.state,
        },
      };

      this.product  = {
        sumCubage : this.summary.cubage,
        type      : this.summary.productType,
        totalPrice: this.summary.invoiceTotal,
        packages  : this.summary.packages,
      };

      this.comments = this.summary.comments;
    },

    payer(payerId) {
      if (payerId !== null || !this.payerIsOther)
        return;

      this.payerContact = {
        id      : this.summary.payer.id,
        name    : this.summary.payer.contact.name,
        alias   : this.summary.payer.contact.alias,
        document: {
          document: this.summary.payer.document.document,
          type    : this.summary.payer.document.type    ,
        },
        email   : this.summary.payer.contact.email,
        phone   : this.summary.payer.contact.phone,
        address : {
          id         : this.summary.payer.address.id,
          country    : 'Brasil',
          state      : this.summary.payer.address.state,
          city       : this.summary.payer.address.city,
          district   : this.summary.payer.address.district,
          postal_code: this.summary.payer.address.postalCode,
          street     : this.summary.payer.address.street,
          number     : this.summary.payer.address.number,
          complement : this.summary.payer.address.complement,
        },
      };
    },
  },

  methods: {
    ...mapActions({
      getSummary: 'purchasingOrder/getDetailSummary',
    }),

    getPayerOptions() {
      let opts = [];

      let retrieveName = `${this.summary.retrievePeople.name} ${this.summary.retrievePeople.alias}`;
      let deliveryName = `${this.summary.deliveryPeople.name} ${this.summary.deliveryPeople.alias}`;

      if (this.summary.retrievePeople.document.type == 'CNPJ')
        retrieveName = this.summary.retrievePeople.alias;

      if (this.summary.deliveryPeople.document.type == 'CNPJ')
        deliveryName = this.summary.deliveryPeople.alias;

      if (this.summary.retrievePeople.id == this.summary.deliveryPeople.id)
        opts.push({
          label: `${retrieveName} (CIF)`,
          value: this.summary.retrievePeople.id,
        });

      else {
        opts.push({
          label: `${retrieveName} (CIF)`,
          value: this.summary.retrievePeople.id,
        });

        opts.push({
          label: `${deliveryName} (FOB)`,
          value: this.summary.deliveryPeople.id,
        });
      }

      opts.push({
        label: 'Outra pessoa',
        value: null,
      });

      return opts;
    },

    formatDoc(document) {
      return formatDocument(document);
    },

    formatMoney(value) {
      return formatMoney(value, 'BRL', 'pt-br');
    },

    seeDetails(data) {
      this.dialogs.details.data.name        = data.contact.name;
      this.dialogs.details.data.email       = data.contact.email;
      this.dialogs.details.data.phone       = formatTelefone(data.contact.phone);
      this.dialogs.details.data.state       = data.address.state;
      this.dialogs.details.data.city        = data.address.city;
      this.dialogs.details.data.district    = data.address.district;
      this.dialogs.details.data.postal_code = formatCEP(data.address.postal_code);
      this.dialogs.details.data.street      = data.address.street;
      this.dialogs.details.data.number      = data.address.number;

      this.dialogs.details.visible = true;
    },

    requestSummary(orderId) {
      let params = {};

      params['myCompany'] = this.myCompany.id;

      this.isLoading = true;

      return this.getSummary({ orderId, params })
        .then(response => {

          this.isLoading = false;

          if (!response) {
            this.summary = null;
            return false;
          }

          if (response.success) {
            if (response.data.retrievePeople == null || response.data.deliveryPeople == null || response.data.payer == null)
              return false;

            this.summary = response.data;

            return true;
          }

          return false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
  },
};
</script>