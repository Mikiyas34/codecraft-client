export class FileElement {
  private fileElem = document.createElement('div');
  private fileIcon = document.createElement('img');
  private fileName = document.createElement('span');
  file?: File;
  constructor(name: string, iconPath?: string, file?: File) {
    this.file = file;
    this.fileName.textContent = name;
    this.fileIcon.src = 'assets/file-icon.svg';
    this.fileElem.classList.add('file');
    this.fileIcon.classList.add('file-icon');
    this.fileElem.append(this.fileIcon, this.fileName);
  }
  getElem() {
    return this.fileElem;
  }

  onClick(cb: Function) {
    this.fileElem.onclick = (e) => {
      cb(this.file);
    };
  }
}
