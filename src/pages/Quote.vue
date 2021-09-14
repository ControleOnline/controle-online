<template>
  <q-page padding>

    <div class="row">
      <div class="col-12">

        <!-- QUOTE FORM -->
        <q-card :class="isPublic ? 'quote-form' : ''">

          <!-- TITLE HEADER -->
          <q-card-section v-if="isPublic" class="q-pt-xl">
            <div class="text-h5 text-center text-uppercase text-primary">
              {{ $t('form.title') }}
            </div>
            <div class="text-caption text-center">
              {{ $t('form.subtitle') }}
            </div>
          </q-card-section>
          <q-card-section v-else class="q-pb-sm text-h6">
              Cotação de frete
          </q-card-section>

          <q-card-section>
            <q-form
              ref         ="form"
              @submit     ="onSubmit"
              autocorrect ="off"
              autocomplete="off"
              spellcheck  ="false"
            >

              <!-- USER LOGGED INFO -->
              <q-markup-table v-if="isPublic && isLogged" dense flat wrap-cells
                class    ="q-mb-md"
                separator="cell"
              >
                <tbody class="bg-grey-2">
                  <tr>
                    <td class="text-center" >
                      <label class="text-weight-medium">Usuário:  </label>
                      {{ logged.username }}
                    </td>
                    <td class="text-center" >
                      <label class="text-weight-medium">Email:    </label>
                      {{ logged.email    }}
                    </td>
                    <td class="text-center" >
                      <label class="text-weight-medium">Telefone: </label>
                      {{ formatPhone(logged.phone) }}
                    </td>
                    <td class="text-center">
                      <q-btn flat
                        label ="Alterar"
                        color ="primary"
                        size  ="sm"
                        @click="logout"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>

              <ContactInputs v-if="isLogged === false" :values="contact" />

              <div class="row q-col-gutter-xs q-pb-xs">
                <OriginInputs      :values="origin"      />
                <DestinationInputs :values="destination" />
              </div>

              <ProductInputs :values="product" />

              <div class="row q-pa-md justify-center items-center">
                <q-btn
                  :loading="isLoading"
                  :label  ="$t('form.labels.submit')"
                  type    ="submit"
                  color   ="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <!-- QUOTE TABLE RESULTS -->
        <q-dialog maximized no-esc-dismiss no-backdrop-dismiss
          v-model        ="dialogs.quote.visible"
          transition-show="scale"
          transition-hide="scale"
        >
          <QuoteTable :order="order" @choose="onChoose" @load="onViewQuotes" />
        </q-dialog>

        <!-- LOGIN FORM -->
        <q-dialog maximized no-esc-dismiss no-backdrop-dismiss
          v-model        ="dialogs.login.visible"
          transition-show="slide-left"
          transition-hide="slide-right"
        >
          <LoginPage
            @logged="onLogged"
            @signup="onSignUp"
          />
        </q-dialog>

        <!-- SIGNUP STEP TO STEP -->
        <q-dialog maximized no-esc-dismiss no-backdrop-dismiss
          v-model        ="dialogs.signup.visible"
          transition-show="slide-left"
          transition-hide="slide-right"
        >
          <SignUpPage
            :order     ="order"
            @created   ="onCreated"
            @company   ="onCompany"
            @registered="onRegistered"
          />
        </q-dialog>

        <!-- ORDER STEP TO STEP -->
        <q-dialog maximized no-esc-dismiss no-backdrop-dismiss
          v-model        ="dialogs.order.visible"
          transition-show="slide-left"
          transition-hide="slide-right"
        >
          <ContractPage
            :order   ="order"
            @finished="onFinished"
            @load    ="onCheckOut"
          />
        </q-dialog>

      </div>
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage }           from 'quasar';

import ContactInputs              from '../components/ContactInputs';
import ProductInputs              from '../components/ProductInputs';
import OriginInputs               from '../components/OriginInputs';
import DestinationInputs          from '../components/DestinationInputs';
import QuoteTable                 from '../components/QuoteTable';

import LoginPage                  from '../components/user/login/Index';
import SignUpPage                 from '../components/user/signup/Index';
import ContractPage               from '../components/contracting/Index';

import { MyPackage }              from '@controleonline/quasar-common-ui/src/utils/mypackage';
import { formatPhone }            from '@controleonline/quasar-common-ui/src/utils/formatter';
import Analytics                  from '@controleonline/quasar-common-ui/src/utils/analytics';

