package com.test;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;
/**
 * Created by Administrator on 2018/2/2.
 */
public class BindService extends Service{
    private int count;
    private boolean quit;
    private MyBinder binder=new MyBinder();
    public class MyBinder extends Binder{
        public MyBinder() {
            super();
        }
        public int getCount(){
            return count;
        }


    }
    /**
     * Return the communication channel to the service.  May return null if
     * clients can not bind to the service.  The returned
     * {@link IBinder} is usually for a complex interface
     * that has been <a href="{@docRoot}guide/components/aidl.html">described using
     * aidl</a>.
     * <p>
     * <p><em>Note that unlike other application components, calls on to the
     * IBinder interface returned here may not happen on the main thread
     * of the process</em>.  More information about the main thread can be found in
     * <a href="{@docRoot}guide/topics/fundamentals/processes-and-threads.html">Processes and
     * Threads</a>.</p>
     *
     * @param intent The Intent that was used to bind to this service,
     *               as given to {@link Context#bindService
     *               Context.bindService}.  Note that any extras that were included with
     *               the Intent at that point will <em>not</em> be seen here.
     * @return Return an IBinder through which clients can call on to the
     * service.
     */
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.e(">>>>>>>>>","Service is Binded");
        return binder;
    }
    @Override
    public void onCreate() {
        super.onCreate();
        //服务创建
        Log.e(">>>>>>>>>","Service is created");
        //启动一条线程
        new Thread(){
            @Override
            public void run() {
                while (!quit){
                    try {
                         Thread.sleep(1000);
                    }catch (InterruptedException e){
                    }
                    count++;
                }
            }
        }.start();
    }

    @Override
    public boolean onUnbind(Intent intent) {
        //Service 被断开连接
        Log.e(">>>>>>>>>","Service is unBinded");
        return true;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.e(">>>>>>>>>","Service is onDestroy");
    }
}
