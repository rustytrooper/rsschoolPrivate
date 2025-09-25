export const normalizeError = (error: unknown) => {
  return error != null && error instanceof Error
    ? error
    : new Error('Unknown error');
};
