//* some useful things

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
console.log(categories, "\n");
console.log("Making Tree\n");

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

console.log(JSON.stringify(makeTree(categories, null), null, 2));
