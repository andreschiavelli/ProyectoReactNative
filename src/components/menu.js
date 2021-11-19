import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';
import BuscadorUsuarios from '../screens/buscadorUsuarios'

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn:false,
            user:'',
            errorMessage:''
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }

    register(email, pass, userName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( 
                (res)=>{
                    console.log(res);
                    res.user.updateProfile({
                        displayName: userName})
             
                    })
            .catch( error => {
                console.log(error);
                this.setState({
                    errorMessage:error,
                })
            })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user: response.user,
                })
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    errorMessage:error,
                })
            })
    }

    logout(){
        auth.signOut()
            .then( (res)=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch()
    }

    render(){
        return(
            <NavigationContainer>
            {this.state.loggedIn == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} errorMessage={this.state.errorMessage}/>}/>
                    <Drawer.Screen name="Registrer" component={()=><Register register={(email, pass, userName)=>this.register(email, pass, userName)} errorMessage={this.state.errorMessage}/>} />
                </Drawer.Navigator> :
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={()=><Home />} />
                    <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Search Users" component={()=><BuscadorUsuarios />} />
                    <Drawer.Screen name="Profile" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }
}

export default Menu;