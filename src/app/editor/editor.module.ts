import { NgModule } from '@angular/core';
import { ActivityBarComponent } from './activity-bar/activity-bar.component';
import { PrimarySideBarComponent } from './primary-side-bar/primary-side-bar.component';
import { PanelComponent } from './panel/panel.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { OpenedProjectsComponent } from './opened-projects/opened-projects.component';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [
    EditorComponent,
    ActivityBarComponent,
    PrimarySideBarComponent,
    PanelComponent,
    StatusBarComponent,
    MenuBarComponent,
    TextEditorComponent,
    OpenedProjectsComponent,
  ],
  imports: [],
})
export class EditorModule {}
