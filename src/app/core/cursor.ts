import { getIndexOfElem, placeByIndex } from '../util';
import { ICursor } from './cursor.d';
import { writer } from './writer';
const cursorElem = document.createElement('span');
cursorElem.classList.add('cursor');
export const cursor: ICursor = {
  elem: null,
  cursorElem: cursorElem,
  ln: 0,
  col: 0,

  moveTo: function (ln: number, col: number): void {
    this.ln = ln;
    this.col = col;
    const line = writer.getLine(ln);
    cursorElem.remove();
    const charElem = writer.getChar(ln, col);
    if (charElem?.parentElement?.classList.contains('word')) {
      const parentWord = charElem.parentElement;
      const index = getIndexOfElem(parentWord, charElem);
      placeByIndex(parentWord, cursorElem, index);
    }
    // placeByIndex(line!, cursorElem, col);
  },
  hide() {
    this.elem!.style.display = 'none';
  },
  show() {
    this.elem!.style.display = 'block';
  },
};
