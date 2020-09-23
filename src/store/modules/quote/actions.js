import SubmissionError from '../../../error/SubmissionError';
import { fetch }       from '../../../boot/myapi';
import * as types      from './mutation_types';

export const quote = ({ commit }, values) => {
  commit(types.SET_ISLOADING);

  let params   = {
      method: 'POST',
      body  : JSON.stringify(values)
    };

  return fetch('/quotes', params)
    .then(response => response.json())
    .then(data => {

      commit(types.SET_ISLOADING, false);
      commit(types.SET_RETRIEVED, data.response);

      return data;

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

export const choose_quote = ({ commit }, { id, values }) => {
  commit(types.SET_ISLOADING);

  let params   = {
      method: 'PUT',
      body  : JSON.stringify(values)
    };

  return fetch(`/orders/${id}/choose-quote`, params)
    .then(response => response.json())
    .then(data => {
      commit(types.SET_ISLOADING, false);

      return data;
    });
};
