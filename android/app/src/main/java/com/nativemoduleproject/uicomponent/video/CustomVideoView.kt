package com.nativemoduleproject.uicomponent.video

import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.util.Log
import android.view.MotionEvent
import android.view.SurfaceHolder
import android.view.SurfaceView
import android.widget.FrameLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.nativemoduleproject.R
import java.io.IOException

class CustomVideoView(val reactContext: ReactApplicationContext) : SimpleViewManager<VideoControllerView>(),
        SurfaceHolder.Callback,
        MediaPlayer.OnPreparedListener, VideoControllerView.MediaPlayerControl {
    override fun getName(): String = "CustomVideoView"

    override fun createViewInstance(reactContext: ThemedReactContext): VideoControllerView {
        return VideoControllerView(reactContext)
    }

    private var videoSurface: SurfaceView? = null
    private var player: MediaPlayer? = null
    private var controller: VideoControllerView? = null
    private val context = reactContext.currentActivity?.applicationContext

    init {

    }

    @ReactProp(name = "url")
    fun setVideo(view: VideoControllerView, url: String) {
        try {
            videoSurface = reactContext.currentActivity?.findViewById(R.id.videoSurface) as SurfaceView
            val videoHolder = videoSurface?.holder
            videoHolder?.addCallback(this)

            player = MediaPlayer()
            controller = VideoControllerView(context!!)


            player?.setAudioStreamType(AudioManager.STREAM_MUSIC)
            player?.setDataSource(context.applicationContext!!, Uri.parse(url))
            player?.setOnPreparedListener(this)
        } catch (e: IllegalArgumentException) {
            e.printStackTrace()
        } catch (e: SecurityException) {
            e.printStackTrace()
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    override fun onPrepared(mp: MediaPlayer?) {
        controller?.setMediaPlayer(this)
        controller?.setAnchorView(reactContext.currentActivity?.findViewById(R.id.videoSurfaceContainer) as FrameLayout)
        Log.e("ASD", "onPrepared called")
        player?.start()
    }

    override fun surfaceChanged(holder: SurfaceHolder?, format: Int, width: Int, height: Int) {}

    override fun surfaceCreated(holder: SurfaceHolder?) {
        player?.setDisplay(holder)
        player?.prepareAsync()
    }

    override fun surfaceDestroyed(holder: SurfaceHolder?) {}


    override fun canPause(): Boolean {
        return true
    }

    override fun canSeekBackward(): Boolean {
        return true
    }

    override fun canSeekForward(): Boolean {
        return true
    }

    override val isFullScreen: Boolean
        get() = false

    override fun pause() {
        player?.pause()
    }

    override val duration: Int
        get() = player?.duration!!

    override val currentPosition: Int
        get() = player?.currentPosition!!

    override fun seekTo(i: Int) {
        player?.seekTo(i)
    }

    override val isPlaying: Boolean
        get() = player?.isPlaying!!

    override val bufferPercentage: Int
        get() = 0

    override fun start() {
        player?.start()
    }

    override fun toggleFullScreen() {}

    fun onTouchEvent(event: MotionEvent?): Boolean {
        controller?.show()
        return false
    }
}