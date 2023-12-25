import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-activity-bar',
  templateUrl: './activity-bar.component.html',
  styleUrls: ['./activity-bar.component.scss'],
})
export class ActivityBarComponent implements OnInit {
  activeBar?:
    | 'FileExplorer'
    | 'Extensions'
    | 'Search'
    | 'Debug'
    | 'VCS'
    | 'None';
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.activeBar.subscribe((bar) => {
      this.activeBar = bar;
    });
  }
  setActiveBar(
    bar: 'FileExplorer' | 'Extensions' | 'Search' | 'Debug' | 'VCS' | 'None'
  ) {
    if (this.data.activeBar.getValue() == bar) {
      this.data.activeBar.next('None');
    } else {
      this.data.activeBar.next(bar);
    }
  }
}
