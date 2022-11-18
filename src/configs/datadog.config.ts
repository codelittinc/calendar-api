import tracer from 'dd-trace';

export const loadDatadogConfig = () => {
  const { DATADOG_SERVICE, DATADOG_ENV, DATADOG_HOSTNAME, NODE_ENV, DD_API_KEY } = process.env;

  if (!DD_API_KEY) {
    return;
  }

  tracer.init({
    service: DATADOG_SERVICE,
    runtimeMetrics: true,
    logInjection: true,
    env: DATADOG_ENV || NODE_ENV,
    profiling: true,
    hostname: DATADOG_HOSTNAME,
  });

  tracer.use('express');
};
