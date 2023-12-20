export interface ICursor {
  elem: HTMLElement | null;
  cursorElem: HTMLElement | null;
  ln: number;
  col: number;
  moveTo(ln: number, col: number): void;
  hide(): void;
  show(): void;
}
