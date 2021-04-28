const tests = [
	[ 'Object',
		//=====================
		// Object tests
		//=====================

		// #1  Object.merge

		`
   let obj = Object.merge({a:1},{b:2});
     return obj.a===1 && obj.b===2;
    `,

		// #2  Object.functions

		`  
   let obj = {
     getA: function(){return 1}
   };
   return Object.functions(obj)[0] === ".getA";
    `,

		// #3  Object.prototype.pick

		`
   let obj = {
     a: 1,
     b: 2
   };
   obj.pick("a");
   return obj.a == 1 && obj.__omitted__.b == 2 && obj.b == undefined;
    `,

		// #4  Object.fromPairs

		`
   let pairs = [['a',1],['b',2],['c',{d:3}]],
     obj = Object.fromPairs(pairs);
   return obj.a === 1 && obj.b === 2 && obj.c.d === 3;
    `,

		// #5  Object.prototype.omit

		`
   let obj = {
     a: 1,
     b: 2
   };
   obj.omit("a");
   return obj.a == undefined && obj.b == 2 && obj.__omitted__.a == 1;
    `,

		// #6  Object.prototype.show

		`
   let obj = {
     a: 1,
     __omitted__: {
       b: 2
     }
   };
   obj.show();
   return obj.a == 1 && obj.b == 2 && obj.__omitted__ == undefined;
    `,

		// #7  Object.prototype.deepGet

		`
   let obj = {
     a:1,
     others: {
       b: 2
     }
   };
   return Object.deepGet(obj, ['others','b']) === 2 && Object.deepGet(obj, '.others.b') === 2 && Object.deepGet(obj, "['others']['b']") === 2;
    `,

		// #8  Object.prototype.isEmpty

		`
   let obj1 = {},
     obj2 = {a:1};
   return obj1.isEmpty() && !obj2.isEmpty();
    `
	],

	[ 'Number',
		//=====================
		// Number tests
		//=====================

		// #1  Number.prototype.floor

		`
   let num = 5.9;
   return num.floor() === 5;
    `,

		// #2 Number.prototype.sqrt

		`
   let num = 25;
   return num.sqrt() === 5;
    `,

		// #3 Number.prototype.ceil
		`let num = 5.9;
   return num.ceil() === 6;`,

		// #4 Number.prototype.toOrdinal
		`let num = 5;
   return num.toOrdinal() === "5th";`,

		// #5 Number.prototype.modulo
		`let num = 5;
   return num.modulo(2) === 1;`,

		// #6 Number.prototype.needsPromotion
		`let num = 5;
   return num.needsPromotion() === false`,

		// #7 Number.ratio
		`let num1 = 5,
   ratio1 = Number.ratio(num1, 10),
   num2 = 3,
   ratio2 = Number.ratio(num2,2);
   return ratio1 === "1:2" && ratio2 === "3:2";`,

		// #8 Number.gcf
		`let num1 = 5,
   gcf1 = Number.gcf(num1,1),
   num2 = 6,
   gcf2 = Number.gcf(num2,3),
   num3 = 3,
   gcf3 = Number.gcf(num3,6);
   return gcf1 === 1 && gcf2 === 3 && gcf3 === 3;`
	],
	[ 'String',
		//=====================
		// String tests
		//=====================

		// #1  String.prototype.reverse
		`let str = 'my cat';
    return str.reverse() === 'tac ym';`,

		// #2  String.prototype.sort
		`let str = 'my cat',
       mySortFunction = function(str1,str2){return str2.charCodeAt(0) - str1.charCodeAt(0)}; 
    return str.sort() === " acmty" && str.sort(mySortFunction) === "ytmca ";`,

		// #3  String.rot13
		`let str = 'zl png';
    return String.rot13(str) === "my cat";`,

		// #4  String.levenshtein
		`let str1 = 'sunday',
       str2 = 'monday';
       return String.levenshtein('sunday', 'monday') === String.levenshtein('monday', 'sunday') && String.levenshtein('sunday', 'monday') === 2;`,

		// #5  String.prototype.words
		`let str = 'my cat',
       words = str.words();
       return words[0] === 'my' && words[1] === 'cat' && words.length === 2;`,

		// #6  String.prototype.toCamelCase
		`let str = 'my cat';
    return str.toCamelCase() === 'myCat';`,

		// #7  String.prototype.ToPascalCase
		`let str = 'my cat';
    return str.ToPascalCase() === 'MyCat';`,

		// #8  String.prototype.to_snake_case
		`let str = 'my cat';
    return str.to_snake_case() === 'my_cat';`
	]
];