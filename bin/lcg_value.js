module.exports=function(){ return lcg_value.apply(exports,arguments) };

function lcg_value() {
  //  discuss at: http://phpjs.org/functions/lcg_value/
  // original by: Onno Marsman
  //        test: skip
  //   example 1: lcg_value()
  //   returns 1: 1

  return Math.random();
}