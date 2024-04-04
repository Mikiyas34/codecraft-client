import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.scss'],
})
export class CommandPaletteComponent implements AfterViewInit {
  all_commands: { name: string; click: () => void }[] = [
    {
      name: 'Reload Window',
      click() {
        console.log('reload window');
        window.location.reload();
      },
    },
    {
      name: 'Add Cursor Below',
      click() {
        console.log('Add Cursor Below');
      },
    },
    {
      name: 'Add Cursor Above',
      click() {
        console.log('Add Cursor Above');
      },
    },
    {
      name: 'Add Cursor To Bottom',
      click() {
        console.log('Add Cursor To Bottom');
      },
    },
  ];
  commands: { name: string; click: () => void }[] = this.all_commands;
  @ViewChild('input') inputElem?: ElementRef;

  ngAfterViewInit(): void {
    this.inputElem?.nativeElement.focus();
    let inputValue = '';
    this.inputElem?.nativeElement.addEventListener('input', (e: any) => {
      console.log(inputValue);
      if (e.target.value) {
        inputValue = e.target.value;
      }
      if (inputValue.trim() == '') {
        this.commands = this.all_commands;
        console.log('oioi');
      } else {
        const matchingCommands = this.all_commands.filter((command) =>
          command.name.toLocaleLowerCase().includes(inputValue)
        );
        console.log(matchingCommands);
        this.commands = matchingCommands;
      }
    });
  }
}
