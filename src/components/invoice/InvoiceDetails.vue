<template>
  <q-card style="min-height: 90vh;">
    <div class="row q-pa-sm q-col-gutter-sm">
      <div class="col-xs-12 col-sm-4">
        <q-markup-table flat
          separator="none"
          class    ="bg-grey-4 full-height"
        >
          <tbody>
            <tr>
              <td class="text-left text-bold">Número da fatura</td>
              <td class="text-left">
                #{{ this.invoice.id }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Valor da fatura</td>
              <td class="text-left">
                {{ formatMoney(this.invoice.price) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col-xs-12 col-sm-8">
        <q-markup-table flat
          separator="none"
          class    ="bg-red-9 text-white"
        >
          <tbody>
            <tr>
              <td class="text-center">
                <div class="text-h4">Fatura cancelada</div>
              </td>
            </tr>
            <tr>
              <td class="text-center text-bold">
                Isso ocorre quando...
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <q-tabs
      :horizontal="$q.screen.gt.xs"
      align      ="justify"
      v-model    ="currentTab"
      class      ="bg-white text-primary"
    >
      <q-tab
        name ="orders"
        label="Pedidos de venda"
      />
      <q-tab
        name ="invoice"
        label="Fatura"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="currentTab"
    >
      <q-tab-panel name="orders">
        <InvoiceOrders  />
      </q-tab-panel>

      <q-tab-panel name="invoice">
        <InvoiceInvoice />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import InvoiceInvoice  from './details/InvoiceInvoice';
import InvoiceOrders   from './details/InvoiceOrders';
import { formatMoney } from '../../utils/formatter';

export default {
  components: {
    InvoiceInvoice,
    InvoiceOrders ,
  },

  data() {
    return {
      currentTab: 'orders',
      invoice   : {
        id   : 109999,
        price: 17789
      },
    };
  },

  computed: {

  },

  watch: {

  },

  methods: {
    formatMoney(value) {
      return formatMoney(value, 'BRL', 'pt-br');
    },
  },
};
</script>