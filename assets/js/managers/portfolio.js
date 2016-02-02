var jQuery = require('jquery');

var Portfolio = {
    data: {},
    getFeed: function(callback) {
        var self = this;
        jQuery.getJSON('/data/projects.json', function(result) {

            self.data = result;
            callback(self.getData());
        }).error(function(error) {
            console.log(error);
        });
    },
    getData: function() {
        return this.data;
    }

}

module.exports = Portfolio;