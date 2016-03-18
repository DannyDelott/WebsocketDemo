var BusyView = Backbone.View.extend({

  tagName: 'h1',

  initialize: function() {
    this.render();
  },

  render: function () {
    this.$el.text('Busy with another image');
    this.$el.appendTo($('body'));
  }

});
