const socket = io()
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')

const chatWindow = document.querySelector("#chat_body")

function _get_current_time_hh_ss() {
    var today = new Date();
    const hour = today.getHours()
    const minute = today.getMinutes()
    const time = hour + ':' + minute
    return time
}

function _generate_icon_container_div() {
    const div = document.createElement('div')
    div.classList.add('img_cont_msg')

    const img = document.createElement('img')
    img.src = "icon/user_icon.png"
    img.classList.add('rounded-circle', 'user_img_msg')
    div.appendChild(img)

    return div
}

function _generate_msg_containter_div(message, time, type) {
    const div = document.createElement('div')
    if (type === "send")
    {
        div.classList.add('msg_cotainer_send')
        div.innerText = message
    } else {
        div.classList.add('msg_cotainer')
        div.innerText = message
    }

    const span = document.createElement('span')
    span.classList.add('msg_time')
    span.innerText = time

    div.appendChild(span)

    return div
}

function scroll_to_bottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function is_reach_end_of_chat() {
  // Prior to getting your messages.
  shouldScroll = chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight;

  return shouldScroll
}

function createSendMessage(message) {
    const div = document.createElement('div')
    div.classList.add('d-flex', 'justify-content-end', 'mb-4')

    const current_time = _get_current_time_hh_ss();
    const msg_div = _generate_msg_containter_div(message, current_time, "send")
    div.appendChild(msg_div)

    const icon_div = _generate_icon_container_div()
    div.appendChild(icon_div)
    return div
}

function createReceiveMessage(message) {
    const div = document.createElement('div')
    div.classList.add('d-flex', 'justify-content-start', 'mb-4')

    const icon_div = _generate_icon_container_div()
    div.appendChild(icon_div)

    const current_time = _get_current_time_hh_ss();
    const msg_div = _generate_msg_containter_div(message, current_time, "receive")
    div.appendChild(msg_div)
    return div
}

chat.addEventListener('submit', event => {
    event.preventDefault()
    socket.emit('chat', Input.value)
    console.log("Submit message")
    const send_msg = createSendMessage(Input.value)
    const should_scroll = is_reach_end_of_chat()
    chatWindow.appendChild(send_msg)
    if (should_scroll) {{
        scroll_to_bottom()
    }}
    Input.value = ''
})

function test_add_msg(message) {
    const new_msg = createReceiveMessage(message)
    chatWindow.appendChild(new_msg)

    const new_send_msg = createSendMessage(message)
    chatWindow.appendChild(new_send_msg)
}

ocket.on('chat', message => {
    const new_msg = createReceiveMessage(message)
    const should_scroll = is_reach_end_of_chat()
    chatWindow.appendChild(new_msg)
    if (should_scroll) {{
        scroll_to_bottom()
    }}
})

