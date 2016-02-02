var Vue = require('vue');
var PortfolioManager = require('../managers/portfolio');


Vue.component('modal', {
    template: '#modal-template',
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    }
});

var PortfolioComponent = Vue.component('portfolio', {
    template: '#portfolioTemplate',
    data: function() {
        return {
            projects: []
        }
    },
    created: function() {
        var self = this;

        PortfolioManager.getFeed(function(result) {
            self.projects = result;
        });
    },
    methods: {
        showModal: function(project) {
            project.showModal = true;
        }
    }
});

module.exports = PortfolioComponent;