import myFetch         from '../utils/fetch';
import SubmissionError from '../error/SubmissionError';
import { ENTRYPOINT }  from '../config/entrypoint';

let myStore = null;

export const fetch = function(id, options = {}) {
  if (typeof options.headers === 'undefined')
    Object.assign(options, { headers: new Headers() });

  if (myStore.getters['auth/user'] !== null)
    options.headers.set(
      'API-TOKEN', myStore.getters['auth/user'].token
    );

  let myPromisse = myFetch(id, options);

  myPromisse.catch(e => {
    if (e.message == 'Unauthorized')
      myStore.dispatch('auth/logOut');
  });

  return myPromisse;
}

export default async ({ store }) => {
  myStore = store;
}
