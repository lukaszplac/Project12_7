// KLASA KANBAN CARD
function Card(id, name, colId) {
	var self = this;

	this.id = id;
	this.colId = colId;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardUpdateBtn = $('<button class="btn-update">u</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardUpdateBtn.click(function(){
			self.updateCard(prompt('Podaj nowa nazwe dla karty'));
		})

		card.append(cardUpdateBtn);
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	    var self = this;
	    $.ajax({
	      url: baseUrl + '/card/' + self.id,
	      method: 'DELETE',
	      success: function(){
	        self.element.remove();
	      }
	    });
	},

	updateCard: function(newName) {
		var self = this;
		$.ajax({
		  url: baseUrl + '/card/' + self.id,
	      method: 'PUT',
	      data: {
	      	name: newName,
					bootcamp_kanban_column_id: self.colId
	      },
	      success: function(response){
					self.name = newName;
          var newCard = $('<p class="card-description">' + self.name + '</p>')
          self.element.find('.card-description').replaceWith(newCard);
	      }
		})
	}
}
