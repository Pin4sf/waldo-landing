import type { CSSProperties } from "react";

// Titles never take more than two lines. Each line stays on one line (see `.site-heading` in
// components/site/site.css), and the size comes down just enough for the longest line to fit.
//
// To know how wide a line will be before the page draws it, this table holds the width of each
// character in Mottle at the title weight (460), as a share of the font size. It was measured in
// the browser. Summing it slightly overestimates real lines, because kerning pulls some pairs
// closer, so the fit errs on the safe side.

const MOTTLE_WIDTHS: Record<string, number> = {
  " ": 0.228,
  "!": 0.308,
  "\"": 0.482,
  "#": 0.574,
  "$": 0.574,
  "%": 0.82,
  "&": 1.002,
  "'": 0.28,
  "(": 0.362,
  ")": 0.362,
  "*": 0.468,
  "+": 0.567,
  ",": 0.284,
  "-": 0.377,
  ".": 0.286,
  "/": 0.453,
  "0": 0.582,
  "1": 0.582,
  "2": 0.582,
  "3": 0.582,
  "4": 0.582,
  "5": 0.582,
  "6": 0.582,
  "7": 0.582,
  "8": 0.582,
  "9": 0.582,
  ":": 0.294,
  ";": 0.296,
  "<": 0.567,
  "=": 0.549,
  ">": 0.567,
  "?": 0.384,
  "@": 0.872,
  "A": 0.867,
  "B": 0.679,
  "C": 0.862,
  "D": 0.847,
  "E": 0.652,
  "F": 0.6,
  "G": 0.874,
  "H": 0.846,
  "I": 0.366,
  "J": 0.327,
  "K": 0.776,
  "L": 0.651,
  "M": 0.978,
  "N": 0.853,
  "O": 0.91,
  "P": 0.611,
  "Q": 0.895,
  "R": 0.77,
  "S": 0.644,
  "T": 0.755,
  "U": 0.871,
  "V": 0.862,
  "W": 1.176,
  "X": 0.804,
  "Y": 0.764,
  "Z": 0.61,
  "[": 0.319,
  "\\": 0.453,
  "]": 0.319,
  "^": 0.367,
  "_": 0.242,
  "`": 0.458,
  "a": 0.507,
  "b": 0.596,
  "c": 0.498,
  "d": 0.615,
  "e": 0.512,
  "f": 0.387,
  "g": 0.535,
  "h": 0.638,
  "i": 0.324,
  "j": 0.303,
  "k": 0.594,
  "l": 0.319,
  "m": 0.886,
  "n": 0.642,
  "o": 0.596,
  "p": 0.604,
  "q": 0.609,
  "r": 0.418,
  "s": 0.437,
  "t": 0.384,
  "u": 0.626,
  "v": 0.571,
  "w": 0.804,
  "x": 0.597,
  "y": 0.545,
  "z": 0.421,
  "{": 0.305,
  "|": 0.238,
  "}": 0.305,
  "~": 0.415,
  "·": 0.283,
  "é": 0.494,
  "–": 0.543,
  "—": 1.06,
  "‘": 0.298,
  "’": 0.298,
  "“": 0.482,
  "”": 0.482,
  "…": 0.786,
  "→": 0.736,
};

const UNKNOWN_WIDTH = 0.7; // for any character not in the table: wider than most, so it still fits
const TITLE_TRACKING = -0.02; // matches letter-spacing on .site-heading
const SAFETY = 1.02;

/** Width of the longest line, in ems of the title font. */
export function titleWidth(lines: string[]) {
  return Math.max(
    ...lines.map((line) =>
      [...line].reduce((width, char) => width + (MOTTLE_WIDTHS[char] ?? UNKNOWN_WIDTH) + TITLE_TRACKING, 0),
    ),
  );
}

/** Style for a title element: tells the CSS how wide its longest line is. */
export function titleFit(lines: string[]) {
  return { "--title-em": (titleWidth(lines) * SAFETY).toFixed(3) } as CSSProperties;
}
