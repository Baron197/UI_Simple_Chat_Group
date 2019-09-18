import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class App extends Component {
  state = { messages: [], userCount: 0 }
  componentDidMount() {
    const socket = io('https://api-chat-baron.herokuapp.com/');
    socket.on('chat message', this.updateMessages);
    socket.on('user connected', this.updateUserCount);
  }

  updateMessages = (msgs) => {
    this.setState({ messages: msgs })
  }

  updateUserCount = (count) => {
    this.setState({ userCount: 0 })
  }

  onBtnSendClick = () => {
    axios.post('https://api-chat-baron.herokuapp.com/sendmessage', {
      nama: this.refs.nama.value,
      message: this.refs.message.value
    }).then((res) => {
      console.log(res.data)
    })
  }

  onBtnClearClick = () => {
    axios.delete('https://api-chat-baron.herokuapp.com/clearmessages')
    .then((res) => {
      console.log(res.data)
    })
  }

  renderListMessage = () => {
    return this.state.messages.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.nama}</td>
          <td>{item.message}</td>
          <td></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <center>
        <h2>Chat Group (User Connected : {this.state.userCount})</h2>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Message</th>
              <th><input type="button" value="Clear" onClick={this.onBtnClearClick} /></th>
            </tr>
          </thead>
          <tbody>
            {this.renderListMessage()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" ref="nama" />
              </td>
              <td>
                <input type="text" ref="message" />
              </td>
              <td>
                <input type="button" value="Send" onClick={this.onBtnSendClick} />
              </td>
            </tr>
          </tfoot>
        </table>
      </center>
    )
  }
}

export default App;