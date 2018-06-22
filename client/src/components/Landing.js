import React from 'react'
import logo from '../image/github.png'
import lnkdlogo from '../image/linkedin-button.png'

const Landing = ({isSignedIn}) => {
    return (
        <div>
            <h3>Welcome to #Assignment</h3>
            <a  href="https://github.com/Mishra121/linkedin-auth"><img style={{height: '60px', width:'60px'}} src={logo} alt="github-link-project"/></a>
            <hr/>
            <ol>
                <li>Authentication with Linkedin</li>
                <li>Display basic profile with ReactJS</li>
            </ol>
            <br/>
            <br/>
            {
                isSignedIn === false 
                ?<a href="/auth/linkedin"><img style={{height: '60px'}} src={lnkdlogo} alt="login"/></a>
                :<a href="/user-info" className="waves-effect waves-light btn">User-info</a>
            }
        </div>
    )
}

export default Landing