import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Terminal } from 'xterm';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PanelComponent implements AfterViewInit {
  @ViewChild('terminal') terminalElem?: ElementRef;
  ngAfterViewInit(): void {
    const terminal = new Terminal();
    terminal.open(this.terminalElem?.nativeElement);
    terminal.writeln('hello');
  }
}
