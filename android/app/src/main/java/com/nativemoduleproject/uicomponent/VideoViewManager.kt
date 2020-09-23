package com.nativemoduleproject.uicomponent

import android.media.MediaPlayer
import android.net.Uri
import android.util.Log
import android.view.View
import android.widget.MediaController
import android.widget.VideoView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class VideoViewManager(val reactContext: ReactApplicationContext) : SimpleViewManager<MyVideoView>(), MediaPlayer.OnPreparedListener, MediaPlayer.OnCompletionListener, View.OnClickListener {

    override fun getName(): String = "VideoView"
    private lateinit var _videoView: MyVideoView
    private var isPrepared = false;
    private lateinit var globalThread: Thread
    private var isUserDragging = false
    private var duration = 0

    private val mediaController = MediaController(reactContext.currentActivity)

    override fun createViewInstance(reactContext: ThemedReactContext): MyVideoView {
        return MyVideoView(reactContext)
    }

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
    }

    @ReactProp(name = "play")
    fun setPlay(videoView: MyVideoView, isPlay: Boolean) {
        if (isPlay) {
            videoView.start()
            runProgressFeeder(videoView)
        } else {
            isUserDragging = true
            videoView.pause()
            globalThread.interrupt()
            Log.e("ASDD", "video is pause $isUserDragging")
        }
    }

    override fun onPrepared(mp: MediaPlayer?) {
        Log.e("bbb", "mediaPlayer prepared ${mp?.isPlaying}")
        _videoView.dispatchOnFileLoaded()
        isPrepared = true
        duration = _videoView.duration
        _videoView.dispatchTotalProgress(duration)
    }

    override fun onCompletion(mp: MediaPlayer?) {
        Log.e("ASD", "mediaPlayer prepared ${mp?.isPlaying}")
        _videoView.dispatchOnEnd()
        globalThread.interrupt()
    }

    override fun onClick(v: View?) {
        Log.e("ASD", "video clicked")
        _videoView.dispatchOnClick()
    }

    @ReactProp(name = "seek")
    fun seekTo(videoView: VideoView, progress: Int): Unit {
        Log.e("ASD", "isUserDragging : ${isUserDragging}")
        if (isPrepared && isUserDragging) {
            Log.e("seek", "percentage is : $progress")
            videoView.seekTo(progress)
            isUserDragging = false
        }
    }

    private fun runProgressFeeder(videoView: MyVideoView) {
        val runnable = Runnable {

            while (true) {
                Log.e("ASD", "running")
                if (isPrepared) {
//                    Log.e("ASD", "Playing")
//                    Log.e("ASD", "duration: $duration")
//                    Log.e("ASD", "${videoView.currentPosition}")
                    val current = videoView.currentPosition
                    val isPlaying = videoView.isPlaying

                    if (duration != 0 && current > 1) {
                        Log.e("ASDD", "playing >>>> $isPlaying")
                        videoView.dispatchProgressStatus(current)
                    }

                    try {
                        Thread.sleep(100)
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                        break;
                    }
                }
            } /*while (videoView.currentPosition < duration)*/

        }
        val thread = Thread(runnable)
        globalThread = thread
        thread.start()
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
                .put("onProgress", MapBuilder.of("registrationName", "onProgress"))
                .put("totalProgress", MapBuilder.of("registrationName", "totalProgress"))
                .build()
    }
}