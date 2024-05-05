import fs from "fs";
import path from "path";
import checkSegments from "./checkSegments.js";
import getVars from "./getVars.js";
import checkLines from "./checkLines.js";
import checkInstructions from "./checkInstructions.js";

async function checkProgram() {
  let program = fs.readFileSync(path.resolve("program.asm"), "utf8");

  //делим программу на строки
  program = program.split("\n");

  //убираем лишние пробелы
  program = program.map((line) => line.trim());

  //убираем комментарии
  program = program.map((line) => {
    if (line.indexOf(";") == -1) return line;
    return line.slice(0, line.indexOf(";"));
  });

  //филтруем пустые строки
  program = program.filter((line) => line);

  //проверяем сегменты на правильность
  const segments = checkSegments(program);

  //получаем определенные переменные
  const vars = getVars(program);

  //проверяем программу на неверные инструкции
  checkLines(program, segments, vars);

  //проверяем корректность инструкций MOV,IMUL,IDIV
  checkInstructions(program, segments, vars);

  console.log("\x1b[32m%s\x1b[0m", "Program is OK!");
}

checkProgram().catch((e) => console.error("\x1b[31m%s\x1b[0m", e));
