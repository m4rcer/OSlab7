import { isKeyword } from "./keywords.js";

export default (program) => {
  const segments = [];
  program.map((line, lineIndex) => {
    let words = line
      .split(" ")
      .filter((line) => line)
      .map((line) => line.trim())
      .map((el) => el.toUpperCase());

    const indexsOfSegments = words
      .map((word, index) => {
        if (word == "SEGMENT" || word == "ENDS") return index;

        return -1;
      })
      .filter((index) => index != -1);

    if (!indexsOfSegments.length) {
      return;
    }
    indexsOfSegments.map((index) => {
      const command = words[index];
      if (index == 0) {
        throw `Segment without name at line ${lineIndex}`;
      }
      const name = words[index - 1];

      if (isKeyword(name)) {
        throw `Segment without name at line ${lineIndex}`;
      }

      segments.push({
        command,
        name,
        lineIndex
      });
    });
  });

  if (!segments.length) return;

  const checkedIndexes = [];

  segments.map((seg, startIndex) => {
    const endIndex = segments.findIndex(
      (el, index) => el.name == seg.name && index != startIndex
    );

    if(checkedIndexes.includes(startIndex))
        return;
    
    if (endIndex < startIndex) throw `End of segment ${seg.name} is not found`;

    if (startIndex + 1 != endIndex) {
      throw "Segments intersect";
    }

    if (seg.command != "SEGMENT" || segments[endIndex].command != "ENDS") {
      throw "The start and end of the segment are incorrectly defined";
    }

    checkedIndexes.push(startIndex, endIndex);
  });

  return segments;
};
