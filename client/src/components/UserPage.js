import React from 'react'

const UserPage = ({user}) => {
    return (
        <div>
            <h1>Profile-Info-Page</h1>

            <br/>
            <br/>
            <br/>
    
            <div className="row">
                <div className="col s12 m8">
                <div className="card">
                        <div>
                            <div className="card-image">
                            <img style={{height:'150px' ,width:'150px'}} src={user.pictureUrl} alt=''/>
                            </div>
                            <div style={{float: 'right'}}>
                            <h3 style={{position: 'relative', bottom:'115px', right:'42px'}}>{user.name}</h3>
                            </div>
                        </div>
                        <div className="card-content">
                        <p>{user.headline}</p>
                        <hr/>
                        <p>email: {user.email}</p>
                        </div>
                </div>
                </div>
            </div>
    
            <br/>
            <a href="/api/logout" className="waves-effect waves-light btn">Logout</a>
        </div>
    )
}

export default UserPage