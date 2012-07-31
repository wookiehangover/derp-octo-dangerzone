require([
  'underscore',
  'backbone',
  'layout'
], function( _, Backbone, Layout ){

  $(function(){

    var app = {};

    var Router = Backbone.Router.extend({
      routes: {
        ":page": "page"
      },

      page: function( id ){
        if( !id ) return;

        try {
          app.view.getPage( id ).show();
        } catch (error) {
          throw new Error('404 Not Found!');
        }
      }
    });

    app.router = new Router();

    app.view = new Layout( app.router );

    $(document).on("click", "a:not([data-bypass])", function(evt) {
      var href = $(this).prop("href");
      var root = location.protocol + "//" + location.host + app.root;

      if (href && href.slice(root.length) === root) {
        evt.preventDefault();
        Backbone.history.navigate(href.slice(root.length), true);
      }
    });

    Backbone.history.start({ pushState: true });

  });

});

