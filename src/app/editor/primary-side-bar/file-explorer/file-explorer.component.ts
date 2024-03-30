import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  createComponent,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Folder } from './folder';
import { FileElement } from './file-elem';
import { getFileExtension, getFileIconPath } from 'src/app/util';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  // standalone: true,
})
export class FileExplorerComponent implements OnInit, AfterViewInit {
  folders: Folder[] = [];
  activeFile?: File | null;
  selectedFileOrFolder?: FileElement | Folder;
  @ViewChild('host') host?: ElementRef;
  constructor(private data: DataService, private http: HttpClient) {}
  ngOnInit() {}
  async onFolderPickerChange(e: any) {
    if ('showDirectoryPicker' in window) {
      const handle = await (window as any).showDirectoryPicker();
      console.log(handle);
      new RegExp('hello', '\\A(?:\\xEF\\xBB\\xBF)?(?i:(?=\\s*@charset\\b))');
    } else {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true;
      fileInput.click();
    }
    // const files = e.target.files;
    // this.data.files.next(files);
    // console.log(e.target.files);

    //     this.http.post("localhost:3000/open-folder", {
    // // path: files[0].webkitRelativePath.slice(0, )
    //     })
  }
  ngAfterViewInit(): void {
    this.data.files.subscribe((files: File[]) => {
      const foldersPath = this.extractFolderPath(files);
      const folders = this.initFolders(foldersPath);
      this.folders = folders;
      this.addFiles(files, folders);
      const firstFolder = folders.find((f) => !f.path?.startsWith('/'));
      this.linkFolders(folders);
      if (firstFolder != undefined) {
        this.host?.nativeElement.append(firstFolder?.getElem());
      }
    });
    this.data.activeFile.subscribe((file) => {
      this.activeFile = file;
    });
  }

  addNewFolder() {
    const folder = new Folder('untitled');
    this.host?.nativeElement.appendChild(folder.getElem());
    this.folders.push(folder);
  }

  addNewFile() {
    const file = new FileElement('file.txt');
    file.file = new File([], 'untitled');
    file.onClick((file: File) => {
      const openedFiles = this.data.openedFiles.getValue();
      if (openedFiles.includes(file)) {
        this.data.activeFile.next(file);
      } else {
        this.data.openedFiles.next([...openedFiles, file]);
        this.data.activeFile.next(file);
      }
    });
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

  extractFolderPath(files: File[]) {
    let foldersPath: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = this.getParentPath(file.webkitRelativePath);
      if (!foldersPath.includes(path)) {
        foldersPath.push(path);
      }
    }

    return foldersPath;
  }
  initFolders(foldersPath: string[]) {
    let folders: Folder[] = [];
    foldersPath.forEach((path) => {
      let folder = folders.find((f) => f.path == path);
      if (!folder) {
        folder = new Folder(this.getNameFromPath(path), path);
        folders.push(folder);
      }
    });
    return folders;
  }

  linkFolders(folders: Folder[]) {
    folders.forEach((folder) => {
      let parentFolderPath = this.getParentPath(folder.path!);
      const parentFolder = folders.find((f) => f.path == parentFolderPath);
      if (parentFolder) {
        parentFolder.addElem(folder.getElem());
      }
    });
  }

  addFiles(files: File[], folders: Folder[]) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let fileExtension = getFileExtension(file);
      let iconPath = getFileIconPath(fileExtension);
      const fileElem = new FileElement(file.name, iconPath, file);
      fileElem.onClick((file: File) => {
        const openedFiles = this.data.openedFiles.getValue();
        if (openedFiles.includes(file)) {
          this.data.activeFile.next(file);
        } else {
          this.data.openedFiles.next([...openedFiles, file]);
          this.data.activeFile.next(file);
        }
      });

      const folder = folders.find(
        (f) => f.path == this.getParentPath(file.webkitRelativePath)
      );
      if (folder) {
        folder.addElem(fileElem.getElem());
      }
    }
  }

  getParentPath(path: string) {
    return path.slice(0, path.lastIndexOf('/'));
  }

  getNameFromPath(path: string) {
    return path.slice(path.lastIndexOf('/') + 1, path.length);
  }
}
