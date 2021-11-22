### 运行前准备
```
1.可以科学上网，请直接运行 npm install
2.无法科学上网,请按照如下步骤：
a.使用nrm工具切换淘宝源
npx nrm use taobao
如果之后需要切换回官方源可使用
npx nrm use npm
b.npm install
```

### 运行须知
```
1.快捷键说明
macos环境
a.Android模拟器
devsetting快捷键为:command+m
hot-reload快捷键为:shift+R+R
b.iOS模拟器
devsetting快捷键为:command+d
hot-reload快捷键为:command+r

Window环境
a.Android模拟器
devsetting快捷键为:ctrl+m
hot-reload快捷键为:shift+R+R

2.运行命令时，Android模拟器需要提前打开。iOS可以直接运行命令。
3.如果使用vscode作为编辑器，打开package.json后，当鼠标悬停"start-nocache"等脚本时，会出现提示“运营脚本”，点击即可运行该脚本。
```

### 1.Run With Android
```
1.watchman watch-del-all
2.npm run start-nocache
3.npm run android
```

### 2.Run With iOS
**对于ReactNative版本小于0.59.9的版本 iOS Xcode11+ 运行切记**
```
运行完npm install后 请按照如下方式进行修改
打开:/node_modules/react-native/React/Base/RCTModuleMethod.mm
找到93行
static BOOL RCTParseUnused(const char **input)
{
  return RCTReadString(input, "__unused") ||
         RCTReadString(input, "__attribute__((unused))");
}
修改为如下所示代码:
static BOOL RCTParseUnused(const char **input)
{
  return RCTReadString(input, "__unused") ||
         RCTReadString(input, "__attribute__((__unused__))") ||
         RCTReadString(input, "__attribute__((unused))");
}
```
*对于ReactNative版本大于等于0.59.9的可以直接运行*
```
1.watchman watch-del-all
2.npm run start-nocache
3.npm run ios
```

*使用Xcode编译打包时，请注意:*
```
1.File -> Project Setting
2.Shared Project Setting 一栏请选择： Legacy Build System
3.点击 Done
```

*使用Android Studio编译打包时，请注意:*
```
1.升级Android Studio版本至3.5+,最好保持最新版本。
```


### 3.如果运行发现JS错误或其他异常情况
```
1. Clear watchman watches: `watchman watch-del-all`.
2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.
```

### 4.如果运行发现如下错误，请看：
```
错误:
error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

修复:
打开TabletAppBms/node_modules/metro-config/src/defaults/blacklist.js
修改:
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
为:
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```

### <font color="#ff0000">5.使用Android Studio 或者 Xcode给平板打版本请注意、请注意、请注意</font>
```
1.android打包前进入TabletBmsApp目录，执行如下命令：
npm run bundle-android

2.iOS打包前进入TabletBmsApp目录，执行如下命令：
npm run bundle-iOS
```

### <font color="#ff0000">6.Android发布市场打包请注意、请注意、请注意</font>
```
1.android打包前进入TabletBmsApp目录，执行如下命令：
npm run bundle-android
2.打开Android Studio[请保持Android Studio版本为4.0+]，导入项目。
3.点击界面上方的：build->Generate Signed Bundle/Apk,下一步
4.选择Apk，下一步
5.填入相关参数，点击Next，选择Release,点击Finish即可。
6.生成的含有签名的包在：TabletBmsApp/Android/app/release 目录下
7.请勿使用./gradlew assembleRelease进行打包，会失败的。
```

### 启动时遇到以下错误##########
错误信息：error Invalid regular expression:
/(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.
*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/:
 Unterminated character class. Run CLI with --verbose flag for more details.

解决方案：
 找到这个文件：
\node_modules\metro-config\src\defaults\blacklist.js
替换内容为：
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

Run instructions for Android:
• Have an Android emulator running (quickest way to get started), or a device connected.
• cd "/Users/zhangchao/Downloads/TabletMagugi" && npx react-native run-android

Run instructions for iOS:
• cd "/Users/zhangchao/Downloads/TabletMagugi" && npx react-native run-ios
- or -
• Open TabletMagugi/ios/TabletMagugi.xcworkspace in Xcode or run "xed -b ios"
• Hit the Run button
