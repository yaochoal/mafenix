// Dependencies
import React, { Component } from 'react';


class Title extends Component {
 
  render() {
    return (
    <div className="page-head"> 
            <div className="container">
                <div className="row">
                    <div className="page-head-content">
                        <h1 className="page-title">{this.props.title}</h1>               
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Title;
