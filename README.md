
<!--#echo json="package.json" key="name" underline="=" -->
reasonable-decider-pmb
======================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Help describe decisions as a priority chain of possible reasons.
<!--/#echo -->


This module exports a factory function that produces decider functions.

Decider functions are a kind of synchronous promise in that they can be
solved only once.

  * Decider function arguments: `([answer, reason[, details]])`
    * With no arguments, the decider function will return:
      * if it has an accepted solution yet, a decision object (see below).
      * else `null`.
    * With arguments:
      * If the reason is false-y, just returns `null`, no action.
      * If any revisers are defined, they'll pre-process the arguments.
      * If the (potentially revised) reason is a truthy value,
        the answer is accepted as the solution.
      * Returns a decision object.

  * Decider function properties: Same as on decision objects.
    * The boolean interpretation of its `r` property states whether
      a solution has been accepted yet.


A decision objects is a plain object with the these properties:
  * `a`: The answer.
  * `r`: The reason.
  * `d`: The details, if any.


Benefits of decider functions over just using decision objects directly:
  * In some cases, shorter notation for the reason truthiness check.
  * Support for revisers.
  * Some minimal input validation.



Usage
-----
see [test/usage.js](test/usage.js)

<!--!#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--/include-->


<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
