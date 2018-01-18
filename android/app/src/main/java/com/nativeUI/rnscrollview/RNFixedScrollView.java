package com.nativeUI.rnscrollview;

/**
 * Created by admin on 2017/3/18.
 */

import android.content.Context;
import android.graphics.Rect;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ScrollView;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.uimanager.MeasureSpecAssertions;
import com.facebook.react.uimanager.ReactClippingViewGroup;
import com.facebook.react.uimanager.ReactClippingViewGroupHelper;
import com.facebook.react.uimanager.events.NativeGestureUtil;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ReactScrollViewHelper;


import javax.annotation.Nullable;

/**
 * A simple subclass of ScrollView that doesn't dispatch measure and layout to its children and has
 * a scroll listener to send scroll events to JS.
 * <p/>
 * <p>ReactScrollView only supports vertical scrolling. For horizontal scrolling,
 * use { ReactHorizontalScrollView }.
 */
public class RNFixedScrollView extends ScrollView implements ReactClippingViewGroup {

    private final static String TAG = "RNFixedScrollView:";
    private final OnScrollDispatchHelper mOnScrollDispatchHelper = new OnScrollDispatchHelper();

    private
    @Nullable
    Rect mClippingRect;
    private boolean mDoneFlinging;
    private boolean mDragging;
    private boolean mFlinging;
    private boolean mRemoveClippedSubviews;
    private boolean mScrollEnabled = true;
    private boolean mSendMomentumEvents;
    private boolean isIntercept = false;
    private boolean isbottom = true;
    private int measureWidth;
    private float x1, x2, y1, y2;
    private ScrollView scrollView = null;

    public RNFixedScrollView(Context context) {
        super(context);
    }

    public void setSendMomentumEvents(boolean sendMomentumEvents) {
        mSendMomentumEvents = sendMomentumEvents;
    }

    public void setScrollEnabled(boolean scrollEnabled) {
        mScrollEnabled = scrollEnabled;
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        MeasureSpecAssertions.assertExplicitMeasureSpec(widthMeasureSpec, heightMeasureSpec);
        measureWidth = MeasureSpec.getSize(widthMeasureSpec);
        setMeasuredDimension(
                MeasureSpec.getSize(widthMeasureSpec),
                MeasureSpec.getSize(heightMeasureSpec));
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        // Call with the present values in order to re-layout if necessary
        scrollTo(getScrollX(), getScrollY());
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (mRemoveClippedSubviews) {
            updateClippingRect();
        }
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (mRemoveClippedSubviews) {
            updateClippingRect();
        }
    }

    @Override
    protected void onScrollChanged(int x, int y, int oldX, int oldY) {
        super.onScrollChanged(x, y, oldX, oldY);

        if (mOnScrollDispatchHelper.onScrollChanged(x, y)) {
            if (mRemoveClippedSubviews) {
                updateClippingRect();
            }

            if (mFlinging) {
                mDoneFlinging = false;
            }
            ReactScrollViewHelper.emitScrollEvent(this);
        }
    }

    /***
     * 如果一个子View不拦截父view或者他的祖先View时回调
     * onInterceptTouchEvent(MotionEvent).
     *
     * @param disallowIntercept
     */
    @Override
    public void requestDisallowInterceptTouchEvent(boolean disallowIntercept) {
       // LogUtil.d("disallowIntercept" + disallowIntercept);
    }
    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (!mScrollEnabled) {
            return false;
        }

