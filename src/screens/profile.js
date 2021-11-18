import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/postUsuario';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
    }
  }
  componentDidMount(){
    db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,   
            data: doc.data(),
          })
        })

        this.setState({
          posteos: posts,
        })
      }
    )
  }
        
  eliminarPosteo(id){
    db.collection('posts').doc(id).delete()
    .then((res)=>{
      this.setState({
        posts:posteos,
      })
     })
     .catch((error)=> console.log(error)
    )}
  
  render(){
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido: {this.props.userData.email}</Text>
          <Text style={styles.welcome}> Bienvenido: {this.props.userData.displayName}</Text>
          <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
          <Text>Mis posteos: {this.state.posteos.length}</Text>
          <FlatList 
          data= { this.state.posteos }
          keyExtractor = {post => post.id}
          renderItem = {({item}) => <Post postData={item} eliminarPosteo= {(id)=>this.eliminarPosteo(id)}/>}
          /> 
          

          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Logout</Text>
          </TouchableOpacity>         
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10
    },
    welcome:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    element:{
        marginBottom:10,
    },
    touchable:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    }
    
});

export default Profile;