import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from './editor/editor.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    // RouterModule.forRoot([
    //   {
    //     path: 'new',
    //     component: NewProjectComponent,
    //     data: { animation: 'newPage' },
    //   },
    //   {
    //     path: 'new/blank',
    //     component: BlankProjectComponent,
    //     data: { animation: 'newBlankPage' },
    //   },
    //   { path: '', component: WorkspaceComponent },
    // ]),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
