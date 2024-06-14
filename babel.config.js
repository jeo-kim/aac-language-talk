// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

// 런타임에서 데코레이터 syntax 에러나는 것 해결을 위한 시도
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    'react-native-reanimated/plugin', // 이 줄을 추가합니다.
  ],
};
