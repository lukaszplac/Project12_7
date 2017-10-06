var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2146',
  'X-Auth-Token': '4cd24db3a7c0f09ed7c8f4b26203f0f7'
};

function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnUpdate = $('<button class="btn-update">u</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnUpdate.click(function() {
			self.updateColumn(prompt('Podaj nowa nazwe dla kolumny'));
		});

		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
			    	name: cardName,
			    	bootcamp_kanban_column_id: self.id
			    },
    			success: function(response) {
        			var card = new Card(response.id, cardName, self.id);
        			self.createCard(card);
    			}
			});
		});

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnUpdate)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	  var self = this;
	  $.ajax({
	  	url: baseUrl + '/column/' + self.id,
      	method: 'DELETE',
      	success: function(response){
        self.element.remove();
      	}
	  })
	},

	updateColumn: function(newName) {
	  var self = this;
	  $.ajax({
	  	url: baseUrl + '/column/' + self.id,
      	method: 'PUT',
      	data: {
      		name: newName
      	},
      	success: function(response){
          self.name = newName;
          var newCol = $('<h2 class="column-title">' + self.name + '</h2>')
          self.element.find('.column-title').replaceWith(newCol);
          }
      	})
	  }
	};
