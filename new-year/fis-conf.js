// 线上环境
fis.set('domain_build', 'https://web.rrzuzu.com/WebStatic/jianqing/wx-test');
fis.match('css/*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

// css前缀
fis.match('css/*.{css,less,scss}', {
    preprocessor: fis.plugin('autoprefixer', {
        "browsers": ["Android >= 4.0", "iOS >= 4", "ie >= 9", "firefox >= 15"],
        "cascade": true
    })
});


// 线上
fis.media('build')
.match('*', {
    domain: "${domain_build}"
})
.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
})
.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});