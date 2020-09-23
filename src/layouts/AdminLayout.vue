<template>
  <q-layout view="lHh Lpr fff" class="bg-image">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn flat dense round
          @click    ="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon      ="menu"
          class     ="q-mx-md"
        />
        <q-space />          
        <div class="q-gutter-sm row items-center no-wrap">
          <!--
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>
          -->

          <q-btn icon="account_circle" flat round>
            <q-tooltip>Minha conta</q-tooltip>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Minha conta</div>
                  <q-list>
                    <q-item :to="{ name: 'UserProfile' }" exact>
                      <q-item-section avatar>
                        <q-icon name="face" />
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>Meu Perfil</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item :to="{ name: 'CompanyIndex' }" exact>
                      <q-item-section avatar>
                        <q-icon name="business" />
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>Minha empresa</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-stretch justify-between">
                  <div class="text-center">
                    <q-avatar size="64px">
                      <q-img :src="user.avatar || gravatar()" />
                    </q-avatar>
                  </div>

                  <div class="text-body2 text-center">
                    {{ user.realname || 'John Doe' }}
                  </div>

                  <q-btn v-close-popup
                    color ="primary"
                    label ="Sair"
                    size  ="sm"
                    @click="onLogout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model      ="leftDrawerOpen"
      :width       ="225"
      content-class="bg-primary"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center justify-center">            
            <q-img width="100%" :src="currentCompany.logo || ''" />
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar class="q-pt-md justify-center">
          <MyCompanies />
        </q-toolbar>

        <div class="q-pt-xl q-px-sm column">
          <q-btn flat stack no-caps
            size ="26px"
            class="GPL__side-btn"
            color="white"
            :to  ="{ name: 'ShippingQuoteIndex' }"
          >
            <q-icon size="35px" name="local_shipping" color="orange" />
            <div class="GPL__side-btn__label">Cotação</div>
          </q-btn>

          <q-btn flat stack no-caps
            size ="26px"
            color="white"
            class="GPL__side-btn"
            :to  ="{ name: 'OrderIndex' }"
          >
            <q-icon size="35px" name="shopping_cart" color="orange" />
            <div class="GPL__side-btn__label">Pedidos</div>
          </q-btn>

          <!--
          <q-btn flat stack no-caps
            size ="26px"
            class="GPL__side-btn"
            color="white"
            :to  ="{ name: 'InvoiceIndex' }"
          >
            <q-icon size="35px" name="attach_money" color="orange" />
            <div class="GPL__side-btn__label">Faturas</div>
          </q-btn>
          -->
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MyCompanies from '../components/common/MyCompanies';

export default {
  name      : 'AdminLayout',

  components: {
    MyCompanies,
  },

  data() {
    return {
      leftDrawerOpen: this.$q.screen.gt.sm,
      gravatar: function(){
        var md5 = require('md5');
        var user = this.$store.getters['auth/user'] || {};        
        return  'https://www.gravatar.com/avatar/' + md5(user.email)+'?s=400';
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user'] || {};
    },

    currentCompany() {      
      return this.$store.getters['people/currentCompany'] || {};
    },
  },

  methods: {
    onLogout() {
      this.$store.dispatch('auth/logOut');
      this.$router.push('/');
    },
  },
}
</script>

<style lang="sass">
.bg-image
  background-position: center    !important
  background-repeat  : no-repeat !important
  background-size    : cover     !important
  background-color   : $pagebg   !important
  background         : #123c69

.GPL
  &__toolbar
    height: 64px
  &__side-btn
    margin-bottom: 20px
    &__label
      font-size     : 14px
      font-family   : 'Exo', Helvetica,Arial,Lucida,sans-serif
      font-weight   : 600
      text-transform: uppercase
</style>
