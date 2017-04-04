import React from 'react';
import ReactDOM from 'react-dom';
import HomePageContainer from '../containers/HomePageContainer';
import FormContainer from '../containers/FormContainer'
// calc socket url
var calc_sock = 'ws://' + window.location.host + "/calc/"
ReactDOM.render(< FormContainer socket={calc_sock}/>, document.getElementById('react-app'));
