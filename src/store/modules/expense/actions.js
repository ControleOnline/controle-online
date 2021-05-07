import { fetch }       from '../../../boot/myapi'
import { ENTRYPOINT }  from '../../../config/entrypoint'
import SubmissionError from '../../../error/SubmissionError';

export function getCategories ({ commit }, data) {
  const options = {
    method : 'GET',
    params : data.params ? data.params : {}
  };

  return fetch('/categories', options)
    .then(response => response.json())
    .then(response => {
      return response['hydra:member'];
    })
}

export function getProviders ({ commit }, data) {
  const options = {
    method : 'GET',
    params : data.params ? data.params : {}
  };

  return fetch('/providers', options)
    .then(response => response.json())
    .then(response => {
      return response['hydra:member'];
    })
}

export const createExpense = ({ commit }, data) => {
  let options = {
    method: 'POST',
    body  : JSON.stringify(data.values),
    params: data.params ? data.params : {}
  };

  return fetch('/company_expenses', options)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(e => {
      if (e instanceof SubmissionError) {
        throw new Error(e.errors._error);
      }

      throw new Error(e.message);
    });
}

export const createCategory = ({ commit }, data) => {
  let options = {
    method: 'POST',
    body  : JSON.stringify(data.values),
    params: data.params ? data.params : {}
  };

  return fetch('/categories', options)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(e => {
      if (e instanceof SubmissionError) {
        throw new Error(e.errors._error);
      }

      throw new Error(e.message);
    });
}

export const createProvider = ({ commit }, data) => {
  let options = {
    method: 'POST',
    body  : JSON.stringify(data.values),
    params: data.params ? data.params : {}
  };

  return fetch('/providers', options)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(e => {
      if (e instanceof SubmissionError) {
        throw new Error(e.errors._error);
      }

      throw new Error(e.message);
    });
}
