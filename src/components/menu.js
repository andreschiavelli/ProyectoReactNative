import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/home';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor() {
        super();
        this.state = {  
            loggedIn: false,
            userData: [],
            errorMessage: {},
            errorCode:'',
        };
    }

    componentDidMount(){
        auth.onAuthStateChanged(user =>{
            if(user){
            this.setState({
                loggedIn: true,
                user: user,
            })
            }
        })
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then(() => {
            console.log('Registrado');
         })     
        .catch(error => {
          console.log(error);
          this.setState({
            errorMessage: error.message,
            errorCode: error.code,
        })
        })
    
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response) =>{
            console.log('Logueado');
            console.log(response);
            this.setState({
                loggedIn: true,
                userData: response.user,
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code,
            })
        })
    }

    logout(){
        auth.signOut()
        .then( ()=>{
            this.setState({
                loggedIn:false,
                user:'',
            })
        })
        .catch()
    }

    render() {
        return (
            this.state.loggedIn == false ?
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name='Login' component={() => <Login login={(email, pass) => this.login(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />} />
                        <Drawer.Screen name='Register' component={() => <Register register={(email, pass) => this.register(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />} />
                    </Drawer.Navigator>
                </NavigationContainer> :
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={() => <Home />}/>
                        <Drawer.Screen name="New Post" component={(drawerProps) => <PostForm drawerProps={drawerProps}/>}/>
                        <Drawer.Screen name="Mi Perfil" component={() => <Perfil logout={() => this.logout()} userData={this.state.user}/>}/>
                    </Drawer.Navigator>
                </NavigationContainer>
        );
    }
}

export default Menu;