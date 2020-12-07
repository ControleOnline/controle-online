import SubmissionError from '../../../error/SubmissionError';
import { fetch } from '../../../boot/myapi';
import * as types from './mutation_types';

const RESOURCE_ENDPOINT = '/people';

export const company = ({ commit }, values) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  if (values.origin.country == null) {
    values.origin.country = values.address.country;
    values.origin.city    = values.address.city;
    values.origin.state   = values.address.state;
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

  return fetch(`${RESOURCE_ENDPOINT}/${id}/contact`, { params })
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

export const createContact = ({ commit }, values) => {
  commit(types.SET_ERROR, '');
  commit(types.SET_ISLOADING);

  return fetch(`${RESOURCE_ENDPOINT}/contact`, { method: 'POST', body: JSON.stringify(values) })
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

  return fetch(`${RESOURCE_ENDPOINT}/my-companies`)
    .then(response => response.json())
    .then(data => {
      commit(types.SET_ISLOADING, false);

      if (data.response) {
        commit(types.SET_COMPANIES, data.response.data);
      }

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

export const mySaleCompanies = ({ commit }) => {
  commit(types.SET_ISLOADING);

  return fetch(`${RESOURCE_ENDPOINT}/my-sale-companies`)
    .then(response => response.json())
    .then(data => {
      commit(types.SET_ISLOADING, false);

      if (data.response) {
        commit(types.SET_COMPANIES, data.response.data);
      }

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

export const defaultCompany = ({ commit }) => {
  commit(types.SET_ISLOADING);

  return fetch(`${RESOURCE_ENDPOINT}/default-company`)
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

export const getPeople = ({ commit }, id) => {
  return fetch(`${RESOURCE_ENDPOINT}/${id}`)
    .then(response => response.json())
    .then(data => {

      return data;

    });
};

export const getClientContact = ({ commit }, document) => {
  return fetch(`${RESOURCE_ENDPOINT}/client-company`, { params: { document } })
    .then(response => response.json())
    .then(data => {
      if (data.response) {
          return data.response;
      }

      return null;
    });
};
