import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/post';


class Home extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      usuariosBuscador:'',
        }
  }
  buscarUsuario(){
   db.collection('posts').where('owner', '==', this.state.usuariosBuscador).orderBy('createdAt').get(

   )
  }
  componentDidMount(){
    db.collection('posts').where('owner', '==', auth.currentUser).orderBy('createdAt').onSnapshot(
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

  render(){
    return(
   
      <View style={styles.container}>
        <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />}
        />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  formContainer:{
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Home;