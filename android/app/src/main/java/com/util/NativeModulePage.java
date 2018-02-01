package com.util;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewManager;
import com.nativeModul.RNImagePicker;
import com.nativeModul.RNShare;
import com.nativeModul.UtilEnter;
import com.nativeUI.imgview.ReactImageManager;
import com.nativeUI.rnscrollview.RNFixedScrollViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/7/21.
 */
public class NativeModulePage implements ReactPackage{
    /**
     * @param reactContext react application context that can be used to create modules
     * @return list of native modules to register with the newly created catalyst instance
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<>();
        modules.add(new UtilEnter(reactContext));
        modules.add(new com.nativeModul.RNMultiImagePicker(reactContext));
        modules.add(new RNImagePicker(reactContext));
        modules.add(new RNShare(reactContext));
        return modules;
    }
    /**
     * @return list of JS modules to register with the newly created catalyst instance.
     * <p>
     * IMPORTANT: Note that only modules that needs to be accessible from the native code should be
     * listed here. Also listing a native module here doesn't imply that the JS implementation of it
     * will be automatically included in the JS bundle.
     */
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
    /**
     * @param reactContext
     * @return a list of view managers that should be registered with {@link UIManagerModule}
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
         return Arrays.<ViewManager>asList(
                new RNFixedScrollViewManager()
         );
    }
}