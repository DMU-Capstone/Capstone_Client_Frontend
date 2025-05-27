const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  projectRoot: __dirname, // 👈 루트 경로를 명시적으로 지정
  watchFolders: [__dirname + '/../package'], // 모노레포 하위 의존성 watch 설정
};
