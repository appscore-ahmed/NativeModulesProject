package com.nativemoduleproject.uicomponent

import android.util.Log
import android.widget.VideoView
import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class MyVideoView(val reactContext: ThemedReactContext) : VideoView(reactContext) {

    fun dispatchOnEnd(): Unit {
        Log.e("ASD", "dispatchOnEnd called")
        val event = Arguments.createMap()
        event.putString("message", "this is message")
        reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(id, "onEnd", event)
    }
}