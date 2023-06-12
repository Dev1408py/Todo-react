const express = require('express')
const router = express.Router();
const Note = require("../models/Notes.js");
const fetchuser = require('../middleware/fetchuser.js');
const { body, validationResult } = require("express-validator");


// ROUTER 1 fetching all the notes from a specific user at http://localhost:5000/api/notes/getnotes. Login required
router.get('/getnotes',fetchuser,async (req,res)=>{
    try{
        
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
        

    }catch(err){
        console.log(err)
        res.status(500).json({error:"Some error occured,please try again."})

    }
    
})

// ROUTER 2 adding notes from a specific user at http://localhost:5000/api/notes/getnotes. Login required

router.post('/addnotes',fetchuser,[
    body("title", "enter a title of length min 3").isLength({ min: 3 }),
    body("description","enter a description of length min 5 ").isLength({ min: 5 }),

    ],async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    try{
        
        const note = new Note({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.user.id
        })

        const notessaved = await note.save()
        res.json(notessaved)

    }catch(err){
        res.status(401).json({error:"some error occured ,try again ,from addnotes"})
        console.log(err)
    }
    })

// ROUTE 3 updating notes from a specific user at http://localhost:5000/api/notes/updatenote/:id. Login required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        let new_note = {}//creating a new empty object to append updated elements from the request.
        const {title,description,tag} =  req.body;

        if(title){new_note.title = title}
        if(description){new_note.description = description}
        if(tag){new_note.tag = tag}

        //checking the note id fo the requested note to be updated.
        const nid = req.params.id;
        const note = await Note.findById(nid);

        //to verify that the note is updated by the owner of the note only
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error:"you are not authorized to update this note"})
            }
        const updated_note = await Note.findByIdAndUpdate(nid,{$set:new_note},{new:true})
        res.json(updated_note)

    }
    catch(err){
        console.error(err)
        res.status(401).json({error:"Cannot update note,in catch block."})
    }

})

// ROUTE 4 deleting notes for a specific user at http://localhost:5000/api/notes/delete/:id. Login required

router.delete('/delete/:id',fetchuser,async(req,res)=>{
    try{
        //checking the note id fo the requested note to be deleted.
        const nid = req.params.id;
        const note = await Note.findById(nid);

        //to verify that the note is updated by the owner of the note only
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error:"you are not authorized to update this note"})
        }
        const deleted_note = await Note.findByIdAndDelete(nid)
        res.json({"success":"The note is scuccessfully deleted.",deleted_note})

    }
    catch(err){
        console.error(err)
        res.status(401).json({error:"Cannot delete note,in catch block."})
    }

})


module.exports = router;