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
// let addImg = (src) => {
//   let imgElement = document.createElement("img");
//   imgElement.src = src;
//   document.body.appendChild(imgElement);
// };

// const loadImage = (url) => {
//   return new Promise((resolve, reject) => {
//     let image = new Image();

//     image.onload = () => {
//       resolve(image);
//     };

//     image.onerror = () => {
//       let message = "Could not loead image at " + url;
//       reject(new Error(msg));
//     };

//     image.src = url;
//   });
// };

// export default loadImage;

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
// Promise.all([loadImage("url"), loadImage("url"), loadImage("url")]).then(
//   (images) => {
//     console.log(images);
//     images.forEach((img) => addImg(img.src));
//   }
// );

//* ========== some useful things 9 ==========
//! streams

// const stupidNumberStream = {
//   each: (callback) => {
//     setTimeout(() => callback(1), 1000);
//     setTimeout(() => callback(2), 1000);
//     setTimeout(() => callback(3), 1000);
//   },
// };

// stupidNumberStream.each(console.log)

import * as fs from "fs";
import highland from "highland";

// highland(fs.createReadStream("customers.csv", "utf8"))
//   .split() //! make the lines not a one big strings (try to comment if you want to see it)
//   .map((line) => line.split(","))
//   .map((parts) => ({
//     //! interpreted this as an object using (())
//     name: parts[0],
//     numPurchases: parts[1],
//   }))
//   .filter((customer) => customer.numPurchases > 2)
//   .map((customer) => customer.name)
//   .each((x) => console.log("each: ", x));

//* ========== some useful things 10 ==========
//! Monad -> functors that implement flatmap

// highland(["cat", "meal", "trumpet"]).each((word) => console.log(word));
// const stream = highland();
// stream.each(word => console.log(word))
// stream.write('cat')
// stream.write('meal')
// stream.write('trumpet')

// const Bacon = require('baconjs');
// const stream = new Bacon.Bus();
// import {Bus} from 'baconjs';
// const stream = new Bus();

// stream.onValue((word) => console.log(word));
//* stream is functors
// stream.map(word => word.toUpperCase()).onValue(word => console.log(word))

// stream.push("cat");
// stream.push("meal");
// stream.push("trumpet");

//! just example
import fetch from "node-fetch";
import { Bus, fromPromise } from "baconjs";

const getInPortuguese = (word) => {
  const apiKey = "";
  const url =
    "https://www.googleapis.com" +
    "/language/translate/v2" +
    "?key=" +
    apiKey +
    "&source=en" +
    "&target=pt" +
    "&q=" +
    encodeURIComponent(word);
  const promise = fetch(url)
    .then((response) => response.json())
    .then(
      (parsedResponse) => parsedResponse.data.translation[0].translatedText
    );
  console.log(promise);
  const stream = fromPromise(promise);
  console.log(stream);
  return stream;
};

// getInPortuguese('meal').onValue(word => console.log(word)) // output: refeicao (in portugese)
const stream = Bus();

stream
  .map((word) => getInPortuguese(word))
  .onValue((word) => console.log(word)); // output: Bacon.fromPomise({})
// output: Bacon.fromPomise({})
// output: Bacon.fromPomise({})

stream
  .flatMap((word) => getInPortuguese(word)) // same as bind or chain, then can add map after flatmap
  .onValue((word) => console.log(word));  // output: gato
  // refeicao
  // trombeta

stream.push("cat");
stream.push("meal");
stream.push("trumpet");
