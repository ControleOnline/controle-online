import SubmissionError from '../../../error/SubmissionError';
import { fetch }       from '../../../boot/myapi';
import * as types      from './mutation_types';

const RESOURCE_ENDPOINT = '/my_contracts';

export const getItems = ({ commit }, params = {}) => {
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

export const reset = ({ commit }) => {
  commit(types.RESET);
};

export const getItem = ({ commit }, { id, params = {} }) => {
  commit(types.SET_ISLOADING);

  return fetch(`${RESOURCE_ENDPOINT}/${id}`, { params })
    .then(response => response.json())
    .then(data => {

      commit(types.SET_ISLOADING, false);

      return data;

    });
};

export const getModels = ({ commit }, params = {}) => {
  return fetch('/my_contract_models', { params })
    .then(response => response.json())
    .then(data => {

      return data['hydra:member'];

    });
};

export const saveContract = ({ commit }, { id, values, params }) => {
  commit(types.SET_ERROR, '');

  let options = {
    method: id == undefined ? 'POST' : 'PUT',
    body  : JSON.stringify(values),
    params: params
  };

  let endpoint = id == undefined ? `${RESOURCE_ENDPOINT}` : `${RESOURCE_ENDPOINT}/${id}`;

  return fetch(endpoint, options)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const createPeopleContract = ({ commit }, { values, params }) => {
  commit(types.SET_ERROR, '');

  let options = {
    method: 'POST',
    body  : JSON.stringify(values),
    params: params
  };

  return fetch('/my_contract_peoples', options)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => {
      if (e instanceof SubmissionError) {
        throw new Error(e.errors._error);
      }

      throw new Error(e.message);
    });
};

export const getParticipants = ({ commit }, contractId) => {
  return fetch(`/my_contracts/${contractId}/contract_peoples`)
    .then(response => response.json())
    .then(data => {

      return data['hydra:member'];

    });
};

export const getProducts = ({ commit }, params = {}) => {
  return fetch('/products', { params })
    .then(response => response.json())
    .then(data => {

      return data['hydra:member'];

    });
};

export const createProductContract = ({ commit }, values) => {
  commit(types.SET_ERROR, '');

  let params = {
    method: 'POST',
    body  : JSON.stringify(values)
  };

  return fetch('/my_contract_products', params)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const getContractProducts = ({ commit }, contractId) => {
  return fetch(`/my_contracts/${contractId}/contract_products`)
    .then(response => response.json())
    .then(data => {

      return data['hydra:member'];

    });
};

export const getParticipantsData = ({ commit }, contractId) => {
  return fetch(`${contractId}/participants`)
    .then(response => response.json())
    .then(data => {

      if (data.response)
        return data.response;

      return null;
    });
};

export const deletePeopleContract = ({ commit }, id) => {
  commit(types.SET_ERROR, '');

  return fetch(`${id}`, { method: 'DELETE' })
    .then(() => {
      return true;
    });
};

export const getParticipantRoles = ({ commit }, params) => {
  return fetch(
      `${params.contractId}/contract_peoples`, { params: { 'people': params.peopleId } }
    )
    .then(response => response.json())
    .then(data => {

      if (data['hydra:member']) {
        let roles = [];

        data['hydra:member'].forEach(participant => {
          roles.push(participant.peopleType);
        });

        return roles;
      }

      return [];

    });
};

export const createAddendum = ({ commit }, id) => {
  commit(types.SET_ERROR, '');

  let options = {
    method: 'PUT',
    body  : JSON.stringify({}),
  };

  return fetch(`${id}/create-addendum`, options)
    .then(response => response.json())
    .then(contract => {
      if (contract['@id'])
        return contract;

      return null;
    });
};

export const cancelContract = ({ commit }, { id, endDate }) => {
  commit(types.SET_ERROR, '');

  let options = {
    method: 'PUT',
    body  : JSON.stringify({ endDate }),
  };

  return fetch(`${id}/cancel-contract`, options)
    .then(response => response.json())
    .then(contract => {
      if (contract['@id'])
        return contract;

      return null;
    });
};

export const requestSignatures = ({ commit }, id) => {
  let options = {
    method: 'PUT',
    body  : JSON.stringify({}),
  };

  return fetch(`${id}/request-signatures`, options)
    .then(response => response.json())
    .then(contract => {
      if (contract['@id'])
        return contract;

      return null;
    });
};