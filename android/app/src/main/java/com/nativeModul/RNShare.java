package com.nativeModul;

import android.widget.Toast;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMWeb;

/**
 * Created by Administrator on 2018/1/5.
 */
public class RNShare extends ReactContextBaseJavaModule {
    private static ReactContext g_reactContext;
    private Callback shareCallback;
    private static final int SHARE_SUCCESS=1;//分享成功
    private static final int SHARE_ERROR=0;//分享失败
    private static final int SHARE_GIVEUP=2;//分享取消
    private String shareType;
    public RNShare(ReactApplicationContext reactContext) {
        super(reactContext);
        g_reactContext=reactContext;
    }
    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     * got 1 arguments
     */
    @Override
    public String getName() {
        return "RNShare";
    }
    @ReactMethod
    public void shareStart(String shareTypeParam,String title,String text,String url,final Callback cb){
        UMWeb web = new UMWeb(url);
        web.setTitle(title);//标题
        web.setDescription(text);//描述
        this.shareType=shareTypeParam;
        SHARE_MEDIA type=type(shareTypeParam);
        new ShareAction(getCurrentActivity())
                .setPlatform(type)//传入平台
                .withMedia(web)
                .setCallback(shareListener)//回调监听器
                .share();
        shareCallback=cb;
    }
    //分享类型选择
    private SHARE_MEDIA type(String shareType){
        SHARE_MEDIA type=null;
        switch (shareType){
          case "QQ":
              type=SHARE_MEDIA.QQ;
                break;
          case "WEIXIN":
              type=SHARE_MEDIA.WEIXIN;
                break;
          case "WEIXIN_CIRCLE":
              type=SHARE_MEDIA.WEIXIN_CIRCLE;
                break;
          case "QZONE":
              type=SHARE_MEDIA.QZONE;
                break;
            case "SINA":
                type=SHARE_MEDIA.SINA;
                break;
        }
        return type;
    }
    //分享回调
    private UMShareListener shareListener = new UMShareListener() {
        /**
         * @descrption 分享开始的回调
         * @param platform 平台类型
         */
        @Override
        public void onStart(SHARE_MEDIA platform) {

        }
        /**
         * @descrption 分享成功的回调
         * @param platform 平台类型
         */
        @Override
        public void onResult(SHARE_MEDIA platform) {
            shareCallback.invoke(shareType,SHARE_SUCCESS);
        }

        /**
         * @descrption 分享失败的回调
         * @param platform 平台类型
         * @param t 错误原因
         */
        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            shareCallback.invoke(shareType,SHARE_ERROR,t.getMessage());
        }

        /**
         * @descrption 分享取消的回调
         * @param platform 平台类型
         */
        @Override
        public void onCancel(SHARE_MEDIA platform) {
            shareCallback.invoke(shareType,SHARE_GIVEUP);
        }
    };
}
