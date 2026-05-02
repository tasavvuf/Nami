import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content : {type : String, required : true},
    tag: {type : String, required : true, default : "general"},
    heartcount : {type : Number, default : 0},
    feltCount : {type : Number, default : 0},
    createdAt : {type:Date , required : true , default:Date.now}

})
export const noteModel = mongoose.model("wishingtree_note",noteSchema)