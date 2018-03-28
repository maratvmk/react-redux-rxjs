import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { Link } from 'react-router'

class App extends Component {
    getUser = (username) => {
        this.props.dispatch({ type: 'FETCH_USER', payload: username });
    }

    cancel = () => {
        this.props.dispatch({ type: 'FETCH_USER_CANCELLED'});
    }

    users = ['dhh', 'torvalds', 'matz', 'benlesh', 'jayphelps', 'gaearon'];

    render() {
        return (
            <div>
            <header>
                Links:
                {' '}
                <Link to="/">Home</Link>
                {' '}
                <Link to="/foo">Foo</Link>
                {' '}
                <Link to="/bar">Bar</Link>
            </header>
            <div className="App">
                {this.users.map(user => {
                    return (
                        <button onClick={(e) => this.getUser(user)} className="button" key={user}>
                            {user}
                        </button>
                    )
                })}
                <button onClick={this.cancel} className="button">
                    Cancel
                </button>
                <div> 
                    <h3>
                        {this.props.user.name}
                        <div>{this.props.user.company}</div>
                    </h3>  
                    <img className="content" src={this.props.user.avatar_url} alt=''/>
                </div>
            </div>
            <div className="App">{this.props.children}</div>
            </div>
        );
    }
}

const store = state => ({user: state.userReducer.user})

const dispather = dispatch => ({
    dispatch: (params) => dispatch(params)
})

export default connect(store, dispather)(App);
