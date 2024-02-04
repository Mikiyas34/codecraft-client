import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cursor } from 'src/app/core/cursor';
import { writter } from 'src/app/core/writer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  focused: boolean = false;
  @ViewChild('cursor') cursor?: ElementRef;
  @ViewChild('textArea') textArea?: ElementRef;
  @ViewChild('lineNumbers') lineNumbers?: ElementRef;
  @ViewChild('word') word?: ElementRef;
  openedFiles: File[] = [];
  constructor(private data: DataService, private http: HttpClient) {}
  ngAfterViewInit() {
    writter.configure(
      this.textArea?.nativeElement,
      this.lineNumbers?.nativeElement
    );
    cursor.configure(this.textArea?.nativeElement);
    let cursorOpacity = '0';
    setInterval(() => {
      cursorOpacity = cursorOpacity == '1' ? '0' : '1';
      cursor.cursorElem!.style.opacity = cursorOpacity;
    }, 500);
    this.data.activeFile.subscribe((file) => {
      // writer.clearAll();
      const reader = new FileReader();
      reader.onload = (e) => {
        writter.writeFromText(e.target?.result as string);
        // const linesElem = writer.elem?.querySelector('.lines');
        // linesElem?.childNodes.forEach((node: any) => {
        // this.lines.push(node);
        // });
      };
      reader.readAsText(file!);
    });
  }

  ngOnInit(): void {
    this.data.openedFiles.subscribe((files) => {
      this.openedFiles = files;
    });
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.focused = true;
    if (e.target.classList.contains('char')) {
      // const cursorPos = writer.getCharPos(e.target);
      // cursor.moveTo(cursorPos.ln, cursorPos.col);
      // this.activateLine(cursorPos.ln);
    } else if (e.target.classList.contains('ln')) {
      // const lineNum = writer.getLineNumFromElem(e.target);
      // cursor.moveTo(lineNum, 4);
      // this.activateLine(lineNum);
    }
  }

  activateLine(ln: number) {
    // for (let i = 0; i < writer.linesCount(); i++) {
    //   writer.getLine(i)?.classList.remove('active');
    // }
    // const line = writer.getLine(ln);
    // line?.classList.add('active');
  }
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: any) {
    if (!this.focused) {
      return;
    }
    let curr_word = '';
    switch (e.code) {
      case 'Space':
        // writer.insertChar(e.key, cursor.ln.getValue(), cursor.col.getValue());
        break;
      case 'Enter':
        // writer.createLine();
        break;
      case 'Backspace':
        // writer.removeChar(cursor.ln.getValue(), cursor.col.getValue());
        cursor.moveTo(cursor.ln.getValue(), cursor.col.getValue() - 1);
        break;
      case 'Delete':
        // writer.removeChar(cursor.ln.getValue(), cursor.col.getValue());
        cursor.moveTo(cursor.ln.getValue(), cursor.col.getValue());
        break;
      case 'ArrowRight':
        cursor.moveTo(cursor.ln.getValue(), cursor.col.getValue() + 1);
        break;
      case 'ArrowLeft':
        if (cursor.col.getValue() < 0) {
          cursor.moveTo(cursor.ln.getValue() - 1, cursor.col.getValue() + 1);
          return;
        }
        cursor.moveTo(cursor.ln.getValue(), cursor.col.getValue() - 1);
        break;
      case 'ArrowUp':
        // writer.getLine(cursor.ln.getValue())?.classList.remove('active');
        cursor.moveTo(cursor.ln.getValue() - 1, cursor.col.getValue());
        // writer.getLine(cursor.ln.getValue())?.classList.add('active');
        break;
      case 'ArrowDown':
        // writer.getLine(cursor.ln.getValue())?.classList.remove('active');
        cursor.moveTo(cursor.ln.getValue() + 1, cursor.col.getValue());
        // writer.getLine(cursor.ln.getValue())?.classList.add('active');
        break;
      default:
      // writer.insertChar(
      //   e.key,
      //   cursor.ln.getValue(),
      //   cursor.col.getValue() + 1
      // );
    }
  }
}
