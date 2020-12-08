//function to separate array
export const separateArray = (arr: Array<any>, size: number): Array<any> => {
  const newArr: any[] = [];
  for (let i = 0; i < arr.length; i += size) {
    const sliceIt = arr.slice(i, i + size);
    newArr.push(sliceIt);
  }
  return newArr;
};

export const isEmpty = (arr: Array<any> | string) => {
  if (arr.length === 0) {
    return true;
  }
  return false;
};

export const isObjEmpty = (obj: { [key: string]: any }) => {
  for (let key in obj) {
    if (obj[key] !== undefined) {
      return false;
    }
  }
  return true;
};
