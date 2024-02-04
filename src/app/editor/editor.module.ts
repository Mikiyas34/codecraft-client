import { NgModule } from '@angular/core';
import { ActivityBarComponent } from './activity-bar/activity-bar.component';
import { PanelComponent } from './panel/panel.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { EditorComponent } from './editor.component';
import { MenuBarModule } from './menu-bar/menu-bar.module';
import { OpenedFilesComponent } from './opened-files/opened-files.component';
import { PrimarySideBarModule } from './primary-side-bar/primary-side-bar.module';
import { TextAreaComponent } from './text-editor/text-area/text-area.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    EditorComponent,
    ActivityBarComponent,
    PanelComponent,
    StatusBarComponent,
    TextEditorComponent,
    OpenedFilesComponent,
    TextAreaComponent,
  ],
  imports: [
    MenuBarModule,
    HttpClientModule,
    PrimarySideBarModule,
    CommonModule,
    FormsModule,
  ],
})
export class EditorModule {}
