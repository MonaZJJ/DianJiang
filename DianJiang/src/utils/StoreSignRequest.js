
import md5 from 'js-md5'

const urlPrefix = "http://www.gzdjwh.cn/api/admin"; //正式api地址
const urlPrefixNoAdmin = "http://www.gzdjwh.cn/api"; //正式api地址
const urlPrefixNoApi = "http://www.gzdjwh.cn"; //正式api地址

var SignRequest = {
  signkey: "SIGNKEY=dj@fk45-45#$64",
  token: "TOKEN=",
  timestamp: "TIMESTAMP=",
  //获取服务器时间
  severtime: function () {
    var dateTime;
    $.ajax({
      url: process.env.VUE_APP_BASE_API + '/Common/GetServerTime',
      type: "post",
      dataType: 'json',
      async: false,
      success: function (data) {
        dateTime = data;
      },
      error: function () {
        Common.showMsg("提示", "无法获取服务器时间!");
      }
    });
    return dateTime;
  },
  //获取方法名
  methodname: function (method) {
    return "METHODNAME=" + method;
  },
  //获取Token
  getToken: function () {
    var gettoken = localStorage.getItem("storetoken");
    return gettoken;
  },
  //设置Token
  setToken: function (storetoken) {
    localStorage.setItem('storetoken', storetoken);
  },
  //MD5加密
  tokenmd5string2: function (method, dateTime) {
    var gettoken = this.getToken();

    //token为空不参与加密
    if (gettoken == "" || gettoken == null) {
      return this.signkey + ";" + this.timestamp + dateTime + ";" + this.methodname(method) + ";";
    }

    return this.signkey + ";" + this.timestamp + dateTime + ";" + this.methodname(method) + ";" + this.token + gettoken + ";";
  },
  //设置json数据
  getSign: function (method, dateTime) {
    var sMd5 = this.tokenmd5string2(method, dateTime);
    var iMd5 = md5(sMd5).toUpperCase();
    return iMd5;
  }
};

export default SignRequest