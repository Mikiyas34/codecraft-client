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
        // how hi are you
      }
    });
  }

  writeLine(text: string, ln: number, col: number) {
    const line = this.getLine(ln);
    let lineText = this.extractLineText(line);
    console.log('text: ', text);
    let newText = this.insertStrByIndex(lineText, col, text);
    console.log('newtext: ', newText);
    const text_arr = convertTextToArray(newText);
    console.log(text_arr);
    this.removeChildrenofAnElement(line);
    for (let i = 0; i < text_arr.length; i++) {
      const char = text_arr[i];
      console.log(char);
      const wordElem = createElem('span', '', char);
      line?.appendChild(wordElem);
    }
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
    console.log('newnewText: ', newText);
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

  writeFromText(text: string) {
    // const languageFeature = language_features.find((lf) =>
    //   lf.languages.includes(getFileExtension(activeFile))
    // );

    const text_arr = convertTextToArray(
      text
      // languageFeature?.separateTexts || []
    );
    let curr_line: HTMLElement | null = null;
    let lineCount: number = 1;
    for (let i = 0; i < text_arr.length; i++) {
      const word = text_arr[i];
      //if there's no line create the first line
      if (!curr_line) {
        curr_line = createElem('div', 'view-line');
        // const prevWord = text_arr[i - 1];
        // const nextWord = text_arr[i + 1];
        curr_line.appendChild(createElem('span', '', word));
        this.textarea?.appendChild(curr_line);
        const lineNumElem = createElem(
          'div',
          'line-number',
          lineCount.toString()
        );
        lineCount += 1;
        this.lineNumbers?.appendChild(lineNumElem);
      } else if (curr_line && word != '\n') {
        // let prevWord = text_arr[i - 1];
        // let j = 1;
        // while (prevWord == '&nbsp;') {
        //   prevWord = text_arr[i - j];
        //   j++;
        // }
        // let nextWord = text_arr[i + 1];
        // j = 1;
        // while (nextWord == '&nbsp;') {
        //   nextWord = text_arr[i + j];
        //   j++;
        // }
        curr_line.appendChild(
          createElem(
            'span',
            '',
            // languageFeature?.getClassName(word, prevWord, nextWord),
            word
          )
        );
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
    }
  }
  insertChar(char: string, ln: number, col: number) {
    const line = this.getLine(ln);
    let charElem = line?.children.item(col);
    console.log(charElem);
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
