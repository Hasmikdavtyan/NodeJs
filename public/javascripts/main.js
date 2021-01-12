const socket  = io()
const form = document.getElementById('chat-form')

socket.on('message', msg=>{
  
  const div = document.createElement('div')
  div.innerHTML = ` <p >  ${msg} </p>`
  let msgContainer=document.getElementsByClassName('chat-messages')[0]
  msgContainer.appendChild(div)
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
  
    // get message from input form
    let msg = document.getElementById('msg').value 

    // send message to the server
    socket.emit('ChatMsg', msg)
    document.getElementById('msg').value = ''
    

})





