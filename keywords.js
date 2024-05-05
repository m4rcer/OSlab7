export const keywords = ["DB", "DW", "MOV", "IMUL", "IDIV", "SEGMENT", "ENDS", "ASSUME"];

export function isKeyword(word) {
    return keywords.includes(word.toUpperCase());
}
