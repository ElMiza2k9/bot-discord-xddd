let { model, Schema } = require('mongoose');

module.exports = model('inventory', new Schema({
    user: String,
    inventory: Object
}))