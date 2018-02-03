package com.test.broadcastReceivers;

import android.app.job.JobScheduler;
import android.app.job.JobService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Toast;

import com.rong.utils.NToast;

/**
 * Created by Administrator on 2018/2/3.
 */
public class ResponseReceiver2 extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle=getResultExtras(true);
        String first=bundle.getString("first");
        NToast.showToast(context,"第一个Broadcast 存入的消息为："+first, Toast.LENGTH_LONG);
    }
}