export default {
  name      : 'PageIndex',

  components: {
    ContactInputs    ,
    ProductInputs    ,
    OriginInputs     ,
    DestinationInputs,
    QuoteTable       ,
    LoginPage        ,
    SignUpPage       ,
    ContractPage     ,
  },

  data() {
    return {
      dialogs    : {
        quote : {
          visible: false,
        },
        login : {
          visible: false,
        },
        signup: {
          visible: false,
        },
        order : {
          visible: false,
        },
      },

      order      : { },

      contact    : {
        name : '',
        email: '',
        phone: '',
      },
      product    : {
        type      : '',
        totalPrice: '0',
        packages  : [{
          qtd   : '0',
          weight: '0,000',
          height: '0,00',
          width : '0,00',
          depth : '0,00'
        }],
        cubage    : '0,00',
        sumCubage : 0,
      },
      origin     : {
        country   : '',
        state     : '',
        city      : '',
        district  : '',
        address   : '',
        postalCode: '',
        street    : '',
        number    : '',
        complement: '',
      },
      destination: {
        country   : '',
        state     : '',
        city      : '',
        district  : '',
        address   : '',
        postalCode: '',
        street    : '',
        number    : '',
        complement: '',
      },
    };
  },

  computed: {
    ...mapGetters({
      isLoading : 'quote/isLoading' ,
      error     : 'quote/error'     ,
      violations: 'quote/violations',
      retrieved : 'quote/retrieved',
      myCompany : 'people/currentCompany',
    }),

    isLogged() {
      return this.$store.getters['auth/user'] !== null && this.$store.getters['auth/user'].user;
    },

    logged() {
      return this.$store.getters['auth/user'];
    },

    isPublic() {
      return this.$route.name == 'QuoteIndex';
    },
  },

  watch: {
    cfLoading(value) {
      if (value)
        this.$q.loading.show()
      else
        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.timer = void 0
        }, 800)
    },

    retrieved(response) {
      if (response.success === true && response.count > 0 && response.data) {
        this.order = {
          id     : response.data.order.id,
          quotes : response.data.order.quotes,
          choose : null,
          price  : null,
          user   : response.user,
          contact: this.contact,
          product: this.product,
          address: {
            origin     : this.origin,
            destination: this.destination,
          }
        };

        this.showDialog('quote');
      }
      else {
        this.$q.notify({
          message : 'Sem resultados para a origem e destino informados',
          position: 'center',
          type    : 'warning',
        });
      }
    },
  },

  methods: {
    ...mapActions({
      quote : 'quote/quote'      
    }),

    formatPhone(phone) {
      return formatPhone(phone);
    },

    // do logout

    logout() {
      this.$store.dispatch('auth/logOut');
    },

    // when checkout starts

    onCheckOut() {

      // log analytics event

      if (this.order.id && this.order.choose) {
        let quote = this.order.quotes.find(_quote => _quote.id == this.order.choose),
            item  = {
    				  "id"      : quote.id,
    				  "brand"   : quote.carrier.name,
    				  "name"    : `Frete de ${this.order.address.origin.city}/${this.order.address.origin.state} para ${this.order.address.destination.city}/${this.order.address.destination.state} (${quote.retrieveDeadline}-${quote.deliveryDeadline})`,
    				  "category": quote.group.name,
    				  "variant" : quote.group.name,
    				  "price"   : this.formatMoneyToBRL(quote.total),
    				  "currency": "BRL",
    				  "quantity": 1,
    			  },
            data  = { 'items': item, 'coupon': this.order.id };

        Analytics.logEvent('begin_checkout', data);
      }
    },

    // when quote list is showed

    onViewQuotes() {

      // log analytics event

      if (this.order.quotes) {
        let items = [],
            data  = {};

        for (let i = 0; i < this.order.quotes.length; i++) {
          items.push({
            "id"       : this.order.quotes[i].id,
            "brand"    : this.order.quotes[i].carrier.name,
            "name"     : `Frete de ${this.order.address.origin.city}/${this.order.address.origin.state} para ${this.order.address.destination.city}/${this.order.address.destination.state} (${this.order.quotes[i].retrieveDeadline}-${this.order.quotes[i].deliveryDeadline})`,
            "list_name": 'Cotação',
            "variant"  : this.order.quotes[i].group.name,
            "price"    : this.formatMoneyToBRL(this.order.quotes[i].total),
            "currency" : "BRL",
            "quantity" : 1,
          });
        }

        data.items = items;

        if (items.length > 0)
          Analytics.logEvent('view_item_list', data);
      }

    },

    // when quote is selected

    onChoose(quote) {

      this.order.choose = quote.id;
      this.order.price  = quote.price;

      // log analytics event

      let data = {
  		  'event_category': 'Cotação',
  		  'event_label'   : this.order.address.origin.state,
  		  'value'         : this.formatMoneyToBRL(this.order.price)
		  };

      Analytics.logEvent('Solicitar', data);

      if (this.isLogged) {
        if (this.logged.company === null)
          this.showDialog('signup');
        else
          this.showDialog('order');
      }

      else this.showDialog('login');
    },

    // when user logged is succeeded

    onLogged(user) {
      this.$q.notify({
        message : `Agora você esta logado como "${user.username}"`,
        position: 'top',
        type    : 'positive',
      });

      if (this.order.choose !== null) {

        this.showDialog(
          this.logged.company === null ? 'signup' : 'order'
        );

      }
    },

    // when request signup

    onSignUp() {
      this.showDialog('signup');
    },

    // when user created signup step 1

    onCreated(user) {
      this.$store.dispatch('auth/logIn');

      if (this.isLogged)
        this.$q.notify({
          message : `Agora você esta logado como "${user.username}"`,
          position: 'top',
          type    : 'positive',
        });
    },

    // when company created signup step 2

    onCompany(company) {

      // refresh company id if not defined

      if (LocalStorage.has('session')) {
        let storedUser = LocalStorage.getItem('session');

        if (!storedUser.company) {
          storedUser.company = company.id;

          LocalStorage.set('session', storedUser);
        }
      }

    },

    // when signup process is finished

    onRegistered(user) {
      this.$q.notify({
        message : 'Seu cadastro foi realizado com sucesso',
        position: 'bottom',
        type    : 'positive',
      });

      if (this.order.choose !== null) {
        this.showDialog('order');
      }
    },

    // when checkout is finished

    onFinished(order) {

      // log analytics event

      let quote = this.order.quotes.find(_quote => _quote.id == this.order.choose),
          item  = {
            "id"      : quote.id,
            "brand"   : quote.carrier.name,
            "name"    : `Frete de ${this.order.address.origin.city}/${this.order.address.origin.state} para ${this.order.address.destination.city}/${this.order.address.destination.state} (${quote.retrieveDeadline}-${quote.deliveryDeadline})`,
            "category": quote.group.name,
            "variant" : quote.group.name,
            "price"   : this.formatMoneyToBRL(quote.total),
            "currency": "BRL",
            "quantity": 1,
          },
          data  = {
      		  "transaction_id": this.order.id,
      		  "affiliation"   : "Google online store",
      		  "value"         : this.formatMoneyToBRL(this.order.price),
      		  "currency"      : "BRL",
      		  "tax"           : 0,
      		  "shipping"      : this.formatMoneyToBRL(this.order.price),
      		  "items"         : item
      		};

      Analytics.logEvent('purchase', data);

      // show notification

      this.$q.notify({
        message : `Pedido #${order.id} foi salvo com sucesso`,
        position: 'bottom',
        type    : 'positive',
      });

      // redirect to order detail page

      setTimeout(() => {        
        this.$router.push({ name: 'OrderDetails', params: { id: this.order.id }});
      }, 1000);
    },

    showDialog(name) {
      if (name !== false) {
        this.dialogs[name].visible = true;
      }

      // hide all opened dialogs

      let time = name === false ? 0 : 600;

      setTimeout(() => {
        for (let dialogName in this.dialogs) {
          if (dialogName !== name && this.dialogs[dialogName].visible)
          this.dialogs[dialogName].visible = false;
        }
      }, time);
    },

    validate() {
      let isValid = true;
      let message = '';

      if (!this.isLogged) {
        // name
        if (!this.contact.name.length) {
          message = 'O campo NOME não é válido';
          isValid = false;
        }

        // email
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact.email)) {
          message = 'O campo E-MAIL não é válido';
          isValid = false;
        }

        // phone
        else if (!/^\d{10,11}$/.test(this.contact.phone)) {
          message = 'O campo FONE não é válido';
          isValid = false;
        }
      }

      // origin
      if (!this.origin.city.length || !this.origin.state.length || !this.origin.country.length) {
        message = 'O campo ORIGEM não é válido';
        isValid = false;
      }

      // destination
      else if (!this.destination.city.length || !this.destination.state.length || !this.destination.country.length) {
        message = 'O campo DESTINO não é válido';
        isValid = false;
      }

      // product type
      else if (!this.product.type.length) {
        message = 'O campo TIPO DO PRODUTO não é válido';
        isValid = false;
      }

      // product price
      else if (!(parseFloat(this.product.totalPrice.replace(',', '.')) > 0)) {
        message = 'O campo VALOR DA NOTA não é válido';
        isValid = false;
      }

      // packages
      else if (!(parseFloat(this.product.cubage.replace(',', '.')) > 0)) {
        if (!this.product.packages.length) {
          message = 'Os dados dos produtos não foram informados';
          isValid = false;
        }
        else {
          let row = 0;

          for (let index in this.product.packages) {
            MyPackage._package = this.product.packages[index];

            row = parseInt(index) + 1;

            if (!(MyPackage.quantity() > 0)) {
              message = `O campo QUANTIDADE da fila ${row} não é válido`;
              isValid = false;
              break;
            }

            else if (!(MyPackage.weight() > 0)) {
              message = `O campo PESO da fila ${row} não é válido`;
              isValid = false;
              break;
            }

            else if (!(MyPackage.height() > 0)) {
              message = `O campo ALTURA da fila ${row} não é válido`;
              isValid = false;
              break;
            }

            else if (!(MyPackage.width() > 0)) {
              message = `O campo LARGURA da fila ${row} não é válido`;
              isValid = false;
              break;
            }

            else if (!(MyPackage.depth() > 0)) {
              message = `O campo PROFUNDIDADE da fila ${row} não é válido`;
              isValid = false;
              break;
            }
          }
        }
      }

      if (isValid === false && message.length)
        this.$q.notify({
          message : message,
          type    : 'negative',
          position: 'bottom'
        });

      return isValid;
    },

    payload() {
      let packages = null;
      let cubage   = parseFloat(this.product.cubage.replace(',', '.'));

      if (cubage > 0)
        packages = cubage;
      else {
        if (this.product.packages.length) {
          packages = [];

          for (let index in this.product.packages) {
            MyPackage._package = this.product.packages[index];

            packages.push({
              qtd   : MyPackage.quantity(),
              weight: MyPackage.weight  (),
              height: MyPackage.height  (),
              width : MyPackage.width   (),
              depth : MyPackage.depth   (),
            });
          }
        }
      }

      // if user is logged, contact can be null
      let contact = null;

      if (!this.isLogged)
        contact = {
        	"name" : this.contact.name,
        	"email": this.contact.email,
        	"phone": this.contact.phone,
        };

      return {
        "origin"           : this.getAddress(this.origin),
        "destination"      : this.getAddress(this.destination),
        "productTotalPrice": parseFloat(this.product.totalPrice.replace(',', '.')),
        "packages"         : packages,
        "productType"      : this.product.type,
        "contact"          : contact,
      };
    },

    getAddress(target) {
      let address = {
        "country": target.country,
        "state"  : target.state,
        "city"   : target.city,
      };

      if (
          this.isNotEmpty(target.district  ) &&
          this.isNotEmpty(target.postalCode) &&
          this.isNotEmpty(target.street    ) &&
          this.isNotEmpty(target.number    )
        ) {
          address["district"]    = target.district;
          address["postal_code"] = target.postalCode;
          address["street"]      = target.street;
          address["number"]      = target.number;
          address["complement"]  = target.complement;
      }

      return address;
    },

    isNotEmpty(target) {
      if (target !== null)
        return target.length > 0;

      return false;
    },

    onSubmit() {
      if (this.validate() === false)
        return;

      let payload = {
        values: this.payload()
      };

      if (this.myCompany !== null)
        payload.query = {
          myCompany: this.myCompany.id
        };

      this.quote(payload);
    },

    formatMoneyToBRL(value) {
      let formatter = new Intl.NumberFormat(this.$i18n.locale, {
        style   : 'currency',
        currency: 'BRL',
      });

      if (typeof value == 'string')
        value = value.replace(',', '.');

      return formatter.format(value);
    },
  },
}
</script>

<style lang="scss" scoped>
.quote-form {
  width : 85%;
  margin: 40px auto;
}

.q-table__bottom {
  .q-table__control {
    color: #00519b !important;
  }
  .q-field, .q-field__native {
    color: #00519b !important;
  }
}
</style>
