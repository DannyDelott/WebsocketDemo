var Submission = Backbone.Model.extend({

  defaults: {
    isBusy: null,
    targetFileUrl: null,
    resultImageUrl: null,
    modelName: null
  },

  pingIsBusy: function() {
    return $.get('/busy')
      .then(function(data) {
        this.set('isBusy', JSON.parse(data).isBusy);
      }.bind(this));
  }

});
