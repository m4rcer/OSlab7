data SEGMENT
    value1 DB 10
    value2 DW 100h
data ENDS

code SEGMENT
  ASSUME DS:DATA, CS:CODE
start:
    MOV AX, value2
    IMUL value2
    IDIV BX
    ;ergergerg
code ENDS
end