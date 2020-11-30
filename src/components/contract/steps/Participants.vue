<template>
  <div>

    <div v-if="editMode"
      class="row q-mb-md justify-end"
    >
      <q-btn flat
        type  ="submit"
        color ="primary"
        icon  ="add"
        label ="Adicionar participante"
        @click="contactDialog = true"
      />
    </div>

    <ContractParticipants
      ref      ="participantsRef"
      class    ="q-mt-md"
      :contract="contract"
      :editMode="editMode"
      @loaded  ="onParticipantsLoaded"
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

    <q-dialog v-model="contactDialog" @hide="onContactDialogHide">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Adicionar participante</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <ContactForm
            ref      ="contactFormRef"
            @save    ="onContactSave"
            :contract="contract"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContractParticipants       from './ContractParticipants';
import ContactForm                from './ContactForm';

export default {
  components: {
    ContractParticipants,
    ContactForm         ,
  },

  props     : {
    contract: {
      type    : Object,
      required: true,
    },
    steps   : {
      type    : Object,
      required: true,
    },
    editMode: {
      type    : Boolean,
      required: false,
      default : true
    },
  },

  mounted() {
    this.$refs.participantsRef.reload();
  },

  data() {
    return {
      nextAllowed  : false,
      contactDialog: false,
    };
  },

  computed: {
    ...mapGetters({
      myProvider: 'people/currentCompany',
    }),
  },

  methods: {
    ...mapActions({
      createParticipant: 'contracts/createPeopleContract',
      createClient     : 'client/save',
    }),

    onContactDialogHide() {
      this.$refs.participantsRef.reload();
    },

    onContactSave(contact) {
      this.save(contact);
    },

    onParticipantsLoaded(total) {
      this.nextAllowed                  = total > 0;
      this.steps.participants.hasErrors = !this.nextAllowed;
    },

    save(participant) {
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

      const saveAll = async () => {
        await asyncForEach(participant.peopleType, async(typeName) => {

          // in case participant does not exist

          if (participant.id == null) {
            let payload  = {
              params: {
                'myProvider': this.myProvider.id,
              },
              values: {
                "name"    : participant.name,
                "alias"   : participant.alias,
                "document": participant.document,
                "docrg"   : participant.docrg,
                "birthday": participant.birthday !== null ? participant.birthday.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "\$3\-\$2\-\$1") : null,
                "contact" : {
                  "name" : participant.contact_name  || participant.name,
                  "alias": participant.contact_alias || participant.alias,
                  "email": participant.email,
                  "phone": participant.phone,
                },
                "address" : {
                  "country"    : participant.address.country,
                  "state"      : participant.address.state,
                  "city"       : participant.address.city,
                  "district"   : participant.address.district,
                  "complement" : participant.address.complement,
                  "street"     : participant.address.street,
                  "number"     : participant.address.number,
                  "postal_code": participant.address.postalCode
                },
                "particulars": participant.particulars,
              }
            };

            if (participant.paymentDay !== null) {
              payload.values['paymentDay'] = parseInt(participant.paymentDay);
            }

            let response = await this.createClient(payload);
            if (response.success) {
              participant.id = response.data.clientId;
            }
            else {
              if (response.success === false) {
                throw new Error(response.error);
              }
            }
          }

          await this.addParticipant({
            values: {
              "contract"          : this.contract['@id'],
              "people"            : `/people/${participant.id}`,
              "peopleType"        : typeName,
              "contractPercentage": parseFloat(participant.percentage.replace(/([,])/g, "\."))
            },
            params: {
              'myProvider'        : this.myProvider.id,
            }
          });

        });

        this.$refs.contactFormRef.reset();
      };

      saveAll()
        .then(() => {
          this.$q.notify({
            message : 'Os dados foram salvos com sucesso',
            position: 'bottom',
            type    : 'positive',
          });
        })
        .catch(error => {
          this.$refs.contactFormRef.setAsNotSaving();

          this.$q.notify({
            message : error.message,
            position: 'bottom',
            type    : 'negative',
          });
        });
    },

    addParticipant(data) {
      return this.createParticipant(data)
        .catch(error => {
          let message = error.message;

          // peopleType: Este participante já foi adicionado ao contrato

          if (/^[a-zA-Z]+:\s?/g.test(message)) {
            message = message.replace(/^[a-zA-Z]+:\s?([a-zA-Z\sáéó]+)$/g, "\$1");
          }

          throw new Error(message);
        });
    },

    isInvalid(key) {
      return val => {
        if (!(val && val.length > 0))
          return this.$t('messages.fieldRequired');

        return true;
      };
    },
  },
};
</script>
