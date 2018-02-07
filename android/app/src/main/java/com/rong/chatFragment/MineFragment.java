package com.rong.chatFragment;

import android.content.CursorLoader;
import android.content.Intent;

import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.icu.util.Calendar;
import android.icu.util.ULocale;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.provider.ContactsContract;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.chat_app.R;
import com.rong.ChatMain;
import com.rong.utils.NToast;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import io.rong.imlib.model.Conversation;

/**
 * Created by Administrator on 2018/1/31.
 */
public class MineFragment extends Fragment implements ViewGroup.OnClickListener{
    private Button testCall,email,calendar,map,chooser,contact,enterNext;
    private View mView;
    private static final int PICK_CONTACT_REQUEST=1000;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         mView=inflater.inflate(R.layout.mine_frgment_layout,container,false);
         initIDView();
        return mView;
    }
    private void initIDView() {
        testCall=mView.findViewById(R.id.testCall);
        email=mView.findViewById(R.id.email);
        calendar=mView.findViewById(R.id.calendar);
        map=mView.findViewById(R.id.map);
        chooser=mView.findViewById(R.id.chooser);
        contact=mView.findViewById(R.id.contact);
        enterNext=mView.findViewById(R.id.enterNext);
        enterNext.setOnClickListener(this);
        email.setOnClickListener(this);
        map.setOnClickListener(this);
        contact.setOnClickListener(this);
        testCall.setOnClickListener(this);
        calendar.setOnClickListener(this);
        chooser.setOnClickListener(this);
    }

    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.testCall:
               //call
               /*
                  Uri number = Uri.parse("tel:13667932531");
                  Intent callIntent = new Intent(Intent.ACTION_DIAL, number);
               */
                //browse webpage
                Uri webpage = Uri.parse("http://www.android.com");
                Intent webIntent = new Intent(Intent.ACTION_VIEW, webpage);
                getActivity().startActivity(webIntent);
                break;
            case R.id.email:
                break;
            case R.id.calendar:
                break;
            case R.id.map:
               // Build the intent
                Uri location = Uri.parse("geo:0,0?q=1600+Amphitheatre+Parkway,+Mountain+View,+California");
                Intent mapIntent = new Intent(Intent.ACTION_VIEW, location);
               // Verify it resolves
                PackageManager packageManager = getActivity().getPackageManager();
                List<ResolveInfo> activities = packageManager.queryIntentActivities(mapIntent, 0);
                boolean isIntentSafe = activities.size() > 0;
              // Start an activity if it's safe
                if (isIntentSafe) {
                    startActivity(mapIntent);
                }
                break;
            case R.id.chooser:
                Intent intent = new Intent(Intent.ACTION_SEND);
                String title ="share"; //getResources().getText(R.string.chooser_title);
                    // Create and start the chooser
                Intent chooser = Intent.createChooser(intent, title);
                startActivity(chooser);
                break;
            case R.id.contact:
                //Intent pickContactIntent=new Intent(Intent.ACTION_GET_CONTENT);
                Intent pickContactIntent=new Intent(Intent.ACTION_PICK,Uri.parse("content://contacts"));
                pickContactIntent.setType(ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE);
               //pickContactIntent.setType("vnd.android.cursor.item/phone");
                startActivityForResult(pickContactIntent,PICK_CONTACT_REQUEST);
                break;
            case R.id.enterNext:
                 //隐式跳转，安卓组件内通信，
                //一般来说 ，service 和Activity 都有生命周期，它们是在同一进程内的，
                // 通过intent 传值,广播负责注册和接收，
                //它有独立的进程，主要负责
                String hashName=Conversation.ConversationType.PRIVATE.getName();
                Intent mIntentTo=new Intent(Intent.ACTION_VIEW);
                Uri muri=Uri.parse("test://com.chat_app").buildUpon().
                         appendPath("mainshow")
                           .appendQueryParameter("targetId", "1001")
                    .appendQueryParameter("title", "test").build();
                mIntentTo.setData(muri);
                //判断隐式跳转，是否有Activity响应
                if (mIntentTo.resolveActivity(getActivity().getPackageManager()) != null)
                {
                    startActivityForResult(mIntentTo,500);
                }
                break;
        }
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == getActivity().RESULT_OK&&requestCode==500) {
            NToast.showToast(getActivity(),data.getDataString(),Toast.LENGTH_LONG);
        }

        if (requestCode == PICK_CONTACT_REQUEST){
            // Make sure the request was successful
            if (resultCode == getActivity().RESULT_OK) {
                //get the return data
                Uri contactData=data.getData();
                NToast.showToast(getActivity(), data.getDataString(), Toast.LENGTH_LONG);
                CursorLoader cursorLoader=new CursorLoader(getActivity(),contactData,null,null,null,null);
                // query the info about contact
                Cursor cursor =cursorLoader.loadInBackground();
                if(cursor.moveToFirst()){
                    String contactId=cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                    String name=cursor.getString(cursor.getColumnIndexOrThrow(ContactsContract.Contacts.DISPLAY_NAME));
                    //  query the  detail info
                    Cursor phones=getActivity().getContentResolver().query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID+"="+
                                    contactId,null,null
                    );
                    String phoneNumber="null";
                    if(phones.moveToFirst()){
                            //get the phoneNumber
                        phoneNumber =phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    }
                    phones.close();
                    NToast.showToast(getActivity(),name+"-"+phoneNumber, Toast.LENGTH_LONG);
                }
                cursor.close();
            }
        }
    }
}
