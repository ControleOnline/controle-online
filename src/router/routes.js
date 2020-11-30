
const routes = [
  {
    path     : '/',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      { name: 'LoginIndex', path: ''     , component: () => import('pages/Login.vue') }      
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
    path     : '/sales/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [      
      { name: 'SalesOrderIndex'  , path: 'order'       , component: () => import('pages/Orders/Sales/Index.vue') },
      { name: 'SalesOrderDetails', path: 'order/id/:id', component: () => import('pages/Orders/Sales/Order.vue') },
    ]
  },
  {
    path     : '/finance/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [      
      { name: 'ComissionIndex'  , path: 'comission'       , component: () => import('pages/Invoice/Comission/Index.vue'  ) },
      { name: 'ComissionDetails', path: 'comission/id/:id', component: () => import('pages/Invoice/Comission/Details.vue') },
      { name: 'ReceiveDetails', path: 'receive/id/:id', component: () => import('pages/Invoice/Receive/Details.vue') },
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
    path     : '/clients/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      {
        name     : 'ClientsIndex',
        path     : '',
        component: () => import('pages/Clients/Index.vue')
      },
    ]
  }, 
  {
    path: '*', redirect: '/finance/receive'
  },
]

export default routes
