export const loadEnvVars = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv-flow').config({
    silent: true,
  });
};
