package com.nativemoduleproject.uicomponent

import android.net.Uri
import android.util.Log
import android.widget.MediaController
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class VideoViewManager(val reactContext: ReactApplicationContext) : SimpleViewManager<MyVideoView>() {

    private val mediaController = MediaController(reactContext.currentActivity)

    override fun getName(): String = "VideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): MyVideoView {
        return MyVideoView(reactContext)
    }

    @ReactProp(name = "url")
    fun setVideoPath(videoView: MyVideoView, urlPath: String): Unit {
        val uri = Uri.parse(urlPath)

        videoView.setVideoURI(uri)
        videoView.requestFocus()

        mediaController.setAnchorView(videoView)
        videoView.setMediaController(mediaController)

    }

    @ReactProp(name = "play")
    fun setPlay(videoView: MyVideoView, isPlay: Boolean) {
        videoView.setOnPreparedListener { mp ->
            if (isPlay) mp.start()
            Log.e("ASD", "mediaPlayer prepared ${mp.isPlaying}")
        }

        videoView.setOnCompletionListener {
            videoView.dispatchOnEnd()
        }
    }

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return MapBuilder.builder<String, Any>()
                .put("onEnd",
                        MapBuilder.of("registrationName", "onEnd"))
                .build()
    }

}