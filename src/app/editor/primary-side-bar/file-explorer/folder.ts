export class Folder {
  folderElem = document.createElement('div');
  arrowIcon = document.createElement('img');
  folderIcon = document.createElement('img');
  folderName = document.createElement('span');
  folderNameContainer = document.createElement('div');
  open: boolean = true;
  path?: string;
  constructor(name: string, path?: string, open?: boolean) {
    this.path = path;
    this.open = open || true;
    this.folderIcon.src = 'assets/folder-icon.svg';
    this.arrowIcon.src = 'assets/arrow-icon.svg';

    this.folderName.textContent = name;

    const contents = document.createElement('div');
    contents.id = 'contents';
    contents.classList.add('contents');
    this.folderElem.classList.add('folder');
    this.folderNameContainer.classList.add('folder-name-container');
    this.arrowIcon.classList.add('arrowIcon');

    this.folderNameContainer.onclick = (e) => {
      this.arrowIcon.style.transform = this.open
        ? 'rotate(0deg)'
        : 'rotate(-90deg)';
      this.open = this.open ? false : true;
      if (this.open) {
        this.openFolder();
      } else {
        this.closeFolder();
      }
    };

    this.folderNameContainer.append(
      this.arrowIcon,
      this.folderIcon,
      this.folderName
    );
    this.folderElem.appendChild(this.folderNameContainer);
    this.folderElem.appendChild(contents);
  }
  closeFolder() {
    this.arrowIcon.style.transform = 'rotate(-90deg)';
    const contents = this.folderElem.querySelector('#contents') as HTMLElement;
    contents.style.display = 'none';
    this.open = false;
  }
  openFolder() {
    this.arrowIcon.style.transform = 'rotate(0deg)';
    const contents = this.folderElem.querySelector('#contents') as HTMLElement;
    contents.style.display = 'block';
    this.open = true;
  }
  getElem() {
    return this.folderElem;
  }

  addElem(elem: HTMLElement) {
    const contents = this.folderElem.querySelector('#contents');
    contents?.appendChild(elem);
  }
  rename(name: string) {}
  delete() {}
}
