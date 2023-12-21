import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-primary-side-bar',
  templateUrl: './primary-side-bar.component.html',
  styleUrls: ['./primary-side-bar.component.scss'],
})
export class PrimarySideBarComponent {
  activeBar?: string;
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.activeBar.subscribe((bar) => {
      this.activeBar = bar;
    });
  }
}
