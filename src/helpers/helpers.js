import { AES } from "crypto-js";

export const genereteCategoriesList = (categories) => {
  return categories
    ? [
        { value: 0, label: "Glavniy kategoriya" },
        ...categories?.map((item) => {
          return { value: item.id, label: item.name_uz };
        }),
      ]
    : [];
};

export const catchSelectedCategory = (list, id) => {
  const a = {};
  if (list) {
    for (const item of list) {
      if (item.id === id) {
        a.label = item.name_uz;
        a.value = item.id;
      }
    }
  }
  return a;
};

export const deleteProps = (obj, arr) => {
  const newObj = structuredClone(obj);
  for (const el in newObj) {
    if (arr.includes(el)) {
      delete newObj[el];
    } else {
      newObj[el] = obj[el];
    }
  }
  return newObj;
};
export function slugify(text) {
  const from = "áäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  const to = "aaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

  const newText = text
    .split("")
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    );
  return newText
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-y-")
    .replace(/[^\w\-]+/g, 11)
    .replace(/\-\-+/g);
}

export const getEncryptedCode = () => {
  return AES.encrypt(
      JSON.stringify({
          client: 'ecommerce',
          secret: 'gCosGwTqCNCpIoGnS28V7TfD2V0obDbPaJSY6LvmN7Lg0XPl5Rt6ne9vdbwL+Q',
          time: Date.now(),
      }),
      'G2DPdL0RN2ldSRuKpnWSRlfZrzBBEtc0qhZ+xQaRjjdTZdV89bausl1KR6l1SkqY'
  ).toString()
}
