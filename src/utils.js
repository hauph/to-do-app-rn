export const Utils = {
  isNullOrUndefined(arg) {
    if (arg !== undefined && arg !== null) {
      return false;
    }

    return true;
  },
  removeEmptyItemInArray(arr) {
    const newArr = arr.reduce((array, item) => {
      if (!this.isNullOrUndefined(item)) {
        array.push(item);
      }

      return array;
    }, []);

    return newArr;
  },
};
