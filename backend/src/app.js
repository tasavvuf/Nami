import express from 'express';
import { noteModel} from "./model/note.model.js";
const app = express()
app.use(express.json())
// add cors
import cors from "cors"
app.use(cors())
app.get("/",(_,res)=>{
    res.send("welcome to server ")
})
    app.get("/notes",async(req,res)=>{
    try {
        const notes = await noteModel.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message : "something went wrong"})
    }
})
app.post("/wish",async(req,res)=>{
    try {
      if(!req.body.content ){
        return res.status(400).json({message : "content required"})
      }
  
    const newNote = await noteModel.create(req.body)
         res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({message : "something went wrong", error : error.message})
    }
})
app.patch("/notes/:id/felt",async (req,res)=>{
    const {id} = req.params
    const {type}   = req.body
    const note = await noteModel.findById(id)
    if(!note){
        return res.status(404).json({message : "note not found"})
    }
    if(type =="like"){
    note.feltCount ++
    }
    else if(type == "dislike"){
        note.feltCount --
    }
   await note.save()
    res.status(200).json(note)
}) 
app.patch("/notes/:id/heart", async(req,res)=>{
    const {id} = req.params
    const {type}   = req.body
    const note = await noteModel.findById(id)
    if(!note){
        return res.status(404).json({message : "note not found"})
    }
    if(type =="like"){
    note.heartcount ++
    }
    else if(type == "dislike"){
        if( note.heartcount > 0){   
        note.heartcount --}
     
    }
   await note.save()
    res.status(200).json(note)
}) 

export default app