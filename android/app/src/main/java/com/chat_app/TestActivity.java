package com.chat_app;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.ViewGroup;
import android.widget.ScrollView;
import javax.annotation.Nullable;

/**
 * Created by Administrator on 2017/12/29.
 */
public class TestActivity extends ImitationReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Nullable
    @Override
    protected String getMainComponentName(){
        return "TestActivity";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }
}
