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
  }

  updateLine(text: string, ln: number) {
    const line = this.getLine(ln + 1);
    if (!line) {
      return;
    }

    this.removeLineContent(line as HTMLElement);
    text = text.replaceAll(' ', '&nbsp;');
    text = text.replaceAll('&nbsp;', ' &nbsp; ');
    const words = text.split(' ');
    words.forEach((word) => {
      const wordElem = createElem('span', '', word);
      line.appendChild(wordElem);
    });
  }
  removeLineContent(line: HTMLElement) {
    for (let i = 0; i < line?.children.length; i) {
      const child = line.children[i];
      child.remove();
    }
  }
  insertChar(char: string, ln: number, col: number) {
    const line = this.getLine(ln + 1);
    const text = this.extractLineText(line!);
    const newText = this.insertCharByIndex(text, char, col);
    this.updateLine(newText, ln);
  }

  private extractLineText(line: Element) {
    let lineText = '';
    for (let i = 0; i < line!.children.length; i++) {
      const child = line?.children[i];
      lineText = lineText.concat(child?.textContent || '');
    }
    return lineText;
  }

  insertLine(text: string, ln: number) {
    const lineElem = createElem('div', 'view-line');
    text = text.replaceAll(' ', '&nbsp;');
    text = text.replaceAll('&nbsp;', ' &nbsp; ');
    const words = text.split(' ');
    words.forEach((word) => {
      const wordElem = createElem('span', '', word);
      lineElem.appendChild(wordElem);
    });
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
