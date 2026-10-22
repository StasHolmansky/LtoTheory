# Submission Runbook

## Recommended Sequence

1. Finish store assets (feature graphic + screenshots)
2. Publish the privacy policy URL
3. Create a release candidate AAB
4. Test the release APK on a device
5. Upload to `Internal testing` on Google Play
6. Fix issues from internal review
7. Submit for production review
8. Roll out gradually and monitor feedback

## Android

### Build

```bash
npm install
cd android
./gradlew bundleRelease
```

Expected output:

- `android/app/build/outputs/bundle/release/app-release.aab`

### Upload

1. Open `Google Play Console`
2. Create the app entry for `LTO Theory` with package name `com.stas.ltotheory`
3. Complete store listing, Data safety, content rating, and app access sections
4. Set privacy policy URL to `https://stasholmansky.github.io/lto-theory-privacy/`
5. Upload the `.aab` to `Internal testing`
6. Verify install from the Play test track

## Rollout Guardrails

- Start with a limited Android rollout percentage
- Watch the support inbox and store reviews after launch
- Prepare a `1.0.1` hotfix if the first production build needs a quick follow-up
