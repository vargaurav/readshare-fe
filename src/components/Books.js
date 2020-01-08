import React, { Component } from 'react';
import Header from './Header';
import Background from '../images/bck.jpg';
import './Books.scss';

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
            items: [],
            hideMore: {},
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

      more=(hideId)=>{
        console.log("hideId: ", hideId);
        this.setState({
          hideMore: {
            ...this.state.hideMore,
            [hideId]: true,
          }
        })
      }

      render() {
        const { error, isLoaded, items, hideMore } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div className={"books"}>
            
            
            {items.content_info.map((data, key) => {
              const bookId = items.book_info[data.book_id],
                    userId = items.user_info[data.user_id],
                    id = `${userId}_${bookId}`;
              return (
                <div id={id} className={"box"}>
                  <h2>{bookId}</h2>
                  <span>{userId}</span>
                  <p className={!hideMore[id] && "hider"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aspernatur excepturi perferendis, corrupti minima cum repellat labore mollitia architecto quam ad nulla soluta atque hic veritatis assumenda. Nihil, alias deserunt.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aspernatur excepturi perferendis, corrupti minima cum repellat labore mollitia architecto quam ad nulla soluta atque hic veritatis assumenda. Nihil, alias deserunt.
                  </p>
                  {!hideMore[id] && <a className={"more"} onClick={()=>this.more(id)}>more</a>}
                </div>
              )
              //  return (
              //      <table style={{marginLeft: '120px', marginRight: '120px'}}>
              //          <tr>
              //             <td>{items.book_info[data.book_id]}     |     </td>
              //             <td>{items.user_info[data.user_id]}</td>
              //          </tr>
              //          <tr>
              //             <td style={sectionStyle}>{data.content}</td>
              //          </tr>
              //      </table>
              //  )
            })}
            
            </div>
          );
        }
      }
}

export default Books;