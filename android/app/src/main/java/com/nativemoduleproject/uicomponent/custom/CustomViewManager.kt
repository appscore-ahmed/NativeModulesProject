package com.nativemoduleproject.uicomponent.custom

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class CustomViewManager(reactContext: ReactApplicationContext): SimpleViewManager<CustomVIew>() {
    override fun getName(): String = "CustomView"

    override fun createViewInstance(reactContext: ThemedReactContext): CustomVIew {
        return CustomVIew(reactContext)
    }
}