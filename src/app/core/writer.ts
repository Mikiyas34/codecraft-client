import {
  convertTextToArray,
  placeByIndex,
  getIndexOfElem,
  createElem,
} from '../util';
import { cursor } from './cursor';

class Writter {
  textarea?: HTMLElement;
  lineNumbers?: HTMLElement;
  constructor() {}
  configure(textArea: HTMLElement, lineNumbers: HTMLElement) {
    this.textarea = textArea;
    this.lineNumbers = lineNumbers;

    document.addEventListener('keydown', (e) => {
      console.log(e.code);
      switch (e.code) {
        case 'ArrowRight':
          cursor.moveToLeft();
          break;
      }
    });
  }

  writeFromText(text: string) {
    const text_arr = convertTextToArray(text);
    console.log(text_arr);
    let curr_line: HTMLElement;
    let lineCount: number = 1;
    text_arr.forEach((word) => {
      //if there's no line create the first line
      if (!curr_line) {
        curr_line = createElem('div', 'view-line');
        curr_line.appendChild(createElem('span', 'mtk1', word));
        this.textarea?.appendChild(curr_line);
        const lineNumElem = createElem(
          'div',
          'line-number',
          lineCount.toString()
        );
        lineCount += 1;
        this.lineNumbers?.appendChild(lineNumElem);
      } else if (curr_line && word != '\n') {
        curr_line.appendChild(createElem('span', 'mtk1', word));
      } else {
        curr_line = createElem('div', 'view-line');
        this.textarea?.appendChild(curr_line);
        const lineNumElem = createElem(
          'div',
          'line-number',
          lineCount.toString()
        );
        lineCount += 1;
        this.lineNumbers?.appendChild(lineNumElem);
      }
    });
  }
}

export const writter = new Writter();
