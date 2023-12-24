export function convertTextToArray(text: string) {
  text = text.replaceAll('\n', ' \n ');
  const text_arr = [];
  let curr_word = '';
  for (let char of text) {
    if (char == ' ') {
      text_arr.push(curr_word);
      text_arr.push('\t');
      curr_word = '';
    } else {
      curr_word = curr_word.concat(char);
    }
  }
  text_arr.push(curr_word);
  return text_arr;
}

export function placeByIndex(
  parentElem: HTMLElement,
  elem: HTMLElement,
  index: number
) {
  const children = parentElem.children;
  const childCopy = [];
  for (let i = 0; i < children.length; i++) {
    childCopy.push(children.item(i)?.cloneNode(true));
  }

  for (let i = 0; i < children.length; i) {
    children.item(i)?.remove();
  }

  for (let i = 0; i < childCopy.length; i++) {
    if (index == i) {
      parentElem.appendChild(elem);
      parentElem.appendChild(childCopy[i]!);
    } else {
      parentElem.appendChild(childCopy[i]!);
    }
  }
}

export function getIndexOfElem(parent: HTMLElement, elem: HTMLElement) {
  const children = parent.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children.item(i).isSameNode(elem)) {
      return i;
    }
  }
  return -1;
}
