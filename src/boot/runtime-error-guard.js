function describeRejection(reason) {
  if (reason == null) {
    return 'Unknown rejection';
  }

  if (typeof reason === 'string') {
    return reason;
  }

  if (reason instanceof Error && reason.message) {
    return reason.message;
  }

  if (typeof reason === 'object') {
    const message = reason.message || reason.error || reason.statusText;
    if (message) {
      const status = reason.status || reason.code;
      return status ? `${status}: ${message}` : String(message);
    }

    try {
      return JSON.stringify(reason);
    } catch (error) {
      return 'Request failed';
    }
  }

  return String(reason);
}

export { describeRejection };

export default () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.__controleOnlineRuntimeErrorGuard) {
    return;
  }

  window.__controleOnlineRuntimeErrorGuard = true;

  window.addEventListener('unhandledrejection', (event) => {
    const message = describeRejection(event.reason);
    if (event.preventDefault) {
      event.preventDefault();
    }
    console.error('[runtime-error-guard]', message);
  });

  window.addEventListener('error', (event) => {
    const message = describeRejection(event.error || event.message);
    console.error('[runtime-error-guard]', message);
  });
};
