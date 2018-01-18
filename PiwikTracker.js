/**
 * Created by Administrator on 2017/7/27.
 */
import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
var {height, width} = Dimensions.get('window');
//var AppUtils = require('./modules/apputils');

function PiwikTracker(trackerUrl,param){
    if(!trackerUrl){
        return;
    }
    var url="http://172.16.20.253/piwik_2/piwik.php?";
    var customParam={
        "1":["设备:",Platform.OS],
        "2":["版本:","null"],
        "3":["deviceid","null"],
    }
    url+="url="+encodeURIComponent(trackerUrl);
    url+="&idsite="+1;
    url+="&rec=1";
    url+="&res="+encodeURIComponent(width+"x"+height);
    url+="&_cvar="+encodeURIComponent(JSON.stringify(customParam));
   /* if(params.length>0){
    }*/
    fetch(url);
}
/*AppUtils.setPresentViewHook((name, props) => {
    var url = "http://app.17bangtu.com/" + name;
    if (props) {
        url += "?props=" + JSON.stringify(props);
    }
    PiwikTracker(url);
});*/

module.exports=PiwikTracker;
