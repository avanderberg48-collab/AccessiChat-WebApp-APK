package com.mandy.accessichatweb;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

/**
 * Dummy activity to satisfy manifest — file chooser is handled inline in MainActivity.
 */
public class FileChooserActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        finish();
    }
}
