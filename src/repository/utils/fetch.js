import SubmissionError from './SubmissionError';

const MIME_TYPE = 'application/ld+json';

export default function (ENDPOINT, id, options = {}) {
  if (typeof options.headers === 'undefined') Object.assign(options, { headers: new Headers() });

  if (options.headers.get('Accept') === null) options.headers.set('Accept', MIME_TYPE);

  if (
    options.body !== undefined &&
    !(options.body instanceof FormData) &&
    options.headers.get('Content-Type') === null
  ) {
    options.headers.set('Content-Type', MIME_TYPE);
  }

  if (options.params) {
    let params = [];

    Object.keys(options.params).map(key => {
      if (Array.isArray(options.params[key])) {
        params.push(options.params[key].map((value) => `${key}[]=${value}`).join('&'))
      }
      else {
        params.push(key + '=' + options.params[key]);
      }
    });

    id = `${id}?${params.join('&')}`;
  }

  const entryPoint = ENDPOINT + (ENDPOINT.endsWith('/') ? '' : '/');

  return fetch(new URL(id, entryPoint), options).then(response => {
    if (response.ok) return response;

    return response.json().then(json => {
      const error = json['hydra:description']
        ? json['hydra:description']
        : response.statusText;
      if (!json.violations) throw Error(error);

      const errors = { _error: error };
      json.violations.map(violation =>
        Object.assign(errors, { [violation.propertyPath]: violation.message }),
      );

      throw new SubmissionError(errors);
    });
  });
}