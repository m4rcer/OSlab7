import { isKeyword } from "./keywords.js";

const dbRegisters = ["AL", "BL", "CL", "DL", "AH", "BH", "CH", "DH"];
const dwRegisters = ["AX", "BX", "CX", "DX", "SI", "DI", "BP", "SP"];
const segmentRegisters = ["DS","CS","SS","FS","ES","GS"];
const instructions = ["MOV", "IMUL", "IDIV", "ASSUME"];

export default (program, segments, vars) => {
  program.map((line, index) => {
    let words = line
      .replaceAll(",", " ")
      .split(" ")
      .filter((line) => line)
      .map((line) => line.trim())
      .map((el) => el.toUpperCase());

    if (!instructions.includes(words[0])) return;

    if (words[0] == "MOV") {
      if (words.length != 3) {
        throw `Invalid instruction at line ${index}`;
      }

      let firstOperand;
      let secondOperand;

      if (vars[words[1]]) {
        firstOperand = vars[words[1]];
      }

      if (dbRegisters.includes(words[1])) {
        firstOperand = {
          type: "DB",
          isRegister: true,
        };
      }

      if (dwRegisters.includes(words[1])) {
        firstOperand = {
          type: "DW",
          isRegister: true,
        };
      }

      if (vars[words[2]]) {
        secondOperand = vars[words[2]];
      }

      if (dbRegisters.includes(words[2])) {
        secondOperand = {
          type: "DB",
          isRegister: true,
        };
      }

      if (dwRegisters.includes(words[2])) {
        secondOperand = {
          type: "DW",
          isRegister: true,
        };
      }

      if (!firstOperand || !secondOperand) {
        throw `Invalid operand at line ${index}`;
      }

      if (!firstOperand.isRegister && !secondOperand.isRegister) {
        throw `Need register in expression at line ${index}`;
      }

      if (firstOperand.type != secondOperand.type) {
        throw `Operands type don't match at line ${index}`;
      }
    }

    if (words[0] == "IMUL" || words[0] == "IDIV") {
      if (words.length != 2) {
        throw `Invalid instruction at line ${index}`;
      }

      let operand;

      if (vars[words[1]]) {
        operand = vars[words[1]];
      }

      if (dbRegisters.includes(words[1])) {
        operand = {
          type: "DB",
          isRegister: true,
        };
      }

      if (dwRegisters.includes(words[1])) {
        operand = {
          type: "DW",
          isRegister: true,
        };
      }

      if (!operand) {
        if (!operand) {
          throw `Invalid operand at line ${index}`;
        }
      }
    }

    if (words[0] == "ASSUME") {
      let words = line
        .split(" ")
        .filter((line) => line)
        .map((line) => line.trim())
        .map((el) => el.toUpperCase());

      words = words.slice(1).join("").split(",");

      words.map((word) => {
        const [register, segment] = word.split(":");

        if (!segmentRegisters.includes(register)) {
          throw `Invalid instruction at line ${index}`;
        }

        const foundedSegment = segments.find(el => el.name == segment);

        if(!foundedSegment) {
            throw `Invalid instruction at line ${index}`;
        }
      });
    }
  });
};
