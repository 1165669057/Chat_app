package com.chat_app;
import android.content.Intent;

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
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        /*else if (mReactInstanceManager != null) {
            RNAppUtils.onActivityResult(requestCode, resultCode, data);
            mReactInstanceManager.onActivityResult(requestCode, resultCode, data);
        }*/
    }
}
