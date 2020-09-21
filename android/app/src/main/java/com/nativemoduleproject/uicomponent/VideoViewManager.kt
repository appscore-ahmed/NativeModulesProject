package com.nativemoduleproject.uicomponent

import android.media.MediaPlayer
import android.net.Uri
import android.util.Log
import android.view.View
import android.widget.MediaController
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class VideoViewManager(val reactContext: ReactApplicationContext) : SimpleViewManager<MyVideoView>(), MediaPlayer.OnPreparedListener, MediaPlayer.OnCompletionListener, View.OnClickListener {

    private val mediaController = MediaController(reactContext.currentActivity)

    override fun getName(): String = "VideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): MyVideoView {
        return MyVideoView(reactContext)
    }

    private lateinit var _videoView: MyVideoView

    @ReactProp(name = "url")
    fun setVideoPath(videoView: MyVideoView, urlPath: String): Unit {
        val uri = Uri.parse(urlPath)

        _videoView = videoView
        videoView.setOnPreparedListener(this)
        videoView.setOnCompletionListener(this)
        videoView.setOnClickListener(this)

        videoView.setVideoURI(uri)
        videoView.requestFocus()

        mediaController.setAnchorView(videoView)
//        videoView.setMediaController(mediaController)

    }

    @ReactProp(name = "play")
    fun setPlay(videoView: MyVideoView, isPlay: Boolean) {
        if (isPlay) videoView.start()
        else videoView.pause()
    }

    /*They basically do the same thing but in a different way.
    Bubbling is intended for a parent component to intercept
    and make functional change based on the action like
    “User just tapped on this box, what do i do now?“. Direct
     is more intended for abstract events like “image failed to load”*/
    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return MapBuilder.builder<String, Any>()
                .put("onEnd",
                        MapBuilder.of("registrationName", "onEnd"))
                .build()
    }

    override fun onPrepared(mp: MediaPlayer?) {
        Log.e("ASD", "mediaPlayer prepared ${mp?.isPlaying}")
        _videoView.dispatchOnFileLoaded()

        /*       val childs = mediaController.childCount
       for (i in 0 until childs) {
           val child: View = mediaController.getChildAt(i)
           child.visibility = View.GONE
       }*/

/*            val child = (mediaController.getChildAt(0) as LinearLayout)
            val child2 = (child.getChildAt(0) as LinearLayout)
            val child3 = child2.getChildAt(2)
            child3.visibility = View.GONE*/
    }

    override fun onCompletion(mp: MediaPlayer?) {
        Log.e("ASD", "mediaPlayer prepared ${mp?.isPlaying}")
        _videoView.dispatchOnEnd()
    }

    override fun onClick(v: View?) {
        Log.e("ASD", "video clicked")
        _videoView.dispatchOnClick()
    }

}