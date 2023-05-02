const fs = require('fs');
const path =  require("path")

const calculateSum = set => set.reduce((a, b) => a + b, 0);

const createRange = Array.from({length: 9}, (_, i) => i + 1);

const generateCombinations = (set, k) => {
  if (k > set.length || k <= 0) {
    return []
  }
  if (k === set.length) {
    return [set]
  }
  if (k === 1) {
    return set.reduce((acc, cur) => [...acc, [cur]], [])
  }
  let combs = [], tail_combs = []
  for (let i = 0; i <= set.length - k + 1; i++) {
    tail_combs = generateCombinations(set.slice(i + 1), k - 1)
    for (let j = 0; j < tail_combs.length; j++) {
      combs.push([set[i], ...tail_combs[j]])
    }
  }
  return combs
}

const options = [];
for (let i = 2; i <= 8; i++) {
  generateCombinations(createRange, i).forEach(x => {
    options.push({
      size: x.length,
      sum: calculateSum(x),
      value: x.join('-'),
      items: x,
    })
  })
}
fs.writeFile(
  path.resolve(__dirname, '../public/data/combinations.json'),
  JSON.stringify(options),
  (err) => { if (err) { throw err } console.log('Data written to file'); }
);
fs.writeFile(
  path.resolve(__dirname, '../public/data/combinations.pretty.json'),
  JSON.stringify(options, null, 2),
  (err) => { if (err) { throw err } console.log('Data written to file'); }
);
