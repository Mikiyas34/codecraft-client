import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextEditorComponent implements AfterViewInit {
  openedFiles: File[] = [];
  activeFile?: File | null;
  constructor(private data: DataService) {}
  ngAfterViewInit(): void {
    this.data.openedFiles.subscribe((files) => {
      this.openedFiles = files;
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
  }
}
