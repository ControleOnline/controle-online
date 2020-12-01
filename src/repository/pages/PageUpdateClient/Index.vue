<template>
  <div class="row">
    <div class="col-12 q-pa-md text-h6">
      Atualização de cadastro
    </div>

    <div class="col-12">
      <div class="q-pa-md text-subtitle1 text-center">
        {{ client.name || '...' }}
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
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="currentTab"
      >
        <q-tab-panel name="emails">
          <ClientEmails
            :id="clientId"
          />
        </q-tab-panel>

        <q-tab-panel name="users">
          <ClientUsers
            :id="clientId"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>

  </div>
</template>

<script>
import Api          from '../../utils/api';
import ClientEmails from './components/ClientEmails';
import ClientUsers  from './components/ClientUsers';

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
    ClientEmails,
    ClientUsers ,
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
        name: null
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