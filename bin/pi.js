module.exports=function(){ return pi.apply(exports,arguments) };

function pi() {
  //  discuss at: http://phpjs.org/functions/pi/
  // original by: Onno Marsman
  // improved by: dude
  //   example 1: pi(8723321.4);
  //   returns 1: 3.141592653589793

  return 3.141592653589793; // Math.PI
}