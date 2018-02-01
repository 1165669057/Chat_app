package com.rong.receiver;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import io.rong.push.notification.PushMessageReceiver;
import io.rong.push.notification.PushNotificationMessage;

/**
 * Created by Administrator on 2018/1/29.
 */

public class DemoNotificationReceiver extends PushMessageReceiver {
    @Override
    public boolean onNotificationMessageArrived(Context context, PushNotificationMessage pushNotificationMessage) {
        return false;
    }
    @Override
    public boolean onNotificationMessageClicked(Context context, PushNotificationMessage pushNotificationMessage) {
        Intent intent = new Intent();
       intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Uri.Builder builder = Uri.parse("rong://" + context.getPackageName()).buildUpon();

        builder.appendPath("push_message").appendPath("")
                .appendQueryParameter("targetId", "1000")
                .appendQueryParameter("title", "hellow");
        Uri uri = builder.build();
        intent.setData(uri);
        context.startActivity(intent);
        return false;
    }

}