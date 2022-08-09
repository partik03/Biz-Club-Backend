import './App.css';
import { db } from './firebase/FirebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import Stock from './Stock';
import { MdOutlineNoteAlt } from "react-icons/md";
// import { async } from '@firebase/util';
function App() {
  const [active, setActive] = useState(false)
const stockRef = useRef("")
const priceRef = useRef(0)
const updatePrice = useRef(0)
const [stocks, setStocks] = useState()
const handleUpdate = async(e,ex)=>{
  // e.preventDefault();
  console.log(e,":",ex.target[0].value);
  const ref = doc(db,"stocks",e);
  updateDoc(ref,{
    price:ex.target[0].value
  })
  setActive(!active)
}
const handleSubmit = (e)=>{
e.preventDefault();
console.log("f");
addDoc(collection(db,"stocks"),{
  name: stockRef.current.value,
  price:priceRef.current.value
}).then(()=>{
  console.log("Stock Created Successfully");
  getStocks();

}).catch((err)=>{
  console.log("The error is",err);
})
}
const getStocks =async()=>{
  const q1 = query(collection(db,'stocks'));
  const data = await getDocs(q1);
  setStocks(data.docs.map((e)=>({...e.data(),id:e.id})));
  console.log(stocks);
}
useEffect(() => {
  getStocks()
  console.log(stocks);
}, [])
setTimeout(() => {
  console.log(stocks);
}, 6000);

  return (
   <>
   <div className="form">
   <form onSubmit={handleSubmit} id="form">
    <input type="text" placeholder='Input the Stock Name' ref={stockRef} />
    <input type="number" placeholder='Input the Stock Price' ref={priceRef} />
    <button>Create Stock</button>
   </form>
   </div>
   <div className='stockCont'>
    <h2>Stocks</h2>
    <div className='stocks'>
   {
    stocks ? Array.from(stocks).map((e)=>
      (
        <Stock title={e.name} price={e.price} id={e.id} getStocks ={getStocks} />
      )
    
    )
    :
    <h1>NA</h1>
   }
   </div>
   </div>
  
   </>
  );
}

export default App;
