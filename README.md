### Tablet MAGUGI
本项目为美界平板-超级美星。

## 安装依赖
### 公用
1. 未安装pnpm的执行如下命令
```
npm install -g cnpm --registry=https://registry.npmmirror.com
```
2. 安装依赖包
```
cnpm install
```

### iOS
1. 进入ios目录并执行命令
```
cd ios
bundle install
```
2. 继续执行命令
```
bundle exec pod install
上述命令执行完毕继续执行
cd ..
```
### ANDROID
1. 根目录执行命令
```
npx react-native run-android
```

