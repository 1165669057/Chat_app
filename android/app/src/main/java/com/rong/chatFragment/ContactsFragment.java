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
import android.widget.Toast;

import com.chat_app.R;
import com.rong.utils.NToast;
import com.test.TestService;

/**
 * Created by Administrator on 2018/1/31.
 * 书友录
 */
public class ContactsFragment extends Fragment implements ViewGroup.OnClickListener{
    private  View mView;
    private Button myOverBtn,myStartBtn,bindBtn,unBindBtn;
    private Intent mIntent;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         mView=inflater.inflate(R.layout.contacts_fragment_layout,container,false);
        initValue();
        return mView;
    }
    private void initValue() {
        //按钮
        myStartBtn=mView.findViewById(R.id.startBtn);
        bindBtn=mView.findViewById(R.id.bindBtn);
        unBindBtn=mView.findViewById(R.id.unBindBtn);
        myOverBtn=mView.findViewById(R.id.overBtn);
        myStartBtn.setOnClickListener(this);
        myOverBtn.setOnClickListener(this);
        //intent
        mIntent=new Intent(getActivity(), TestService.class);
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
                getActivity().startService(mIntent);//启动服务
                break;
            case R.id.overBtn:
                NToast.showToast(getActivity(),"停止服务",1);
                getActivity().stopService(mIntent);//停止服务
                break;
            case R.id.bindBtn:
                NToast.showToast(getActivity(),"bindBtn",1);

                break;
            case R.id.unBindBtn:
                NToast.showToast(getActivity(),"unBindBtn",1);

                break;
        }
    }
}
