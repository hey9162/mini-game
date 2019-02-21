fis.match('css/*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});

fis.match(`**.{css,less,scss}`, {
  preprocessor: fis.plugin('autoprefixer', {
    browsers: ['Android >= 4.0', 'iOS >= 4', 'ie >= 9', 'firefox >= 15'],
    cascade: true
  })
});

fis.media('build').set('domain', 'https://web.rrzuzu.com/WebStatic/jianqing/shengdan');

fis.media('build')
.match('**', {
    domain: fis.media().get('domain')
})