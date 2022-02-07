# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| All   | :white_check_mark: |


## Reporting a Vulnerability

1. Create an [issue](https://github.com/Krovikan-Vamp/fourpeaks-sc/issues) clearly stating the problem and how it occurs
    - Be sure to include any steps needed to recreate the vulnerability.
2. Expect an update within 2 business days from the [developer](https://github.com/Krovikan-Vamp)

## Known Issues

1. Users that access data provided from **Firebase storage** can remove parts of the URL to expose a .json of the storage bucket blob provided
    - I believe this is a known security risk for Firebase, so no confidential information is stored here.
