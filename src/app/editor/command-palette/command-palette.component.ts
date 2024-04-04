import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private data: DataService) {}
  ngAfterViewInit(): void {
    const inputElem = this.inputElem?.nativeElement;
    // this.inputElem?.nativeElement.focus();
    if (inputElem && !inputElem.value.startsWith('>')) {
      this.commands = [];
    }
    let inputValue = '';
    this.inputElem?.nativeElement.addEventListener('input', (e: any) => {
      console.log(inputValue);
      if (e.target.value) {
        inputValue = e.target.value;
      }
      if (inputElem && !inputElem.value.startsWith('>')) {
        this.commands = [];
        const files = this.data.files.getValue();
        files.forEach((file) => {
          this.commands.push({
            name: file.name,
            click() {},
          });
        });
      } else {
        const matchingCommands = this.all_commands.filter((command) =>
          command.name
            .toLocaleLowerCase()
            .includes(inputValue.slice(1, inputValue.length))
        );
        console.log(matchingCommands);
        this.commands = matchingCommands;
      }
    });
  }
}
