import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';
import Essay from './essay';
import Podcast from './podcast';
import Thread from './thread'; 

class Header extends Component {
    constructor(){
        super();
        this.state = {render:''};
    }
    handleClick=(compName, e)=>{
        console.log(compName);
        this.setState({render:compName});        
    }
    _renderSubComp(){
        switch(this.state.render){
            case 'book': return <Books/>
            case 'essay' : return <Essay/>
            case 'podcast': return <Podcast/>
            case 'thread': return <Thread/>
        }
    }

  render(){
    return (
        <div>
            <p  style={{backgroundColor: 'rgb(255,102,0)', marginLeft: '100px', marginRight: '100px'}}><table><tr><td> 
                    <img src=""></img>
                    </td>
                    <td> 
                        <p> ReadShare | </p>
                    </td>
                    <td> 
                        <a href = "#" onClick={this.handleClick.bind(this, 'book')} style={{textDecoration: 'none'}}> Book Summaries | </a>
                    </td>
                    <td> 
                        <a href = "#" onClick={this.handleClick.bind(this, 'thread')} style={{textDecoration: 'none'}}> Book Threads | </a>
                    </td>
                    <td> 
                        <a href = "#" onClick={this.handleClick.bind(this, 'podcast')} style={{textDecoration: 'none'}}> Podcasts Summaries | </a>
                    </td>
                    <td> 
                        <a href = "#" onClick={this.handleClick.bind(this, 'essay')} style={{textDecoration: 'none'}}> Essays </a>
                    </td></tr></table></p>
                    {this._renderSubComp()}
        </div>
    );
  }
}

export default Header;