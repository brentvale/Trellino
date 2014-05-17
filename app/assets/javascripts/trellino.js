window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
  	var $rootEl = $('#content');
		var router = new Trellino.Routers.AppRouter({
			$rootEl: $rootEl
		});
		Backbone.history.start();
		//starts everything that backbone does (passing things to the router)
  }
};
