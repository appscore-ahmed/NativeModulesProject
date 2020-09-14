package com.nativemoduleproject;

import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "NativeModuleProject";
    }

    /*Sending Orientation change to React Native code*/
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("OnConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        Log.e("ASD", "newConfig " + newConfig.orientation);
        this.sendBroadcast(intent);
    }
    
}
