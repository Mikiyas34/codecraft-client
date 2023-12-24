import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  createComponent,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { writer } from 'src/app/core/writer';
import { DataService } from 'src/app/services/data.service';
import { FolderComponent } from './folder/folder.component';
import { AppComponent } from 'src/app/app.component';
import { Folder } from './folder';
import { FileElement } from './file-elem';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  // standalone: true,
})
export class FileExplorerComponent implements OnInit, AfterViewInit {
  files: File[] = [];
  folders: Folder[] = [];
  activeFile?: File | null;
  @ViewChild('host') host?: ElementRef;
  constructor(private data: DataService) {}
  async ngOnInit() {
    this.data.files.subscribe((files) => {
      this.files = files;
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
    // applicationRef.attachView(compRef.hostView);
  }
  ngAfterViewInit(): void {
    const folder1 = new Folder('bob');
    folder1.addElem(new FileElement('file.txt').getElem());
    folder1.addElem(new FileElement('file1.txt').getElem());
    folder1.addElem(new FileElement('file2.txt').getElem());
    const folder2 = new Folder('tot');
    folder2.addElem(new FileElement('bob.js').getElem());
    folder2.addElem(new FileElement('rb.js').getElem());
    folder2.addElem(new FileElement('4ob.js').getElem());
    folder1.addElem(folder2.getElem());
    this.host?.nativeElement.append(folder1.getElem());
  }

  addNewFolder() {
    const folder = new Folder('untitled');
    this.host?.nativeElement.appendChild(folder.getElem());
    this.folders.push(folder);
  }

  addNewFile() {
    const file = new FileElement('file.txt');
    this.host?.nativeElement.appendChild(file.getElem());
  }
  collapseFolders() {
    this.folders.forEach((folder) => {
      folder.closeFolder();
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

let prevFolder: HTMLElement;
function listFiles(folder: any) {
  const folderElem = document.createElement('div');
  if (prevFolder) {
    prevFolder.appendChild(folderElem);
  }
  prevFolder = folderElem;
  for (let content of folder.contents) {
    if (content.type == 'file') {
      const fileElem = document.createElement('div');
      fileElem.textContent = content.name;
      folderElem.appendChild(fileElem);
    } else {
      listFiles(content);
    }
  }
}
