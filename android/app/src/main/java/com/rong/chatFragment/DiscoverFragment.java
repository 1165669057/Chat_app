package com.rong.chatFragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.chat_app.R;

/**
 * Created by Administrator on 2018/1/31.
 */
public class DiscoverFragment extends Fragment implements ViewGroup.OnClickListener{
    private Button sendBtn1,sendBtn2;
    View mView;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         mView=inflater.inflate(R.layout.discover_fragment_layout,container,false);
        initViewID();
        return mView;
    }
    private void initViewID() {
        sendBtn1=mView.findViewById(R.id.sendBtn1);
        sendBtn2=mView.findViewById(R.id.sendBtn2);
        sendBtn1.setOnClickListener(this);
        sendBtn2.setOnClickListener(this);
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
        }
    }
}

