

(function (){
  const api_Url="http://localhost:3000/api/auth/chat"
  const scriptTAg=document.currentScript;
  const ownerId=scriptTAg.getAttribute("data-owner-id")
if(!ownerId){
  console.log("not found")
  return
}
const button=document.createElement("div")
button.innerHTML="🗨️"
Object.assign(button.style,{
  position:"fixed",
  bottom:"24px",
  right:"24px",
  width:"56px",
  height:"56px",
  borderRadius:"50%",
  background:"#000",
  color:"#fff",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  cursor:"pointer",
 fontSize:"22px",
 boxShadow:"0 15px 40px rgba(0,0,0,0.35)",
 zIndex:"9999",})
document.body.appendChild(button)
const box=document.createElement("div")
Object.assign(box.style,{
  position:"fixed",
  bottom:"90px",
  right:"24px",
  width:"320px",
  height:"420px",
  background:"#fff",
  borderRadius:"14px",
  display:"none",
  flexDirection:"column",
  overflow:"hidden",
 boxShadow:"0 15px 40px rgba(0,0,0,0.25)",
 zIndex:"9999",
 fontFamily:"Inter, system-ui, sans-serif",
})
box.innerHTML=`<div style="
 background:#0000;
 color:#fff;
 padding:12px 14px;
 font-size:14px;
 display:flex;
 align-items:center;
 justify-content:space-between;">
  <span>Customer Support</span>
  <span style="cursor:pointer;
  font-size:16px;" id="chat-close">✖️</span>
 </div>
 <div id="chat-messages" style="
  flex:1;
  padding:12px;
  display:flex;
  flex-direction:column;
  overflow-y:auto;
  background:#f9fafb;
  display:flex;
  "></div>
  <div style="padding:12px; display:flex; gap:8px; border-top:1px solid #e5e7eb;">
  <input placeholder="Type your message..." id="chat-input" type="text" style="
  flex:1;
  padding:8px 12px;
  border:1px solid #e5e7eb;
  border-radius:6px;
  outline:none;
  placeholder:text-gray-400;">
  <button id="chat-send" style="
  background:#000;
  color:#fff;
  border:none;
  border-radius:6px;
  padding:8px 12px;
  cursor:pointer;
  ">Send</button>
   </div>`
 
document.body.appendChild(box)
button.onclick=()=>{
  box.style.display=box.style.display==="none"?"flex":"none" 
}
document.querySelector("#chat-close").onclick=()=>{
  box.style.display="none"
}
const input=document.querySelector("#chat-input")
const sendbtn=document.querySelector("#chat-send")
const messagearea=document.querySelector("#chat-messages")
function addmessage(text,from){
  const bubble=document.createElement("div")
  bubble.innerHTML=text
  Object.assign(bubble.style,{
  maxWidth:"80%",
  padding:"8px 12px",
  borderRadius:"14px",
  marginBottom:"8px",
  lineHeight:"1.4",
  background:from==="user"?"#000":"#e5e7eb",
  color:from==="user"?"#fff":"#000",
  alignSelf:from==="user"?"flex-end":"flex-start",
  borderTopLeftRadius:from==="user"?"14px":"4px",
  borderTopRightRadius:from==="user"?"4px":"14px",
  })
  messagearea.appendChild(bubble)
  messagearea.scroll=messagearea.scrollHeight
}
sendbtn.onclick=async()=>{
  const text=input.value.trim()
  if(!text)return
  addmessage(text,"user")
  input.value=""
  const typing=document.createElement("div")
  typing.innerHTML="Typing..."
  Object.assign(typing.style,{
  fontSize:"12px",
  
  color:"#6b7280",
  marginBottom:"8px",
  background:"#e5e7eb",
  })
  messagearea.appendChild(typing)
  messagearea.scroll=messagearea.scrollHeight
  try {
    const response=await fetch(api_Url,{ 
      method:"POST",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({ownerId,message:text})
    })
    const data=await response.json()
    messagearea.removeChild(typing)
    
    addmessage(data?.message || data || "Sorry, I couldn't process your request.","ai")
  }
  catch (error) {
    messagearea.removeChild(typing)
    addmessage("Sorry, I encountered an error.","ai")
  }
}
})()