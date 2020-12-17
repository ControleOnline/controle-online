<template>
  <div class="row">
    <div class="col-12 q-pa-md text-h6">
      Atualização de cadastro
    </div>

    <div class="col-12">
      <div class="q-pa-md text-subtitle1 text-center">
        {{ client.name }}
      </div>
    </div>

    <div class="col-12">
      <q-tabs
        :horizontal="$q.screen.gt.xs"
        align      ="justify"
        v-model    ="currentTab"
        class      ="bg-white text-primary"
      >
        <q-tab
          name ="emails"
          label="Emails"
        />
        <q-tab
          name ="users"
          label="Usuários"
        />
        <q-tab
          name ="address"
          label="Endereços"
        />
        <q-tab
          name ="phones"
          label="Telefones"
        />
        <q-tab
          name ="documents"
          label="Documentos"
        />
        <q-tab
          name ="employees"
          label="Funcionários"
        />
        <q-tab
          name ="billing"
          label="Faturamento"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="currentTab"
      >
        <q-tab-panel name="emails">
          <ClientAdminEmails
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="users">
          <ClientAdminUsers
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="address">
          <ClientAdminAddresses
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="phones">
          <ClientAdminPhones
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="documents">
          <ClientAdminDocuments
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="employees">
          <ClientAdminEmployees
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>

        <q-tab-panel name="billing">
          <ClientAdminBilling
            :api  ="api"
            :id   ="clientId"
            @error="(error) => {
              this.$q.notify({
                message : error.message,
                position: 'bottom',
                type    : 'negative',
              });
            }"
            @saved="(data) => {
              this.$q.notify({
                message : 'Os dados foram salvos com sucesso',
                position: 'bottom',
                type    : 'positive',
              });
            }"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>

  </div>
</template>

<script>
import Api                  from '../../utils/api';
import ClientAdminEmails    from '../../components/ClientAdminEmails';
import ClientAdminUsers     from '../../components/ClientAdminUsers';
import ClientAdminAddresses from '../../components/ClientAdminAddresses';
import ClientAdminPhones    from '../../components/ClientAdminPhones';
import ClientAdminDocuments from '../../components/ClientAdminDocuments';
import ClientAdminEmployees from '../../components/ClientAdminEmployees';
import ClientAdminBilling   from '../../components/ClientAdminBilling';

export default {
  props: {
    id    : {
      required: true,
    },
    config: {
      type    : Object,
      required: true
    },   
  },

  components: {
    ClientAdminEmails   ,
    ClientAdminUsers    ,
    ClientAdminAddresses,
    ClientAdminPhones   ,
    ClientAdminDocuments,
    ClientAdminEmployees,
    ClientAdminBilling  ,
  },

  created() {
    this.api = new Api(
      this.config.endpoint, this.config.token
    );

    this.getClient();
  },

  data () {
    return {
      currentTab: 'emails',
      api       : null,
      clientId  : this.id,
      client    : {
        name: '...'
      }
    }
  },

  methods: {
    getClient() {
      return this.api.private(`people/${this.clientId}`)
        .then(response => response.json())
        .then(data => {
          if (data['@id']) {
            this.client.name = data.name;
          }
        });
    }
  },
}
</script>