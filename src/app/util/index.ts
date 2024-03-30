export function convertTextToArray(text: string) {
  text = text.replaceAll('\n', ' \n ');
  const text_arr = [];
  let curr_word = '';
  for (let char of text) {
    if (char == ' ') {
      if (curr_word.length > 0) {
        text_arr.push(curr_word);
      }
      text_arr.push('&nbsp;');
      curr_word = '';
    } else {
      // console.log(char, ' is not a space');
      curr_word = curr_word.concat(char);
    }
  }
  text_arr.push(curr_word);
  return text_arr;
}

export function createElem(
  tagname: string,
  className?: string | null,
  content?: string
): HTMLElement {
  const elem = document.createElement(tagname);
  if (content) {
    elem.innerHTML = content;
  }
  if (className) {
    elem.classList.add(className);
  }
  return elem;
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

export function getIndexOfText(
  text: string,
  viewLine: HTMLElement,
  x: number
): number {
  return 4;
}

export function modifyTextByIndex(
  text: string,
  add: string,
  index: number
): string {
  // const index = getIndexOfText(text, null, i)
  // text = ""
  return 'hello';
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

export function getFileExtension(file: File) {
  let fileName = file.name;
  let extIndex = fileName.lastIndexOf('.');
  let ext = fileName.slice(extIndex + 1, fileName.length);
  return ext;
}

export function getFileIconPath(fileExtension: string): string {
  // let path: string = (icons.iconDefinitions as any)[name].iconPath;
  // if (!path || path == '' || path == undefined) {
  //   path = (icons.iconDefinitions as any)['file'].iconPath;
  // }
  // console.log('iconpath', path);
  // // return "assets" + "/"  + path.slice(4, path.length)
  return 'assets/file-icon.svg';
}
