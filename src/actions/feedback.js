var C = require("../constants");

module.exports = {
	displayError: function(error){
		return {type:C.DISPLAY_ERROR,error:error};
	}
}