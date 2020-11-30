
const routes = [
  {
    path     : '/',
    component: () => import('layouts/MainLayout.vue'),
    children : [
      { name: 'LoginIndex', path: ''     , component: () => import('pages/Login.vue') },
      { name: 'QuoteIndex', path: 'quote', component: () => import('pages/Quote.vue') }
    ]
  },
  {
    path     : '/purchasing/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'OrderIndex'  , path: 'order'       , component: () => import('pages/Orders/Index.vue') },
      { name: 'OrderDetails', path: 'order/id/:id', component: () => import('pages/Orders/Order.vue') },
    ]
  },
  {
    path     : '/sales/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'ShippingQuoteIndex', path: 'shipping-quote', component: () => import('pages/Quote.vue') },
    ]
  },
  {
    path     : '/finance/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'InvoiceIndex'  , path: 'pay'       , component: () => import('pages/Invoice/Index.vue'  ) },
      { name: 'InvoiceDetails', path: 'pay/id/:id', component: () => import('pages/Invoice/Details.vue') },
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
    path     : '/order/',
    component: () => import('layouts/AdminLayout.vue'),
    children : [
      { name: 'TrackBack', path: 'track-back', component: () => import('pages/Orders/TrackBack.vue') },
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
    path: '*', redirect: '/sales/shipping-quote'
  },
]

export default routes
