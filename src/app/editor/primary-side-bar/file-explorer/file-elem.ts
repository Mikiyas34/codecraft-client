export class FileElement {
  fileElem = document.createElement('div');
  fileIcon = document.createElement('img');
  fileName = document.createElement('span');

  constructor(name: string) {
    this.fileName.textContent = name;
    this.fileIcon.src = 'assets/file-icon.svg';
    this.fileElem.classList.add('file');
    this.fileIcon.classList.add('file-icon');
    this.fileElem.append(this.fileIcon, this.fileName);

    this.fileElem.onclick = (e) => {};
  }
  getElem() {
    return this.fileElem;
  }
}
