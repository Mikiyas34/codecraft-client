import { NgModule } from '@angular/core';
import { PrimarySideBarComponent } from './primary-side-bar.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [PrimarySideBarComponent, FileExplorerComponent],
  exports: [PrimarySideBarComponent],
  imports: [CommonModule],
})
export class PrimarySideBarModule {}
