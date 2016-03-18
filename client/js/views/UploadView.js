var UploadView = Backbone.View.extend({

  tagName: 'form',
  id: 'upload-image',
  className: 'dropzone',

  template: _.template(
    '<h3>Select Model:</h3>' +
    '<select name="model">' +
      '<option value="landscape_S1X16_1536_ICA_DeepX3_ICA">Deep Semi-Supervised (default)</option>' +
    '</select>' + 
    '<br><br><h3>Or provide image URL:</h3>' +
    '<input type="text" name="urlToUpload" id="urlToUpload" size="30"/>'
  ),

  initialize: function() {
   this.render(); 
  },

  render: function() {
    this.$el.attr({ action: '/upload', enctype: 'multipart/form-data' });
    this.$el.html(this.template());
    this.$el.appendTo($('body'));
    this._configDropzone();
  },

  _configDropzone: function() {
    Dropzone.discover();
    this.dropzone = Dropzone.instances[0];
    this.dropzone.options.addRemoveLinks = true;
    this.dropzone.options.dictRemoveFile = 'Delete';
    this.dropzone.on('success', this._configWebSocket.bind(this));
  },

  _configWebSocket: function(file, res) {
    var ws = new WebSocket('ws://localhost:4080', res);
    ws.onopen = function(message) {
      ws.send('client');
    };
    ws.onmessage = function(message) {
      var nextImage = JSON.parse(message.data).nextImage;
      if (nextImage) {
        console.log('nextImage: %s', parsed.nextImage);
      }
    };
  }
});
