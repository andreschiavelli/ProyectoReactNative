import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }
  componentDidMount(){
    db.collection('posts').orderBy('createdAt, ASC').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,   
            data: doc.data(),
          })
        
        
      })
    })
  }
        
  eliminarPosteo(){
    db.collection('posts').doc(this.props.postData.id).delete({
      comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
   })

  }
  render(){
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido: {this.props.userData.email}</Text>
          <Text style={styles.welcome}> Bienvenido: {this.props.userData.displayName}</Text>
          <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
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