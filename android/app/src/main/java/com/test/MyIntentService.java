package com.test;

import android.app.IntentService;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.support.annotation.WorkerThread;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import java.net.HttpURLConnection;
/**
 * Created by Administrator on 2018/2/3.
 */
public class MyIntentService extends IntentService{
    private Intent localIntent;
    public MyIntentService(){
        super("MyIntentService");
    }
    /**
     * Creates an IntentService.  Invoked by your subclass's constructor.
     * @param name Used to name the worker thread, important only for debugging.
     */
    /*public MyIntentService(String name) {
        super("MyIntentService");

    }*/
    /**
     * This method is invoked on the worker thread with a request to process.
     * Only one Intent is processed at a time, but the processing happens on a
     * worker thread that runs independently from other application logic.
     * So, if this code takes a long time, it will hold up other requests to
     * the same IntentService, but it will not hold up anything else.
     * When all requests have been handled, the IntentService stops itself,
     * so you should not call {@link #stopSelf}.
     *
     * @param intent The value passed to {@link
     *               Context#startService(Intent)}.
     *               This may be null if the service is being restarted after
     *               its process has gone away; see
     *               {@link Service#onStartCommand}
     *               for details.
     */
    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        long endTime=System.currentTimeMillis()+20*1000;
        Uri data=intent.getData();
        
        String dataString= intent.getDataString();//得到请求url
        Log.e(">>>>>>>>",dataString);

        //可处理耗时任务，模拟耗时任务执行
        while (System.currentTimeMillis()<endTime){
            synchronized (this){
                try{
                    Log.e(">>>>>>>>",""+(endTime-System.currentTimeMillis()));
                    wait(endTime-System.currentTimeMillis());
                }catch (Exception e){
                }
            }
        }
        Log.e(">>>>>>>>","run finish");
        int status=1;
        localIntent=new Intent(TestConstants.BROADCAST_ACTION).putExtra(TestConstants.EXTENDED_DATA_STATUS,status);

        //获取LocalBroadcastManager的实例并发送广播，表示耗时任务执行完成，并把
        //完成状态发送出去
        LocalBroadcastManager.getInstance(this).sendBroadcast(localIntent);
    }
}
