package com.rong.chatFragment;

import android.app.Service;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.chat_app.R;
import com.rong.utils.NToast;
import com.test.BindService;
import com.test.MyIntentService;
import com.test.MyService;
import com.test.TestService;

/**
 * Created by Administrator on 2018/1/31.
 * 书友录
 */
public class ContactsFragment extends Fragment implements ViewGroup.OnClickListener{
    private  View mView;
    private Button myOverBtn,myStartBtn,myServerButton,
            bindBtn,unBindBtn,statubtn,myIntentServiceButton;
    private Intent mIntent,mIntent2,mIntent3,mIntent4;
    private BindService.MyBinder myBinder;
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
        return mView;
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
                }else {
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
}
