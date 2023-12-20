import {
  AfterContentInit,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { cursor } from 'src/app/core/cursor';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements AfterContentInit, OnChanges {
  Ln: number = cursor.ln;
  Col: number = cursor.col;
  ngAfterContentInit(): void {
    console.log(cursor.ln, cursor.col);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('fjs');
  }
}
