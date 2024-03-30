import { BehaviorSubject } from 'rxjs';
import { createElem, getIndexOfElem, placeByIndex } from '../util';
import { writer } from './writer';

class Cursor {
  cursorElem?: HTMLElement;
  ln = new BehaviorSubject<number>(1);
  col = new BehaviorSubject<number>(1);
  constructor() {
    this.cursorElem = createElem('div', 'cursor');
  }
  configure(textarea: HTMLElement) {
    const rect = textarea.getBoundingClientRect();
    const rect2 = textarea.getBoundingClientRect();
    textarea.appendChild(this.cursorElem!);
    textarea.addEventListener('mousedown', (e) => {
      this.cursorElem!.style.left = e.clientX - rect.left - 15 + 'px';
      textarea.querySelectorAll('.view-line').forEach((line, i) => {
        if (line.contains(e.target as HTMLElement)) {
          console.log('line index: ', i);
          this.cursorElem!.style.top = (line as HTMLElement).offsetTop + 'px';
          this.ln.next(i + 1);
        }
      });
    });
  }
  moveTo(ln: number, col: number) {}
  moveToLeft() {
    let cursorLeft = parseInt(this.cursorElem?.style.left || '1');
    this.cursorElem!.style.left = cursorLeft + 7 + 'px';
  }
}

export const cursor = new Cursor();
