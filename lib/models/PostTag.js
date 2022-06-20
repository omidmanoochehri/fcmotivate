const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostTagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = Mongoose.model('PostTag', PostTagSchema);