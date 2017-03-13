export function rando(max) {
  let min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomChars(){
	return Math.random().toString(36).substring(7);
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    // .replace(/-+$/, '');            // Trim - from end of text
}

export function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

export function isInArray(arr,obj) {
    return (arr.indexOf(obj) != -1);
}