import {nanoid} from "nanoid";
import {notes} from "./notes.js";

// create note
const addNote = (req, res) => {
    const { title, tags, body } = req.payload;
    const id = nanoid(16);
    const timeStamp = new Date().toISOString();

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt: timeStamp,
        updatedAt: timeStamp,
    }

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = res.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        });
        response.code(201);
        return response;
    }

    const response = res.response({
        status: 'error',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(201);
    return response;
};

// get all notes
const getAllNotes = () => ({
    status: 'success',
    data: {
        notes
    }
});

// get note by id
const getNoteById = (req, res) => {
    const { id } = req.params;

    const note = notes.find((note) => note.id === id);

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            }
        }
    }

    const response = res.response({
        status: 'error',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// update by id
const editNoteById = (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const timeStamp = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt: timeStamp,
        }

        const response = res.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    const response = res.response({
        status: 'error',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// remove note by id
const removeNoteById = (req, res) => {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = res.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = res.response({
        status: 'error',
        message: 'Gagal menghapus catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

export {
    addNote,
    getAllNotes,
    getNoteById,
    editNoteById,
    removeNoteById
};
