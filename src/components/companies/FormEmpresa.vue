<template>
  <q-form
    ref    ="myForm"
    @submit="onSubmit"
  >
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
    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model="item.nomeCliente"
          type   ="text"
          :label ="$t('Nome do Cliente')"
          :rules ="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules unmasked-value
          v-model="item.documento"
          type   ="text"
          :label ="personType == 'PJ' ? $t('CNPJ') : $t('CPF')"
          :mask  ="personType == 'PJ' ? '##.###.###/####-##' : '###.###.###-##'"
          :rules ="[isInvalid('document')]"
        />
      </div>
      <div v-if="personType == 'PJ'"
        class="col-xs-12 col-sm-6"
      >
        <q-input stack-label lazy-rules unmasked-value
          v-model="item.cpfResponsavel"
          type   ="text"
          :label ="$t('CPF Responsável')"
          :mask  ="'###.###.###-##'"
          :rules ="[isInvalid('document')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model="item.razaoSocial"
          type   ="text"
          :label ="$t('Razão social')"
          :rules ="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model="item.nomeFantasia"
          type   ="text"
          :label ="$t('Nome Fantasia')"
          :rules ="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules
          v-model="item.inscricaoEstadual"
          type   ="text"
          :label ="$t('Inscrição Estadual')"
          :rules ="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label
          v-model="item.dataAbertura"
          mask   ="##/##/####"
          :label ="$t('Data de abertura')"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model ="item.dataAbertura"
                  mask    ="DD/MM/YYYY"
                  @input  ="() => $refs.qDateProxy1.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="row q-col-gutter-sm q-mt-md">
        <div class="col-xs-12 col-sm-grow">
          <CEPSearchInput
            ref      ="cepSearchRef"
            @found   ="onCEPFound"
            @error   ="(error) => {
              this.item.cep = error.postalCode;

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
            v-model="item.logradouro"
            type   ="text"
            :label ="$t('Logradouro')"
            :rules ="[isInvalid('street')]"
          />
        </div>
        <div class="col-xs-12 col-sm-grow">
          <q-input stack-label
            v-model="item.bairro"
            type   ="text"
            :label ="$t('Bairro')"
            :rules ="[isInvalid('district')]"
          />
        </div>
        <div class="col-xs-12 col-sm-grow">
          <q-input stack-label lazy-rules
            v-model="item.complemento"
            type   ="text"
            :label ="$t('Complemento')"
          />
        </div>
        <div class="col-xs-12 col-sm-grow">
          <q-input stack-label lazy-rules
            v-model="item.cidade"
            type   ="text"
            :label ="$t('Cidade')"
            :rules ="[isInvalid('city')]"
          />
        </div>
        <div class="col-xs-12 col-sm-4">
          <q-input stack-label lazy-rules
            v-model="item.estado"
            type   ="text"
            :label ="$t('Estado')"
            mask   ="AA"
            :rules ="[isInvalid('state')]"
          />
        </div>
      </div>
      <div class="col-xs-12">
        <q-select stack-label
          :label  ="$t('Deseja fazer alguma alteração?')"
          v-model ="item.algumaAlteracao"
          :options="tipoAlteracoes"
          class   ="full-width"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules reverse-fill-mask
          v-model  ="item.qtdSocios"
          type     ="text"
          :label   ="$t('Qt. de Sócios')"
          mask     ="#"
          fill-mask="0"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules reverse-fill-mask
          v-model  ="item.qtdFuncionarios"
          type     ="text"
          :label   ="$t('Qt. de Funcionários')"
          mask     ="#"
          fill-mask="0"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input stack-label lazy-rules reverse-fill-mask
          prefix   ="R$"
          v-model  ="item.fatMensal"
          type     ="text"
          :label   ="$t('Faturamento Mensal Empresa')"
          mask     ="#,##"
          fill-mask="0"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select stack-label
          :label  ="$t('Vencimento da Fatura')"
          v-model ="item.vencFatura"
          :options="vencimentos"
          class   ="full-width"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select stack-label
          :label  ="$t('Plano')"
          v-model ="item.plano"
          :options="planos"
          class   ="full-width"
        />
      </div>
      <div class="col-xs-12">
        <q-file stack-label bottom-slots
          v-model   ="item.logo"
          :label    ="$t('Logo')"
          @input    ="(file) => {
            uploadFile(null, file);
          }"
          :accept   ="'.png,.jpg,.jpeg'"
          :loading  ="false"
          :clearable="true"
        >
          <template v-slot:append>
            <q-icon
              v-if ="true"
              name ="attachment"
              color="primary"
            />
            <q-btn flat round dense
              v-if    ="true"
              color   ="red"
              icon    ="delete"
              @click  ="removeFile(null)"
              :loading="false"
            />
            <q-btn flat round dense
              v-if    ="true"
              color   ="blue"
              icon    ="cloud_download"
              @click  ="downloadFile({ id: 1, name: 'file.xml' })"
            />
          </template>
        </q-file>
      </div>
    </div>

    <div class="row justify-end">
      <q-btn
        :loading="saving"
        icon    ="save"
        type    ="submit"
        :label  ="$t('Salvar')"
        size    ="md"
        color   ="primary"
        class   ="q-mt-md"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CEPSearchInput             from './../common/CEPSearchInput';

