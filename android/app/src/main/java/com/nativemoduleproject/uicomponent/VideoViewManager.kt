package com.nativemoduleproject.uicomponent

import android.net.Uri
import android.util.Log
import android.widget.MediaController
import android.widget.VideoView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class VideoViewManager(val reactContext: ReactApplicationContext) : SimpleViewManager<VideoView>() {

    private val mediaController = MediaController(reactContext.currentActivity)

    override fun getName(): String = "VideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): VideoView {
        return VideoView(reactContext)
    }

    @ReactProp(name = "url")
    fun setVideoPath(videoView: VideoView, urlPath: String): Unit {
        val uri = Uri.parse(urlPath)

        videoView.setVideoURI(uri)
        videoView.requestFocus()

        mediaController.setAnchorView(videoView)
        videoView.setMediaController(mediaController)

    }

    @ReactProp(name = "play")
    fun setPlay(videoView: VideoView, isPlay: Boolean) {
        videoView.setOnPreparedListener { mp ->
            if (isPlay) mp.start()
            Log.e("ASD", "mediaPlayer prepared ${mp.isPlaying}")
        }
    }
}