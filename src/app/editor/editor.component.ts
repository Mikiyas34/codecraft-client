import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { writer } from '../core/writer';
import { getFileExtension } from '../util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit, AfterViewInit {
  activatedLanguageFeatures: any[] = [];
  commandPalette: boolean = false;
  @ViewChild('commandPalette') commandPaletteElem?: ElementRef;
  constructor(
    private data: DataService,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000').subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
  ngAfterViewInit(): void {
    this.renderer.listen(document, 'mousedown', (e) => {
      const commandPaletteElem = this.commandPaletteElem?.nativeElement;
      console.log(commandPaletteElem);
      if (commandPaletteElem && !commandPaletteElem.contains(e.target)) {
        this.commandPalette = false;
      }
    });
    this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code == 'KeyP') {
        e.preventDefault();
        this.commandPalette = true;
      }
    });
  }
}
