package com.test.broadcastReceivers;

import android.app.job.JobScheduler;
import android.app.job.JobService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.widget.Toast;

import com.rong.utils.NToast;
import com.test.TestConstants;
/**
 * Created by Administrator on 2018/2/5.
 *
 */
public class ResponseReceiver3 extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent) {
        int statu=intent.getIntExtra(TestConstants.EXTENDED_DATA_STATUS,0);
        NToast.showToast(context,""+statu, Toast.LENGTH_LONG);
    }
}
