import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "./firebase/FirebaseConfig"
export default function Stock({title,id,price,getStocks}) {
  const [edit, setEdit] = useState(false)
  const updateRef = useRef()
  const editTask = (id) => {
    setEdit(!edit)
  }
  const updateTask = async(e,ex)=>{
    // e.preventDefault();
    console.log(e,":",updateRef.current.value);
    const ref = doc(db,"stocks",e);
    updateDoc(ref,{
      price:updateRef.current.value
    })
    // setActive(!active)
    editTask();
    getStocks();
  }
  const deleteTask =(e)=>{
    const ref = doc(db,'stocks',e);
    deleteDoc(ref);
    getStocks();

  }
  return (
    <>
      <li className='todo-row border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${id}`}
          type='text'
          className={`${!edit?'hideme' :""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none todo-edit-task-input`}
          placeholder='Edit The Price'
          ref={updateRef}
        />
        <div id={'done-button-'+id} className={`${!edit?'hideme' :""}`}>
          <button
            className='text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded ml-2 todo-update-task'
            type='button'
            onClick={()=>updateTask(id)}
          >
            Done
          </button>
        </div>
        <div id={'task-'+ id} className={`todo-task px-5 ${edit?'hideme':""}`}>
         <div style={{
          color:"green"
         }}> {title} </div> <div style={{
          color:"red"
         }}> {price} </div>
        </div>
        <span id={'task-actions-'+id} className={`${edit?'hideme':""}`}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(id)}
            className='bg-transparent hover:bg-custom2 hover:text-white border border-custom2 hover:border-transparent rounded px-2 py-2'
          >
            <RiEditBoxLine/>
          </button>
     <button className="bg-transparent hover:bg-custom1 hover:text-white border border-custom1 hover:border-transparent rounded px-2 py-2"
     onClick={()=>{deleteTask(id)}}
     >
      <RiDeleteBin6Line/>
     </button>
        </span>
      </li>
    </>
  )
}
