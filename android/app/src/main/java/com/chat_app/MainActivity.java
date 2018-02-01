package com.chat_app;
import android.content.Intent;
import android.os.Bundle;

import com.umeng.socialize.UMShareAPI;

public class MainActivity extends ImitationReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Chat_app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        MainApplication mainApplication= (MainApplication) getApplication();
        /*else if (mReactInstanceManager != null) {
            RNAppUtils.onActivityResult(requestCode, resultCode, data);
            mReactInstanceManager.onActivityResult(requestCode, resultCode, data);
        }*/
    }
}
