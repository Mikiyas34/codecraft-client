import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { cursor } from 'src/app/core/cursor';
import { writer } from 'src/app/core/writer';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  focused: boolean = false;
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('textArea') textArea?: ElementRef;
  @ViewChild('word') word?: ElementRef;

  ngAfterViewInit() {
    writer.elem = this.textArea?.nativeElement;
    cursor.elem = this.textArea?.nativeElement;
    let cursorOpacity = '0';
    setInterval(() => {
      cursorOpacity = cursorOpacity == '1' ? '0' : '1';
      cursor.cursorElem!.style.opacity = cursorOpacity;
    }, 500);
    const text = `const bob = 'hello';\nconsole.log(bob)\nlet t = bob\nfunction hello(){}`;
    writer.writeText(text);
  }

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onClick(e: any) {
    console.log('pos: ', writer.getCharPos(e.target));
    if (!e.target.classList.contains('char')) {
      this.focused = true;
      return;
    }
    this.focused = true;
    const cursorPos = writer.getCharPos(e.target);
    cursor.moveTo(cursorPos.ln, cursorPos.col);
    for (let i = 0; i < writer.linesCount(); i++) {
      writer.getLine(i)?.classList.remove('active');
    }
    const line = writer.getLine(cursorPos.ln);
    line?.classList.add('active');
    console.log(e.target);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: any) {
    console.log(e.code);
    if (!this.focused) {
      return;
    }
    let curr_word = '';
    switch (e.code) {
      case 'Space':
        writer.insertChar(e.key, cursor.ln, cursor.col);
        break;
      case 'Enter':
        writer.createLine();
        break;
      case 'Backspace':
        writer.removeChar(cursor.ln, cursor.col);
        cursor.moveTo(cursor.ln, cursor.col - 1);
        break;
      case 'Delete':
        writer.removeChar(cursor.ln, cursor.col);
        cursor.moveTo(cursor.ln, cursor.col);
        break;
      case 'ArrowRight':
        cursor.moveTo(cursor.ln, cursor.col + 1);
        break;
      case 'ArrowLeft':
        if (cursor.col < 0) {
          cursor.moveTo(cursor.ln - 1, cursor.col + 1);
          return;
        }
        cursor.moveTo(cursor.ln, cursor.col - 1);
        break;
      case 'ArrowUp':
        writer.getLine(cursor.ln)?.classList.remove('active');
        cursor.moveTo(cursor.ln - 1, cursor.col);
        writer.getLine(cursor.ln)?.classList.add('active');
        break;
      case 'ArrowDown':
        writer.getLine(cursor.ln)?.classList.remove('active');
        cursor.moveTo(cursor.ln + 1, cursor.col);
        writer.getLine(cursor.ln)?.classList.add('active');
        break;
      default:
        writer.insertChar(e.key, cursor.ln, cursor.col);
        cursor.moveTo(cursor.ln, cursor.col + 1);
        console.log(cursor.ln + ' ' + cursor.col);
    }
  }
}
