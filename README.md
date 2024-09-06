# pass-wallet
Pass wallet brings seamless and safe experience for your web3 journey

## Pre-Installation

Please install the required prerequisites to run Lisk Mobile from source.

- [Brew](https://brew.sh/)

  ```bash
  $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

- [Git](https://git-scm.com/)

  ```bash
  $ brew install git
  ```

- [Node.js](https://nodejs.org/en/) (recommended 20.10.0)

  ```bash
  $ brew install node
  ```

- [NVM](https://github.com/nvm-sh/nvm)

  ```bash
  $ brew install nvm
  ```

  Remember to follow Brew additional steps for enabling NVM fully. After running `brew install nvm`, Brew will detail this steps.

- [NPM](https://www.npmjs.com/) (recommended 10.2.3)

  ```bash
  $ nvm install-latest-npm
  ```

  `npm` is shipped with Node.js. But to have the required specified version, run

   ```bash
  $ nvm use
  ```
  [Learn more](https://stackoverflow.com/questions/9755841/how-can-i-change-the-version-of-npm-using-nvm).

- [Watchman](https://facebook.github.io/watchman/docs/install.html)

  ```bash
  $ brew install watchman
  ```

### iOS

- Install the latest version of [Xcode](https://apps.apple.com/ng/app/xcode/id497799835?mt=12) to use the simulator.

### Android

- Install [Android Studio](https://developer.android.com/studio/index.html), and ensure the options listed below are also checked and installed:
  - Android SDK
  - Android SDK Platform
  - Performance (Intel ® HAXM)
  - Android Virtual Device
- Install the Android SDK. Consider these configurations:
  - compileSdkVersion: 34
  - buildToolsVersion: 34.0.0

## Installation

On your terminal, go to the directory you want to install Lisk Mobile and run:

```bash
$ git clone https://github.com/PassHQ/pass-wallet.git
$ cd pass-wallet
$ nvm install # if you are setting up for the first time else run (nvm use)
$ yarn
$ yarn link
```

### Run

```bash
$ yarn start
```

### Run on iOS - MacOS with Intel chip

To run the app on ios, you have to install `pods`.

For this, just run:

```bash
$ npx pod-install
$ yarn ios
```

### Run on iOS - MacOS with Apple chip

If your machine has the [Apple Silicon](https://support.apple.com/en-us/HT211814) chip (not Intel), you will have to run some additional steps, which we hope are going to be solved in a short term while the new chip is more widely adopted.

The process is:

1. Locate in Terminal app in Finder.
2. Right-click and click on _Get Info_
3. Check the Open using _Rosetta_ checkbox.
4. Quit Terminal app and run it again
5. Go to your app folder and run `sudo gem install ffi`
6. Run `npx pod-install`
7. Run `npm run ios`

More details can be found [here](https://armen-mkrtchian.medium.com/run-cocoapods-on-apple-silicon-and-macos-big-sur-developer-transition-kit-b62acffc1387).

### Build


#### Build on iOS


#### Build on Android


### Run on Android

To run android:

```bash
$ yarn android
```

### Unit Tests


## Development

You can run the project in Xcode and use iOS simulators, or alternatively use Android simulators. There are several options to set up your Android development environment. Please read the [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for more information.

There is a standalone app for debugging React Native which has a React and Redux debugger enabled by default. Please read the [React Native Debugger](https://github.com/jhen0409/react-native-debugger) for more information.

### Possible Errors for Mac Users

#### Other possible errors

##### `SDK location not found. `

Create `android/local.properties` and add this line in the file for Mac Users:

```
sdk.dir=/Users/username/Library/Android/sdk
```

OR

Set the environmental PATH to your sdk installation location.


## Troubleshooting XCode 15.3 Update Issues

If you're upgrading to XCode 15.3 and encounter build errors related to Flipper or Yoga layout engine in your React Native project, here are the steps to resolve these issues:

### Error: Called object type 'facebook::flipper::SocketCertificateProvider' is not a function or function pointer

This error occurs due to a missing include directive in the Flipper library. To resolve this, you need to manually add an include directive to a specific file in the Flipper dependency.

**Fix:**
1. Open `ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h` in your project directory.
2. Navigate to line 9.
3. Add the following line of code:
   ```cpp
   #include <functional>
   ```
4. Save the file and rebuild your project in XCode.

This addition ensures the proper C++ standard library header is included, resolving the compile-time error related to `facebook::flipper::SocketCertificateProvider`.

### Error: Incompatible function pointer types passing 'YGSize

This error is related to an incompatibility in the Yoga layout engine used by React Native. It usually manifests when attempting to compile the project after updating to XCode 15.3.

**Fix:**
We have included a patch in the project to address this issue. You simply need to apply the patch using the `patch-package` command. Follow these steps:

1. Ensure you have `patch-package` installed in your project. If not, you can add it by running:
   ```bash
   npm install patch-package postinstall-postinstall --save-dev
   ```
   or if you use Yarn:
   ```bash
   yarn add patch-package postinstall-postinstall --dev
   ```

2. Run the patch-package command to apply the patch:
   ```bash
   npx patch-package
   ```
   or if you use Yarn:
   ```bash
   yarn patch-package
   ```

3. Rebuild your project in XCode.

These steps should resolve the compilation error and allow your project to build successfully with XCode 15.3. If you encounter any further issues, please check if there are any updates to this guide or consult the community for more recent fixes.
