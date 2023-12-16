import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() text: string = '';
  open: boolean = false;
  @ViewChild('menu') menu?: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickElseWhere(e: any) {
    if (!this.menu?.nativeElement.contains(e.target)) {
      this.open = false;
      console.log('clicked elsewhere');
    }
  }
}
