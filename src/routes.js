import {addNote, getAllNotes, getNoteById, editNoteById, removeNoteById} from "./handler.js";

export const routers = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNote
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotes
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteById
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteById
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: removeNoteById
    }
]