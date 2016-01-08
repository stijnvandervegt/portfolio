var jQuery = require('jquery');
var Vue = require('vue');

var nav = new Vue({
    el: 'nav#navigation',
    data: {
        menuIsActive: false,
        classObject: {
            'sticky': false
        },
        homeExample: 'test'
    },
    methods: {
        navigate: function(scrollTarget, e) {
            e.preventDefault();

            jQuery('html,body').animate({
                scrollTop: jQuery('#'+ scrollTarget).offset().top
            });

        },
        toggleMenu: function() {
            this.menuIsActive = !this.menuIsActive;
        },
        checkSticky: function() {
            var offset = jQuery(this.$el).offset();
            console.log(this.classObject.sticky);
            var self = this;
            jQuery(document).on('scroll', function() {
                if(jQuery(document).scrollTop() >= offset.top && self.classObject.sticky !== true) {
                    self.classObject.sticky = true;
                } else if(jQuery(document).scrollTop() <= offset.top && self.classObject.sticky !== false){
                    self.classObject.sticky = false;
                }

            });



        }
    }

});

nav.checkSticky();

module.exports = nav;