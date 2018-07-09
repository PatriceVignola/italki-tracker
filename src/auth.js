/**
 * @prettier
 * @flow
 */

type Token = {
  value: string,
  expiration: number,
};

export function getSkypeToken(): ?Token {
  const value = localStorage.getItem('SkypeToken');
  const expiration = localStorage.getItem('SkypeTokenExpiration');

  if (!value || !expiration) return null;

  return {
    value,
    expiration: parseInt(expiration, 10),
  };
}

export function getRegistrationToken(): ?Token {
  const value = localStorage.getItem('RegistrationToken');
  const expiration = localStorage.getItem('RegistrationTokenExpiration');

  if (!value || !expiration) return null;

  return {
    value,
    expiration: parseInt(expiration, 10),
  };
}
