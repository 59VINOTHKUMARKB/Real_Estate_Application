import './layout.scss'
import Navbar from '../../components/navbar/NavBar';
import {Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useEffect,useContext } from 'react';
function Layout(){
    return(
        <div className="layout">
            <div className="navbar"><Navbar/></div>
            <div className="contents">
                <Outlet/>
            </div>
        </div>
    )
}
function RequireAuth(){
    const{currentUser} =useContext(AuthContext)
    useEffect(()=>{
        if(!currentUser)
            <Navigate to="/login" />;
    },[currentUser])
    return(
        <div className="layout">
            <div className="navbar"><Navbar/></div>
            <div className="contents">
                <Outlet/>
            </div>
        </div>
    )
}

export {Layout,RequireAuth};