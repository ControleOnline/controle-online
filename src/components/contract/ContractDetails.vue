<template>
  <!-- eslint-disable -->
  <q-card style="min-height: 90vh;">
    <q-card-section v-if="contract === null">
      <div
        v-if ="isLoading"
        class="flex flex-center"
      >
        <q-circular-progress :indeterminate="isLoading"
          size ="sm"
          color="primary"
          class="q-ma-md"
        />
        Carregando...
      </div>

      <div
        v-if ="contract === null || isLoading === false"
        class="row items-center justify-center"
        style="min-height: 90vh;"
      >
        <q-banner class="text-white bg-red text-center text-h3" rounded>
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          {{ $t('O contrato não foi encontrado') }}
        </q-banner>
      </div>
    </q-card-section>

    <q-card-section v-else>
      <!-- PAGE TITLE -->
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <div class="text-h5">{{ participant }}</div>
        </div>
        <div class="col-xs-12 col-sm-8">
          <div class="row q-gutter-xs justify-end">
            <q-btn v-if="original !== null"
              :to     ="{
                name  : user.type === 'admin' ? 'Admin.Contract.Details' : 'Salesman.Contract.Details',
                params: { id: original.replace(/\D/g, '') }
              }"
              :label  ="$t('Contrato original')"
              :outline="true"
            />

            <q-btn v-if="amended !== null"
              :to     ="{
                name  : user.type === 'admin' ? 'Admin.Contract.Details' : 'Salesman.Contract.Details',
                params: { id: amended.replace(/\D/g, '') }
              }"
              :label  ="$t('Contrato adendo')"
              :outline="true"
            />
          </div>
        </div>
      </div>

      <!-- CONTRACT FORM -->
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12">
          <q-input stack-label borderless readonly
            v-model ="status"
            label   ="Status"
          >
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-select stack-label emit-value map-options :hide-dropdown-icon="!editMode"
            v-model    ="model"
            label      ="Modelo de contrato"
            :options   ="contractModels"
            :loading   ="loadingModels"
            :outlined  ="editMode"
            :borderless="!editMode"
            :readonly  ="!editMode"
            @input     ="save"
          >
          </q-select>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-input stack-label
            v-model    ="startDate"
            mask       ="##/##/####"
            label      ="Data inicio"
            :rules     ="[isInvalid('startdate')]"
            :outlined  ="editMode"
            :borderless="!editMode"
            :readonly  ="!editMode"
          >
            <template v-slot:append v-if="editMode">
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model ="startDate"
                    mask    ="DD/MM/YYYY"
                    @input  ="() => {
                      $refs.qDateProxy1
                        .hide();
                      save();
                    }"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <!-- CONTRACT ACTIONS -->
      <div v-if="contract !== null"
        class="row q-gutter-xs q-mb-md justify-end"
      >
        <q-btn v-if="['Draft', 'Active'].includes(contract.contractStatus) && contract.endDate == null"
          color   ="negative"
          label   ="Cancelar contrato"
          @click  ="cancelDialog = true"
        />

        <q-btn v-if="contract.contractStatus == 'Active'"
          color   ="primary"
          label   ="Criar adendo de contrato"
          :loading="isAddendum"
          @click  ="createAddendum"
        />
      </div>

      <!-- CONTRACT PARTS -->
      <div class="row q-mt-md" v-if="contract !== null">
        <div class="col-xs-12">
          <q-stepper alternative-labels header-nav
            v-model     ="currentStep"
            ref         ="stepper"
            color       ="primary"
            :vertical   ="$q.screen.lt.sm"
            active-color="deep-orange"
          >
            <q-step :header-nav="steps.participants.hasErrors === false || !editMode"
              name  ="participants"
              title ="Participantes"
              icon  ="supervisor_account"
              :done ="steps.participants.hasErrors === false || !editMode"
              :error="steps.participants.hasErrors === true"
            >
              <Participants
                ref      ="participants"
                :steps   ="steps"
                :contract="contract"
                :editMode="editMode"
                @saved   ="onSaved"
              />
            </q-step>

            <q-step :header-nav="steps.products.hasErrors === false || !editMode"
              name  ="products"
              title ="Produtos"
              icon  ="shopping_basket"
              :done ="steps.products.hasErrors === false || !editMode"
              :error="steps.products.hasErrors === true"
            >
              <Products
                :steps   ="steps"
                :contract="contract"
                :editMode="editMode"
                @saved   ="onSaved"
              />
            </q-step>

            <q-step :header-nav="steps.contract.hasErrors === false || !editMode"
              name  ="contract"
              title ="Contrato"
              icon  ="business"
              :done ="steps.contract.hasErrors === false || !editMode"
              :error="steps.contract.hasErrors === true"
            >
              <Contract
                :steps    ="steps"
                :contract ="contract"
                :editMode ="editMode"
                @saved    ="onSaved"
                @requested="onRequestedSignatures"
              />
            </q-step>

          </q-stepper>
        </div>
      </div>
    </q-card-section>

    <q-dialog v-model="cancelDialog">
      <q-card style="width: 400px; max-width: 90vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Selecione a data de cancelamento</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit="cancelContract" class="q-mt-sm">
            <div class="row justify-center">
              <q-date minimal
                v-model ="cancelDate"
                mask    ="DD/MM/YYYY"
                :options="calendarOptions"
              />
            </div>
            <div class="row justify-end q-mt-md">
              <q-btn
                type    ="submit"
                color   ="negative"
                label   ="Cancelar"
                :loading="isCanceling"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';
