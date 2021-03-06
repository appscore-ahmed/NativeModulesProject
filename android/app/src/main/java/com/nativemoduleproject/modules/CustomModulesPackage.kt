package com.nativemoduleproject.modules

import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.nativemoduleproject.modules.camera.CameraNativeModule
import com.nativemoduleproject.modules.deviceinfo.DeviceInfoModule
import com.nativemoduleproject.modules.geolocation.GeolocationModule
import com.nativemoduleproject.modules.imagepicker.ImagePickerModule
import com.nativemoduleproject.modules.lifecyclerevent.LifecycleEventsModule
import com.nativemoduleproject.modules.share.ShareModule
import com.nativemoduleproject.modules.toast.ToastModule
import com.nativemoduleproject.uicomponent.custom.CustomViewManager
import com.nativemoduleproject.uicomponent.VideoViewManager
import com.nativemoduleproject.uicomponent.video.CustomVideoView
import kotlin.collections.ArrayList


class CustomModulesPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val views: MutableList<ViewManager<*, *>> = ArrayList()
        views.add(VideoViewManager(reactContext))
        views.add(CustomViewManager(reactContext))
        views.add(CustomVideoView(reactContext))
        return views
    }

    override fun createNativeModules(
            reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(ToastModule(reactContext))
        modules.add(CameraNativeModule(reactContext))
        modules.add(DeviceInfoModule(reactContext))
        modules.add(GeolocationModule(reactContext))
        modules.add(ShareModule(reactContext))
        modules.add(ImagePickerModule(reactContext))
        modules.add(LifecycleEventsModule(reactContext))
        for (m in modules) {
            Log.e("ASDD", m.name)
        }
        return modules
    }
}
