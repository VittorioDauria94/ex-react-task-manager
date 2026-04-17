export const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export function validateTaskTitle(title) {
  const hasSpecialSymbols = title
    .split("")
    .some((char) => symbols.includes(char));

  return title.trim().length > 0 && !hasSpecialSymbols;
}
