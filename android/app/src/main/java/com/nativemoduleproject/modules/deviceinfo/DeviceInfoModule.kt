package com.nativemoduleproject.modules.deviceinfo

import android.content.Context
import android.net.ConnectivityManager
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceInfoModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val HARDWARE = "Hardware"
        private const val INTERNET = "Internet"
        private const val SDK_VERSION = "SDK_Version"
        private const val ID = "ID"
        private const val DISPLAY = "Display"

    }

    override fun getName(): String {
        return "DeviceInfoModule"
    }


    override fun getConstants(): MutableMap<String, Any> {
        val constants: MutableMap<String, Any> = java.util.HashMap()
        constants[HARDWARE] = "Hardware"
        constants[INTERNET] = "Internet"
        constants[SDK_VERSION] = "SDK_Version"
        constants[ID] = "ID"
        constants[DISPLAY] = "Display"
        return constants
    }

    @ReactMethod
    fun getDeviceInfo(type: String, promise: Promise) {
        var deviceInfo: Any = "Hardware test"
        Log.e("ASD", type)
        when (type) {
            HARDWARE ->
                deviceInfo = Build.HARDWARE
            INTERNET ->
                deviceInfo = getNetworkStatus()
            SDK_VERSION ->
                deviceInfo = Build.VERSION.SDK_INT
            ID ->
                deviceInfo = Build.ID
            DISPLAY ->
                deviceInfo = Build.DISPLAY

        }
        promise.resolve(deviceInfo)
    }

    private fun getNetworkStatus(): Boolean {
        val connectingManager =
                reactApplicationContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val mNetworkInfo = connectingManager.activeNetworkInfo
        return mNetworkInfo != null && mNetworkInfo.isAvailable && mNetworkInfo.isConnected
    }
}
