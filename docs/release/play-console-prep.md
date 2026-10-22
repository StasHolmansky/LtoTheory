# Google Play prep pack

Everything needed before filling Play Console.

## Ready now

| Item | Location / value |
| --- | --- |
| App name | LTO Theory |
| Application ID | `com.stas.ltotheory` |
| Version | `1.0.0` (versionCode `1`) |
| Support email | `stanislavkholmanskii@gmail.com` |
| Privacy policy source | `docs/release/privacy-policy.md` |
| Privacy policy URL | https://stasholmansky.github.io/lto-theory-privacy/ |
| Listing copy | `docs/release/store-listing.md` |
| Graphics folder | `Graphics/LtoTheory/play-ready/` |
| Release AAB | `android/app/build/outputs/bundle/release/app-release.aab` |
| Release APK | `android/app/build/outputs/apk/release/app-release.apk` |
| Upload keystore | `shared-signing/stas-release.keystore` |

## Upload these graphics

From `Graphics/LtoTheory/play-ready/`, once the screenshot files are in place:

1. **App icon** → `icon-512.png`
2. **Feature graphic** → `feature-graphic-1024x500.png`
3. **Phone screenshots** (order matters):
   - `phone-screenshots/01-home.jpg`
   - `phone-screenshots/02-study.jpg`
   - `phone-screenshots/03-exam-result.jpg`
   - `phone-screenshots/04-signs.jpg`
   - `phone-screenshots/05-settings.jpg`

## Texts to paste

Use the Short Description, Full Description, and Release Notes blocks in `store-listing.md`.

## Still to fill in Console

1. Create the app and confirm package name `com.stas.ltotheory`
2. Store listing locale: English (United States) as the default. Add other locales only if you want translated store text.
3. Category: Education
4. Data safety: no data collected, no data shared
5. Content rating: educational driving-theory content, including questions about alcohol and traffic law. No user-generated content, no violence, no sexual content.
6. Target audience: 18 and older. This is a driver's license study app, not a children's app.
7. App access: all features available without login
8. Ads declaration: no ads
9. Upload the AAB to Internal testing, then Production
10. Countries and pricing: free

## Build command

```bash
cd /Volumes/External/AndroidStudioProjects/LtoTheory/android
./gradlew bundleRelease
```

Output:

`android/app/build/outputs/bundle/release/app-release.aab`
