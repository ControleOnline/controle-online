import SubmissionError from '../../../error/SubmissionError';
import { fetch } from '../../../boot/myapi';
import * as types from './mutation_types';

export const company = ({ commit }, values) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  if (values.origin.country.length === 0) {
    values.origin.country = values.address.country;
    values.origin.city = values.address.city;
    values.origin.state = values.address.state;
  }

  return fetch('companies', { method: 'POST', body: JSON.stringify(values) })
    .then(response => {
      commit(types.SET_ISLOADING, false);

      return response.json();
    })
    .then(data => {
      if (data.response && data.response.success) {
        if (data.response.data)
          commit(types.SET_COMPANY, {
            id: data.response.data.people.id
          });

      }

      return data.response ? data.response : null;
    })
    .catch(e => {
      commit(types.SET_ISLOADING, false);

      if (e instanceof SubmissionError)
        throw new Error(e.errors._error);

      throw new Error(e.message);
    });
};

export const contact = ({ commit }, { id, params = {} }) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  return fetch(`people/${id}/contact`, { params })
    .then(response => {
      commit(types.SET_ISLOADING, false);

      return response.json();
    })
    .then(data => {
      if (data.response)
        return data.response;

      return null;
    })
    .catch(e => {
      commit(types.SET_ISLOADING, false);

      if (e instanceof SubmissionError)
        throw new Error(e.errors._error);

      throw new Error(e.message);
    });
};

export const postContact = ({ commit }, values) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  return fetch('people/contact', { method: 'POST', body: JSON.stringify(values) })
    .then(response => {
      commit(types.SET_ISLOADING, false);

      return response.json();
    })
    .then(data => {
      if (data.response)
        return data.response;

      return null;
    })
    .catch(e => {
      commit(types.SET_ISLOADING, false);

      if (e instanceof SubmissionError)
        throw new Error(e.errors._error);

      throw new Error(e.message);
    });
};

export const email = ({ commit }, email) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  let params = {
    method: 'GET',
    params: { email: email }
  };

  return fetch(`email/find`, params)
    .then(response => {
      commit(types.SET_ISLOADING, false);

      return response.json();
    })
    .then(data => {
      if (data.response)
        return data.response;

      return null;
    })
    .catch(e => {
      commit(types.SET_ISLOADING, false);

      if (e instanceof SubmissionError)
        throw new Error(e.errors._error);

      throw new Error(e.message);
    });
};

export const myCompanies = ({ commit }) => {
  commit(types.SET_ISLOADING);

  return fetch('/people/my-companies')
    .then(response => response.json())
    .then(data => {
      commit(types.SET_ISLOADING, false);

      return data.response;

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

export const currentCompany = ({ commit }, company) => {
  if (company) {
    commit(types.SET_CURRENT_COMPANY, company);
  }
};
