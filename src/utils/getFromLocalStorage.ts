export const getFromLocalStorage = <T>(
  key: string, initialValue: T,
) => {
  let value: T;

  try {
    value = JSON.parse(localStorage.getItem(key) || '') || initialValue;
  } catch (error) {
    console.error('Error parsing localStorage:', error);
    value = initialValue;
  }

  return value;
};
