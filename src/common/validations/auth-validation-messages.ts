export const VALIDATION_MESSAGES = {
  minLength: (property: string, length: number) =>
    `${property} must be at least ${length} characters long`,
  maxLength: (property: string, length: number) =>
    `${property} must be at most ${length} characters long`,
  isEmail: (property: string) => `${property} must be a valid email address`,
  matches: (property: string) => `${property} is too weak`,
  isDateString: (property: string) =>
    `${property} must be a valid ISO date string`,
  isString: (property: string) => `${property} must be a string`,
};
