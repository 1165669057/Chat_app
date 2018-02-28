package com.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.chat_app.R;

import java.util.HashMap;
import java.util.List;

/**
 * Created by Administrator on 2018/2/28.
 */

public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.ViewHolder>{
    private String[] mDataset;
    List<HashMap<String,Object>> mList;
    Context context;
    /*
       静态类，改变
     */
    public static class ViewHolder extends RecyclerView.ViewHolder{
        public TextView mTextView;
        public ImageView imageView;
        public ViewHolder(View itemView) {
            super(itemView);
            imageView=itemView.findViewById(R.id.head);
            mTextView=itemView.findViewById(R.id.mtext);
        }
    }
    public RecyclerAdapter(List<HashMap<String,Object>> list,Context mcontext){
        mList=list;
        context=mcontext;
    }
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
         View v= LayoutInflater.from(context).inflate(R.layout.item_recyle,parent,false);
        ViewHolder vh=new ViewHolder(v);
        return vh;
    }
    int mi=0;
    @Override
    public void onBindViewHolder(final ViewHolder  holder, final int position) {
        holder.mTextView.setText((String)mList.get(position).get("name"));
        Log.e(">>>>>>>>>>>>>>",""+mi);
        mi++;
        holder.mTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.mTextView.setText("aa");
                HashMap curmap= mList.get(position);
                curmap.put("name","aa");
                //notifyDataSetChanged();//全局刷新
                notifyItemChanged(position);
            }
        });
    }
    @Override
    public int getItemCount() {
        return mList.size();
    }
}
