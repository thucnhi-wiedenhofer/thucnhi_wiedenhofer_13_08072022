export function toUpperCase(str) {
  // converting first letter to uppercase
  const upperCase = str.charAt(0).toUpperCase() + str.slice(1);

  return upperCase;
}
