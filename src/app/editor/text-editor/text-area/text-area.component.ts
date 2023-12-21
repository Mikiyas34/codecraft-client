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
import { DataService } from 'src/app/services/data.service';

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
  constructor(private data: DataService) {}
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

  ngOnInit(): void {
    this.data.activeFile.subscribe((file) => {
      writer.clearAll();
      const reader = new FileReader();
      reader.onload = (e) => {
        writer.writeText(e.target?.result as string);
      };
      reader.readAsText(file!);
    });
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    // if (!e.target.classList.contains('char')) {
    //   this.focused = true;
    //   return;
    // }
    this.focused = true;
    if (e.target.classList.contains('char')) {
      const cursorPos = writer.getCharPos(e.target);
      cursor.moveTo(cursorPos.ln, cursorPos.col);
      this.activateLine(cursorPos.ln);
    } else if (e.target.classList.contains('ln')) {
      const lineNum = writer.getLineNumFromElem(e.target);
      cursor.moveTo(lineNum, 4);
      this.activateLine(lineNum);
    }
  }

  activateLine(ln: number) {
    for (let i = 0; i < writer.linesCount(); i++) {
      writer.getLine(i)?.classList.remove('active');
    }
    const line = writer.getLine(ln);
    line?.classList.add('active');
  }
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: any) {
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
        writer.insertChar(e.key, cursor.ln, cursor.col + 1);
    }
  }
}
