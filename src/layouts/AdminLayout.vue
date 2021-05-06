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

    <q-drawer v-model="leftDrawerOpen" :width="250" content-class="bg-primary">
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

        <q-list padding>

          <q-item v-ripple clickable
            class="GNL__drawer-item"
            v-for="link in links1"
            :key ="link.text"
            :to  ="link.to"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-expansion-item expand-icon-toggle :content-inset-level="0.3"
            icon  ="done_all"
            class ="GNL__drawer-item"
            :label="$t('Auditoria')"
          >
            <q-item v-ripple clickable
              class="GNL__drawer-item"
              v-for="link in links2"
              :key ="link.text"
              :to  ="link.to"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item expand-icon-toggle :content-inset-level="0.3"
            icon  ="fact_check"
            class ="GNL__drawer-item"
            :label="$t('Fiscal')"
          >
            <q-item v-ripple clickable
              class="GNL__drawer-item"
              v-for="link in links3"
              :key ="link.text"
              :to  ="link.to"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item expand-icon-toggle :content-inset-level="0.3"
            icon  ="calculate"
            class ="GNL__drawer-item"
            :label="$t('Contábil')"
          >
            <q-item v-ripple clickable
              class="GNL__drawer-item"
              v-for="link in links4"
              :key ="link.text"
              :to  ="link.to"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item expand-icon-toggle :content-inset-level="0.3"
            icon  ="contacts"
            class ="GNL__drawer-item"
            :label="$t('Departamento Pessoal')"
          >
            <q-item v-ripple clickable
              class="GNL__drawer-item"
              v-for="link in links5"
              :key ="link.text"
              :to  ="link.to"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator inset class="q-my-sm" />

          <q-item v-ripple clickable
            class="GNL__drawer-item"
            v-for="link in links6"
            :key ="link.text"
            :to  ="link.to"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
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
      links1         : [
        { icon: 'dashboard' , text: this.$t('Dashboard') , to: { name: 'DashboardIndex'    }},
        { icon: 'table_view', text: this.$t('Planos')    , to: { name: 'PlansIndex'        }},
        { icon: 'list'      , text: this.$t('Checklists'), to: { name: 'StepsRegistration' }},
        { icon: 'business'  , text: this.$t('Empresas')  , to: { name: 'CompaniesIndex'    }},
      ],
      links2         : [
        { icon: 'chevron_right', text: this.$t('Fiscal')        , to: { name: 'AuditFiscalIndex'       }},
        { icon: 'chevron_right', text: this.$t('Contábil')      , to: { name: 'AuditContabilIndex'     }},
        { icon: 'chevron_right', text: this.$t('Depto. Pessoal'), to: { name: 'AuditDeptoPessoalIndex' }},
        { icon: 'chevron_right', text: this.$t('Societário')    , to: { name: 'AuditSocietarioIndex'   }},
      ],
      links3         : [
        { icon: 'chevron_right', text: this.$t('Impostos')      , to: { name: 'FiscalImpostoIndex'     }},
        { icon: 'chevron_right', text: this.$t('Declarações')   , to: { name: 'FiscalDeclaracaoIndex'  }},
        {
          icon: 'chevron_right',
          text: this.$t('Serviços Adicionais'),
          to  : {
            name: 'FiscalServicosAdicionaisIndex'
          }
        },
      ],
      links4         : [
        {
          icon: 'chevron_right',
          text: this.$t('Extratos e Movimentações'),
          to  : {
            name: 'ContabilExtratosIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Declarações'),
          to  : {
            name: 'ContabilDeclaracaoIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Serviços Adicionais'),
          to  : {
            name: 'ContabilServicosAdicionaisIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Administrativo'),
          to  : {
            name: 'ContabilAdministrativoIndex'
          }
        },
      ],
      links5         : [
        { icon: 'chevron_right', text: this.$t('Impostos')           , to: { name: 'DeptoImpostoIndex'        }},
        { icon: 'chevron_right', text: this.$t('Declarações')        , to: { name: 'DeptoDeclaracaoIndex'     }},
        { icon: 'chevron_right', text: this.$t('Folhas de Pagamento'), to: { name: 'DeptoFolhaPagamentoIndex' }},
        { icon: 'chevron_right', text: this.$t('Pro-Labore')         , to: { name: 'DeptoProLaboreIndex'      }},
        { icon: 'chevron_right', text: this.$t('Funcionários')       , to: { name: 'DeptoFuncionariosIndex'   }},
        { icon: 'chevron_right', text: this.$t('Sócios')             , to: { name: 'DeptoSociosIndex'         }},
        { icon: 'chevron_right', text: this.$t('Administrativo')     , to: { name: 'ContabilExtratosIndex'    }},
        { icon: 'chevron_right', text: this.$t('Serviços Adicionais'), to: { name: 'ContabilExtratosIndex'    }},
      ],
      links6         : [
        { icon: 'person'       , text: this.$t('Clientes') , to: { name: 'ClientsIndex'  }},
        { icon: 'library_books', text: this.$t('Contratos'), to: { name: 'ContractIndex' }},
      ],
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

  .GNL
    &__toolbar
      height: 64px
    &__toolbar-input
      width : 55%
    &__drawer-item
      line-height  : 24px
      border-radius: 0 24px 24px 0
      .q-item__section--avatar
        min-width: 30px
        .q-icon
          color: $accent
      .q-item__label
        color         : #ffffff
        letter-spacing: .01785714em
        font-size     : .800rem
        font-weight   : 400
        line-height   : 1.25rem
    &__drawer-footer-link
      color          : inherit
      text-decoration: none
      font-weight    : 500
      font-size      : .75rem
      &:hover
        color: $accent
</style>
