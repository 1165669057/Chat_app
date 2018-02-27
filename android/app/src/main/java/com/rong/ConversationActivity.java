package com.rong;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;


import com.chat_app.R;


/**
 * Created by Administrator on 2018/2/2.
 */
public class ConversationActivity extends FragmentActivity{
   RecyclerView recyclerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.conversation);
    }
}