package com.nativemoduleproject.uicomponent.custom

import android.widget.LinearLayout
import com.facebook.react.uimanager.ThemedReactContext
import com.nativemoduleproject.R

class CustomVIew(val reactContext: ThemedReactContext) : LinearLayout(reactContext) {

    init {
        inflate(reactContext, R.layout.rn_layout, this)
    }
}