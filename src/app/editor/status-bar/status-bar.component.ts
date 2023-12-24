import {
  AfterContentInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { cursor } from 'src/app/core/cursor';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnInit {
  Ln?: number;
  Col?: number;
  ngOnInit(): void {
    cursor.col.subscribe((col) => {
      this.Col = col;
    });
    cursor.ln.subscribe((ln) => {
      this.Ln = ln;
    });
  }
}
