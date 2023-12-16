import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MenuBarComponent } from './menu-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuComponent, MenuBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [MenuBarComponent, MenuComponent],
})
export class MenuBarModule {}
