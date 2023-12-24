import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent {
  @Input() name?: string;
  open: boolean = true;
  toggleFolder() {
    this.open = this.open ? false : true;
  }
}
