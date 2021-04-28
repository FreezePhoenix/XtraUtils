// #!/user/bin/node
'use strict';

var tests = [['Object',
//=====================
// Object tests
//=====================

// #1  Object.merge

'\n   let obj = Object.merge({a:1},{b:2});\n     return obj.a===1 && obj.b===2;\n    ',

// #2  Object.functions

'  \n   let obj = {\n     getA: function(){return 1}\n   };\n   return Object.functions(obj)[0] === ".getA";\n    ',

// #3  Object.prototype.pick

'\n   let obj = {\n     a: 1,\n     b: 2\n   };\n   obj.pick("a");\n   return obj.a == 1 && obj.__omitted__.b == 2 && obj.b == undefined;\n    ',

// #4  Object.fromPairs

'\n   let pairs = [[\'a\',1],[\'b\',2],[\'c\',{d:3}]],\n     obj = Object.fromPairs(pairs);\n   return obj.a === 1 && obj.b === 2 && obj.c.d === 3;\n    ',

// #5  Object.prototype.omit

'\n   let obj = {\n     a: 1,\n     b: 2\n   };\n   obj.omit("a");\n   return obj.a == undefined && obj.b == 2 && obj.__omitted__.a == 1;\n    ',

// #6  Object.prototype.show

'\n   let obj = {\n     a: 1,\n     __omitted__: {\n       b: 2\n     }\n   };\n   obj.show();\n   return obj.a == 1 && obj.b == 2 && obj.__omitted__ == undefined;\n    ',

// #7  Object.prototype.deepGet

'\n   let obj = {\n     a:1,\n     others: {\n       b: 2\n     }\n   };\n   return Object.deepGet(obj, [\'others\',\'b\']) === 2 && Object.deepGet(obj, \'.others.b\') === 2 && Object.deepGet(obj, "[\'others\'][\'b\']") === 2;\n    ',

// #8  Object.prototype.isEmpty

'\n   let obj1 = {},\n     obj2 = {a:1};\n   return obj1.isEmpty() && !obj2.isEmpty();\n    '], ['Number',
//=====================
// Number tests
//=====================

// #1  Number.prototype.floor

'\n   let num = 5.9;\n   return num.floor() === 5;\n    ',

// #2 Number.prototype.sqrt

'\n   let num = 25;\n   return num.sqrt() === 5;\n    ',

// #3 Number.prototype.ceil
'let num = 5.9;\n   return num.ceil() === 6;',

// #4 Number.prototype.toOrdinal
'let num = 5;\n   return num.toOrdinal() === "5th";',

// #5 Number.prototype.modulo
'let num = 5;\n   return num.modulo(2) === 1;',

// #6 Number.prototype.needsPromotion
'let num = 5;\n   return num.needsPromotion() === false',

// #7 Number.ratio
'let num1 = 5,\n   ratio1 = Number.ratio(num1, 10),\n   num2 = 3,\n   ratio2 = Number.ratio(num2,2);\n   return ratio1 === "1:2" && ratio2 === "3:2";',

// #8 Number.gcf
'let num1 = 5,\n   gcf1 = Number.gcf(num1,1),\n   num2 = 6,\n   gcf2 = Number.gcf(num2,3),\n   num3 = 3,\n   gcf3 = Number.gcf(num3,6);\n   return gcf1 === 1 && gcf2 === 3 && gcf3 === 3;'], ['String',
//=====================
// String tests
//=====================

// #1  String.prototype.reverse
'let str = \'my cat\';\n    return str.reverse() === \'tac ym\';',

// #2  String.prototype.sort
'let str = \'my cat\',\n       mySortFunction = function(str1,str2){return str2.charCodeAt(0) - str1.charCodeAt(0)}; \n    return str.sort() === " acmty" && str.sort(mySortFunction) === "ytmca ";',

// #3  String.rot13
'let str = \'zl png\';\n    return String.rot13(str) === "my cat";',

// #4  String.levenshtein
'let str1 = \'sunday\',\n       str2 = \'monday\';\n       return String.levenshtein(\'sunday\', \'monday\') === String.levenshtein(\'monday\', \'sunday\') && String.levenshtein(\'sunday\', \'monday\') === 2;',

// #5  String.prototype.words
'let str = \'my cat\',\n       words = str.words();\n       return words[0] === \'my\' && words[1] === \'cat\' && words.length === 2;',

// #6  String.prototype.toCamelCase
'let str = \'my cat\';\n    return str.toCamelCase() === \'myCat\';',

// #7  String.prototype.ToPascalCase
'let str = \'my cat\';\n    return str.ToPascalCase() === \'MyCat\';',

// #8  String.prototype.to_snake_case
'let str = \'my cat\';\n    return str.to_snake_case() === \'my_cat\';']];