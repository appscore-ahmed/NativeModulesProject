package com.nativemoduleproject.modules.share

import android.content.Intent
import android.util.Log
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File


class ShareModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ShareModule"
    }

    override fun canOverrideExistingModule(): Boolean {
        return true
    }

    @ReactMethod
    fun share(data: String, shareType: String): Unit {

        val params = Arguments.createMap()
        params.putString("share", "ShareSheet opening")
        Log.e("ASD", data)
        val intent = Intent().apply {
            action = Intent.ACTION_SEND
            when (shareType) {
                "text" -> {
                    putExtra(Intent.EXTRA_TEXT, data)
                    type = "text/*"
                }
                "image" -> {
                    val strippedPath = data.substringAfter("file://")
                    Log.e("ASD", strippedPath)
                    putExtra(Intent.EXTRA_STREAM,
                            FileProvider.getUriForFile(reactContext,
                                    reactContext.packageName + ".fileprovider",
                                    File(strippedPath)))
                    type = "image/*"
                }
            }
        }
        val shareIntent = Intent.createChooser(intent, null)
        shareIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(shareIntent)
        sendEvent(reactContext, "EventReminder", params)
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap): Unit {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

}