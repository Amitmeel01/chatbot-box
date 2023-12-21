
key="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";

const sendBtn=document.querySelector("footer span");

const input=document.querySelector("input");
const chatBot=document.querySelector(".mid");

const createChatli = (message,className)=>{
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing" ? `<p> ${message} </p>` : `<span class="material-icons">smart_toy</span><p>${message}</p`;
    chatLi.innerHTML=chatContent;
    return chatLi;

}


const genrateResponse=(incomingChatLi)=>{
   const url="https://api.openai.com/v1/chat/completions";
    const messageElement=incomingChatLi.querySelector("p");

    const request={
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            message:[{role:"user",content: userMsg},]
        })
    }
fetch(url,request).then(res=>res.json()).then(data=>{  console.log(data);
    messageElement.textContent=data.choice[0].message.content;
}).catch((error)=>{
     messageElement.textContent="OOPS! something went wrong . please try again";
}).finally(()=> chatBot.scrollTo(0,chatBot.scrollHeight));
}  


const handleChat = ()=>{
    userMsg=input.value.trim();
    if(!userMsg) return;

   chatBot.appendChild(createChatli(userMsg,"outgoing"));
   input.value="";
   
   // for scroll

   chatBot.scrollTo(0,chatBot.scrollHeight);

   setTimeout(()=>{
    //display thinking msg
    const incomingChatLi=createChatli("Thinking...","incoming");
    chatBot.appendChild(incomingChatLi);
    chatBot.scrollTo(0,chatBot.scrollHeight);
    genrateResponse(incomingChatLi);
   },600)
};

sendBtn.addEventListener("click",handleChat);