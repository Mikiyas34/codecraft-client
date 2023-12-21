import { Component, OnInit } from '@angular/core';
import { writer } from 'src/app/core/writer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit {
  files: File[] = [];
  activeFile?: File | null;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.files.subscribe((files) => {
      this.files = files;
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
  }
  openFile(file: File) {
    const openedFiles = this.data.openedFiles.getValue();
    if (openedFiles.includes(file)) {
      this.data.activeFile.next(file);
    } else {
      this.data.openedFiles.next([...this.data.openedFiles.getValue(), file]);
      this.data.activeFile.next(file);
    }
  }
}
