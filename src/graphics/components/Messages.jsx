export function Messages(props) {
  return (
    <div id="top" className="messages">
      <h1>Important Messages</h1>
      { props.messages.map(msg => <h2 key={msg.id}>{msg.body}</h2>) }
    </div>
  )
}