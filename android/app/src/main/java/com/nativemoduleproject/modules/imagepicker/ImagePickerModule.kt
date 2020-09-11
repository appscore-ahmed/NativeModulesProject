package com.nativemoduleproject.modules.imagepicker

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*

class ImagePickerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val IMAGE_PICKER_REQUEST = 2 //requestCode should be positive number
    private val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
    private val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
    private val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
    private val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"

    private var promise: Promise? = null

    override fun getName(): String = "ImagePickerModule"

    private val activityListener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(activity, requestCode, resultCode, data)
            Log.e("ASD", "requestCode is $requestCode")
            if (requestCode == IMAGE_PICKER_REQUEST) {
                Log.e("ASD", "IMAEG REQUEST is ${IMAGE_PICKER_REQUEST}")
                if (promise != null) {
                    Log.e("ASD", "promise is null")
                    if (resultCode == Activity.RESULT_CANCELED) {
                        promise?.reject(E_PICKER_CANCELLED, "Image picker cancelled")
                    } else if (resultCode == Activity.RESULT_OK) {
                        val uri = data?.data
                        if (uri == null) {
                            Log.e("ASD", "uri is null")
                            promise?.reject(E_NO_IMAGE_DATA_FOUND, "No image found")
                        } else {
                            Log.e("ASD", "uri is not null")
                            promise?.resolve(uri.toString())
                        }
                    }
                    promise = null
                }
            }
        }
    }

    @ReactMethod
    fun pickImage(promise: Promise): Unit {
        val currentActivity = currentActivity

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            return
        }
        this.promise = promise
        try {
            val galleryIntent = Intent(Intent.ACTION_PICK)
            galleryIntent.type = "image/*"
            val chooserIntent = Intent.createChooser(galleryIntent, "Pick an Image")
            Log.e("ASD", "pickImage Called $IMAGE_PICKER_REQUEST")
            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST, null)
        } catch (e: Exception) {
            promise.reject(E_FAILED_TO_SHOW_PICKER, e)
            this.promise = null
        }
    }

    init {
        reactContext.addActivityEventListener(activityListener)
    }

}