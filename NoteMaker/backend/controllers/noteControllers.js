import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
  try{
    const note = await Note.find().sort({createdAt : -1});
    res.status(200).json(note);
  }
  catch(error){
    console.log("Error in getAllNotes controller");
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const createNote = async (req, res) => {
  try{
    const {title, content} = req.body;
    const addNote = new Note({title, content})
    const savedNote = await addNote.save();
    res.status(201).json(savedNote);
  }
  catch(error){
    console.log("Error is getting createNote");
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const updateNote = async (req, res) => {
  try{
    const {content, title} = req.body;
    const updateID = await Note.findByIdAndUpdate(req.params.id, {title, content});
    if(!updateID){
      res.status(404).json({message: "ID not found"});
    }
    const updatedNote = await updateID.save();
    res.status(201).json(updatedNote);
  }
  catch(error){
    console.log("Error in updateNote controller", error.body);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "ID not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      deletedNote
    });

  } catch (error) {
    console.log("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getNoteById = async (req, res) => {
  try{
    const noteID = await Note.findById(req.params.id);
    if(!noteID){
      res.status(404).json({message: "ID note found"});
    }
    res.status(200).json(noteID);
  }
  catch(error){
    console.log("Error in getNoteById controller", error.body);
    res.status(500).json({message: "Internal Server Error"});
  }
}



