<template>
  <q-form
    ref    ="myForm"
    @submit="onSubmit"
  >
    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Tipo de cadastro')"
          v-model ="item.cadastro"
          :options="cadastros"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Atendente')"
          v-model ="item.atendente"
          :options="atendentes"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Canal')"
          v-model ="item.canal"
          :options="canais"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Mídia')"
          v-model ="item.midia"
          :options="midias"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Status')"
          v-model ="item.status"
          :options="statuses"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-select stack-label
          :label  ="$t('Motivo')"
          v-model ="item.motivo"
          :options="motivos"
        />
      </div>
    </div>

    <div class="row justify-end">
      <q-btn
        :loading="saving"
        icon    ="save"
        type    ="submit"
        label   ="Salvar"
        size    ="md"
        color   ="primary"
        class   ="q-mt-md"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    id: {
      required: false,
      default : null
    },
  },

  data() {
    return {
      saving : false,
      loading: false,
      item   : {
        cadastro : null,
        atendente: null,
        canal    : null,
        midia    : null,
        status   : null,
        motivo   : null,
      },
      cadastros: [
        {
          label: 'Abertura de Empresa',
          value: 'abertura',
        },
        {
          label: 'Migração de Contabilidade',
          value: 'migracao',
        },
        {
          label: 'Serviços Avulsos',
          value: 'servicos_avulsos',
        },
      ],
      atendentes: [
        {
          label: 'Laura Morais',
          value: 10000,
        },
        {
          label: 'Marcelo Lopez',
          value: 10001,
        },
        {
          label: 'Mirna Alves',
          value: 10002,
        },
      ],
      canais: [
        {
          label: 'Redes Sociais',
          value: 'redes_sociais',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Busca Orgânica',
          value: 'busca_organica',
        },
        {
          label: 'Referência',
          value: 'referencia',
        },
        {
          label: 'Tráfego Direto',
          value: 'trafego_direto',
        },
        {
          label: 'Mídia Paga',
          value: 'midia_paga',
        },
        {
          label: 'Outros',
          value: 'outros',
        },
      ],
      midias: [
        {
          label: 'Google',
          value: 'google',
        },
        {
          label: 'Facebook',
          value: 'facebook',
        },
        {
          label: 'Instagram',
          value: 'instagram',
        },
        {
          label: 'Whatsapp',
          value: 'whatsapp',
        },
        {
          label: 'Outros',
          value: 'outros',
        },
      ],
      statuses: [
        {
          label: 'Em Atendimento',
          value: 'em_atendimento',
        },
        {
          label: 'Não Atendido',
          value: 'nao_atendido',
        },
        {
          label: 'Contratado',
          value: 'contratado',
        },
        {
          label: 'Não Contratado',
          value: 'nao_contratado',
        },
        {
          label: 'Cancelado',
          value: 'cancelado',
        },
      ],
      motivos: [
        {
          label: 'Em Negociação',
          value: 'em_negociacao',
        },
        {
          label: 'Não Atende',
          value: 'nao_atende',
        },
        {
          label: 'Retornar em outro horário',
          value: 'retornar_outro_horario',
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
