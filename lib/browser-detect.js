module.exports = BrowserDetect;

function BrowserDetect() {
  return BrowserDetect._cache || (BrowserDetect._cache = BrowserDetect.platform());
}

BrowserDetect.platform = function() {
  var browserName, browserVersion, os, result, versionLabel;
  os = BrowserDetect.searchString(BrowserDetect.dataOS()) || "An unknown OS";
  result = BrowserDetect.searchString(BrowserDetect.dataBrowser());
  browserName = result.identity || "An unknown browser";
  versionLabel = result.version;
  browserVersion = BrowserDetect.searchVersion(versionLabel, navigator.userAgent) || BrowserDetect.searchVersion(versionLabel, navigator.appVersion) || "an unknown version";
  return {
    browser: browserName,
    version: browserVersion,
    OS: os.identity
  };
};

BrowserDetect.searchString = function(data) {
  var dataProp, dataString, datum, i, len;
  for (i = 0, len = data.length; i < len; i++) {
    datum = data[i];
    dataString = typeof datum.string === 'undefined' ? null : datum.string;
    dataProp = typeof datum.prop === 'undefined' ? null : datum.prop;
    if (dataString) {
      if (dataString.indexOf(datum.subString) !== -1) {
        return {
          identity: datum.identity,
          version: datum.versionSearch || datum.identity
        };
      }
    } else if (dataProp) {
      return {
        identity: datum.identity,
        version: datum.versionSearch || datum.identity
      };
    }
  }
  return {
    identity: '',
    version: ''
  };
};

BrowserDetect.searchVersion = function(versionLabel, dataString) {
  var index;
  index = dataString.indexOf(versionLabel);
  if (index === -1) {
    return;
  }
  return parseFloat(dataString.substring(index + versionLabel.length + 1));
};

BrowserDetect.isExplorer = function() {
  return this.platform().browser === 'explorer';
};

BrowserDetect.isExplorer8 = function() {
  return this.isExplorer() && this.platform().version === '8.0';
};

BrowserDetect.dataBrowser = function(data) {
  return data || [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    }, {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    }, {
      prop: window.opera,
      identity: "Opera"
    }, {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    }, {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    }, {
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    }, {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    }, {
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ];
};

BrowserDetect.dataOS = function(data) {
  return data || [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    }, {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    }, {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    }, {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ];
};
