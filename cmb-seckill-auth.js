function withLean(callback) {
    if (!(window.AV)) {
        var js = document.createElement("script");
        js.setAttribute("src", "//cdn.jsdelivr.net/npm/leancloud-storage@4.1.0/dist/av-min.js");
        js.setAttribute("type", "text/javascript");
        js.onload = js.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                if (callback && typeof callback === "function") {
                    window.setTimeout(callback, 1000)
                }
                js.onload = js.onreadystatechange = null
            }
        };
        document.getElementsByTagName("head")[0].appendChild(js)
    } else {
        window.setTimeout(callback, 1000)
    }
}
var debug = false;
withLean(function () {
    AV.init({
        appId: "gosxt03mc4o74agviq9olbubl2se0j7brd49rfsvkwxbc51d",
        appKey: "rfqyuu6d95urkoj8jo56h4g1mmmj0mcq7wbaq2lprgga8p6x",
        serverURLs: "https://gosxt03m.lc-cn-n1-shared.com"
    });
    window.LogData = AV.Object.extend("LogData");
    window.saveResult = function (type, data) {
        var date = new Date();
        var logdata = new LogData();
        logdata.set("logTime", date);
        logdata.set("logObject", data);
        logdata.set("logType", type);
        var userPhone = window.localStorage.getItem('cachemobileuser');
        if (userPhone) {
            logdata.set("logUser", userPhone);
        }
        logdata.save().then(function (logdata) {
            console.log("success")
        },
            function (error) {
                console.log("fail")
            })
    }
    var configQuery = new AV.Query('ConfigData');
    configQuery.equalTo('configId', 'cmb');
    configQuery.limit(1);
    configQuery.first().then(function (config) {
        var otherConfigString = config.get('config');
        if (otherConfigString) {
            var otherConfig = JSON.parse(otherConfigString);
            for (const key in otherConfig) {
                window[key] = otherConfig[key]
            }
        }
        window.debug = config.get('debug');
        if (config.get('isEnable')) {
            var userPhone = window.localStorage.getItem('cachemobileuser');
            if (!userPhone) {
                userPhone = window.prompt("请输入你的手机号", "");
                var deviceInfo = { 'ua': navigator.userAgent, 'userPhone': userPhone, 'config': 'cmb' };
                window.saveResult('loginDevice', JSON.stringify(deviceInfo));
            }
            if (userPhone != null && userPhone != "") {
                var query = new AV.Query('LogUser');
                query.equalTo('mobile', userPhone);
                query.equalTo('type', 'cmb');
                query.equalTo('isEnable', true);
                query.limit(1);
                query.first().then(function (user) {
                    alert("登录成功!用户名：" + user.get('name'));
                    window.localStorage.setItem('cachemobileuser', userPhone);
                    var js = document.createElement("script");
                    js.setAttribute("src", "https://ixxdtvjqpasp.gitee.io/dhmo/cmb-cashback.js?r=" + Math.random());
                    js.setAttribute("type", "text/javascript");
                    js.onload = js.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            if (callback && typeof callback === "function") {
                                window.setTimeout(callback, 1000)
                            }
                            js.onload = js.onreadystatechange = null
                        }
                    };
                    document.getElementsByTagName("head")[0].appendChild(js);
                }).
                    catch(function (error) {
                        alert("未授权用户！");
                        window.localStorage.removeItem('cachemobileuser');
                    });
            }

        } else {
            var userPhone = window.localStorage.getItem('cachemobileuser');
            if (!userPhone) {
                userPhone = window.prompt("请输入你的手机号", "");
                var deviceInfo = { 'ua': navigator.userAgent, 'userPhone': userPhone, 'config': 'TenStorm' };
                window.saveResult('loginDevice', JSON.stringify(deviceInfo));
            }
            if (userPhone != null && userPhone != "") {
                var query = new AV.Query('LogUser');
                query.equalTo('mobile', userPhone);
                query.limit(1);
                query.first().then(function (user) {
                    alert("登录成功!用户名：" + user.get('name') + "活动未到时间尚未开启");
                    window.localStorage.setItem('cachemobileuser', userPhone);
                    var js = document.createElement("script");
                    js.setAttribute("src", "./dist/bundle-27cbf3c3ef.js");
                    js.setAttribute("type", "text/javascript");
                    js.onload = js.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                            if (callback && typeof callback === "function") {
                                window.setTimeout(callback, 1000)
                            }
                            js.onload = js.onreadystatechange = null
                        }
                    };
                    document.getElementsByTagName("head")[0].appendChild(js);
                }).catch(function (error) {
                    alert("未授权用户！");
                    window.localStorage.removeItem('cachemobileuser');
                });
            }
        }
    })




})



