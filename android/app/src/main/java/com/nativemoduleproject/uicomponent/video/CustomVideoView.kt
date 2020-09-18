package com.nativemoduleproject.uicomponent.video

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class CustomVideoView(val reactContext: ReactApplicationContext) : SimpleViewManager<VideoControllerView>() {
    override fun getName(): String = "CustomVideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): VideoControllerView {
        return VideoControllerView(reactContext)
    }
}