package com.rong.chatFragment;

import android.content.Intent;

import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.database.Cursor;
import android.icu.util.Calendar;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.provider.ContactsContract;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.chat_app.R;
import com.rong.utils.NToast;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2018/1/31.
 */
public class MineFragment extends Fragment implements ViewGroup.OnClickListener{
    private Button testCall,email,calendar,map,chooser,contact;
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
                Intent pickContactIntent=new Intent(Intent.ACTION_PICK,Uri.parse("content://contacts"));
                pickContactIntent.setType(ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE);
                startActivityForResult(pickContactIntent,PICK_CONTACT_REQUEST);
                break;
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_CONTACT_REQUEST) {
            // Make sure the request was successful
            if (resultCode == getActivity().RESULT_OK) {
                Uri  contactUri=data.getData();
                String[] projection={
                        ContactsContract.CommonDataKinds.Phone.NUMBER
                };
                //得到游标
                Cursor cursor = getActivity().getContentResolver()
                        .query(contactUri, projection, null, null, null);
                //将游标移到第一行。
                cursor.moveToFirst();
                // Retrieve the phone number from the NUMBER column
                int column = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                String number = cursor.getString(column);//数组越界
                NToast.showToast(getActivity(),number, Toast.LENGTH_LONG);
            }
        }
    }
}
