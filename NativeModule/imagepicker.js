/*
 * Copyright (C) 2016 BangTu. All rights reserved.
 */
'use strict';

const RNImagePicker = require('NativeModules').RNImagePicker;
const RNMultiImagePicker = require('NativeModules').RNMultiImagePicker;
const AppUtils = require('./NativeUtil');

var picker = new Object();
picker.pickImage = function(options = null) {
    AppUtils.requestPermissions([AppUtils.PERMISSION_READ_STORAGE,
                                 AppUtils.PERMISSION_WRITE_STORAGE,
                                 AppUtils.PERMISSION_CAMERA]);
    return RNImagePicker.pickImage(options);
}

picker.pickMultiImage = function(options = null) {
    AppUtils.requestPermissions([AppUtils.PERMISSION_READ_STORAGE,
                                 AppUtils.PERMISSION_WRITE_STORAGE,
                                 AppUtils.PERMISSION_CAMERA]);
    return RNMultiImagePicker.pickImage(options);
}
module.exports = picker;
