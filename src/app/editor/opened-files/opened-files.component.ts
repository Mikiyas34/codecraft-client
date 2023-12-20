import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-opened-files',
  templateUrl: './opened-files.component.html',
  styleUrls: ['./opened-files.component.scss'],
})
export class OpenedFilesComponent implements OnInit {
  openedFiles: File[] = [];
  activeFile?: File | null;
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.openedFiles.subscribe((files) => {
      this.openedFiles = files;
      console.log('changes', files);
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
  }
  setActiveFile(file: File) {
    this.data.activeFile.next(file);
  }
  closeFile(file: File) {
    this.data.openedFiles.value.splice(this.openedFiles.indexOf(file));
  }
}
