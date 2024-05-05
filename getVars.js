import { isKeyword } from "./keywords.js";

export default (program) => {
  const vars = {};
  program.map((line, lineIndex) => {
    let words = line
      .split(" ")
      .filter((line) => line)
      .map((line) => line.trim())
      .map((el) => el.toUpperCase());


    if(!words.includes("DB") && !words.includes("DW")) {
        return;
    }

    if((words[1] != "DB" && words[1] != "DW") || words.length < 3) {
        throw `Incorrect variable definition at line ${lineIndex}`;
    }

    if(isKeyword(words[0])) {
      throw `Incorrect variable definition at line ${lineIndex}`;
    }

    const value = words.slice(2).join(" ");

    if(vars[words[0]]) {
      throw "Redefining a Variable"
    }

    vars[words[0]] = {
      name: words[0],
      type: words[1],
      value: value,
      lineIndex
    }
  });

  return vars;
};
