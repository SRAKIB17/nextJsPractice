import React, { useRef, useState } from 'react';
import { useSession, getSession, signIn, signOut } from "next-auth/react"

import axios, { } from 'axios'
import Swal from 'sweetalert2';



const Todo = ({ note }) => {
    const [noteG, setNote] = useState(note)
    const noteRef = useRef();
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('')

    const addTodoHandler = async (event) => {
        event.preventDefault()
        const noteValue = noteRef.current.value;
        const newNote = {
            email: session?.user?.email,
            note: noteValue,
            done: false
        }

        if (!edit) {
            try {
                const { data } = await axios.post(`/api/todo/${session?.user?.email}`, newNote)

                if (data.acknowledged) {
                    Swal.fire({
                        text: ` Successfully added your todo note`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setNote([...note, newNote])
                }
            }
            finally {

            }
        }
        else if (edit) {
            const findNote = note.find(data => data._id === editId);
            findNote.note = noteRef.current.value;
            const filterNote = note.filter(data => data._id !== editId);
            try {
                const { data } = await axios.put(`/api/todo/${session?.user?.email}/${editId}`, { note: noteValue })
                if (data.acknowledged) {
                    Swal.fire({
                        text: ` Successfully update your todo note`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    setNote([findNote, ...filterNote])

                }
            }
            finally {

            }
        }
        event.target.reset()
        setEdit(false)
        setEditId('')
    }

    const handleNote = async (id, method) => {
        if (method === 'delete') {
            try {
                const { data } = await axios.delete(`/api/todo/${session?.user?.email}/${id}`);
                if (data.deletedCount === 1) {
                    Swal.fire({
                        text: ` Successfully delete todo`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    const newNote = note.filter(data => data._id !== id)
                    setNote(newNote)
                }

            }
            finally {

            }

        }
        else if (method === 'edit') {
            const edit = note.find(data => data._id === id);
            noteRef.current.value = edit.note
            setEditId(id)
            setEdit(true)
        }
        else if (method === 'done') {
            const findNote = await note.find(data => data._id === id);
            let done = {}
            if (findNote.done) {
                findNote.done = false;
                done = { done: false }
            }
            else {
                findNote.done = true;
                done = { done: true }
            }

            try {
                const { data } = await axios.put(`/api/todo/${session?.user?.email}/${id}`, done);


                if (data.acknowledged) {
                    Swal.fire({
                        text: ` Successfully update your todo note`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    const filterNote = note.filter(data => data._id !== id)
                    setNote([...filterNote, findNote])
                }
            }

            finally {

            }
        }
    }
    return (
        <div className='text-center'>
            <div>
                <form onSubmit={addTodoHandler} action={'/api/todo/' + session?.user?.email} method='post' className=''>
                    <input className='input  input-primary mr-1' ref={noteRef} placeholder="Todo" required name='note' type="text" />
                    <button className='btn btn-primary'>{edit ? 'Save' : 'Add'}</button>
                </form>
            </div>
            <div style={{ height: '100vh', overflow: 'auto' }}>
                {
                    noteG?.map((data) =>
                        <div key={data._id} className='flex mt-2 m-auto max-w-[350px] justify-between items-center border-2 border-[#12a5c2] border-solid pl-2 pr-2'>
                            <p className={'note ' + (data.done ? 'strike' : '')}>
                                {data.note}
                            </p>
                            <div>
                                <button className='p-1' onClick={() => handleNote(data._id, 'edit')}>
                                    <img className='align-middle w-[28px] h-[28px]' src='Editing/edit.png' alt="" />
                                </button>
                                <button className='p-1' onClick={() => handleNote(data._id, 'done')}>
                                    <img className='align-middle w-[28px] h-[28px]' src='Editing/done.png' alt="" />
                                </button>
                                <button className='p-1' onClick={() => handleNote(data._id, 'delete')}>
                                    <img className='align-middle w-[28px] h-[28px]' src='Editing/delete.png' alt="" />
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Todo;

