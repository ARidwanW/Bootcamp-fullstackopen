//* ========== some useful things 1 ==========

const categories = [
  { id: "animals", parent: null },
  { id: "mammals", parent: "animals" },
  { id: "cats", parent: "mammals" },
  { id: "dogs", parent: "mammals" },
  { id: "cihuahua", parent: "dogs" },
  { id: "labrador", parent: "dogs" },
  { id: "persian", parent: "cats" },
  { id: "siamese", parent: "cats" },
];

//?? transform to this
// {
//   animals: {
//     mammals: {
//       dogs: {
//         cihuahua: null
//         labrador: null
//       }
//       cats: {
//         persian: null
//         siamese: null
//       }
//     }
//   }
// }

//?? using of recursion instead of loops
// console.log(categories, "\n");
// console.log("Making Tree\n");

const makeTree = (categories, parent) => {
  const node = {};
  categories
    .filter((c) => c.parent === parent)
    .forEach((c) => (node[c.id] = makeTree(categories, c.id)));

  //?? see it here
  // console.log(node);

  return node;
};

// makeTree(categories, null);

// console.log(JSON.stringify(makeTree(categories, null), null, 2));

//* ========== some useful things 2 ==========

const plus1 = (value) => {
  if (Array.isArray(value)) {
    const newArray = [];
    for (let i = 0; i < value.length; i++) {
      newArray[i] = value[i] + 1;
    }
    return newArray;
  }

  if (typeof value === "string") {
    const chars = value.split("");
    const newCharArray = [];
    for (let i = 0; i < chars.length; i++) {
      newCharArray[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
    }
    return newCharArray.join("");
  }
  return value + 1;
};

//?? call it
// console.log(plus1(3));
// console.log(plus1([1, 4]));
// console.log(plus1("ABC"));

//?? functors
const plus2 = (value) => {
  return value + 2;
};

//?? the how it works
// console.log([3, 4].map(plus2));

//* ========== some useful things 3 ==========
const stringFunctor = (value, fn) => {
  const chars = value.split("");
  return chars
    .map((char) => {
      return String.fromCharCode(fn(char.charCodeAt(0)));
    })
    .join("");
};

const plus3 = (value) => {
  return value + 3;
};

const minus1 = (value) => {
  return value - 1;
};

// console.log([3,4].map(plus3));
// console.log(stringFunctor("ABC", plus3));
// console.log(stringFunctor("XYZ", minus1));

//* ========== some useful things 4 ==========
//! what functors really are
//?? object that can implemented "map" function

const dragons = [
  { name: "Fluffykins", health: 80 },
  { name: "Deathlord", health: 9999999999 },
  { name: "Littlely", health: 3 },
];

// const names = dragons.map((dragon, index) => dragon.name)

// console.log(JSON.stringify(names, null, 2));

//* ========== some useful things 5 ==========
import Promise from "bluebird";

const whenDragonLoaded = new Promise((resolve, reject) => {
  // fake loading
  setTimeout(() => {
    resolve([{ name: "Fluffykins", health: 70 }]);
  }, 2000);
});

const names = whenDragonLoaded
  .map((dragon) => dragon.name)
  .then((name) => console.log(name));

console.log(names);
