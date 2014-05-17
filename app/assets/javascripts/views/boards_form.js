Trellino.Views.BoardsForm = Backbone.View.extend({
	
	template: JST['boards/form'],
	//points to the template file I'll be using to create my html
	
	render: function(){
		var boardModel = this.model;
		var renderedContent = this.template({board: boardModel});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	events: {
		'submit form' : "submit"
	},
	
	submit: function(event) {
		event.preventDefault();
		
		var attrs = $(event.target).serializeJSON();
		//target is the form (can't call .serializeJSON on something other than the form)
		//what does event.target.form do?
		
		function success() {
			Backbone.history.navigate("", { trigger: true});
			//where does Backbone.history.navigate take me to?
		}
		
		this.model.set(attrs);
		if(this.model.isNew()) {
			this.collection.create(this.model, {
				success: success
			});
		}else {
			this.model.save({}, {
				success: success
			});
		}
	}
});