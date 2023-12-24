import { BehaviorSubject } from 'rxjs';
import { getIndexOfElem, placeByIndex } from '../util';
import { ICursor } from './cursor.d';
import { writer } from './writer';
const cursorElem = document.createElement('span');
cursorElem.classList.add('cursor');
export const cursor: ICursor = {
  elem: null,
  cursorElem: cursorElem,
  ln: new BehaviorSubject<number>(0),
  col: new BehaviorSubject<number>(0),

  moveTo: function (ln: number, col: number): void {
    this.ln.next(ln);
    this.col.next(col);
    this.removeCursors();
    const line = writer.getLine(ln);
    const charElem = writer.getChar(ln, col);
    if (charElem?.parentElement?.classList.contains('word')) {
      const parentWord = charElem.parentElement;
      const index = getIndexOfElem(parentWord, charElem);
      placeByIndex(parentWord, cursorElem, index + 1);
    } else {
      const index = getIndexOfElem(line!, charElem!);
      console.log('index of char: ', index);
      placeByIndex(line!, cursorElem, index + 1);
    }
    // placeByIndex(line!, cursorElem, col);
  },
  removeCursors() {
    const cursors = document.querySelectorAll('.cursor');
    while (cursors.length > 1) {
      cursors.item(0).remove();
    }
  },
  hide() {
    this.elem!.style.display = 'none';
  },
  show() {
    this.elem!.style.display = 'block';
  },
};
