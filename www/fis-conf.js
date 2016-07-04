// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// fis.match('*', {
//   useHash: false
// });

// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });
fis.hook('relative');
fis.match('**', { relative: true });
//清除其他配置，只剩下如下配置
fis.match('*.{js,css,png}', {
    useHash: true
});
/*
fis.match('/app/module/(**).js', {
    isMod: true,
    moduleId: 'app/module/$1'
});
fis.hook('amd', {
    baseUrl: '/app/module',
    paths: {
        'jquery-tmpl': '/plugins/jquery.tmpl.min.js',
        'ko': '/plugins/knockout-3.4.0.js',
        'jquery': '/plugins/jQuery/jQuery-2.2.0.min.js',
        'bootstrap': '/bootstrap/js/bootstrap.min.js',
        'fastclick': '/plugins/fastclick/fastclick.min.js',
        'slimScroll': '/plugins/slimScroll/jquery.slimscroll.min.js',
        'icheck': '/plugins/iCheck/icheck.min.js'
    },
    shim: {
        'jquery-tmpl': ['jquery'],
        'bootstrap': ['jquery'],
        'slimScroll': ['jquery'],
        'icheck': ['jquery']
    }
});*/
