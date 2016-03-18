var submission = new Submission();
submission.pingIsBusy()
  .then(renderApp)
  .fail(function(jqXHR, textStatus) {
    console.log("Request failed: " + textStatus);
  });

function renderApp() {
  if (submission.get('isBusy')) {
    var busy = new BusyView({ model: submission });
  } else {
    var upload = new UploadView({ model: submission });
  }
}
