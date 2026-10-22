# Production Launch

This repository contains the release defaults and runbooks needed to ship `LTO Theory` to Google Play.

## Release Values

| Item | Value |
| --- | --- |
| Product name | `LTO Theory` |
| React Native module name | `LtoTheory` |
| Android application ID | `com.stas.ltotheory` |
| Store version | `1.0.0` |
| Build number | `1` |
| Android signing config | `android/key.properties` |
| Release keystore template | `android/key.properties.example` |
| Support email | `stanislavkholmanskii@gmail.com` |
| Privacy policy source | `docs/release/privacy-policy.md` |
| Privacy policy URL | https://stasholmansky.github.io/lto-theory-privacy/ |
| Store listing draft | `docs/release/store-listing.md` |

## Before Submission

1. Publish `docs/release/privacy-policy.md` at the public URL above, the same way as the other apps.
2. Use that URL in Google Play Console.
3. Confirm the support email inbox (`stanislavkholmanskii@gmail.com`) is monitored.
4. Add the feature graphic `1024x500`, the `512x512` icon, and the phone screenshots listed in `store-listing.md`.
5. Complete Data safety, content rating, target audience, and ads declaration in Play Console.

## Accounts

1. `Google Play Console`
2. Support inbox for `stanislavkholmanskii@gmail.com`

## Android Release Setup

1. Ensure the shared upload keystore is available at `shared-signing/stas-release.keystore`.
2. Copy `android/key.properties.example` to `android/key.properties` if needed.
3. Fill in the real store file path, passwords, and alias.
4. Keep the keystore file and `android/key.properties` out of git.
5. Build the upload bundle:

```bash
cd android
./gradlew bundleRelease
```

If `android/key.properties` is missing, release tasks fail fast instead of signing with the debug key.

Expected output:

- `android/app/build/outputs/bundle/release/app-release.aab`

A sideload APK, when needed:

```bash
cd android
./gradlew assembleRelease
```

- `android/app/build/outputs/apk/release/app-release.apk`

Copies used for publishing also live in `release-apks/` next to the other apps:

- `LtoTheory-release.aab`
- `LtoTheory-release.apk`

## Data Safety Notes

Declare:

- No data collected
- No data shared
- No account
- No ads SDK
- No analytics SDK
- No location permission

Local-only storage, not uploaded: study position, missed questions, language, and theme. Mention this only if the form asks what stays on the device. Do not mark those items as collected or shared.
