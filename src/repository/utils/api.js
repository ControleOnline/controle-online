import myFetch         from './fetch';
import SubmissionError from './SubmissionError';

/**
 * API class.
 *
 * @constructor
 * @param {String} endpoint
 */

export default class Api {
  constructor(endpoint, token = null) {
    this.endpoint = endpoint;
    this.token    = token;
  }

  private(id, options = {}) {
    if (this.token === null)
      throw Error('API: token is not defined');

    if (typeof options.headers === 'undefined')
      Object.assign(options, { headers: new Headers() });

    options.headers.set(
      'API-TOKEN', this.token
    );

    return myFetch(
      this.endpoint, id, options
    )
      .catch(e => {
        if (e instanceof SubmissionError) {
          throw new Error(e.errors._error);
        }

        throw new Error(e.message);
      });
  }

  public(id, options = {}) {
    return myFetch(
      this.endpoint, id, options
    )
      .catch(e => {
        if (e instanceof SubmissionError) {
          throw new Error(e.errors._error);
        }

        throw new Error(e.message);
      });
  }
}
