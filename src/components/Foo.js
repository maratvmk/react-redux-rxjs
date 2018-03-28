import React, { Component } from 'react';
import { connect } from "react-redux";
import { push } from "react-router-redux";

class Foo extends Component {
    
    componentDidMount() {
        // this.props.dispatch(push('/bar'))
        this.props.dispatch({type: "FETCH_USER", payload: 'maratvmk'})
    }

    componentWillUnmount() {
        this.props.dispatch({type: "FETCH_USER_CANCELLED"})
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