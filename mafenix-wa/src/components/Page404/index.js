// Dependencies
import React, { Component } from 'react';
import { logPageView } from '../../analytics';
class Page404 extends Component {
  constructor(){
    super()
    logPageView();
  }
  render() {
    return (
      <div className="content-area error-page" style={{backgroundColor: '#FCFCFC', paddingBottom: 55}}>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 col-sm-12 text-center page-title">
              <h2 className="error-title">404</h2>
              <p>Lo sentimos, es posible que la página solicitada se haya movido o eliminado</p>
              <a href="/" className="btn btn-default">Inicio</a>                        
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Page404;
