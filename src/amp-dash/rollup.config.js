export default {
  entry: 'lib/index.js',
  dest: 'lib/index.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ng.ampDash',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common'
  }
};