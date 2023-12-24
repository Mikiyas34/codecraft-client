import { BehaviorSubject } from 'rxjs';

export interface ICursor {
  elem: HTMLElement | null;
  cursorElem: HTMLElement | null;
  ln: BehaviorSubject<number>;
  col: BehaviorSubject<number>;
  moveTo(ln: number, col: number): void;
  hide(): void;
  show(): void;
  removeCursors(): void;
}
