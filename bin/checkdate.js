module.exports=function(){ return checkdate.apply(exports,arguments) };

function checkdate(m, d, y) {
  //  discuss at: http://phpjs.org/functions/checkdate/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Pyerre
  // improved by: Theriault
  //   example 1: checkdate(12, 31, 2000);
  //   returns 1: true
  //   example 2: checkdate(2, 29, 2001);
  //   returns 2: false
  //   example 3: checkdate(3, 31, 2008);
  //   returns 3: true
  //   example 4: checkdate(1, 390, 2000);
  //   returns 4: false

  return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
    .getDate();
}