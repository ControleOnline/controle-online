<template>
  <q-layout view="lHh Lpr fff" class="bg-image">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />
        <div class="q-gutter-sm items-center row logo-container">
          <router-link v-bind:to="'/'" tag="a" class="primary">
            <img :src="defaultCompany.logo" class="main-logo" />
          </router-link>
        </div>
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
                      <q-img :src="user.avatar || gravatar" />
                    </q-avatar>
                  </div>

                  <div class="text-body2 text-center">
                    {{ user.realname || "John Doe" }}
                  </div>

                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Sair"
                    size="sm"
                    @click="onLogout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="225" content-class="bg-primary">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <div class="q-gutter-sm items-center row current-logo-container">
            <router-link v-bind:to="'/'" tag="a" class="primary">
              <img :src="currentCompany.logo || ''" class="current-logo" />
            </router-link>
          </div>
        </q-toolbar>

        <q-toolbar class="q-pt-md justify-center">
          <MyCompanies
            :selected="companySelected"
            @selected="onCompanySelected"
          />
        </q-toolbar>
        <div class="q-pt-xl q-px-sm column">
          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{
              name  : 'DashboardIndex',
            }"
          >
            <q-icon size="35px" name="dashboard" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Dashboard') }}
            </div>
          </q-btn>

          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{
              name  : 'BasicInfoIndex',
              params: {
                id: user.people ? user.people : null
              }
            }"
          >
            <q-icon size="35px" name="account_circle" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Informações básicas') }}
            </div>
          </q-btn>

          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{
              name  : 'PlansIndex',
            }"
          >
            <q-icon size="35px" name="table_view" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Planos') }}
            </div>
          </q-btn>

          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{
              name  : 'StepsRegistration',
            }"
          >
            <q-icon size="35px" name="list" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Checklists') }}
            </div>
          </q-btn>

          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{ name: 'ClientsIndex' }"
          >
            <q-icon size="35px" name="person" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Clientes') }}
            </div>
          </q-btn>

          <q-btn
            :flat   ="true"
            :stack  ="true"
            :no-caps="true"
            size    ="26px"
            class   ="GPL__side-btn"
            color   ="white"
            :to     ="{ name: 'ContractIndex' }"
          >
            <q-icon size="35px" name="library_books" color="orange" />
            <div class="GPL__side-btn__label">
              {{ $t('Contratos') }}
            </div>
          </q-btn>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MyCompanies                from "../components/common/MyCompanies";
import md5                        from "md5";
import { mapActions, mapGetters } from "vuex";
import { LocalStorage }           from "quasar";

export default {
  name: "AdminLayout",

  components: {
    MyCompanies,
  },

  data() {
    return {
      defaultCompany : [],
      leftDrawerOpen : this.$q.screen.gt.sm,
      companySelected: -1,
    };
  },

  created() {
    this.discoveryDefaultCompany();
    this.selectMyCompanyInSession();
  },

  computed: {
    user() {
      return this.$store.getters["auth/user"] || {};
    },

    currentCompany() {
      return this.$store.getters["people/currentCompany"] || {};
    },

    style() {
      return "background: #182840";
    },

    gravatar() {
      if (this.user.email === undefined) return "";

      return `https://www.gravatar.com/avatar/${md5(this.user.email)}?s=400`;
    },
  },

  methods: {
    ...mapActions({
      peopleDefaultCompany: "people/defaultCompany",
    }),

    onCompanySelected(company) {
      let session = LocalStorage.has("session")
        ? LocalStorage.getItem("session") : {};

      session.mycompany = company.id;

      LocalStorage.set("session", session);
    },

    selectMyCompanyInSession() {
      let session = LocalStorage.has("session")
        ? LocalStorage.getItem("session") : {};

      if (session.mycompany !== undefined) {
        this.companySelected = session.mycompany;
      }
    },

    discoveryDefaultCompany() {
      this.peopleDefaultCompany().then((response) => {
        let data = [];
        if (response.success === true && response.data.length) {
          for (let index in response.data) {
            let item = response.data[index];
            let logo = null;

            if (item.logo !== null) {
              logo = "https://" + item.logo.domain + item.logo.url;
            }

            data.push({
              id  : item.id,
              name: item.alias,
              logo: logo || null,
            });
          }
        }
        this.defaultCompany = data[0];
      });
    },

    onLogout() {
      this.$store.dispatch("auth/logOut");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="sass">
.logo-container
  width: 100%
.main-logo,.logo-container a,.current-logo,.current-logo-container
  margin: auto
  margin-top: 3px
  min-height: 50px
  height: 50px
  max-width: 100%
  max-height: 100%
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
