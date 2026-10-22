# QA Checklist

## Smoke

- [ ] App launches on a clean install and shows the language picker
- [ ] Study opens the first question and advances after an answer
- [ ] Closing the app and returning offers to continue from the saved question
- [ ] A wrong answer appears in Review mistakes
- [ ] A later correct answer removes that question from Review mistakes
- [ ] Exam asks 60 questions and shows Passed only at 48 or more
- [ ] Road signs open by category and show a translation when a non-English language is selected
- [ ] Theme chips: System / Light / Dark apply and persist
- [ ] Feedback screen opens the mail app or shows the support email

## Offline

- [ ] Airplane mode: study, exam, signs, and settings still work after a clean install
- [ ] No account or sign-in screen appears

## Release build

- [ ] Install the signed release APK
- [ ] Launcher name is `LTO Theory`
- [ ] Settings shows `LTO Theory v1.0.0 (1)`
- [ ] No developer menu in the release build
- [ ] Support email on Feedback is `stanislavkholmanskii@gmail.com`
