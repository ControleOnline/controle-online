<template>
  <div v-if="pageLoading" class="row">
    <div class="col-12 pageloader">
      <q-spinner color="primary" class="q-uploader__spinner" />
    </div>
  </div>
  <q-layout v-else-if="isAdmin && !disabled" view="lHh Lpr fff" class="bg-image">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu"
          class="q-mx-md" />
        <div class="q-gutter-sm items-center row logo-container">
          <router-link v-bind:to="'/'" tag="a" class="primary">
            <img :src="defaultCompany.logo || ''" class="main-logo" />
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
            <q-tooltip>{{ $t("menu.myacount") }}</q-tooltip>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">{{ $t("menu.myacount") }}</div>
                  <q-list>
                    <q-item :to="{ name: 'UserProfile' }" exact>
                      <q-item-section avatar>
                        <q-icon name="face" />
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>{{ $t("menu.myprofile") }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item :to="{ name: 'CompanyIndex' }" exact>
                      <q-item-section avatar>
                        <q-icon name="business" />
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>{{ $t("menu.mycompany") }}</q-item-label>
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

                  <q-btn v-close-popup color="primary" label="Sair" size="sm" @click="onLogout" />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="270" content-class="bg-primary">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <div class="q-gutter-sm items-center row current-logo-container">
            <router-link v-bind:to="'/'" tag="a" class="primary">
              <img :src="currentCompany.logo || ''" class="current-logo" />
            </router-link>
          </div>
        </q-toolbar>

        <q-toolbar class="q-pt-md justify-center">
          <MyCompanies :selected="companySelected" @selected="onCompanySelected" @setMyCompanies="setMyCompanies" />
        </q-toolbar>
        <div class="q-pt-xl q-px-sm column">

          <q-list padding v-if="1 == 2">

            <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links1" :key="link.text" :to="link.to">
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator inset class="q-my-sm" />

            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" icon="done_all" class="GNL__drawer-item"
              :label="$t('Auditoria')">
              <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links2" :key="link.text" :to="link.to">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" icon="fact_check" class="GNL__drawer-item"
              :label="$t('Fiscal')">
              <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links3" :key="link.text" :to="link.to">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" icon="calculate" class="GNL__drawer-item"
              :label="$t('Contábil')">
              <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links4" :key="link.text" :to="link.to">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" icon="contacts" class="GNL__drawer-item"
              :label="$t('Departamento Pessoal')">
              <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links5" :key="link.text" :to="link.to">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links6" :key="link.text" :to="link.to">
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" icon="attach_money" class="GNL__drawer-item"
              :label="$t('Financeiro')">
              <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links7" :key="link.text" :to="link.to">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-separator inset class="q-my-sm" />

            <q-item v-ripple clickable class="GNL__drawer-item" v-for="link in links8" :key="link.text" :to="link.to">
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>

          <q-list class="menu-list" padding>
            <q-item v-if="isSimple() == false" v-ripple clickable class="GNL__drawer-item"
              :to="{ name: 'DashboardIndex' }">
              <q-item-section avatar>
                <q-icon name="home" color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="menu-list-text">{{
                    $t("menu.home")
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator inset class="q-my-sm" />

            <q-expansion-item v-if="isSimple() == false" expand-icon-toggle :content-inset-level="0.3" color="white"
              icon="shopping_cart" class="GNL__drawer-item" :label="$t('Comercial')">
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'ShippingQuoteIndex' }">
                <q-item-section avatar>
                  <q-icon name="local_shipping" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.quotes")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'ClientsIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="person" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.clients")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'customerServices' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="person" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.crm")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'ContractIndex' }">
                <q-item-section avatar>
                  <q-icon name="library_books" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.contracts")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'SalesOrderIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="shopping_cart" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.salesorders")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'CouponIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="shopping_cart" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.coupon")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-expansion-item v-if="isSimple() == false" expand-icon-toggle :content-inset-level="0.3" color="white"
              icon="local_shipping" class="GNL__drawer-item" :label="$t('Operacional')">
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'CarriersIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="local_shipping" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.carriers")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'Professionals.Index' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="local_shipping" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.profissionals")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'ProvidersIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="person" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.providers")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'ImportIndex' }">
                <q-item-section avatar>
                  <q-icon name="publish" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.import")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'TasksIndex' }">
                <q-item-section avatar>
                  <q-icon name="task" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.tasks")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'PurchasingOrderIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="shopping_cart" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.purchasingorders")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-expansion-item v-if="isSimple() == false" expand-icon-toggle :content-inset-level="0.3" color="white"
              icon="attach_money" class="GNL__drawer-item" :label="$t('Financeiro')">
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'FinancePayIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="attach_money" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.financepay")
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'FinanceReceiveIndex' }">
                <q-item-section avatar>
                  <q-icon class="item-icon" name="attach_money" color="white" />
                </q-item-section>
                <q-item-section no-wrap>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.financereceive")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-expansion-item expand-icon-toggle :content-inset-level="0.3" color="white" icon="featured_play_list"
              class="GNL__drawer-item" :label="$t('Support')">
              <q-item v-ripple clickable class="GNL__drawer-item" :to="{ name: 'News' }">
                <q-item-section avatar>
                  <q-icon name="featured_play_list" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="menu-list-text">{{
                      $t("menu.news")
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
            <q-item v-if="isSimple() == true" v-ripple clickable class="GNL__drawer-item"
              :to="{ name: 'ShippingQuoteIndex' }">
              <q-item-section avatar>
                <q-icon name="local_shipping" color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="menu-list-text">{{
                    $t("menu.simulator")
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="isSimple() == true" v-ripple clickable class="GNL__drawer-item"
              :to="{ name: 'CarriersIndex' }">
              <q-item-section avatar>
                <q-icon class="item-icon" name="local_shipping" color="white" />
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label class="menu-list-text">{{
                    $t("menu.tables")
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
  <div v-else class="row">
    <div class="col-12 pageloader">
      <MyCompanies :selected="companySelected" @selected="onCompanySelected" @setMyCompanies="setMyCompanies" />
      <span>Você não tem permissão para acessar este aplicativo</span><br />
      <q-btn color="primary" label="Sair" size="sm" @click="onLogout" />
    </div>
  </div>
</template>

<script>
import MyCompanies from "@controleonline/quasar-common-ui/src/components/common/MyCompanies";
import md5 from "md5";
import { mapActions, mapGetters } from "vuex";
import { LocalStorage } from "quasar";

export default {
  name: "AdminLayout",

  components: {
    MyCompanies,
  },

  data() {
    return {
      disabled: false,
      isAdmin: false,
      permissions: [],
      companies: [],
      pageLoading: true,
      defaultCompany: [],
      leftDrawerOpen: this.$q.screen.gt.sm,
      companySelected: -1,
      links1: [
        { icon: 'dashboard', text: this.$t('Dashboard'), to: { name: 'DashboardIndex' } },
        { icon: 'table_view', text: this.$t('Planos'), to: { name: 'PlansIndex' } },
        { icon: 'list', text: this.$t('Checklists'), to: { name: 'StepsRegistration' } },
        { icon: 'person', text: this.$t('Clientes'), to: { name: 'ClientsIndex' } },
        { icon: 'library_books', text: this.$t('Contratos'), to: { name: 'ContractIndex' } },
      ],
      links2: [
        { icon: 'chevron_right', text: this.$t('Fiscal'), to: { name: 'AuditFiscalIndex' } },
        { icon: 'chevron_right', text: this.$t('Contábil'), to: { name: 'AuditContabilIndex' } },
        { icon: 'chevron_right', text: this.$t('Depto. Pessoal'), to: { name: 'AuditDeptoPessoalIndex' } },
        { icon: 'chevron_right', text: this.$t('Societário'), to: { name: 'AuditSocietarioIndex' } },
      ],
      links3: [
        { icon: 'chevron_right', text: this.$t('Impostos'), to: { name: 'FiscalImpostoIndex' } },
        { icon: 'chevron_right', text: this.$t('Declarações'), to: { name: 'FiscalDeclaracaoIndex' } },
        {
          icon: 'chevron_right',
          text: this.$t('Serviços Adicionais'),
          to: {
            name: 'FiscalServicosAdicionaisIndex'
          }
        },
      ],
      links4: [
        {
          icon: 'chevron_right',
          text: this.$t('Extratos e Movimentações'),
          to: {
            name: 'ContabilExtratosIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Declarações'),
          to: {
            name: 'ContabilDeclaracaoIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Serviços Adicionais'),
          to: {
            name: 'ContabilServicosAdicionaisIndex'
          }
        },
        {
          icon: 'chevron_right',
          text: this.$t('Administrativo'),
          to: {
            name: 'ContabilAdministrativoIndex'
          }
        },
      ],
      links5: [
        { icon: 'chevron_right', text: this.$t('Impostos'), to: { name: 'DeptoImpostoIndex' } },
        { icon: 'chevron_right', text: this.$t('Declarações'), to: { name: 'DeptoDeclaracaoIndex' } },
        { icon: 'chevron_right', text: this.$t('Folhas de Pagamento'), to: { name: 'DeptoFolhaPagamentoIndex' } },
        { icon: 'chevron_right', text: this.$t('Pro-Labore'), to: { name: 'DeptoProLaboreIndex' } },
        { icon: 'chevron_right', text: this.$t('Funcionários'), to: { name: 'DeptoFuncionariosIndex' } },
        { icon: 'chevron_right', text: this.$t('Sócios'), to: { name: 'DeptoSociosIndex' } },
        { icon: 'chevron_right', text: this.$t('Administrativo'), to: { name: 'DeptoAdministrativoIndex' } },
        {
          icon: 'chevron_right',
          text: this.$t('Serviços Adicionais'),
          to: {
            name: 'DeptoServicosAdicionaisIndex'
          }
        },
      ],
      links6: [
        {
          icon: 'domain',
          text: this.$t('Societário'),
          to: {
            name: 'SocietarioIndex'
          }
        },
      ],
      links7: [
        {
          icon: 'person',
          text: this.$t('Fornecedores'),
          to: {
            name: 'ProvidersIndex'
          }
        },
        {
          icon: 'attach_money',
          text: this.$t('Contas a Pagar'),
          to: {
            name: 'FinanceiroIndex'
          }
        },
        {
          icon: 'attach_money',
          text: this.$t('Contas a Receber'),
          to: {
            name: 'FinanceiroReceberIndex'
          }
        },
      ],
      links8: [
        {
          icon: 'note_add',
          text: this.$t('Serviços Adicionais'),
          to: {
            name: 'ServicosAdicionaisIndex'
          }
        },
      ],

    };
  },

  created() {
    this.discoveryDefaultCompany();
    this.selectMyCompanyInSession();
    if (this.getPeopleDefaultCompany) {
      this.pageLoading = false;
    }
  },

  computed: {
    ...mapGetters({
      getPeopleDefaultCompany: "people/defaultCompany",
    }),

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
      if (this.user.email === undefined) {
        return "";
      }

      return `https://www.gravatar.com/avatar/${md5(this.user.email)}?s=400`;
    },
  },

  watch: {
    permissions() {
      if (
        this.permissions.indexOf("franchisee") !== -1 ||
        this.permissions.indexOf("salesman") !== -1 ||
        this.permissions.indexOf("super") !== -1 ||
        this.permissions.indexOf("admin") !== -1
      ) {
        this.isAdmin = true;
      }
    },
    getPeopleDefaultCompany(data) {
      if (data) {
        data.permissions.forEach((item) => {
          if (this.permissions.indexOf(item) === -1) {
            this.permissions.push(item);
          }
        });
        this.pageLoading = false;
      }
    },
  },

  methods: {
    ...mapActions({
      config: "config/appConfig",
      peopleDefaultCompany: "people/defaultCompany",
    }),

    isSimple() {
      return this.getPeopleDefaultCompany.domainType === "simple";
    },
    setMyCompanies(data) {
      this.companies = data;
      if (data) {
        let disabled = true;
        let user_disabled = true;

        data.forEach((company) => {
          user_disabled = !company.user.enabled;
          if (
            company.enabled &&
            company.user.employee_enabled &&
            !user_disabled
          ) {
            disabled = false;
          } else if (this.companySelected == company.id) {
            this.companySelected = -1;
          }
          company.permission.forEach((item) => {
            if (this.permissions.indexOf(item) === -1) {
              this.permissions.push(item);
            }
          });
        });
        this.disabled = user_disabled || disabled;
      }
    },
    onCompanySelected(company) {
      let session = LocalStorage.has("session")
        ? LocalStorage.getItem("session")
        : {};

      session.mycompany = company.id;

      LocalStorage.set("session", session);
    },

    selectMyCompanyInSession() {
      let session = LocalStorage.has("session")
        ? LocalStorage.getItem("session")
        : {};
      if (session.mycompany !== undefined)
        this.companySelected = session.mycompany;
    },

    discoveryDefaultCompany() {
      this.peopleDefaultCompany().then((response) => {
        let data = [];
        if (response.success === true && response.data.length) {
          let item = response.data;
          let logo = null;

          if (item.logo !== null) {
            logo = "https://" + item.logo.domain + item.logo.url;
          }

          data.push({
            id: item.id,
            name: item.alias,
            logo: logo || null,
          });
        }
        this.defaultCompany = data;
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
.pageloader
  position: relative
  text-align: center
  margin-top: 300px
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
  background-position: center !important
  background-repeat: no-repeat !important
  background-size: cover !important    

.GPL
  &__toolbar
    height: 64px
  &__side-btn
    margin-bottom: 20px
    &__label
      font-size: 14px
      font-family: 'Exo', Helvetica,Arial,Lucida,sans-serif
      font-weight: 600
      text-transform: uppercase
.q-item__label.menu-list-text
  color: white
.GNL__drawer-item
  color: white
</style>