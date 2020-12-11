//function to separate array
export const separateArray = (
  arr: Array<number | string | { [key: string]: unknown } | unknown>,
  size: number,
): Array<number | string | { [key: string]: unknown } | unknown> => {
  const newArr: Array<
    number | string | { [key: string]: unknown } | unknown
  > = [];
  for (let i = 0; i < arr.length; i += size) {
    const sliceIt = arr.slice(i, i + size);
    newArr.push(sliceIt);
  }
  return newArr;
};

export const isEmpty = (arr: Array<unknown> | string) => {
  if (arr.length === 0) {
    return true;
  }
  return false;
};

export const isObjEmpty = (obj: { [key: string]: unknown }) => {
  for (const key in obj) {
    if (obj[key] !== undefined) {
      return false;
    }
  }
  return true;
};
