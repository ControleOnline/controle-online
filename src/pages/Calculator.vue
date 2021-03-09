<template>
  <q-page class="bg-page" padding>

    <div class="row text-center text-white">
      <div class="col-12 text-h5 q-pb-md q-pt-md">
        VEM COM A GENTE
      </div>
      <div class="col-12 text-h4 text-weight-bolder q-pb-md">
        QUER REDUÇÃO DE CUSTO E RENTABILIDADE?
      </div>
      <div class="col-12 text-h6 text-weight-bold q-pb-md">
        Simule aqui quanto ficará para cuidarmos da sua contabilidade
      </div>
    </div>

    <div class="q-pa-md row justify-center q-gutter-md">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="card-header">MEI SERVIÇOS</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <ul class="q-pl-md">
            <li style="text-align: left;">1 Funcionário</li>
            <li style="text-align: left;">Faturamento até R$ 6.750/mês</li>
            <li style="text-align: left;">Sistema Financeiro: Básico</li>
            <li style="text-align: left;">Suporte MEI</li>
          </ul>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn unelevated rounded
            class="full-width text-purple"
            color="accent"
          >
            Contratar
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="card-header">MEI SERVIÇOS E COMÉRCIO</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <ul class="q-pl-md">
            <li style="text-align: left;">1 Funcionário</li>
            <li style="text-align: left;">Faturamento até R$ 6.750/mês</li>
            <li style="text-align: left;">Sistema Financeiro: Básico</li>
            <li style="text-align: left;">Suporte MEI</li>
          </ul>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn unelevated rounded
            class="full-width text-purple"
            color="accent"
          >
            Contratar
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="card-header">SIMPLES SERVIÇOS</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-md q-mt-md">
            <q-select outlined dense
              v-model ="products[0].plan"
              :options="options"
            />
            <q-input outlined dense
              v-model    ="products[0].socios"
              placeholder="Nº Socios"
            />
            <q-input outlined dense
              v-model    ="products[0].funcionarios"
              placeholder="Nº Funcionários"
            />
            <q-input outlined dense
              v-model    ="products[0].faturamento"
              placeholder="Faturamento"
            />
            <div class="text-center text-h4">
              {{ `R$${products[0].price}` }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn unelevated rounded
            class="full-width text-purple"
            color="accent"
          >
            Contratar
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="card-header">SIMPLES SERVIÇOS E COMÉRCIO</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-md q-mt-md">
            <q-select outlined dense
              v-model ="products[1].plan"
              :options="options"
            />
            <q-input outlined dense
              v-model    ="products[1].socios"
              placeholder="Nº Socios"
            />
            <q-input outlined dense
              v-model    ="products[1].funcionarios"
              placeholder="Nº Funcionários"
            />
            <q-input outlined dense
              v-model    ="products[1].faturamento"
              placeholder="Faturamento"
            />
            <div class="text-center text-h4">
              {{ `R$${products[0].price}` }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn unelevated rounded
            class="full-width text-purple"
            color="accent"
          >
            Contratar
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="card-header">LUCRO PRESUMIDO SERVIÇOS</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-md q-mt-md">
            <q-select outlined dense
              v-model ="products[2].plan"
              :options="options"
            />
            <q-input outlined dense
              v-model    ="products[2].socios"
              placeholder="Nº Socios"
            />
            <q-input outlined dense
              v-model    ="products[2].funcionarios"
              placeholder="Nº Funcionários"
            />
            <q-input outlined dense
              v-model    ="products[2].faturamento"
              placeholder="Faturamento"
            />
            <div class="text-center text-h4">
              {{ `R$${products[0].price}` }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn unelevated rounded
            class="full-width text-purple"
            color="accent"
          >
            Contratar
          </q-btn>
        </q-card-actions>
      </q-card>

    </div>

  </q-page>
</template>

<script>

const OPTIONS = [
  {
    label: 'Tipo de plano',
    value: null,
  },
  {
    label: 'Bronze',
    value: 'bronze',
  },
  {
    label: 'Prata',
    value: 'prata',
  },
  {
    label: 'Ouro',
    value: 'ouro',
  },
  {
    label: 'Mensal',
    value: 'mensal',
  },
];

Object.freeze(OPTIONS);

export default {
  data() {
    return {
      products: [
        {
          plan        : OPTIONS[0],
          socios      : null,
          funcionarios: null,
          faturamento : null,
          price       : 0
        },
        {
          plan        : OPTIONS[0],
          socios      : null,
          funcionarios: null,
          faturamento : null,
          price       : 0
        },
        {
          plan        : OPTIONS[0],
          socios      : null,
          funcionarios: null,
          faturamento : null,
          price       : 0
        },
      ],
      options: OPTIONS
    };
  },
}
</script>

<style lang="scss" scoped>
.bg-page {
  background-color   : #e46a32;
  background         : url('~assets/calculator_bg.jpg');
  background-position: center !important;
  background-repeat  : no-repeat !important;
  background-size    : cover !important;
  -webkit-transition : background opacity 3s ease-in-out;
  -moz-transition    : background opacity 3s ease-in-out;
  -o-transition      : background opacity 3s ease-in-out;
  transition         : background opacity 3s ease-in-out;
}

.my-card {
  width          : 100%;
  max-width      : 230px;
  display        : flex;
  flex-direction : column;
  justify-content: space-between;

  & li {
    font-size: 16px;
  }

  & .card-header {
    display        : flex;
    justify-content: center;
    align-content  : center;
    flex-direction : column;
    min-height     : 50px;
    text-align     : center;
    font-weight    : bold;
  }
}
</style>
