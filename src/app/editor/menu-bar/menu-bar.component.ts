import { Component, ElementRef, ViewChild } from '@angular/core';
import { cursor } from 'src/app/core/cursor';
import { writter } from 'src/app/core/writer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {
  constructor(private data: DataService) {}
  async pasteText() {
    const data = await navigator.clipboard.readText();
    // writer.insertChar(data, cursor.ln.getValue(), cursor.col.getValue());
  }
  onFilePickerChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.data.files.next([...this.data.files.getValue(), file]);
    }
  }
  onFolderPickerChange(e: any) {
    const files = e.target.files;
    this.data.files.next(files);
  }
}