import Participants               from './steps/Participants';
import Products                   from './steps/Products';
import Contract                   from './steps/Contract';
import { date }                   from 'quasar';
import SubmissionError            from '../../error/SubmissionError';

export default {
  components: {
    Participants,
    Products    ,
    Contract    ,
  },

  created() {
    if (this.$route.params.id)
      this.contractId = decodeURIComponent(this.$route.params.id);

    if (this.myCompany !== null) {
      this.request(this.contractId);
    }
  },

  data() {
    return {
      contractId    : null,
      contract      : null,
      status        : null,
      startDate     : null,
      endDate       : null,
      model         : null,
      notFound      : false,
      participant   : null,
      loadingModels : false,
      cancelDialog  : false,
      contractModels: [],
      isSaving      : false,
      isAddendum    : false,
      isCanceling   : false,
      editMode      : false,
      cancelDate    : null,
      currentStep   : 'participants',
      isLoading     : false,
      steps         : {
        participants: {
          hasErrors: null,
        },
        products    : {
          hasErrors: null,
        },
        contract    : {
          hasErrors: null,
        },
        schedule    : {
          hasErrors: null,
        },
      },
      amended       : null,
      original      : null,
    };
  },

  computed: {
    ...mapGetters({
      myCompany: 'people/currentCompany',
      user     : 'auth/user',
    }),
  },

  watch: {
    myCompany(company) {
      if (company !== null) {
        this.request(this.contractId);
      }
    },

    contract(data) {
      if (!data)
        return;

      this.editMode = data.contractStatus == 'Draft';

      this.loadContractModels();
    },

    '$route'(to) {
      this.$router.go(to);
    },
  },

  methods: {
    ...mapActions({
      getModels: 'contracts/getModels',
      getItem  : 'contracts/getItem',
      update   : 'contracts/saveContract',
      addendum : 'contracts/createAddendum',
      cancel   : 'contracts/cancelContract',
    }),

    calendarOptions(_date) {
      return _date > date.formatDate(Date.now(), 'YYYY/MM/DD');
    },

    cancelContract() {
      if (this.cancelDate == null) {
        this.$q.notify({
          message : 'Primeiro selecione uma data',
          position: 'bottom',
          type    : 'warning',
        });
        return;
      }

      this.isCanceling = true;

      this.cancel({
        id     : this.contract['@id'],
        endDate: this.cancelDate.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "\$3\-\$2\-\$1"),
        params : { 'myCompany': this.myCompany.id }
      })
        .then(contract => {
          if (contract !== null)
            this.setContract(contract);
        })
        .catch(e => {
          const error = e instanceof SubmissionError ? e.errors._error : e.message;

          this.$q.notify({
            message : error,
            position: 'bottom',
            type    : 'negative',
          });
        })
        .finally(() => {
          this.isCanceling  = false;
          this.cancelDialog = false;
        });
    },

    createAddendum() {
      this.isAddendum = true;

      this.addendum({
        id    : this.contract['@id'],
        params: { 'myCompany': this.myCompany.id }
      })
        .then(contract => {
          if (contract['@id']) {
            this.$router.push({
              name  : this.user.type === 'admin' ? 'Admin.Contract.Details' : 'Salesman.Contract.Details',
              params: { id: contract['@id'].replace(/\D/g, "") }
            });

            // this.setContract(contract);
          }
        })
        .catch(e => {
          const error = e instanceof SubmissionError ? e.errors._error : e.message;

          this.$q.notify({
            message : error,
            position: 'bottom',
            type    : 'negative',
          });
        })
        .finally(() => {
          this.isAddendum = false;
        });
    },

    onSaved() {
      this.$refs.stepper.next();
    },

    onRequestedSignatures(contract) {
      if (contract !== null)
        this.setContract(contract);
    },

    save() {
      this.isSaving = true;

      let payload = {
        id    : this.contractId,
        values: {
          "contractModel": this.model,
          "startDate"    : this.startDate.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "\$3\-\$2\-\$1"),
        },
        params: { }
      };

      payload.params[this.user.type == 'admin' ? 'myCompany' : 'myProvider'] = this.myCompany.id;

      this.update(payload)
        .then(contract => {
          if (contract['@id']) {
            this.contract = contract;

            this.$q.notify({
              message : 'Data successfully saved',
              position: 'bottom',
              type    : 'positive',
            });
          }
        })
        .catch(e => {
          const error = e instanceof SubmissionError ? e.errors._error : e.message;

          this.$q.notify({
            message : error,
            position: 'bottom',
            type    : 'negative',
          });
        })
        .finally(() => {
          this.isSaving = false;
        });
    },

    loadContractModels() {
      if (this.loadingModels)
        return;

      if (this.contractModels.length)
        return;

      this.loadingModels = true;

      this.getModels()
        .then(models => {
          if (models) {
            models.forEach(model => {
              this.contractModels
                .push({
                  label: model.contractModel,
                  value: model['@id'],
                });
            });

            this.model = this.contract.contractModel['@id'];
          }
        })
        .finally(() => {
          this.loadingModels = false;
        });
    },

    request(contractId) {
      if (this.isLoading)
        return;

      this.isLoading = true;

      this.getItem({ id: contractId, params: { 'myCompany': this.myCompany.id } })
        .then(contract => {
          if (contract) {
            this.setContract(contract);
          }
        })
        .catch(error => {
          this.contract  = null;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    setContract(contract) {
      this.contract  = contract;
      this.status    = this.$t(`contracts.statuses.${contract.contractStatus}`);
      this.startDate = contract.startDate ? contract.startDate.replace(/^(\d{4})\-(\d{2})\-(\d{2})T00:00:00\+00:00$/g,"\$3\/\$2\/\$1") : '';
      this.endDate   = contract.endDate   ? contract.endDate.replace(/^(\d{4})\-(\d{2})\-(\d{2})T00:00:00\+00:00$/g,"\$3\/\$2\/\$1")   : '';

      if (contract.contractPeople) {
        let contractPeople = contract.contractPeople.find(p => p.peopleType == 'Beneficiary');
        if (contractPeople) {
          this.participant = contractPeople.people.name;
        }
      }

      if (contract.contractParent !== null) {
        this.original = contract.contractParent['@id'];
      }

      if (contract.contractChild !== null) {
        if (contract.contractChild.length > 0) {
          this.amended = contract.contractChild[0]['@id'];
        }
      }
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
