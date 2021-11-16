import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/post';


class Home extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      filterBy:'', 
      // usuarios: [],
        }
  }
//   evitarSubmit(e){
//     e.preventDefault();
//     console.log('Evitando el envío')
// }

// controlarCambios(event){
//     this.setState({
//         filterBy: event.target.value 
//     }, () => this.props.filtrarUsuarios(this.state.filterBy)) 
           
//  }
// filtrarUsuarios(text){
//   let artistasFiltrados = this.state.artistasIniciales.filter( artista => artista.name.toLowerCase().includes(text.toLowerCase())); 
//   this.setState({
//       artistas: artistasFiltrados  
//   })
 
// }

  componentDidMount(){
    db.collection('postsForm').onSnapshot(
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
           {/* <Text> <form action="Buscar por Nombre" onSubmit={(submit)=>this.evitarSubmit(submit)}> 
      <input type="text" onChange={(filtrado)=>this.controlarCambios(filtrado)} value={this.state.filterBy} placehoder='ingrese su nombre'/>
      </form></Text> */}
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