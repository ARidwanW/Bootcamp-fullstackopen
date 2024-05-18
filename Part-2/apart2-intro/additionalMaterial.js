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
// import Promise from "bluebird";

// const whenDragonLoaded = new Promise((resolve, reject) => {
//   // fake loading
//   setTimeout(() => {
//     resolve([{ name: "Fluffykins", health: 70 }]);
//   }, 2000);
// });

// const names = whenDragonLoaded
//   .map((dragon) => dragon.name)
//   .then((name) => console.log(name));

// console.log(names);

//* ========== some useful things 6 ==========
//! basic promises
// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(console.log("done"));
//   }, 1000);
// });

// console.log(promise);

//* ========== some useful things 7 ==========
//?? before promises (just example, doesnt work if it run)
// let addImg = (src) => {
//   let imgElement = document.createElement("img");
//   imgElement.src = src;
//   document.body.appendChild(imgElement);
// };

// const loadImage = (url, callback) => {
//   let image = new Image();

//   image.onload = () => {
//     callback(null, image);
//   };

//   image.onerror = () => {
//     let message = "Could not load image at " + url;
//     callback(new Error(message));
//   };

//   image.src = url;
// };

// export default loadImage

// // url, callbackFn(error, img)
// loadImage("", (error, img1) => {
//   if (error) throw error;
//   addImg(img1.src);
//   loadImage("", (error, img2) => {
//     if (error) throw error;
//     addImg(img2.src);
//     loadImage("", (error, img3) => {
//       if (error) throw error;
//       addImg(img3.src);
//     });
//   });
// });

//* ========== some useful things 8 ==========
//?? after promises
let addImg = (src) => {
  let imgElement = document.createElement("img");
  imgElement.src = src;
  document.body.appendChild(imgElement);
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      let message = "Could not loead image at " + url;
      reject(new Error(msg));
    };

    image.src = url;
  });
};

export default loadImage;

// loadImage("url").then((img1) => {
//   addImg(img1.src);
//   loadImage("url").then((img2) => {
//     addImg(img2.src);
//     loadImage("url").then((img3) => {
//       addImg(img3.src);
//     });
//   });
// });

//?? because using promises
Promise.all([loadImage("url"), loadImage("url"), loadImage("url")]).then(
  (images) => {
    console.log(images);
    images.forEach((img) => addImg(img.src));
  }
);
