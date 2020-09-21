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
        /*Custom event, register in VideoViewManager class using
        * getExportedCustomDirectEventTypeConstants or other 'direct' method.*/
    }

    fun dispatchOnFileLoaded(): Unit {
        Log.e("ASD", "dispatchOnEnd called")
        val event = Arguments.createMap()
        event.putString("message", "file is loaded")
        reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(id, "topLoadingFinish", event)
        /*topLoadingFinish is declared in UIManageModuleConstants.java file.
        * You do need to register this in VideoViewManager class using
        * getExportedCustomDirectEventTypeConstants or other method.
        * It is already registered.*/
    }
    fun dispatchOnClick(): Unit {
                Log.e("ASD", "dispatchOnClick called")
        val event = Arguments.createMap()
        event.putString("message", "clicked")
        reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(id, "topClick", event)
    }
}