import {
  convertTextToArray,
  placeByIndex,
  getIndexOfElem,
  createElem,
  getFileExtension,
} from '../util';
import { cursor } from './cursor';

class Writer {
  textarea?: HTMLElement;
  lineNumbers?: HTMLElement;
  constructor() {}
  configure(textArea: HTMLElement, lineNumbers: HTMLElement) {
    this.textarea = textArea;
    this.lineNumbers = lineNumbers;

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowRight':
          cursor.moveToLeft();
          break;
      }
    });
  }

  updateLine(text: string, ln: number) {}
  insertChar(char: string, ln: number, col: number) {
    console.log('inserting char: ', char, ' at position ', ln + ':' + col);
  }
  private insertStrByIndex(dist: string, index: number, src: string) {
    let newText = '';
    for (let i = 0; i < dist.length; i++) {
      const char = dist[i];
      if (i == index) {
        newText = newText.concat(char);
        newText = newText.concat(src);
      } else {
        newText = newText.concat(char);
      }
    }
    return newText;
  }

  private extractLineText(line: Element | undefined) {
    let lineText = '';
    for (let i = 0; i < line!.children.length; i++) {
      const child = line?.children[i];
      lineText = lineText.concat(child?.textContent || '');
    }
    return lineText;
  }

  private removeChildrenofAnElement(elem: Element | undefined) {
    for (let i = 0; i < elem!.children.length; i) {
      elem?.children[i].remove();
    }
  }

  insertLine(text: string, ln: number) {
    text = text.replaceAll(' ', '&nbsp;');
    const lineElem = createElem('div', 'view-line', text);
    this.textarea?.appendChild(lineElem);
  }

  writeFromText(text: string) {
    const lines = text.split('\n');
    console.log(lines);
    let lineCount = 1;
    lines.forEach((line) => {
      this.insertLine(line, 0);
      this.lineNumbers?.appendChild(
        createElem('div', 'ln-num', `${lineCount}`)
      );
      lineCount++;
    });
  }

  getLineByCord(y: number) {
    const lines = this.textarea?.querySelectorAll('.view-line');
    return lines?.item(y);
    // 0 - 16
    let start = y;
    let end = y + 16;

    let linesCout = 20;
  }
  insertCharByIndex(str: string, char: string, index: number): string {
    let newStr = '';
    let i = 0;
    while (i < str.length) {
      if (i == index) {
        newStr = newStr.concat(char);
        newStr = newStr.concat(str[i]);
      } else {
        newStr = newStr.concat(str[i]);
      }
      i++;
    }
    return newStr;
  }
  getLine(ln: number) {
    const lines = this.textarea?.querySelectorAll('.view-line');
    return lines?.item(ln - 1);
  }
  clearAll() {
    for (let i = 0; i < this.textarea!.children.length; i) {
      this.textarea?.children.item(i)?.remove();
    }
  }

  private getChar(ln: number, col: number) {}
}

export const writer = new Writer();
