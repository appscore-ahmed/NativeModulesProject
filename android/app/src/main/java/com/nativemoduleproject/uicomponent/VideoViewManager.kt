package com.nativemoduleproject.uicomponent

import android.net.Uri
import android.widget.VideoView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class VideoViewManager(reactContext: ReactApplicationContext) : SimpleViewManager<VideoView>() {
    override fun getName(): String = "VideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): VideoView {
        return VideoView(reactContext)
    }

    @ReactProp(name = "url")
    fun setVideoPath(videoView: VideoView, urlPath: String): Unit {
        val uri = Uri.parse(urlPath)
        videoView.setVideoURI(uri)
        videoView.start()
    }
}