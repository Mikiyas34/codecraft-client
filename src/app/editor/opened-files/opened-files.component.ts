import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {getFileIconPath, getFileExtension} from "../../util/"
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
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
  }
  setActiveFile(file: File) {
    this.data.activeFile.next(file);
  }
  getFileIcon(file:File){
    return getFileIconPath(getFileExtension(file))
  }
  closeFile(file: File) {
    const newOpenedFilesArray: File[] = [];
    const oldOpenedFilesArray = this.data.openedFiles.getValue();
    oldOpenedFilesArray.forEach((f) => {
      if (f != file) {
        newOpenedFilesArray.push(f);
      }
    });
    if (newOpenedFilesArray.length > 0) {
      this.data.activeFile.next(newOpenedFilesArray[0]);
    }
    this.data.openedFiles.next(newOpenedFilesArray);
  }
}
