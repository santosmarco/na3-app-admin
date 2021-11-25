export const displayError = (error: unknown): void => {
  console.error(error);
  process.exit(1);
};
