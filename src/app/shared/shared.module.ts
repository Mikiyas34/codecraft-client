import { NgModule } from '@angular/core';
import { SlicePipe } from './slice.pipe';
@NgModule({
  declarations: [SlicePipe],
  exports: [SlicePipe],
})
export class SharedModule {}
