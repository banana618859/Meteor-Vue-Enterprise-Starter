import VueRouter from 'vue-router';
import iView from 'iview';
import {
  requireAuth,
  requireNoAuth,
  requireAdmin
} from '/src/imports/modules/accounts/client/lib/router-accounts-hooks';

// unfortunate hack for now. jest is using babel-plugin-dynamic-import-node
// which resolves as "module" not "module.default"
const getModule = (mod) => {
  if (process.env.NODE_ENV === 'test') {
    return mod;
  }
  return mod.default;
};

const PageSignUpAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignUp/PageSignUp.vue')
    .then(PageSignUp => resolve(getModule(PageSignUp)));
};
const PageSignInAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignIn/PageSignIn.vue')
    .then(PageSignIn => resolve(getModule(PageSignIn)));
};
const PagePasswordResetAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePasswordReset/PagePasswordReset.vue')
    .then(PagePasswordReset => resolve(getModule(PagePasswordReset)));
};
const PageEnrollAccountAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageEnrollAccount/PageEnrollAccount.vue')
    .then(PageEnrollAccount => resolve(getModule(PageEnrollAccount)));
};
const PageHomeAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageHome/PageHome.vue')
  .then((PageHome) => resolve(getModule(PageHome)));
};
const PageAccountsAdminAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageAccountsAdmin/PageAccountsAdmin.vue')
  .then((PageAccountsAdmin) => resolve(getModule(PageAccountsAdmin)));
};
const PageAccountsAdminInviteAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageAccountsAdminInvite/PageAccountsAdminInvite.vue')
  .then((PageAccountsAdminInvite) => resolve(getModule(PageAccountsAdminInvite)));
};
const PagePrivateAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePrivate/PagePrivate.vue')
    .then(PagePrivate => resolve(getModule(PagePrivate)));
};

const createRouter = () => {
  const routes = [
    {
      path: '/sign-up',
      name: 'sign-up',
      component: PageSignUpAsync,
      beforeEnter: requireNoAuth
    },
    {
      path: '/enroll-account',
      name: 'enroll-account',
      component: PageEnrollAccountAsync
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: PageSignInAsync,
      beforeEnter: requireNoAuth
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: PagePasswordResetAsync,
      beforeEnter: requireNoAuth
    },
    {
      path: '/accounts-admin',
      name: 'accounts-admin',
      component: PageAccountsAdminAsync,
      beforeEnter: requireAdmin
    },
    {
      path: '/accounts-admin/invite',
      name: 'accounts-admin-invite',
      component: PageAccountsAdminInviteAsync,
      beforeEnter: requireAdmin
    },
    {
      path: '/home',
      name: 'home',
      component: PageHomeAsync
    },
    {
      path: '/private',
      name: 'private',
      component: PagePrivateAsync,
      beforeEnter: requireAuth
    },
    {
      path: '/',
      component: PageHomeAsync
    }
  ];

  const router = new VueRouter({
    routes,
    mode: 'history'
  });

  // set up iView router loading bar
  router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
  });
  router.afterEach((to, from) => {
    iView.LoadingBar.finish();
  });

  return router;
};

export {
  createRouter
};
