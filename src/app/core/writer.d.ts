export interface IWriter {
  elem: Element | null;
  getText(
    startLn: number,
    startCol: number,
    endLn: number,
    endCol: number
  ): string;
  insertChar(char: string, ln: number, col: number): void;
  insertWord(text: string, ln: number, col: number): void;
  find(text: string): void;
  writeText(text: string): void;
  createChar(char: string): HTMLElement;
  createWord(word: string): HTMLElement;
  createLine(space?: boolean, after?: number): HTMLElement;
  deleteLine(ln: number): void;
  removeChar(ln: number, col: number): void;
  linesCount(): number;
  getLine(ln: number): HTMLElement | null | undefined;
  getChar(ln: number, col: number): HTMLElement | null | undefined;
  getCharPos(char: HTMLElement): { ln: number; col: number };
}
