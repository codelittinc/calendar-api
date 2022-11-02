export const buildExceptionId = (resource: string, property: string, condition: string) => {
  return `${resource}.${capitalizeFirstLetter(property)}${condition}`;
};

const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
