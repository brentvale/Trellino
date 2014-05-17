Trellino.Routers.AppRouter = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"" : "showBoardsIndex",
		"boards/:id" : "showBoard",
		"boards/:id/edit" : "editBoard"
	},
	
	editBoard: function(id) {
		var that = this;
		that._getBoard(id, function(board) {
			var boardView = new Trellino.Views.BoardsForm({
				model: board
			});
			that._swapView(boardView);
		});
	},
	
	showBoard: function(id) {
		var that = this;
		
		that._getBoard(id, function (board) {
			var formView = new Trellino.Views.BoardsForm({
				model: board
			});
			that._swapView(formView);
		});
	},
	
	showBoardsIndex: function() {
		var view = new Trellino.Views.BoardsIndex({
			collection: Trellino.Collections.boards
		});
		this._swapView(view);
		//pass the instance of Trellino.View.BoardsIndex to _swapView so that I can render the boards (via the defined template)
		Trellino.Collections.boards.fetch();
		//haven't fetched any data from server before this call
	},
	
	_getBoard: function(id, callback) {
		var board = Trellino.Collections.boards.get(id)
		//using the Post app as a reference am I setting my board correct?
		if(!board){
			board = new Trellino.Models.Board({ id: id})
			//why would you set the id of the newly created board to the id of the one searched for? the searched id could be completely irrelevant.
			board.collection = Trellino.Collections.boards;
			board.fetch({
				success: function () {
					Trellino.Collections.boards.add(board);
					callback(board);
				}
			});
		}else {
			callback(board);
		}
	},
	
	_swapView: function(view) {
		if(this.currentView){
			//if there is a view, I need to remove it firrst
			this.currentView.remove();
		};
		this.currentView = view;
		view.render();
		//render is going to set the $el of the view to the contents of the evaluated template
		this.$rootEl.html(view.$el);
	},
	
});