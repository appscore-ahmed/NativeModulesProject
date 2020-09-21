package com.nativemoduleproject.uicomponent

import android.media.MediaPlayer
import android.net.Uri
import android.os.AsyncTask
import android.util.Log
import android.view.View
import android.widget.MediaController
import android.widget.VideoView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import kotlin.math.floor

class VideoViewManager(val reactContext: ReactApplicationContext) : SimpleViewManager<MyVideoView>(), MediaPlayer.OnPreparedListener, MediaPlayer.OnCompletionListener, View.OnClickListener {

    private val mediaController = MediaController(reactContext.currentActivity)

    override fun getName(): String = "VideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): MyVideoView {
        return MyVideoView(reactContext)
    }

    private lateinit var _videoView: MyVideoView

    private var isPrepared = false;

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
        Log.e("ASD", "duration: ${videoView.duration}")

        AsyncTask.execute {
            while (true) {
                Log.e("ASD", "Playing")
                videoView.dispatchOnClick(videoView.currentPosition)
            }
        }
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
        isPrepared = true

//        val handler = Handler()
//        val runnable = Runnable {
//            Log.e("ASD", "Playing")
//            handler.postDelayed(this, 2000)
//        }
    }

    override fun onCompletion(mp: MediaPlayer?) {
        Log.e("ASD", "mediaPlayer prepared ${mp?.isPlaying}")
        _videoView.dispatchOnEnd()
    }

    override fun onClick(v: View?) {
        Log.e("ASD", "video clicked")
        _videoView.dispatchOnClick()
    }

    @ReactProp(name = "seek")
    fun seekTo(videoView: VideoView, percentage: Int): Unit {
        if (isPrepared) {
            Log.e("ASD", "duration is : ${videoView.duration}")
            Log.e("ASD", "percentage is : $percentage")
            val percentToMsc = floor((videoView.duration * percentage).toDouble() / 100).toInt()
            Log.e("ASD", "percentage is : $percentToMsc")
            videoView.seekTo(percentToMsc)
        }
    }


}