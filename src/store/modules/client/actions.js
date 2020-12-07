import SubmissionError from '../../../error/SubmissionError';
import { fetch }       from '../../../boot/myapi';
import * as types      from './mutation_types';

const RESOURCE_ENDPOINT = '/clients';

export const getClients = ({ commit }, params = {}) => {
  commit(types.SET_ISLOADING);

  return fetch(RESOURCE_ENDPOINT, { params })
    .then(response => response.json())
    .then(data => {
      commit(types.SET_ISLOADING , false);

      commit(types.SET_ITEMS     , data['hydra:member']);
      commit(types.SET_VIEW      , data['hydra:view']);
      commit(types.SET_TOTALITEMS, data['hydra:totalItems']);

      return data['hydra:member'];

    }).catch(e => {
      commit(types.SET_ISLOADING, false);

      if (e instanceof SubmissionError) {
        commit(types.SET_VIOLATIONS, e.errors);
        // eslint-disable-next-line
        commit(types.SET_ERROR, e.errors._error);
        return;
      }

      commit(types.SET_ERROR, e.message);
    });
};

export const getClient = ({ commit }, id) => {
  return fetch(`${RESOURCE_ENDPOINT}/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      if (e instanceof SubmissionError)
        throw new Error(e.errors._error);

      throw new Error(e.message);
    });
};

export const save = ({ commit }, { values, params, id = undefined }) => {
  let options = {
    method: id == undefined ? 'POST' : 'PUT',
    body  : JSON.stringify(values),
    params: params
  };

  if (options.method == 'PUT')
    options.headers = new Headers({ 'Content-Type': 'application/ld+json' });

  let endpoint = id == undefined ? RESOURCE_ENDPOINT : `${RESOURCE_ENDPOINT}/${id}`;

  return fetch(endpoint, options)
    .then(response => response.json())
    .then(data => {
      commit(types.SET_RETRIEVED, data);

      return data.response ? data.response : null;
    })
    .catch(e => {
      if (e instanceof SubmissionError) {
        commit(types.SET_VIOLATIONS, e.errors);

        // eslint-disable-next-line
        commit(types.SET_ERROR, e.errors._error);

        return;
      }

      commit(types.SET_ERROR, e.message);
    });
};

export const reset = ({ commit }) => {
  commit(types.RESET);
};
