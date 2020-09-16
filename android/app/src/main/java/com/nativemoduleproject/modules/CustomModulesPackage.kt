package com.nativemoduleproject.modules

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.nativemoduleproject.modules.camera.CameraModule
import com.nativemoduleproject.modules.deviceinfo.DeviceInfoModule
import com.nativemoduleproject.modules.geolocation.GeolocationModule
import com.nativemoduleproject.modules.imagepicker.ImagePickerModule
import com.nativemoduleproject.modules.lifecyclerevent.LifecycleEventsModule
import com.nativemoduleproject.modules.share.ShareModule
import com.nativemoduleproject.modules.toast.ToastModule
import com.nativemoduleproject.uicomponent.ReactImageManager
import java.util.*


class CustomModulesPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val view: MutableList<ViewManager<*, *>> = ArrayList()
        view.add(ReactImageManager(reactContext))
        return view
    }

    override fun createNativeModules(
            reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(ToastModule(reactContext))
        modules.add(CameraModule(reactContext))
        modules.add(DeviceInfoModule(reactContext))
        modules.add(GeolocationModule(reactContext))
        modules.add(ShareModule(reactContext))
        modules.add(ImagePickerModule(reactContext))
        modules.add(LifecycleEventsModule(reactContext))
        return modules
    }
}
