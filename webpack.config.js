const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // 커스텀 설정을 여기에 추가할 수 있습니다
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web'
  };

  return config;
}; 