import React, { useRef, useState } from 'react';
import { useSession, getSession, signIn, signOut } from "next-auth/react"




const Todo = ({ note }) => {
  
    const noteRef = useRef();
    const { data: session, loadingSession } = useSession();
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('')

    const addTodoHandler = async (event) => {

    }
    const handleNote = async (id, method) => {

    }
    return (
        <div className='text-center'>
            <div>
                <form onSubmit={addTodoHandler} action={'/api/todo/' + session?.user?.email} method='post'>
                    <input className='input  input-primary ' ref={noteRef} placeholder="Todo" required name='note' type="text" />
                    <button className='btn btn-primary'>{edit ? 'Save' : 'Add'}</button>
                </form>
            </div>
            <div style={{ height: '100vh', overflow: 'auto' }}>
                {
                    note?.map((data) =>
                        <div key={data._id} className='flex mt-2 m-auto max-w-[350px] justify-between items-center border-2 border-[#268CA1] border-solid w-full'>
                            <p className={'note ' + (data.done ? 'strike' : '')}>
                                {data.note}
                            </p>
                            <div>
                                <button onClick={() => handleNote(data._id, 'edit')}>
                                    <img className='align-middle w-[30px] h-[30px]' src='Editing/edit.png' alt="" />
                                </button>
                                <button onClick={() => handleNote(data._id, 'done')}>
                                    <img className='align-middle w-[30px] h-[30px]' src='Editing/done.png' alt="" />
                                </button>
                                <button onClick={() => handleNote(data._id, 'delete')}>
                                    <img className='align-middle w-[30px] h-[30px]' src='Editing/delete.png' alt="" />
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

