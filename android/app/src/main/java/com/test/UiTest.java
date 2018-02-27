package com.test;

import android.app.Activity;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.adapter.MyAdapter;
import com.chat_app.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Administrator on 2018/2/27.
 */
public class UiTest extends Activity {
    private RecyclerView recyclerView;
    private LinearLayoutManager mLayoutManager;
    private MyAdapter myAdapter;
    List<HashMap<String,Object>> mapList=new ArrayList<>();
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.uitest_layout);
        initional();
    }
    private void initional() {
        recyclerView=findViewById(R.id.myrecyle);
        recyclerView.setHasFixedSize(true);
        mLayoutManager=new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);
        giveData();
        myAdapter=new MyAdapter(mapList,this);
        recyclerView.setAdapter(myAdapter);
    }
    private  void giveData(){
        for (int i=0;i<100;i++){
            HashMap map=new HashMap();
            map.put("imgurl","www..");
            map.put("name","green");
            mapList.add(map);
        }
    }
}
