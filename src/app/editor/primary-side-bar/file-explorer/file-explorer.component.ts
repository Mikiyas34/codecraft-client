import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit {
  files: File[] = [];
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.files.subscribe((files) => {
      this.files = files;
    });
  }
  openFile(file: File) {
    const openedFiles = this.data.openedFiles.getValue();
    console.log('opened files', openedFiles);

    if (openedFiles.includes(file)) {
      console.log('file is open');
      this.data.activeFile.next(file);
    } else {
      console.log('file is not open');
      this.data.openedFiles.next([...this.data.openedFiles.getValue(), file]);
      this.data.activeFile.next(file);
      console.log('opened files', this.data.openedFiles.getValue());
    }
  }
}
