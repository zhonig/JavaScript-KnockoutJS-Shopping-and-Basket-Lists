var shoppingList = ko.observableArray([]),
	foodName = ko.observable(""),
	foodQuantity = ko.observable(""),
	foodNameErrMsg = ko.observable(""),
	foodQuantityErrMsg = ko.observable(""),
	validateFoodName = function () {
		event.preventDefault();
		
		var tempFoodName = ko.unwrap(foodName);
		if(!tempFoodName) {
			foodNameErrMsg("Valid Food Name Required");
			return false;
		}
		foodNameErrMsg("");
		return true;
	},
	validateFoodQuantity = function () {
		event.preventDefault();
		
		var tempFoodQuantity = parseInt(ko.unwrap(foodQuantity));
		if(isNaN(tempFoodQuantity) || tempFoodQuantity <= 0) {
			foodQuantityErrMsg("Valid Food Quantity Required");
			return false;
		}
		foodQuantityErrMsg("");
		return true;
	},
	addToShoppingList = function (data, event) {
		event.preventDefault();
		
		validateFoodName();
		validateFoodQuantity();
		
		if(ko.unwrap(foodNameErrMsg) || ko.unwrap(foodQuantityErrMsg)) return;
			
		var tempFoodName = ko.unwrap(foodName),
			tempFoodQuantity = parseInt(ko.unwrap(foodQuantity)),
			existingShoppingItem = searchArrayOfObjects('foodName', tempFoodName, ko.unwrap(shoppingList));
			
		if(existingShoppingItem) existingShoppingItem.foodQuantity(ko.unwrap(existingShoppingItem.foodQuantity) + tempFoodQuantity);
		else {
			shoppingList.push({
				foodName: tempFoodName,
				foodQuantity: ko.observable(tempFoodQuantity),
				inBasket: ko.observable(false)
			});
		}
		
		resetFields();
	},
	removeFromBasket = function (data, event) {
		event.preventDefault();
		
		data.inBasket(false);
		resetFields();
	},
	addToBasket = function (data, event) {
		event.preventDefault();
		
		data.inBasket(true);
		resetFields();
	},
	emptyBasket = function (data, event) {
		event.preventDefault();
		
		for(var i = 0; i < ko.unwrap(shoppingList).length; i++) {
			ko.unwrap(shoppingList)[i].inBasket(false);
		}
		resetFields();
	},
	model = {
		shoppingList: shoppingList,
		validateFoodName: validateFoodName,
		validateFoodQuantity: validateFoodQuantity,
		addToShoppingList: addToShoppingList,
		removeFromBasket: removeFromBasket,
		addToBasket: addToBasket,
		emptyBasket: emptyBasket
	};

ko.applyBindings(model, document.getElementsByTagName('body')[0]);

function resetFields () {
	foodName("");
	foodQuantity("");
	foodNameErrMsg("");
	foodQuantityErrMsg("");
}
function searchArrayOfObjects(key, value, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][key] == value) {
            return myArray[i];
        }
    }
}