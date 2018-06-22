import React, { Component } from 'react'
import axios from 'axios'
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './components/Landing'
import UserPage from './components/UserPage'



class App extends Component {


    constructor(props){
        super(props);

        this.state = {
            isSignedIn: false,
            user: {}
        }
    }

    componentDidMount(){
        axios.get('/api/current_user')
        .then((response) => {
            if(response.data){
                console.log(response.data);
                this.setState({isSignedIn: true});
                this.setState({user: response.data});
                console.log(this.state.user)
            }
        })
        .catch((error) => console.log(error));
    }


    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/"
                            render={(routeProps) => (
                                <Landing {...routeProps} isSignedIn={this.state.isSignedIn} />
                            )}    
                        />
                        <Route exact path="/user-info"
                            render={(routeProps) => (
                                <UserPage {...routeProps} user={this.state.user} />
                            )}    
                        />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App