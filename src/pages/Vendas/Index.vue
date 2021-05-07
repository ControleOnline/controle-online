<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card style="min-height: 90vh;">
          <div class="q-pa-md text-h6">
            {{ $t('Vendas') }}
          </div>

          <q-tabs
            align  ="justify"
            v-model="currentTab"
            class  ="bg-white text-primary"
          >
            <q-tab
              name  ="todas"
              :label="$t('Todas')"
            />
            <q-tab
              name  ="nao_atendidos"
              :label="$t('Não atendidos')"
            />
            <q-tab
              name  ="em_atendimento"
              :label="$t('Em Atendimento')"
            />
            <q-tab
              name  ="contratados"
              :label="$t('Contratados')"
            />
            <q-tab
              name  ="nao_contratados"
              :label="$t('Não Contratados')"
            />
            <q-tab
              name  ="cancelados"
              :label="$t('Cancelados')"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="currentTab"
          >
            <q-tab-panel name="todas">
              <VendasTabela
                status="todas"
              />
            </q-tab-panel>

            <q-tab-panel name="nao_atendidos">
              <VendasTabela
                status="nao_atendidos"
              />
            </q-tab-panel>

            <q-tab-panel name="em_atendimento">
              <VendasTabela
                status="em_atendimento"
              />
            </q-tab-panel>

            <q-tab-panel name="contratados">
              <VendasTabela
                status="contratados"
              />
            </q-tab-panel>

            <q-tab-panel name="nao_contratados">
              <VendasTabela
                status="nao_contratados"
              />
            </q-tab-panel>

            <q-tab-panel name="cancelados">
              <VendasTabela
                status="cancelados"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VendasTabela from './../../components/vendas/VendasTabela';

export default {
  name      : 'StepsRegistration',

  components: {
    VendasTabela,
  },

  computed: {
    user() {
      return this.$store.getters['auth/user'] || {};
    },
  },

  data () {
    return {
      currentTab: 'todas',
    }
  },

  methods: {

  },
}
</script>
