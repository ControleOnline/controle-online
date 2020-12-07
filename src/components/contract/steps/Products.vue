<template>
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
            :rules  ="[isInvalid('product')]"
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
            :label   ="$t('Quantidade')"
            mask     ="#"
            fill-mask="0"
            :rules   ="[isInvalid('quantity')]"
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
      @loaded  ="onProductsLoaded"
    />

    <div v-if="editMode"
      class="row q-mt-md justify-end"
    >
      <q-btn
        color   ="positive"
        label   ="Seguinte"
        :disable="!nextAllowed"
        @click  ="$emit('saved')"
      />
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContractProducts           from './ContractProducts';
import { formatMoney }            from '../../../utils/formatter';

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
  },

  mounted() {
    this.$refs.productsRef.reload();
  },

  data() {
    return {
      item          : {
        product : null,
        quantity: null,
        price   : null,
      },
      isSearching   : false,
      isAdding      : false,
      nextAllowed   : false,
      products      : [],
      isloadingProds: false,
    };
  },

  computed: {
    ...mapGetters({
      provider: 'people/currentCompany',
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

      this.getProducts({
        'productProvider': this.provider.id,
      })
        .then(products => {
          if (products) {
            products.forEach(product => {
              this.products
                .push({
                  label : product.product,
                  value : product['@id'],
                  price : product.price,
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

    save() {
      this.isAdding = true;

      this.create({
        "contract": this.contract['@id'],
        "product" : this.item.product.value,
        "quantity": parseInt(this.item.quantity),
        "price"   : parseFloat(this.item.price.replace(',', '.'))
      })
        .then(productContract => {
          if (productContract['@id']) {
            this.$refs.productsRef.reload();
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
