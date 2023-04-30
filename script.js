const generateArray = (number = 5, negative = false) => {
  let ret = [];
  const array = new Uint32Array(number > 0 ? number : 5);
  self.crypto.getRandomValues(array);

  ret = Array.from(array);

  if (negative) {
    const random = new Uint32Array(ret.length);
    self.crypto.getRandomValues(random);

    Array.from(random).forEach((val, index) => {
      if (val % 2) {
        ret[index] *= -1;
      }
    });
  }

  return ret;
}

const findMinValueAtPosition = (array = [], position = []) => {
  const temp = Array.from({length: Math.max(...position)}, () => Infinity);

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    for (let j = 0; j < temp.length; j++) {
      if (current < temp[j]) {
        for (let k = temp.length; k > j; k--) {
          temp[k] = temp[k - 1];
        }
        temp[j] = current;
        break;
      }
    }
  }

  return position.reduce((acc, val) => {
    if ((temp[val - 1] !== Infinity)) {
      acc[val] = temp[val - 1];
    }

    return acc;
  }, {});
}

const arr = generateArray(200, true);
const pos = [3, 5];
const str = `Time to find min values at ${pos.join(',')} positions`;

console.time(str);

console.log("Array", arr, "min values", findMinValueAtPosition(arr, pos));

console.timeEnd(str);
