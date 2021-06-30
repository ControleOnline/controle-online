<template>
  <!-- eslint-disable -->
  <div class="row q-pa-md">
    <div class="col-12" v-if="participants.length > 0">
      <div
        v-for="(participant, index) in participants"
        :key ="index"
        class="text-body1 q-mb-md text-justify"
      >
        {{ participant }}
      </div>
    </div>

    <div class="col-12">
      <div ref="contractModel" class="contract-model">
        Carregando contrato....
      </div>
    </div>

    <div v-if="editMode"
      class="col-12"
    >
      <div class="row q-mt-md justify-end">
        <q-btn
          color   ="primary"
          label   ="Solicitar assinaturas"
          @click  ="doRequestSignatures"
          :loading="isRequesting"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters }    from 'vuex';
import { formatCEP, formatDocument } from '@freteclick/quasar-common-ui/src/utils/formatter';

export default {
  props: {
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
    if (this.contract['@id'])
      this.getParticipants({
        id    : this.contract['@id'],
        params: { 'myCompany': this.myCompany.id }
      })
        .then(response => {
          if (response.data) {
            if (response.success) {
              response.data.forEach(participant => {
                let info = '';

                info += this.$t(`contracts.roles.${participant.role}`) + ':';
                info += ` ${participant.people.name}.`;

                if (participant.people.address !== null) {
                  info += ` Com sede na`;
                  info += ` ${participant.people.address.street}`;
                  info += ` nº ${participant.people.address.number}`;
                  info += ` - CEP ${formatCEP(participant.people.address.postalCode)}`;
                  info += ` - ${participant.people.address.district}`;
                  info += ` - ${participant.people.address.city}`;
                  info += ` - ${participant.people.address.state}`;
                }

                if (participant.people.document !== null) {
                  let document = formatDocument(participant.people.document.id);

                  if (participant.people.document.type == 'CNPJ')
                    info += `, inscrita no CNPJ sob nº ${document}.`;
                  else {
                    if (participant.people.document.type == 'CPF')
                      info += `, CPF nº ${document}.`;
                    else
                      info += `, ${document}.`;
                  }
                }

                this.participants
                  .push(info);
              });
            }
          }
        });
  },

  mounted() {
    this.printContract();
  },

  data() {
    return {
      participants: [],
      isRequesting: false,
    };
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
    }),
  },

  watch: {
    'contract.contractModel'() {
      this.printContract();
    }
  },

  methods: {
    ...mapActions({
      getParticipants  : 'contracts/getParticipantsData',
      getContent       : 'contracts/getContractContent',
      requestSignatures: 'contracts/requestSignatures',
    }),

    printContract() {
      this.getContent({
        id    : this.contract['@id'].replace(/\D/g, ''),
        params: {
          'company'  : this.myCompany !== null ? this.myCompany.id : null,
          'myCompany': this.myCompany !== null ? this.myCompany.id : null
        }
      })
        .then(response => {
          if (response.status == 200) {
            return response.text();
          }
        })
        .then(content => {
          this.$refs.contractModel.innerHTML = content;
          this.steps.contract.hasErrors      = false;
        })
        .catch(error => {
          this.steps.contract.hasErrors      = true;
        });
    },

    doRequestSignatures() {
      this.isRequesting = true;

      this.requestSignatures({
        id    : this.contract['@id'],
        params: { 'myCompany': this.myCompany.id }
      })
        .then(contract => {
          if (contract !== null)
            this.$emit('requested', contract);
        })
        .catch(error => {
          this.$q.notify({
            message : error.message,
            position: 'bottom',
            type    : 'negative',
          });
        })
        .finally(() => {
          this.isRequesting = false;
        });
    },
  },
};
</script>

<style lang="sass">

  .contract-model
    margin-top: 20px
    overflow  : auto
    text-align: justify

    & div
      max-width: 100%

</style>
