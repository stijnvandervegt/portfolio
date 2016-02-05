var Vue = require('vue');
var nav = require('./components/nav');
var portfolio = require('./components/portfolio');
Vue.config.delimiters = ['${{', '}}']

new Vue({
    el: '#app',
    data: {
        showModal: false
    }
});