<template>
  <div class="q-pa-md bg-white contracting-page">
    <div class="row">
      <div class="text-h5 text-center text-primary">
        Siga os passos para a conclusão
      </div>
      <q-space />
      <q-btn flat round dense v-close-popup
        icon="close"
      />
    </div>

    <q-stepper animated alternative-labels header-nav flat
      v-model  ="current"
      ref      ="stepper"
      color    ="primary"
      :vertical="$q.screen.lt.sm"
    >
      <q-step
        :header-nav="steps.retrieve.hasErrors === false"
        name       ="retrieve"
        title      ="Dados de coleta"
        icon       ="business"
        :done      ="steps.retrieve.hasErrors === false"
        :error     ="steps.retrieve.hasErrors === true"
      >
        <Retrieve
          ref   ="retrieveForm"
          :order="order"
          :steps="data"
          :extra="steps.retrieve.extra"
          @saved="goToNext"
        />
      </q-step>

      <q-step :header-nav="steps.delivery.hasErrors === false"
        name  ="delivery"
        title ="Dados de entrega"
        icon  ="business"
        :done ="steps.delivery.hasErrors === false"
        :error="steps.delivery.hasErrors === true"
      >
        <Delivery
          ref   ="deliveryForm"
          :order="order"
          :steps="data"
          :extra="steps.delivery.extra"
          @saved="goToNext"
        />
      </q-step>

      <q-step :header-nav="steps.summary.hasErrors === false"
        name  ="summary"
        title ="Informações adicionais"
        icon  ="business"
        :done ="steps.summary.hasErrors === false"
        :error="steps.summary.hasErrors === true"
      >
        <Summary
          ref   ="summaryForm"
          :order="order"
          :steps="data"
          :extra="steps.summary.extra"
          @saved="goToNext"
        />
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Retrieve from './Retrieve';
import Delivery from './Delivery';
import Summary  from './Summary';

export default {
  components: {
    Retrieve,
    Delivery,
    Summary ,
  },

  props: {
    order: {
      type    : Object,
      required: true,
    },
  },

  mounted () {
    this.$emit('load');
  },

  data () {
    return {
      current: 'retrieve',
      steps  : {
        retrieve: {
          hasErrors: null,
          extra    : {},
        },
        delivery: {
          hasErrors: null,
          extra    : {},
        },
        summary: {
          hasErrors: null,
          extra    : {},
        },
      },
      data: {
        retrieve: { id: null },
        delivery: { id: null },
        summary : { id: null },
      },
    };
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
    }),

    logged () {
      return this.$store.getters['auth/user'];
    },
  },

  methods: {
    ...mapActions({
      choose     : 'quote/choose_quote',
      email      : 'people/email',
      postContact: 'people/postContact'
    }),

    createContact (contact, current) {
      this.postContact(contact)
        .then(response => {
          let formHasErrors = !(response && response.success === true);

          if (!formHasErrors) {
            this.data[current].contact = response.data;
            this.data[current].id      = response.data.id;
            this.data[current].name    = response.data.name;
          } else {
            this.notifyError(response.error);
          }
        })
        .catch(error => {
          let formHasErrors = true;

          this.notifyError(error.message);
        });
    },

    async searchEmail (email, current) {
      return await this.email(email)
        .then(response => {
          let hasErrors = !(response && response.success === true);

          if (!hasErrors) {
            /**
             *  verifica se retornou o email, se sim, vincular ao contact
             */
            this.data[current].id         = response.data.people_id;
            this.data[current].contact.id = response.data.people_id;
          } else {
            this.createContact({
              name    : this.data[current].contact.name,
              email   : this.data[current].contact.email,
              phone   : this.data[current].contact.phone,
              document: this.data[current].document,
              alias   : this.data[current].contact.alias,
            }, current)
          }

          return hasErrors === false ? response.data : false;
        })
        .catch(error => {
          this.notifyError(error.message);
        });
    },

    async goToNext (form) {
      this.steps[this.current].hasErrors = form.errors;
      this.steps[this.current].extra     = form.extra || null;

      // if no errors

      if (form.errors === false) {

        // save temp data

        this.data[this.current] = form.data;

        // go to next step or finish

        if (this.current == 'summary') {
          this.save();
        }
        else {
          if (!this.data[this.current].id) {
            await this.searchEmail(this.data[this.current].contact.email, this.current)
          }

          this.$refs.stepper.next();
        }
      }
    },

    save () {
      let payload = {
        id: this.order.id,
        values: {
          quote   : this.order.choose,
          payer   : this.data.summary.payer,
          price   : this.order.price,
          retrieve: {
            id     : this.data.retrieve.id,
            address: this.data.retrieve.address.id !== null ? this.data.retrieve.address.id : this.data.retrieve.address,
            contact: this.data.retrieve.contact.id,
          },
          delivery: {
            id     : this.data.delivery.id,
            address: this.data.delivery.address.id !== null ? this.data.delivery.address.id : this.data.delivery.address,
            contact: this.data.delivery.contact.id,
          },
          comments: this.data.summary.comments,
        },
      };

      if (this.myCompany !== null)
        payload.query = {
          myCompany: this.myCompany.id
        };

      this.choose(payload)
        .then(response => {
          if (response['@id']) {
            this.$emit('finished', payload);
          }
          else {
            this.notifyError('Não foi possivel finalizar o checkout. Tente novamente');
          }
        });
    },

    notifyError (message) {
      this.$q.notify({
        message : message,
        position: 'bottom',
        type    : 'negative',
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
.contracting-page {
  min-width: 75vw;
}

@media (max-width: $breakpoint-xs-max) {
  .contracting-page {
    min-width: 100%;
  }
}
</style>
