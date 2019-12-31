import React, { Component } from 'react';
import Header from './Header';
import Background from '../images/bck.jpg';

var sectionStyle = {
    width: "100%",
    height: "40px",
    backgroundImage: "url(" + { Background } + ")"
};

class Books extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:3001/v1/home",{
            headers:{
                'Cache-Control':'no-cache',
                'method':"GET"
            }
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
            <table>
            <tbody>
            {items.content_info.map((data, key) => {
               return (
                   <table style={{marginLeft: '120px', marginRight: '120px'}}>
                       <tr>
                          <td>{items.book_info[data.book_id]}     |     </td>
                          <td>{items.user_info[data.user_id]}</td>
                       </tr>
                       <tr>
                          <td style={sectionStyle}>{data.content}</td>
                       </tr>
                   </table>
               )
            })}
            </tbody>
            </table></div>
          );
        }
      }
}

export default Books;