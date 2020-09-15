package com.nativemoduleproject.modules.lifecyclerevent

import com.facebook.react.bridge.*

class LifecycleEventsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
    private var promise: Promise? = null

    override fun getName(): String = "LifecycleEventsModule"

    override fun onHostResume() {
        //Activity Resume
        promise?.resolve("Resume called")
    }

    override fun onHostPause() {
        //Activity Pause
        promise?.resolve("Pause called")
    }

    override fun onHostDestroy() {
        //Activity Destroy
        promise?.resolve("Destroy called")
    }

    @ReactMethod
    fun lifecycle(promise: Promise): Unit {
        this.promise = promise
//        promise.resolve("test")
    }

    init {
        reactContext.addLifecycleEventListener(this)
    }
}