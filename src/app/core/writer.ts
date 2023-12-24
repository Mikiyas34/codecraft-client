import { convertTextToArray, placeByIndex, getIndexOfElem } from '../util';
import { cursor } from './cursor';
import { IWriter } from './writer.d';
export const writer: IWriter = {
  elem: null,
  getText: function (
    startLn: number,
    startCol: number,
    endLn: number,
    endCol: number
  ): string {
    throw new Error('Function not implemented.');
  },
  insertChar: function (char: string, ln: number, col: number): void {
    const line = this.getLine(ln);
    const charElem = this.createChar(char);
    const prevChar = this.getChar(ln, col);
    if (prevChar?.parentElement?.classList.contains('word')) {
      const parentWord = prevChar.parentElement;
      const index = getIndexOfElem(parentWord, prevChar);
      placeByIndex(parentWord, charElem, index);
      cursor.moveTo(ln, col);
    } else {
      line?.appendChild(charElem);
      cursor.moveTo(cursor.ln.getValue(), cursor.col.getValue() + 1);
    }
  },
  writeText(text: string) {
    if (this.linesCount() < 1) {
      this.createLine(false);
    }
    const text_arr = convertTextToArray(text);
    let currInsertionLine = 0;
    text_arr.forEach((word) => {
      if (word == '\t') {
        const space = this.createChar(' ');
        this.getLine(currInsertionLine)?.appendChild(space);
      } else if (word == '\n') {
        this.createLine(false);
        currInsertionLine++;
      } else {
        this.insertWord(word, currInsertionLine, 1);
      }
    });
  },
  insertWord: function (text: string, ln: number, col: number): void {
    const keywords = ['const', '=', 'let', 'function'];
    const word = this.createWord(text);
    if (keywords.includes(text)) {
      word.classList.add('keyword');
    }
    if (text.startsWith("'") || text.startsWith('"')) {
      word.classList.add('string');
    }
    const line = this.getLine(ln);
    line?.appendChild(word);
  },
  removeChar(ln: number, col: number) {
    const char = this.getChar(ln, col);
    char?.remove();
  },
  getLine(ln: number): HTMLElement | null | undefined {
    const linesElem = this.elem?.getElementsByClassName('lines').item(0);
    const line = linesElem?.getElementsByClassName('ln').item(ln);
    return line as HTMLElement;
  },
  getChar(ln: number, col: number): HTMLElement | null | undefined {
    const line = this.getLine(ln);
    const chars = line?.getElementsByClassName('char');
    return chars?.item(col) as HTMLElement;
  },
  find: function (text: string): void {
    throw new Error('Function not implemented.');
  },
  createChar: function (char: string): HTMLElement {
    const charElem = document.createElement('span');
    charElem.id = `${Math.random()}-${Math.random()}`;
    if (char == ' ') {
      charElem.classList.add('char');
      charElem.classList.add('space');
      charElem.style.marginInline = '.2rem';
    } else {
      charElem.textContent = char;
      charElem.classList.add('char');
    }
    return charElem;
  },
  createWord: function (word: string): HTMLElement {
    const wordElem = document.createElement('span');
    wordElem.classList.add('word');
    for (let c of word) {
      const char = this.createChar(c);
      wordElem.appendChild(char);
    }
    return wordElem;
  },
  createLine: function (space?: boolean, after?: number): HTMLElement {
    const line = document.createElement('div');
    line.classList.add('ln');
    const lines = this.elem?.querySelector('.lines');
    const spaceElem = this.createChar(' ');
    if (after) {
      placeByIndex(lines as HTMLElement, line, after);
    } else {
      if (space) {
        line.appendChild(spaceElem);
      }
      lines?.appendChild(line);
    }
    return line;
  },
  linesCount(): number {
    const lines = this.elem?.querySelector('.lines');
    return lines?.querySelectorAll('.ln').length || 0;
  },
  deleteLine: function (ln: number): void {
    throw new Error('Function not implemented.');
  },
  getCharPos(char: HTMLElement): { ln: number; col: number } {
    const parent = char.parentElement;
    let Ln: number = 0;
    let Col: number = 0;
    if (parent?.classList.contains('word')) {
      const char_line = parent.parentElement;
      const linesElem = this.elem?.getElementsByClassName('lines').item(0);
      const lines = linesElem?.getElementsByClassName('ln');
      for (let i = 0; i < lines!.length - 1; i++) {
        const line = lines?.item(i);
        if (line?.isEqualNode(char_line)) {
          Ln = i;
          const chars = line.getElementsByClassName('char');
          for (let j = 0; j < chars.length - 1; j++) {
            const charElem = chars[j];
            if (charElem.isEqualNode(char)) {
              Col = j;
            }
          }
          break;
        }
      }
    }
    return { ln: Ln, col: Col };
  },
  clearAll() {
    const linesElem = this.elem?.querySelector('.lines');
    const newLinesElem = linesElem?.cloneNode();
    linesElem?.remove();
    this.elem?.appendChild(newLinesElem!);
  },
  getLineNumFromElem(elem: HTMLElement): number {
    const linesElem = this.elem?.querySelector('.lines');
    for (let i = 0; i < linesElem!.children.length; i++) {
      const line = linesElem?.children.item(i);
      if (line?.isSameNode(elem)) {
        return i;
      }
    }
    return -1;
  },
};
