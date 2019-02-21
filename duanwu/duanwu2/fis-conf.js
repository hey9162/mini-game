
/**
 * ===================================================================
 * @desc less 解析
 */
fis.match("css/**.less", {
  parser: fis.plugin("less"),
  rExt: ".css"
});

/**
 * ===================================================================
 * @desc 自动加 css 前缀
 */
fis.match("css/*.{css,less,scss}", {
  preprocessor: fis.plugin("autoprefixer", {
    browsers: ["Android >= 4.0", "iOS >= 4", "ie >= 9", "firefox >= 15"],
    cascade: true
  })
});


/**
 * ===================================================================
 * @desc 线上环境
 * @desc 打包构建 压缩
 */

fis.set("domain_build", "http://web.rrzuzu.com/WebStatic/duanwu");

fis
.media("build")
.match("**", {
  domain: "${domain_build}"
})
