export interface LanguageConfig {
  comments: Comments;
  brackets: string[][];
  autoClosingPairs: (string[] | AutoClosingPairs2)[];
  surroundingPairs: string[][];
  indentationRules: IndentationRules;
  folding: Folding;
}

interface Folding {
  markers: Markers;
}

interface Markers {
  start: string;
  end: string;
}

interface IndentationRules {
  increaseIndentPattern: string;
  decreaseIndentPattern: string;
}

interface AutoClosingPairs2 {
  open: string;
  close: string;
  notIn: string[];
}

interface Comments {
  lineComment: string;
  blockComment: string[];
}
