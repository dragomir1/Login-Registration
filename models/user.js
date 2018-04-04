const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: [true, "Enter your first name"],
    trim: true,
    validate: {
    			validator: function(value){
    				return /^[A-z]+$/.test(value)
    			},
    			message: "Enter a real first name."
    		}
  },
    lastname: {
      type: String,
      required: [true, "Enter your last name"],
      trim: true,
      validate: {
            validator: function(value){
              return /^[A-z]+$/.test(value)
            },
            message: "Enter a real last name."
          }
    },
  email: {
    type: String,
		required: [true, "Please enter a valid email address."],
    unique: true,
    validate: {
			validator: function(value){
				return /@/.test(value)
			},
			message: "Please enter a valid email address."
		}
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
    // validate: {
    //   validator: function( value ) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
    //   },
    //   message: "Password must have at least 1 number, uppercase and special character"
    // }
  },
  birthday: {
    type: Date,
		required: [true, "Please enter a valid date of birth."],
    // validate: {
		// 	validator: function(value){
		// 		return value instanceof Date;
		// 	},
		// 	message: "Please enter a valid birthday!"
		// }
  },
}, {timestamp: true});

userSchema.virtual( 'name.full' ).get( function () {
  return this.name.first + " " + this.name.last;
  // return `${ this.name.first } ${ this.name.last }`;
});

// var virtual = schema.virtual('fullname');
// virtual.set(function (v) {
//   var parts = v.split(' ');
//   this.name.first = parts[0];
//   this.name.last = parts[1];
// });

module.exports = mongoose.model('User', userSchema);
