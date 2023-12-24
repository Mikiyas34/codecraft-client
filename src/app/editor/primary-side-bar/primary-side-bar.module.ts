import { NgModule } from '@angular/core';
import { PrimarySideBarComponent } from './primary-side-bar.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExtensionsComponent } from './extensions/extensions.component';
import { DebugComponent } from './debug/debug.component';
import { SearchComponent } from './search/search.component';
import { VcsComponent } from './vcs/vcs.component';
import { FolderComponent } from './file-explorer/folder/folder.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    PrimarySideBarComponent,
    FileExplorerComponent,
    ExtensionsComponent,
    DebugComponent,
    SearchComponent,
    VcsComponent,
    FolderComponent,
  ],
  exports: [PrimarySideBarComponent],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class PrimarySideBarModule {}
