export class Language {
  syntax: any;
  snippets: any;
  config: any;
  extension!: string;
  constructor(ext: string) {
    this.extension = ext;
    ///set the props
  }
}
