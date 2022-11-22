import tracer from 'dd-trace';

export const loadDatadogConfig = () => {
  const { DD_API_KEY } = process.env;
  if (!DD_API_KEY) {
    return;
  }
  tracer.init();
};
