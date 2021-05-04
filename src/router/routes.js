
const routes = [
  {
    path     : '/',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      { name: 'LoginIndex'     , path: ''          , component: () => import('pages/Login.vue') },
      { name: 'CalculatorIndex', path: 'calculator', component: () => import('pages/Calculator.vue') }
    ]
  },
  {
    path     : '/forgot-password',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      {
        path     : ':hash/:lost',
        component: () => import('pages/User/Recovery/AccessRecovery.vue')
      },
    ]
  },
  {
    path     : '/home/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'DashboardIndex', path: 'dashboard', component: () => import('pages/Home/Dashboard.vue') },
    ]
  },
  {
    path: '/contracts/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { name: 'ContractIndex'  , path: ''      , component: () => import('pages/Contracts/Index.vue'  ) },
      { name: 'ContractDetails', path: 'id/:id', component: () => import('pages/Contracts/Details.vue') },
    ]
  },
  {
    path     : '/user/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'UserProfile', path: 'profile', component: () => import('pages/User/Profile.vue') },
    ]
  },
  {
    path     : '/support/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'FAQ',  path: 'faq',  component: () => import('pages/Support/FAQ.vue') },
      { name: 'News', path: 'news', component: () => import('pages/Support/News.vue') },
      { name: 'NewsDetail', path: 'news/:id', component: () => import('pages/Support/NewsDetail.vue') },
    ]
  },
  {
    path     : '/company/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'CompanyIndex',
        path     : '',
        component: () => import('pages/Company/Index.vue')
      },
      {
        name     : 'CompanyDetailsPage',
        path     : 'id/:id',
        component: () => import('pages/Company/Details.vue')
      },
    ]
  },
  {
    path     : '/customers/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'ClientsIndex',
        path     : '',
        component: () => import('pages/Clients/Index.vue')
      },
      {
        name     : 'ClientsDetails',
        path     : 'id/:id',
        component: () => import('pages/Clients/Details.vue')
      },
    ]
  },
  {
    path     : '/infos/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'BasicInfoIndex',
        path     : ':id',
        component: () => import('pages/BasicInfo/Index.vue')
      },
    ]
  },
  {
    path     : '/planos/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'PlansIndex',
        path     : '',
        component: () => import('pages/Plans/Index.vue'),
      },
      {
        name     : 'PlansDetails',
        path     : ':id',
        component: () => import('pages/Plans/Details.vue')
      },
      {
        name     : 'PlansCreate',
        path     : 'novo',
        component: () => import('pages/Plans/Create.vue')
      },
    ]
  },
  {
    path     : '/etapas-do-cadastro/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'StepsRegistration',
        path     : '',
        component: () => import('pages/StepsRegistration/Index.vue')
      },
      {
        name     : 'StepsRegistrationAnalysis',
        path     : ':id',
        component: () => import('pages/StepsRegistration/Analysis.vue')
      },
      {
        name     : 'StepsRegistrationHistory',
        path     : ':id/historico',
        component: () => import('pages/StepsRegistration/Historico.vue')
      },
    ]
  },
  {
    path     : '/empresas/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'CompaniesIndex',
        path     : '',
        component: () => import('pages/Companies/Index.vue')
      },
      {
        name     : 'CompaniesDetails',
        path     : ':id',
        component: () => import('pages/Companies/Details.vue')
      },
      {
        name     : 'CompaniesCreate',
        path     : 'novo',
        component: () => import('pages/Companies/Create.vue')
      },
    ]
  },
  {
    path     : '/auditoria/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'AuditFiscalIndex',
        path     : 'fiscal',
        component: () => import('pages/Audit/Fiscal/Index.vue'),
      },
      {
        name     : 'AuditFiscalDetails',
        path     : 'fiscal/:id',
        component: () => import('pages/Audit/Fiscal/Details.vue'),
      },
      {
        name     : 'AuditFiscalHistorico',
        path     : 'fiscal/:id/historico',
        component: () => import('pages/Audit/Fiscal/Historico.vue'),
      },
      {
        name     : 'AuditContabilIndex',
        path     : 'contabil',
        component: () => import('pages/Audit/Contabil/Index.vue'),
      },
      {
        name     : 'AuditContabilDetails',
        path     : 'contabil/:id',
        component: () => import('pages/Audit/Contabil/Details.vue'),
      },
      {
        name     : 'AuditContabilHistorico',
        path     : 'contabil/:id/historico',
        component: () => import('pages/Audit/Contabil/Historico.vue'),
      },
      {
        name     : 'AuditDeptoPessoalIndex',
        path     : 'depto-pessoal',
        component: () => import('pages/Audit/Depto/Index.vue'),
      },
      {
        name     : 'AuditDeptoPessoalDetails',
        path     : 'depto-pessoal/:id',
        component: () => import('pages/Audit/Depto/Details.vue'),
      },
      {
        name     : 'AuditDeptoPessoalHistorico',
        path     : 'depto-pessoal/:id/historico',
        component: () => import('pages/Audit/Depto/Historico.vue'),
      },
    ]
  },
  {
    path: '*', redirect: '/finance/receive'
  },
]

export default routes
