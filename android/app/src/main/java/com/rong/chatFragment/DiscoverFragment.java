package com.rong.chatFragment;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.content.LocalBroadcastManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.chat_app.R;
import com.test.TestConstants;
import com.test.broadcastReceivers.ResponseReceiver;
import com.test.broadcastReceivers.ResponseReceiver3;
/**
 * Created by Administrator on 2018/1/31.
 */
public class DiscoverFragment extends Fragment implements ViewGroup.OnClickListener{
    private Button sendBtn1,sendBtn2,sendBtn3;
    IntentFilter mStatusIntentFilter;//过滤接收广播
    View mView;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         mView=inflater.inflate(R.layout.discover_fragment_layout,container,false);
        initViewID();
        //actions，categories与data用过滤广播。
        mStatusIntentFilter=new IntentFilter(TestConstants.BROADCAST_ACTION);
       // mStatusIntentFilter.addDataScheme("http");
       ResponseReceiver3 mResponse=new ResponseReceiver3(){
           @Override
           public void onReceive(Context context, Intent intent) {
               super.onReceive(context, intent);
               int statu=intent.getIntExtra(TestConstants.EXTENDED_DATA_STATUS,0);
               if(statu==1){
                   sendBtn3.setText("下载完成");
               }
           }
       };
        //为了给系统注册这个BroadcastReceiver和IntentFilter，需要通过LocalBroadcastManager执行registerReceiver()的方法
       LocalBroadcastManager.getInstance(getActivity()).registerReceiver(mResponse,mStatusIntentFilter);
        return mView;
    }
    private void initViewID() {
        sendBtn1=mView.findViewById(R.id.sendBtn1);
        sendBtn2=mView.findViewById(R.id.sendBtn2);
        sendBtn3=mView.findViewById(R.id.sendBtn3);
        sendBtn1.setOnClickListener(this);
        sendBtn2.setOnClickListener(this);
        sendBtn3.setOnClickListener(this);
    }
    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.sendBtn1:
                Intent intent=new Intent();
                intent.setAction("org.crazyit.action.CRAZY_BROADCAST");
                intent.putExtra("msg","simple massage");
                //发送普通广播
                getActivity().sendBroadcast(intent);
                break;
            case R.id.sendBtn2:
                Intent intent2=new Intent();
                intent2.setAction("org.crazyit.action.CRAZY_BROADCAST");
                intent2.putExtra("msg","simple massage");
                //发送有序广播
                getActivity().sendOrderedBroadcast(intent2,null);
                break;
            case R.id.sendBtn3:
                sendBtn3.setText("正在下载中....");
                Intent localIntent=new Intent(TestConstants.BROADCAST_ACTION)
                                // Puts the status into the Intent
                                .putExtra(TestConstants.EXTENDED_DATA_STATUS, 1000);
                LocalBroadcastManager.getInstance(getActivity()).sendBroadcast(localIntent);
                break;
        }
    }
}