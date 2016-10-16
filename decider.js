/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, makeErrorCause = require('make-error-cause');

  EX = function makeDecider(solve) {
    if (solve === undefined) { solve = EX.solve; }
    if ((typeof solve) !== 'function') { throw new Error('need solve func'); }
    var dc = function decider(answer, reason, details) {
      return ((arguments.length === 0)
        ? (dc.r ? { a: dc.a, r: dc.r, d: dc.d } : null)
        : (reason ? solve(dc, answer, reason, details) : null));
    };
    dc.a = dc.r = dc.d = null;
    dc.revis = false;
    return dc;
  };


  EX.solve = function solve(decider, answer, reason, details) {
    if (!reason) {
      throw new solve.NoReasonError('Solution needs a truthy reason');
    }
    if (decider.r) {
      throw new solve.SolvedAgainError('unexpected late solution',
        { oldAnswer: decider.a, oldReason: decider.r, oldDetails: decider.d,
          newAnswer: answer,    newReason: reason,    newDetails: details });
    }
    var revis = decider.revis, solu = (revis ? {} : decider);
    solu.a = answer;
    solu.r = reason;
    solu.d = details;
    if (!revis) { return decider(); }
    revis.forEach(function (revi) { solu = (revi(solu) || solu); });
    if (solu.r) {
      decider.a = solu.a;
      decider.r = solu.r;
      decider.d = solu.d;
    }
    return decider();
  };
  EX.solve.NoReasonError = makeErrorCause('NoReasonError');
  EX.solve.SolvedAgainError = makeErrorCause('SolvedAgainError');





















  return EX;
}());
