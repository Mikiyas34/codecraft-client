import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-primary-side-bar',
  templateUrl: './primary-side-bar.component.html',
  styleUrls: ['./primary-side-bar.component.scss'],
})
export class PrimarySideBarComponent implements AfterViewInit {
  activeBar?: string;
  @ViewChild('resizer') resizer?: ElementRef;
  @ViewChild('host') host?: ElementRef;
  constructor(private data: DataService) {}
  ngAfterViewInit() {
    this.data.activeBar.subscribe((bar) => {
      this.activeBar = bar;
      if (this.activeBar != 'None') {
        this.host!.nativeElement.style.width = '15rem';
      } else {
        this.host!.nativeElement.style.width = '0';
      }
    });

    let mousedown = false;
    this.resizer?.nativeElement.addEventListener(
      'mousedown',
      () => (mousedown = true)
    );
    document.addEventListener('mouseup', () => (mousedown = false));
    document.addEventListener('mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      const rect = this.host?.nativeElement.getBoundingClientRect();
      this.host!.nativeElement.style.width = e.clientX - rect!.left + 'px';
      if (e.clientX < 200) {
        this.data.activeBar.next('None');
        this.host!.nativeElement.style.width = '0px';
      }
    });
  }
}
