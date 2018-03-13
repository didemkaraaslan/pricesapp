var _caq = _caq || {};
var _gcol = _gcol || { unUsedParameters: ['rootUrl'], rootUrl: _caq["rootUrl"], channel: _caq["channel"] };

//Yeni Eklendi
_gcol.GetPid = function () {
    var utils =
      {
          read_cookie: function (name) {
              var nameEQ = name + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
          }
      };
    var pid = utils.read_cookie('pid');
    if (pid === null) {
        pid = utils.read_cookie('pid_alt');
    }
    return { pid: pid }
};


_gcol.GetSubdomain = function () {
    return window.location.host.split('.')[0];
};

_gcol.M2trigger = function (userId) {
    var subdomain = 'm2';
    if (_gcol.GetSubdomain() === 'stage') {
        subdomain = 'm2stage';
    }

    function createRandomNum() {
        return '&r=' + Math.floor(Math.random() * 5000) + 1
    }

    function createScriptTag(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 'true';
        script.src = url + createRandomNum();
        $("body").append(script);
    }

    function getRequest(time) {
        window.setTimeout(function () {
            var TARGET = 'https://' + subdomain + '.trendyol.com/script?userId=' + userId + '&pid=' + _gcol.GetPid().pid;
            $.get(TARGET, function (data) {
                if (!data && time === 1000) {
                    getRequest(3000);
                }
                if (data) {
                    createScriptTag(TARGET);
                }
            });
        }, time);
    }

    getRequest(1000);
};


_gcol.AppendPixel = function (data) {
    var instance = this;
    var url = instance.rootUrl + "__gc.gif?_=" + Math.random().toString().slice(12) + "&p=" + instance.RemoveAndEncodeParameters(data);
    var _pixel = document.createElement("img");
    _pixel.src = url;
    _pixel.id = Math.random() + "_pixel";
    _pixel.style.display = "none";
    document.body.insertBefore(_pixel, document.body.firstChild);
    document.body.removeChild(_pixel);
    //Yeni Eklendi
    _gcol.M2trigger(data.userId);
}

_gcol.Fire = function (event, data) {
    if (typeof event != "string") {
        throw (new Error("missing event name parameter"));
    }
    if (data) {
        data.channel = _gcol.channel;
        data["event"] = event;
        return _gcol.AppendPixel(data);
    }
}

_gcol.RemoveAndEncodeParameters = function (data) {
    var instance = this;
    var bi = instance.getBrowserInformation();
    data.ref = instance.getReferrer();
    data.os = bi.os;
    data.bv = bi.bv;
    data.bn = bi.bn;
    data.res = instance.getResolution();

    var dataToProcess = data;
    var length = instance.unUsedParameters.length;
    for (var i = 0; i < length; i++) {
        delete dataToProcess[instance.unUsedParameters[i]];
    }
    for (var i in dataToProcess) {
        if (dataToProcess[i] === null || dataToProcess[i] === undefined) {
            delete dataToProcess[i];
        }
    }
    return encodeURIComponent(_gcol.psv(dataToProcess));
}

_gcol.escape = function (value) {
    if (typeof value != 'string') return;
    return value.replace(/\|/g, "\\|");
}
_gcol.psv = function (obj) {
    var s = [];
    for (var i in obj) {
        s.push(i);
        s.push(_gcol.escape(obj[i]));
    }
    var res = s.join("||");
    return res;
}

_gcol.getResolution = function () {
    return window.screen.availWidth + "x" + window.screen.availHeight;
}

_gcol.getReferrer = function () {
    var referrer = document.referrer;
    var host = document.location.host;
    if (referrer.indexOf(host) < 0) {
        return document.referrer;
    }
    return "";
}

_gcol.getBrowserInformation = function () {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
        // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
        // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
        // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
        // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
        // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    return { "os": OSName, "bv": fullVersion, "bn": browserName };
}


if (typeof module !== 'undefined' && module.exports) {
    exports._gcol = _gcol
}
