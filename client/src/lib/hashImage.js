import { encode } from "blurhash";

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};
const data = encodeImageToBlurhash(
  "https://firebasestorage.googleapis.com/v0/b/chat-a…=media&token=5356020d-5c95-41f6-8212-ed4ca0c098b0', rename: 'cb293f0f-5a63-4f45-83c2-c4b7beed95bd"
);
console.log(data);
