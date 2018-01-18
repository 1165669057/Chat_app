package com.customviews;

import android.graphics.RectF;
import android.graphics.Shader;

/**
 * Created by Administrator on 2018/1/16.
 *
 */
public class Item {
    private String mLabel;
    private Shader mShader;
    private RectF mBounds;
    private float mEndAngle;
    private float mStartAngle;
    //public Item(){}
    public Item(String mLabel,Shader mShader,RectF mBounds,float mEndAngle,float mStartAngle){
           this.mLabel=mLabel;
           this.mBounds=mBounds;
           this.mEndAngle=mEndAngle;
           this.mStartAngle=mStartAngle;
           this.mShader=mShader;
    }
    public void setmLabel(String mLabel) {
        this.mLabel = mLabel;
    }
    public String getmLabel() {
        return mLabel;
    }
    public void setmShader(Shader mShader) {
        this.mShader = mShader;
    }
    public Shader getmShader() {
        return mShader;
    }
    public void setmBounds(RectF mBounds) {
        this.mBounds = mBounds;
    }

    public RectF getmBounds() {
        return mBounds;
    }

    public void setmEndAngle(float mEndAngle) {
        this.mEndAngle = mEndAngle;
    }
    public float getmEndAngle() {
        return mEndAngle;
    }
    public void setmStartAngle(float mStartAngle) {
        this.mStartAngle = mStartAngle;
    }
    public float getmStartAngle() {
        return mStartAngle;
    }
}
