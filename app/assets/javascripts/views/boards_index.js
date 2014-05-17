Trellino.Views.BoardsIndex = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render);
		
		//sync event is when it's done with the fetch
		//render just want to pass the function (not a call to the function)..want to render once sync or remove has happened
	},
	
	
	template: JST['boards/index'],
	
	render: function(){
		var renderedContent = this.template({boards: this.collection});
		//returns string of html with boards evaluated (printed out)
		//this.collection = global collection of boards that our app is going to share/have access to
		this.$el.html(renderedContent);
		this.boardForm = new Trellino.Views.BoardsForm({model: new Trellino.Models.Board(), collection: this.collection});
		this.$el.append(this.boardForm.render().$el);
		//take the board form that you render and take it's $el and append to the $el of the boardIndex
		return this;
	},
});