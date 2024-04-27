// src/lib/utils/generate-small-id.ts
function generateId(length = 5) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    id += characters[randomNumber];
  }
  return id;
}

export {
  generateId
};
