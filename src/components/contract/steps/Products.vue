<template>
  <!-- eslint-disable -->
  <div>

    <q-form v-if="editMode"
      @submit="save"
      class  ="q-mt-sm"
      ref    ="myForm"
    >

      <div class="row q-col-gutter-sm">
        <div class="col-xs-12">
          <q-select outlined stack-label
            v-model ="item.product"
            label   ="Produto"
            :options="products"
            :loading="isloadingProds"
            @input  ="setProductPrice"
            :rules  ="[val => val !== null || 'Selecione um produto']"
          >
          </q-select>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-input stack-label outlined reverse-fill-mask
            prefix   ="R$"
            v-model  ="item.price"
            type     ="text"
            :label   ="$t('Preço')"
            mask     ="#,##"
            fill-mask="0"
            :rules   ="[isInvalid('price')]"
          />
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-input outlined stack-label reverse-fill-mask
            v-model  ="item.quantity"
            type     ="text"
            :label   ="item.product !== null && item.product.type == 'Registration' ? $t('Parcelas') : $t('Quantidade')"
            mask     ="#"
            fill-mask="0"
            :rules   ="[isInvalid('quantity')]"
          />
        </div>

        <div v-if="item.product !== null && item.product.type == 'Registration'"
          class="col-xs-12"
        >
          <q-select outlined stack-label emit-value map-options
            v-model ="item.payer"
            label   ="Pagador"
            :options="payers"
            :rules  ="[val => (val !== null && item.product !== null && item.product.type == 'Registration') || 'Selecione um pagador']"
            :loading="isloadingPayers"
          />
        </div>

        <div class="col-xs-12">
          <div class="row q-mb-md justify-end">
            <q-btn
              type    ="submit"
              color   ="primary"
              label   ="Adicionar"
              :loading="isAdding"
            />
          </div>
        </div>
      </div>

    </q-form>

    <q-separator v-if="editMode" />

    <ContractProducts
      ref      ="productsRef"
      class    ="q-mt-md"
      :contract="contract"
      :editMode="editMode"
      @loaded  ="onProductsLoaded"
    />

    <div v-if="editMode"
      class="row q-mt-md justify-end"
    >
      <q-btn
        color   ="deep-orange"
        label   ="Seguinte"
        :disable="!nextAllowed"
        @click  ="$emit('saved')"
      />
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import ContractProducts           from './ContractProducts';
import { formatMoney }            from '../../../utils/formatter';
import { fetch }                  from '../../../boot/myapi';

export default {
  components: {
    ContractProducts,
  },

  props     : {
    contract: {
      type    : Object,
      required: true,
    },
    steps: {
      type    : Object,
      required: true,
    },
    editMode: {
      type    : Boolean,
      required: false,
      default : true
    },
  },

  created() {
    this.loadingProducts();
    this.getPayers();
  },

  mounted() {
    this.$refs.productsRef.reload();
  },

  data() {
    return {
      item          : {
        product : null,
        quantity: null,
        price   : 0,
        payer   : null,
        parcels : null,
      },
      isSearching    : false,
      isAdding       : false,
      nextAllowed    : false,
      products       : [],
      payers         : [],
      isloadingProds : false,
      isloadingPayers: false,
    };
  },

  computed: {
    ...mapGetters({
      myProvider: 'people/currentCompany',
      user      : 'auth/user',
    }),
  },

  watch: {
    provider(provider) {
      this.loadingProducts();
    },
  },

  methods: {
    ...mapActions({
      create     : 'contracts/createProductContract',
      getProducts: 'contracts/getProducts',
    }),

    setProductPrice(product) {
      this.item.price = (parseFloat(product.price) + 0.001).toFixed(2);
    },

    onProductsLoaded(total) {
      this.nextAllowed              = total > 0;
      this.steps.products.hasErrors = !this.nextAllowed;
    },

    loadingProducts() {
      if (this.isloadingProds)
        return;

      this.isloadingProds = true;

      this.getProducts()
        .then(products => {
          if (products) {
            products.forEach(product => {
              this.products
                .push({
                  label : product.product,
                  value : product['@id'].replace(/\D/g, ""),
                  price : product.price,
                  type  : product.productType
                });
            });
          }
        })
        .catch(error => {

        })
        .finally(() => {
          this.isloadingProds = false;
        });
    },

    getPayers() {
      if (this.isloadingPayers)
        return;

      this.isloadingPayers = true;

      return fetch(`${this.contract['@id']}/contract_peoples`, { params: { peopleType: 'Payer' } })
        .then(response => response.json())
        .then(data => {
          if (data['hydra:member']) {
            let payers = [];

            data['hydra:member'].forEach(contractPeople => {
              payers.push({
                  label: `${contractPeople.people.name} ${contractPeople.people.alias}`,
                  value: contractPeople.people['@id'].replace(/\D/g, ""),
                });
            });

            this.payers = payers;
          }
        })
        .finally(() => {
          this.isloadingPayers = false;
        });
    },

    save() {
      let payload = {
        contractId: this.contract['@id'].replace(/\D/g, ""),
        values    : {
        	"product" : this.item.product.value,
        	"quantity": this.item.product.type == 'Registration' ? 1 : parseInt(this.item.quantity),
        	"price"   : parseFloat(this.item.price.replace(',', '.')),
        	"payer"   : this.item.product.type == 'Registration' ? this.item.payer : null,
        	"parcels" : this.item.product.type == 'Registration' ? parseInt(this.item.quantity) : null
        },
        params: {}
      };

      payload.params[this.user.type == 'admin' ? 'myCompany' : 'myProvider'] = this.myProvider.id;

      this.isAdding = true;

      this.create(payload)
        .then(data => {
          if (data.response) {
            if (data.response.success === false)
              this.$q.notify({
                message : data.response.error,
                position: 'bottom',
                type    : 'negative',
              });
            else {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
              this.$refs.productsRef.reload();
            }
          }
        })
        .finally(() => {
          this.isAdding = false;
        });
    },

    isInvalid(key) {
      return val => {
        if (!val)
          return this.$t('messages.fieldRequired');

        return true;
      };
    },
  },
};
</script>
