import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import PageNotFound from './PageNotFound';

const Admin = () => {

    const [users, setUsers] = useState(['']);
    const [load, setLoad] = useState(true);
    const [noData, setNoData] = useState(false); 


    useEffect(() => {
        axios.get('http://localhost:5000/users/user-list')
            .then(response => {
                setLoad(false);
                if ((response.data).length === 0){
                    setNoData(true);
                }
                else {
                    setUsers(response.data);
                }
            })
            .catch((error) => {console.log(error);})
    }, []);
    
    return (
        <div className="container recipe-list user">
        {load ? 
            <h2>Loading...</h2> 
            : 
            (noData? <PageNotFound/> :
                <Fragment>
                    <h2>Users List</h2>
                    {users.map((user, index) => 
                        <div key={index}>
                            <p><strong>Name: </strong>{user.name}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>User ID: </strong>{user._id}</p>
                            <hr/>
                        </div>
                    )}
                </Fragment>
            )
        }
    </div>  
    );

}

export default Admin;