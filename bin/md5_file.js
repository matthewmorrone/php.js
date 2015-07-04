exports.file_get_contents=require("./file_get_contents");
exports.md5=require("./md5");
module.exports=function(){ return md5_file.apply(exports,arguments) };

function md5_file(str_filename) {
  //  discuss at: http://phpjs.org/functions/md5_file/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: file_get_contents
  //  depends on: md5
  //        test: skip
  //   example 1: md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  //   returns 1: '202cb962ac59075b964b07152d234b70'

  var buf = '';

  buf = this.file_get_contents(str_filename);

  if (!buf) {
    return false;
  }

  return this.md5(buf);
}