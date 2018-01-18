package com.nativeModul.MultiImageSlector.bean;

import android.text.TextUtils;



import java.util.List;

/**
 * 文件夹
 * Created by Nereo on 2015/4/7.
 */
public class Folder {
    public String name;
    public String path;
    public com.nativeModul.MultiImageSlector.bean.Image cover;
    public List<com.nativeModul.MultiImageSlector.bean.Image> images;

    @Override
    public boolean equals(Object o) {
        try {
            Folder other = (Folder) o;
            return TextUtils.equals(other.path, path);
        }catch (ClassCastException e){
            e.printStackTrace();
        }
        return super.equals(o);
    }
}
