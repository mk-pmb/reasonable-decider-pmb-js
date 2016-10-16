/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var makeDecider = require('reasonable-decider-pmb'), eq = require('equal-pmb');

function isSpecialNumber(num) {
  var spn = makeDecider();
  spn.revis = (isSpecialNumber.revis || false);
  return (spn(false, (+num !== num) && 'not a number at all')
    || spn(false, (num % 2) && 'just odd')
    || spn(true, ((num > 1e7) && 'big')
      || (((num % 9) === 0) && 'modulo 9')
      || (((num % 5) === 0) && 'modulo 5')
      )
    );
}

eq(isSpecialNumber(1),    { a: false, r: 'just odd',  d: undefined });
eq(isSpecialNumber(-1),   { a: false, r: 'just odd',  d: undefined });
eq(isSpecialNumber(2e8),  { a: true,  r: 'big',       d: undefined });
eq(isSpecialNumber(990),  { a: true,  r: 'modulo 9',  d: undefined });
eq(isSpecialNumber(42),   null);
  // ^-- undecided: there may be other reasons why this number is special.


eq(isSpecialNumber(20),   { a: true,  r: 'modulo 5',  d: undefined });
isSpecialNumber.revis = [

  function twicePrime(solu) {
    var isMod = /^(modulo )(\d+)$/.exec(solu.r);
    if (!isMod) { return; } // don't care about other reasons
    solu.d = 'modulo*2';  // at this stage we know the number is also even
    solu.r = isMod[1] + (isMod[2] * 2);
  }

];
eq(isSpecialNumber(20),   { a: true,  r: 'modulo 10', d: 'modulo*2' });


eq(isSpecialNumber(23),   { a: false, r: 'just odd',  d: undefined });
eq(isSpecialNumber(999),  { a: false, r: 'just odd',  d: undefined });
isSpecialNumber.revis.push(
  function allowOdd(solu) {
    if (solu.r === 'just odd') { solu.r = null; }   // what a crappy reason!
  }
);
eq(isSpecialNumber(23),   null);    // now undecided.
// Since the oddity filter has been neutralized,
// twicePrime is mistaken to rely on it:
eq(isSpecialNumber(999),  { a: true,  r: 'modulo 18', d: 'modulo*2' });













console.log("+OK tests passed.");   //= "+OK tests passed."
