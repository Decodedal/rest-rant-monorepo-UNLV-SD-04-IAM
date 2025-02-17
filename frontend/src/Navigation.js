import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <>
                <li style={{ 
                    float: 'right', 
                }}>
                    <a href="#"
                        style={{
                            lineHeight: '30px',
                            fontSize: '1rem',
                        }}
                        onClick={() => {
                            localStorage.removeItem('token');
                            setCurrentUser(null)
                            history.push("/")
                        }}>
                        LogOut
                    </a>
                </li>
                <li style={{
                        float: 'right',
                        lineHeight: '30px',
                        color: 'white'
                    }}>
                    Logged in as {currentUser.firstName} {currentUser.lastName}
                </li>
            </>
        )
    }

    let addPlacesButton = null;
    if (currentUser?.role === 'admin') {
        addPlacesButton = (
            <li>
                <a href="#" onClick={() => history.push("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/places")}>
                        Places
                    </a>
                </li>
                {addPlacesButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;