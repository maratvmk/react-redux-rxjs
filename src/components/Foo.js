import React, { Component } from 'react';
import { connect } from "react-redux";

class Foo extends Component {
    componentWillUnmount() {
        this.props.dispatch({type: "FETCH_USER", payload: 'mara'})
    }
    
    componentDidMount() {
        this.props.dispatch({type: "FETCH_USER", payload: 'maratvmk'})
    }

    render() {
        return (
            <div className="App">
                Hello from Foo
            </div>
        );
    }
}

const store = state => ({user: state.userReducer.user})

const dispather = dispatch => ({
    dispatch: (params) => dispatch(params)
})

export default connect(store, dispather)(Foo)