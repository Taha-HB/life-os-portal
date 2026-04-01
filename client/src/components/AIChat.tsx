"use client"

import {useState} from "react"
import axios from "axios"

export default function AIChat(){

const [msg,setMsg]=useState("")
const [reply,setReply]=useState("")

const ask = async()=>{

 const res = await axios.post("/api/ai",{
  message:msg
 })

 setReply(res.data.reply)

}

return(

<div className="p-4 bg-white rounded shadow">

<h3 className="font-bold mb-3">
AI Study Assistant
</h3>

<input
className="border p-2 w-full mb-3"
placeholder="Ask productivity advice"
onChange={e=>setMsg(e.target.value)}
/>

<button
onClick={ask}
className="bg-orange-500 text-white px-4 py-2 rounded"
>
Ask
</button>

<p className="mt-4">
{reply}
</p>

</div>

)
}
