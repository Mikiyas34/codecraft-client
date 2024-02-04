import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { writter } from '../core/writer';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit, AfterViewInit {
  constructor(private data: DataService, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000').subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngAfterViewInit(): void {
    // writter.writeFromText('Hello how is it going\ni am good');
  }
}
