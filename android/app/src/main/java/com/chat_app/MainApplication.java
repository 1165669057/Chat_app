package com.chat_app;

import android.app.ActivityManager;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.rong.LoginActivity;
import com.umeng.socialize.PlatformConfig;
import com.util.NativeModulePage;
import java.util.Arrays;
import java.util.List;

import io.rong.imkit.RongIM;
import io.rong.push.RongPushClient;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new NativeModulePage()
      );
    }
  };
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  @Override
  public void onCreate() {
    super.onCreate();
    if(BuildConfig.DEBUG){//判断是否是debug
    }else{
    }
    if(isAppMainProcess()) {
        setShareInit();//分享初始化
        rongInit(this,"");
    }
  }
  //分享初始化
  private void setShareInit(){
            PlatformConfig.setWeixin("wx849c560cedc4c8e9", "3361be48f060431faf6ca6bacd7ac203");
           PlatformConfig.setQQZone("1106660454", "c7394704798a158208a74ab60104f0ba");
    //PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
  }
  //融云初始化
  public void rongInit(Context context,String appKey){
     // RongPushClient.registerHWPush(this);//华为推送
      RongPushClient.registerMiPush(this, "2882303761517473625", "5451747338625");

      RongIM.init(context);

  }
  //判断是不是主进程
  public Boolean isAppMainProcess(){
    try {
      int pid = android.os.Process.myPid();
      String process = getAppNameByPID(this, pid);
      if (TextUtils.isEmpty(process)) {
        return true;
      } else if (this.getApplicationInfo().packageName.equalsIgnoreCase(process)) {
        return true;
      } else {
        return false;
      }
    }catch (Exception e){
       e.printStackTrace();
       return true;
    }

 }
 //根据Pid得到进程名
  public static String getAppNameByPID(Context context,int pid){
    // 得到管理应用程序的系统状态
     ActivityManager manager =(ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
     for(android.app.ActivityManager.RunningAppProcessInfo processInfo : manager.getRunningAppProcesses()){
          if(processInfo.pid==pid){
            return processInfo.processName;//得到进程的名字
          }
     }
     return "";
  }
}
