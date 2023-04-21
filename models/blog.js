const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Schema will define the structure of the documents that we are gonna store inside a collection
//thing that model wraps around
//.Schema is constructor fn for Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true}); //2nd argument options object

const Blog = mongoose.model('Blog', blogSchema) //1st argument name of model, 2nd schema we want to base model on

module.exports = Blog; 