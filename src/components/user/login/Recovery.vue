<template>
  <div class="text-center">
    <div class="text-body2">{{ $t('Informe seu email. Em breve enviaremos um link de recuperação de acesso.' ) }}</div>

    <q-form @submit="onSubmit" class="q-mt-md">

      <q-input outlined
        ref    ="email"
        v-model="item.email"
        type   ="email"
        :label ="$t('Seu email')"
        class  ="q-mt-md"
        :rules ="[isInvalid('email')]"
      />

      <q-btn
        type    ="submit"
        :label  ="$t('Enviar')"
        size    ="lg"
        color   ="primary"
        class   ="full-width q-mt-md"
      />
    </q-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

export default {
  data() {
    return {
      item: {
        email: '',
      }
    };
  },

  methods: {
    onSubmit () {
      this.$refs.email.validate();

      if (this.$refs.email.hasError) {
        return;
      }
    },

    isInvalid(key) {
      return val => {

        if (!(val && val.length > 0))
          return this.$t('messages.fieldRequired');
        if (key == 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t('messages.emailInvalid');

        return true;
      };
    },
  },
};
</script>