export default {
  props: {
    id: {
      required: false,
      default : null
    },
  },

  components: {
    CEPSearchInput
  },

  data() {
    return {
      saving    : false,
      loading   : false,
      personType: 'PJ',
      item      : {
        nomeCliente      : null,
        documento        : null,
        cnpj             : null,
        cpfResponsavel   : null,
        tipoPessoa       : null,
        razaoSocial      : null,
        nomeFantasia     : null,
        inscricaoEstadual: null,
        dataAbertura     : null,
        cep              : null,
        logradouro       : null,
        numero           : null,
        bairro           : null,
        complemento      : null,
        estado           : null,
        cidade           : null,
        algumaAlteracao  : null,
        qtdSocios        : 0,
        qtdFuncionarios  : 0,
        fatMensal        : 0,
        vencFatura       : null,
        plano            : null,
        logo             : null,
        atividades       : [],
      },
      tipoAlteracoes: [
        {
          label: 'Não',
          value: 'nao',
        },
        {
          label: 'MEI para ME / Cadastral',
          value: 'mei_para_me',
        },
        {
          label: 'Contratual / Enquadramento ao Simples Nacional',
          value: 'contratual',
        },
      ],
      planos: [
        {
          label: 'MEI Serviços - Mensal',
          value: 'mei_servicos_mensal',
        },
        {
          label: 'MEI Serviços - Bronze',
          value: 'mei_servicos_bronze',
        },
      ],
      vencimentos: [
        {
          label: '5',
          value: 5,
        },
        {
          label: '10',
          value: 10,
        },
        {
          label: '15',
          value: 15,
        },
        {
          label: '20',
          value: 20,
        },
      ],
    };
  },

  methods: {
    onSubmit () {
      this.$refs.myForm.validate()
        .then(success => {
          if (success) {
            let payload = {};

            this.$emit('save', payload);
          }
      })
    },

    uploadFile(item, file) {
      if (!file) {
        return;
      }
    },

    removeFile(data) {
      if (window.confirm(this.$t('Tem certeza que deseja eliminar este arquivo?'))) {

      }
    },

    downloadFile(file) {
      /*
      return this.api.private(`download/${this.id}/files/${file.id}`)
        .then(response => response.blob())
        .then((blob) => {
          if (!exportFile(file.name, blob, blob.type)) {
            throw new Error(this.$t('Download error'));
          }
        });
      */
    },

    onCEPFound(address) {
      this.item.estado      = address.state;
      this.item.cidade      = address.city;
      this.item.bairro      = address.district;
      this.item.cep         = address.postalCode;
      this.item.logradouro  = address.street;
      this.item.complemento = '';
    },

    isInvalid(key) {
      return val => {
        switch (key) {
          case 'email'   :
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
              return 'O email informado não é válido';
          break;
          default:
            if (!(val && val.length > 0))
              return 'Este campo é obrigatório';
        }
        return true;
      };
    },
  },
};
</script>
