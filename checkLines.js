import { isKeyword } from "./keywords.js";

export default (program, segments, vars) => {
  const blocks = [];
  program.map((line, index) => {
    let words = line
      .split(" ")
      .filter((line) => line)
      .map((line) => line.trim())
      .map((el) => el.toUpperCase());

    if (isKeyword(words[0])) {
      return;
    }

    let checkedLineIndexes = segments.map((seg) => seg.lineIndex);
    checkedLineIndexes.push(
      ...Object.keys(vars).map((key) => vars[key].lineIndex)
    );

    if (checkedLineIndexes.includes(index)) {
      return;
    }

    if (index == program.length - 1) {
      if (words[0] != "END") {
        throw `Unexpected end of file`;
      }
      if (words.length > 2) {
        throw `Unexpected end of file`;
      }

      if (words.length == 2 && !blocks.includes(words[1])) {
        throw `Unexpected end of file`;
      }

      return;
    }

    if (words[0][words[0].length - 1] == ":") {
      blocks.push(words[0].slice(0, words[0].length - 1));
    } else {
      throw `Invalid construction at line ${index}`;
    }
  });
};
