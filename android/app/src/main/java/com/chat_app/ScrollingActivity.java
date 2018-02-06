package com.chat_app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.rong.ChatConst;
import com.rong.utils.NToast;

import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;

public class ScrollingActivity extends AppCompatActivity {
    SharedPreferences mSp;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scrolling);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /*Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();*/
               /*Intent result = new Intent(Intent.ACTION_VIEW,Uri.parse("rong://com.chat_app/push_message"));//
                setResult(Activity.RESULT_OK);*/
                Uri muri=Uri.parse("rong://com.chat_app/push_message");
                Intent mIntentTo=new Intent(Intent.ACTION_VIEW,muri);
                ScrollingActivity.this.setResult(Activity.RESULT_OK,mIntentTo);
                finish();
            }
        });
       initViewModule();
    }
    private void initViewModule() {
        Intent mIntent=getIntent();
        Uri muri=mIntent.getData();
        String url=mIntent.getDataString();
        Log.e("<<<<<<<<<<<<<",url);
    }


}
