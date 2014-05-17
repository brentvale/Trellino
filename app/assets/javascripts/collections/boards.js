Trellino.Collections.Boards = Backbone.Collection.extend({
	url: "api/boards",
	model: Trellino.Models.Board
});

Trellino.Collections.boards = new Trellino.Collections.Boards();
//global instance of the boards class for use across the app