        int action = ev.getAction();
        if (action == MotionEvent.ACTION_DOWN) {
            //当手指按下的时候
            x1 = ev.getX();
            y1 = ev.getY();
            scrollView = findScrollView(this);
            isIntercept=false;
        }
        if ((action == MotionEvent.ACTION_MOVE) || (action == MotionEvent.ACTION_UP)) {
            //当手指移动或者抬起的时候计算其值
            x2 = ev.getX();
            y2 = ev.getY();
            //是否到底部 默认为已到底部
            isbottom = isAtBottom();
            //向上移动
            if (y1 - y2 > 0) {
                if (scrollView != null) {
                    int st = scrollView.getScrollY();
                    if (!isbottom) {
                        isIntercept = true;
                    } else if (isbottom) {
                        isIntercept = false;
                    }
                    return isIntercept;
                }
            } else if (y2 - y1 > 0) {
                if (scrollView != null) {
                    int st = scrollView.getScrollY();
                    if (!isbottom) {
                        isIntercept = true;
                    } else if (isbottom) {
                        if(st==0) {
                            isIntercept = true;
                        }else
                        {
                            isIntercept = false;
                        }
                    }
                    return isIntercept;
                }
            }
        }
        //不加的话 ReactScrollView滑动不了
        if (super.onInterceptTouchEvent(ev)) {
            NativeGestureUtil.notifyNativeGestureStarted(this, ev);
            ReactScrollViewHelper.emitScrollBeginDragEvent(this);
            mDragging = true;
            return true;
        }
        return isIntercept;
    }

    /**
     * 从当前页面中查找第一个ScrollView控件
     *
     * @param group
     * @return
     */
    private ScrollView findScrollView(ViewGroup group) {
        if (group != null) {
            for (int i = 0, j = group.getChildCount(); i < j; i++) {
                View child = group.getChildAt(i);
                if (child instanceof ScrollView) {
                    //获取view在整个屏幕中的坐标如果x==0的话代表这个scrollview是正在显示
                    int[] location = new int[2];
                    child.getLocationOnScreen(location);
                    System.out.print("locationx:" + location[0] + ",locationy:" + location[1]);
                    if (location[0] == 0)
                        return (ScrollView) child;
                    else
                        continue;

                } else if (child instanceof ViewGroup) {
                    ScrollView result = findScrollView((ViewGroup) child);
                    if (result != null)
                        return result;
                }
            }
        }
        return null;
    }

    public boolean isAtBottom() {
        return getScrollY() == getChildAt(getChildCount() - 1).getBottom() + getPaddingBottom() - getHeight();
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        if (!mScrollEnabled) {
            return false;
        }

        int action = ev.getAction() & MotionEvent.ACTION_MASK;
        if (action == MotionEvent.ACTION_UP && mDragging) {
            ReactScrollViewHelper.emitScrollEndDragEvent(this);
            mDragging = false;
        }
        return super.onTouchEvent(ev);
    }

    @Override
    public void setRemoveClippedSubviews(boolean removeClippedSubviews) {
        if (removeClippedSubviews && mClippingRect == null) {
            mClippingRect = new Rect();
        }
        mRemoveClippedSubviews = removeClippedSubviews;
        updateClippingRect();
    }

    @Override
    public boolean getRemoveClippedSubviews() {
        return mRemoveClippedSubviews;
    }

    @Override
    public void updateClippingRect() {
        if (!mRemoveClippedSubviews) {
            return;
        }

        Assertions.assertNotNull(mClippingRect);

        ReactClippingViewGroupHelper.calculateClippingRect(this, mClippingRect);
        View contentView = getChildAt(0);
        if (contentView instanceof ReactClippingViewGroup) {
            ((ReactClippingViewGroup) contentView).updateClippingRect();
        }
    }

    @Override
    public void getClippingRect(Rect outClippingRect) {
        outClippingRect.set(Assertions.assertNotNull(mClippingRect));
    }

    @Override
    public void fling(int velocityY) {
        super.fling(velocityY);
        if (mSendMomentumEvents) {
            mFlinging = true;
            ReactScrollViewHelper.emitScrollMomentumBeginEvent(this);
            Runnable r = new Runnable() {
                @Override
                public void run() {
                    if (mDoneFlinging) {
                        mFlinging = false;
                        ReactScrollViewHelper.emitScrollMomentumEndEvent(RNFixedScrollView.this);
                    } else {
                        mDoneFlinging = true;
                        RNFixedScrollView.this.postOnAnimationDelayed(this, ReactScrollViewHelper.MOMENTUM_DELAY);
                    }
                }
            };
            postOnAnimationDelayed(r, ReactScrollViewHelper.MOMENTUM_DELAY);
        }
    }
}