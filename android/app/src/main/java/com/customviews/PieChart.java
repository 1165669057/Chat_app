package com.customviews;

import android.content.ClipData;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.BlurMaskFilter;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Shader;
import android.util.AttributeSet;
import android.view.View;
import com.chat_app.R;

import java.util.ArrayList;

/**
 * Created by Administrator on 2018/1/15.
 *
 * 绘制什么 canvas处理
 * 如何绘制 Paint 处理
 */
public class PieChart extends View {
    private boolean mShowTextFasker;
    private Integer mTextPos;


    private Paint mTextPaint;//文本画笔
    private Paint mPiePaint;//外圆画笔
    private Paint mShadowPaint;//阴影画笔


    private float mTextHeight=0;//文本高度
    private float mTextWidth=0;//文本宽度

    private Integer mTextColor;//字体颜色

    private RectF mShadowBounds;

    private ArrayList<Item> mData=new ArrayList();
    private int mCurrentItem=0;


    private float mTextX;
    private float mTextY;
    private float mPointerY;
    private float mPointerX;
    private float mPointerSize;
    /**
     * Simple constructor to use when creating a view from code.
     * @param context The Context the view is running in, through which it can
     *                access the current theme, resources, etc.
     */
    public PieChart(Context context,AttributeSet attrs) {
        super(context);
        TypedArray a=context.getTheme().obtainStyledAttributes(attrs, R.styleable.PieChart,0,0);
        try{
            mShowTextFasker=a.getBoolean(R.styleable.PieChart_showTestFaker,false);
            mTextPos=a.getInteger(R.styleable.PieChart_labelPosition,0);
        }finally {
           a.recycle();
        }
        float x = 100;
        float y =200;
        for(int i=0;i<5;i++){
            mData.add(new Item("绘制文本",new Shader(),new RectF(x,y,130-x,260-y),0,10));
        }
        init();
    }
    private void init(){
        mTextPaint=new Paint();//文本的画笔
        mTextColor=0xff526DA5;//设置文本颜色
        mTextPaint.setColor(mTextColor);//设置颜色
        if(mTextHeight==0) {
            mTextHeight =50;//mTextPaint.getTextSize();
        }else{
            mTextHeight=50; //设置文本的大小 值大于0;
        }
        mTextPaint.setTextSize(mTextHeight);//mTextHeight
        //启用这个标志将导致所有支持的操作使用反锯齿
        mPiePaint=new Paint(Paint.ANTI_ALIAS_FLAG);
        //绘制的几何图形填充内部
        mPiePaint.setStyle(Paint.Style.FILL);
        mPiePaint.setColor(0xff101010);
        mPiePaint.setTextSize(mTextHeight);
        mShadowPaint=new Paint(0);
        mShadowPaint.setColor(0xff101010);
        //BlurMaskFilter.Blur.NORMAL在原始边界内外的模糊
        mShadowPaint.setMaskFilter(new BlurMaskFilter(8, BlurMaskFilter.Blur.NORMAL));
        mShadowBounds=new RectF();
        mShadowBounds.set(100,10,10,10);
        mTextX=mTextHeight/2;
        mTextY=mTextHeight;
        mPointerY=20f;
        mPointerX=0f;
        mPointerSize=360;
    }

    public boolean isShowTextFasker(){
        return mShowTextFasker;
    }
    public void setmShowTextFasker(boolean showTextFasker){
        mShowTextFasker=showTextFasker;
        invalidate();
        requestLayout();
    }

    /*
     * 绘制图像,
     */
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
       //canvas.drawOval(mShadowBounds,mShadowPaint);
        //绘制文本 绘制视图
       // canvas.drawText(mData.get(mCurrentItem).getmLabel(), mTextX, mTextY, mTextPaint);
        /*for(int i=0;i<mData.size();++i){
            Item it= (Item) mData.get(i);
            mPiePaint.setShader(it.getmShader());
            canvas.drawArc(it.getmBounds(),-90,
                    120,true, mPiePaint);
        }*/
        canvas.drawArc(mData.get(0).getmBounds(),-90,
                120,false, mPiePaint);
       /*画线
        canvas.drawLine(mTextX, mPointerY, mPointerX, mPointerY, mTextPaint);
        //画圆
        canvas.drawCircle(mPointerX, mPointerY, mPointerSize, mTextPaint);*/
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        int minw=getPaddingLeft()+getPaddingRight()+getSuggestedMinimumWidth();
        //resolv
        //eSizeAndState()用来创建最终的宽高值的。
        // 这个方法比较 view 的期望值与传递给 onMeasure 方法的 spec 值，
        // 然后返回一个合适的View.MeasureSpec值
        //期望的宽度minw
        int w=resolveSizeAndState(minw,widthMeasureSpec,1);
        int minh=MeasureSpec.getSize(w)-(int)mTextWidth+getPaddingBottom()+getPaddingTop();
        int h=resolveSizeAndState(MeasureSpec.getSize(w)-(int)mTextWidth,heightMeasureSpec,0);
        //获取结果
        setMeasuredDimension(w,h);
    }
      /*
         当你的view第一次被赋予一个大小时，或者你的view大小被更改时会被执行。
         在onSizeChanged方法里面计算位置，间距等其他与你的view大小值。
         */
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        //占填充
        float xpad=(float) (getPaddingRight()+getPaddingLeft());
        float ypad=(float)(getPaddingTop()+getPaddingBottom());
        if(mShowTextFasker){
            xpad+=mTextWidth;
        }
        float ww=(float)w-xpad;
        float hh=(float)h-ypad;
        float diameter=Math.min(ww,hh);
    }
}
