package com.nativemoduleproject.modules.geolocation

import android.Manifest
import android.content.pm.PackageManager
import android.os.Looper
import android.util.Log
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.location.*
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class GeolocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    private val context = reactApplicationContext
    private lateinit var locationCallback: LocationCallback
    private var fusedLocationProviderClient: FusedLocationProviderClient =
            LocationServices.getFusedLocationProviderClient(context)
    private var locationRequest: LocationRequest = LocationRequest().apply {
        interval = TimeUnit.SECONDS.toMillis(60)
        fastestInterval = TimeUnit.SECONDS.toMillis(30)
        maxWaitTime = TimeUnit.SECONDS.toMillis(2)
        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
    }


    override fun getName(): String {
        return "GeolocationModule"
    }


    @ReactMethod
    fun fetchLocation(promise: Promise) {
        Log.e("ASD", "fetchLocation called")

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult?) {
                Log.e("ASD", "onLocationResult clicked ${locationResult.toString()}")
                locationResult ?: return
                val coordinatesJSONObject = JSONObject()
                for (location in locationResult.locations) {
                    coordinatesJSONObject.put("latitude", location.latitude)
                    coordinatesJSONObject.put("longitude", location.longitude)
                    Log.e("ASD", coordinatesJSONObject.toString())
                    fusedLocationProviderClient.removeLocationUpdates(locationCallback)
                    promise.resolve(coordinatesJSONObject.toString())
                }
            }
        }


        if (ActivityCompat.checkSelfPermission(context,
                        Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(context,
                        Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.e("ASD", "Permission not granted")
            promise.reject("-1", "Permission not granted")
/*             TODOo: Consider calling*/
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return
        }
        fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper())

    }

}