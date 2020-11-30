<template>
  <q-page class="row justify-center">
    <!-- LOGIN FORM -->
    <LoginPage
      @logged="onLogged"
      @signup="onSignUp"
    />

    <!-- SIGNUP STEP TO STEP -->
    <q-dialog maximized no-esc-dismiss no-backdrop-dismiss
      v-model        ="dialogs.signup.visible"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <SignUpPage
        @created   ="onCreated"
        @company   ="onCompany"
        @registered="onRegistered"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LocalStorage }           from 'quasar';

import LoginPage                  from '../components/user/login/Index';
import SignUpPage                 from '../components/user/signup/Index';

export default {
  name      : 'PageIndex',

  components: {
    LoginPage ,
    SignUpPage,
  },

  data() {
    return {
      dialogs    : {
        signup: {
          visible: false,
        },
      },
    };
  },

  computed: {
    isLogged() {
      return this.$store.getters['auth/user'] !== null;
    },

    logged() {
      return this.$store.getters['auth/user'];
    },
  },

  methods: {

    // when user logged is succeeded

    onLogged(user) {
      if (this.isLogged) {
        this.$router.push({ name: 'DashboardIndex' });
      }
    },

    // when request signup

    onSignUp() {
      this.showDialog('signup');
    },

    // when user created signup step 1

    onCreated(user) {
      this.$store.dispatch('auth/logIn');

      if (this.isLogged)
        this.$q.notify({
          message : `Agora você esta logado como "${user.username}"`,
          position: 'top',
          type    : 'positive',
        });
    },

    // when company created signup step 2

    onCompany(company) {

      // refresh company id if not defined

      if (LocalStorage.has('session')) {
        let storedUser = LocalStorage.getItem('session');

        if (!storedUser.company) {
          storedUser.company = company.id;

          LocalStorage.set('session', storedUser);
        }
      }

    },

    // when signup process is finished

    onRegistered(user) {
      this.$q.notify({
        message : 'Seu cadastro foi realizado com sucesso',
        position: 'bottom',
        type    : 'positive',
      });

      if (this.isLogged) {
        this.$router.push('/purchasing/order');
      }
    },

    showDialog(name) {
      if (name !== false) {
        this.dialogs[name].visible = true;
      }

      // hide all opened dialogs

      let time = name === false ? 0 : 600;

      setTimeout(() => {
        for (let dialogName in this.dialogs) {
          if (dialogName !== name && this.dialogs[dialogName].visible)
          this.dialogs[dialogName].visible = false;
        }
      }, time);
    },
  },
}
</script>
