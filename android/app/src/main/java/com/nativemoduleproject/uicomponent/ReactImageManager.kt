package com.nativemoduleproject.uicomponent

import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.image.ImageResizeMode
import com.facebook.react.views.image.ReactImageView

class ReactImageManager(private val reactContext: ReactApplicationContext) : SimpleViewManager<ReactImageView>() {
    override fun getName(): String = "ReactImageManager"

    override fun createViewInstance(context: ThemedReactContext): ReactImageView {
        return ReactImageView(context, Fresco.newDraweeControllerBuilder(),
                null, reactContext)
    }

    @ReactProp(name = "src")
    fun setSrc(view: ReactImageView, sources: ReadableArray?): Unit {
        view.setSource(sources)
    }

    @ReactProp(name = "borderRadius", defaultFloat = 0f)
    fun setBorderRad(view: ReactImageView, borderRadius: Float): Unit {
        view.setBorderRadius(borderRadius)
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    fun setResizeMode(view: ReactImageView, resizeMode: String?): Unit {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode))
    }
}