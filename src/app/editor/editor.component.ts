import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit {
  constructor(private data: DataService) {}
  ngOnInit(): void {}
}
