/**
 * Engagement Lab Website
 * 
 * Program Model
 * @module program
 * @class program
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
// See: https://github.com/leepowellcouk/mongoose-validator and https://github.com/chriso/validator.js
var validator = require('validator');
var Listing = require('./Listing');
var Types = keystone.Field.Types;

/**
 * @module program
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Program = new keystone.List('Program', 
	{	
		hidden: false,
        track: true,
		inherits: Listing
	});

/**
 * Field Validators
 * @main Project
 */
var urlValidator = {
    validator: function(val) {
        return validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: true,
            allow_underscores: true
        });
    },
    msg: 'Invalid external link URL'
};

/**
 * Model Fields
 * @main Program
 */
Program.add({
    href: {
        type: Types.Url,
        label: 'External Link URL',
        validate: urlValidator,
        required: true,
        initial: true
	}
});

/**
 * Model Registration
 */
Program.defaultSort = '-createdAt';
Program.register();
