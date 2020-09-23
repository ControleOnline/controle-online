<template>
  <q-form
    ref    ="myForm"
    @submit="onSubmit"
  >
    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-input stack-label lazy-rules unmasked-value hide-bottom-space
          v-model="item.name"
          type   ="text"
          label  ="Nome"
          :rules ="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-input stack-label lazy-rules hide-bottom-space
          v-model="item.lastname"
          type   ="text"
          label  ="Sobrenome"
          :rules ="[isInvalid('lastname')]"
        />
      </div>
      <div class="col-xs-12 col-sm-2 q-mb-sm">
        <q-input stack-label lazy-rules hide-bottom-space
          v-model="item.phone.ddd"
          type   ="text"
          label  ="DDD"
          mask   ="##"
          :rules ="[isInvalid('ddd')]"
        />
      </div>
      <div class="col-xs-12 col-sm-4 q-mb-sm">
        <q-input stack-label hide-bottom-space
          v-model="item.phone.phone"
          type   ="text"
          label  ="Fone"
          mask   ="#########"
          :rules ="[isInvalid('phone')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-input stack-label lazy-rules hide-bottom-space
          v-model="item.email"
          type   ="text"
          label  ="Email"
          :rules ="[isInvalid('email')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-input stack-label lazy-rules hide-bottom-space
          v-model="item.document.rg"
          type   ="text"
          label  ="R.G"
          mask   ="#########"
          :rules ="[isInvalid('docrg')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <q-input stack-label lazy-rules hide-bottom-space
          v-model="item.document.cpf"
          type   ="text"
          label  ="CPF"
          mask   ="###.###.###-##"
          :rules ="[isInvalid('doccpf')]"
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
export default {
  data() {
    return {
        saving   : false,
        item     : {
          name    : '',
          lastname: '',
          phone   : {
            ddd  : '',
            phone: '',
          },
          email   : '',
          document: {
            rg : '',
            cpf: ''
          }
        },
    };
  },

  methods : {
    onSubmit () {
      this.$refs.myForm.validate()
        .then(success => {
          if (success) {
            let payload = {
              name     : this.item.name,
              lastname : this.item.lastname,
              phone    : {
                ddd  : this.item.phone.ddd,
                phone: this.item.phone.phone,
              },
              email    : this.item.email,
              documents: [],
            };

            payload.documents.push({
              type    : 1,
              document: this.item.document.rg
            });

            payload.documents.push({
              type    : 2,
              document: this.item.document.cpf
            });

            this.saving = true;

            this.$emit('save', payload);
          }
      })
    },

    reset() {
      this.saving = false;
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
