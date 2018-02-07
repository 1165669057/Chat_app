package com.rong.chatFragment;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Service;
import android.content.ComponentName;
import android.content.ContentProvider;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;
import com.chat_app.ImitationReactActivity;
import com.chat_app.ImitationReactActivityDelegate;
import com.chat_app.R;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.nativeModul.RNImagePicker;
import com.nativeModul.RNMultiImagePicker;
import com.rong.ChatMain;
import com.rong.utils.NToast;
import com.test.BindService;
import com.test.MyIntentService;
import com.test.MyService;
import com.test.TestService;

/**
 * Created by Administrator on 2018/1/31.
 * 书友录
 */
public class ContactsFragment extends Fragment implements ViewGroup.OnClickListener,
        DefaultHardwareBackBtnHandler, PermissionAwareActivity,ChatMain.KeyUpListen {
    private  View mView;
    private FragmentActivity fragmentActivity;
    private  String fragmentName =null;
    private Button myOverBtn,myStartBtn,myServerButton,
            bindBtn,unBindBtn,statubtn,myIntentServiceButton;
    private Intent mIntent,mIntent2,mIntent3,mIntent4;
    private BindService.MyBinder myBinder;
    ReactRootView theview;
    private ServiceConnection conn=new ServiceConnection() {
        //连接成功时的回调方法
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Log.e(">>>>>>>>>","Service is connect success");
            myBinder= (BindService.MyBinder) service;
        }
        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.e(">>>>>>>>>","Service is Disconnected");
        }
    };

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         mView=inflater.inflate(R.layout.contacts_fragment_layout,container,false);
        initValue();
         theview= mDelegate.getmReactRootView();
        return theview;
    }
    private void initValue() {
        //按钮
        myStartBtn = mView.findViewById(R.id.startBtn);
        bindBtn = mView.findViewById(R.id.bindBtn);
        unBindBtn = mView.findViewById(R.id.unBindBtn);
        myOverBtn = mView.findViewById(R.id.overBtn);
        statubtn=mView.findViewById(R.id.statubtn);
        myServerButton=mView.findViewById(R.id.myServerButton);
        myIntentServiceButton=mView.findViewById(R.id.myIntentServiceButton);
        myStartBtn.setOnClickListener(this);
        myOverBtn.setOnClickListener(this);
        bindBtn.setOnClickListener(this);
        statubtn.setOnClickListener(this);
        unBindBtn.setOnClickListener(this);
        myServerButton.setOnClickListener(this);
        myIntentServiceButton.setOnClickListener(this);
        mIntent2 = new Intent(getActivity(), TestService.class);
        mIntent = new Intent(getActivity(), BindService.class);
        mIntent3= new Intent(getActivity(), MyService.class);
        mIntent4= new Intent(getActivity(), MyIntentService.class);
    }

    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.startBtn:
                NToast.showToast(getActivity(),"启动服务",1);
                getActivity().startService(mIntent2);//启动服务
                break;
            case R.id.overBtn:
                NToast.showToast(getActivity(),"停止服务",1);
                getActivity().stopService(mIntent2);//停止服务
                break;
            case R.id.bindBtn:
                NToast.showToast(getActivity(),"bindBtn",1);
                //绑定service 是否自动创建
                getActivity().bindService(mIntent,conn, Service.BIND_AUTO_CREATE);
                break;
            case R.id.unBindBtn:
                if(myBinder!=null) {
                    getActivity().unbindService(conn);
                    myBinder = null;
                }else{
                    NToast.showToast(getActivity(), "服务未绑定", 1);
                }
                break;
            case R.id.statubtn:
                if(myBinder!=null)
                  statubtn.setText(String.valueOf(myBinder.getCount()));
                else
                    NToast.showToast(getActivity(),"服务未绑定",1);
                break;
            case R.id.myServerButton:
                getActivity().startService(mIntent3);
                break;
            case R.id.myIntentServiceButton:
                String dataUrl="http://a7.pc6.com/ll6/tencentmobileqq2018.apk";
                mIntent4.setData(Uri.parse(dataUrl));
                getActivity().startService(mIntent4);
                break;
        }
    }
    /**
     * By default, all onBackPress() calls should not execute the default backpress handler and should
     * instead propagate it to the JS instance. If JS doesn't want to handle the back press itself,
     * it shall call back into native to invoke this function which should execute the default handler
     */
    @Override
    public void invokeDefaultOnBackPressed() {

    }
    /**
     * See {@link Activity#checkPermission}.
     *
     * @param permission
     * @param pid
     * @param uid
     */
    @Override
    public int checkPermission(String permission, int pid, int uid) {
        return 0;
    }
    /**
     * See {@link Activity#checkSelfPermission}.
     *
     * @param permission
     */
    @Override
    public int checkSelfPermission(String permission) {
        return 0;
    }


    /*****************************************fengexian***************************************/
    private Bundle mBundle;
    final public static int BT_MULTII_IMAGE_PICKER = 2;
    final public static int REQUEST_CODE_RN_PERMISSIONS = 12;
    private final ImitationFragmentDelegate mDelegate;
    public ContactsFragment(String name, FragmentActivity mcontext) {
        this.fragmentName=name;
        mDelegate = createReactActivityDelegate(mcontext);
        fragmentActivity=mcontext;
       // mcontext.setKeyUpListener(this);
    }
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event) ;//|| super.onKeyUp(keyCode, event);;

    }

    public interface PermissionCallback {
        public void onPermissionResult(String[] permissions, int[] grantResults);
    }
    private ImitationReactActivity.PermissionCallback mRequestPermissionCB = null;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * e.g."MoviesApp"
     */
    protected @javax.annotation.Nullable
    String getMainComponentName(){
        return fragmentName;
    }
    /**
     * Called at construction time, override if you have a custom delegate implementation.
     */
    protected ImitationFragmentDelegate createReactActivityDelegate(FragmentActivity context) {
        return new ImitationFragmentDelegate(context, getMainComponentName());
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBundle= getActivity().getIntent().getBundleExtra("props");
        mDelegate.onCreate(savedInstanceState,mBundle);
    }
    @Override
    public void onPause() {
        super.onPause();
        mDelegate.onPause();
    }
    @Override
    public void onResume() {
        super.onResume();
        mDelegate.onResume(this);
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mDelegate.onActivityResult(requestCode, resultCode, data);
    }
    @Override
    public void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    protected final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    protected final ReactInstanceManager getReactInstanceManager() {
        return mDelegate.getReactInstanceManager();
    }

    protected final void loadApp(String appKey) {
        mDelegate.loadApp(appKey);
    }
}
