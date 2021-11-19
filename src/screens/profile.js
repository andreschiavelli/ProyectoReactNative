import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/postUsuario';
import { color } from 'react-native-reanimated';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      showInfo: false,
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
  
  showInfo(){
      this.setState({
          showInfo: true,
      })
  }

  hideInfo(){
      this.setState({
          showInfo: false,
      })
  }
  
  render(){
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> ¡Bienvenido {this.props.userData.displayName}!</Text>
          
          {
            this.state.showInfo ?
                <TouchableOpacity onPress={() => this.hideInfo()}>
                    <Text style={styles.mail}> e-mail: {this.props.userData.email} <Image style={styles.infoButton} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAERUlEQVRoge2aS2xUVRjHf9+902nHtsRUIQFWFjWyMDEu21rSBxqaujKzg2YqCyVS4oMEtroCjRpoNIQYHBh1U+LGgCV0aCi1G4IrowRoXfGS+IZOO/Tez0V7J3eenfugUwy/1XfPPfc7//+ce++cc+6BR6wuJKxEO0e1xYrQKUKHwmZgE7AOaFyqcg+4Dcwo/CzKD9l6zn/zkvwZRvuBjCTGtQGbuAoDonQDhscUFpAWJaUmJ5NdMudXiy8j8SmNNWV4S5V3Edb7bTwP5abCx7OP8flIm2S8Xu7ZyOCY9qvBYZSnvF5bJTMq7DneLae8XFS1kcS4NojFQRX2eNfmi1R0ljePviqz1VSuysj2CV0fyXIa4YVg2jxzCYP+ZJfcWq7iskZeH9NWWzgLtIYizTvThvLysV6ZqVSpopEdZ3SdGWESeCZUad6ZwaC9Us+UfV3GpzRmmpyh9iYAWrE5lRjXhnIVyhppzHAo4DORVWWfYbHRsNgI7AeyAfK9iM2n5U6WvLUGx7Rfhe8CNAqwP9kjB90FibTuAw4ESWpD34ke+b6wvKhH4lMaU+FQkMYAFuo4UVRocDxoXgOGS91iRUYa59hNCG+o6Fxxb9s2ZtC8wCZRdhUW5hlZGju9E0Jj2CY7SjRWVOYHVfYW9kokv3XioY2d4INEWjEsUpAz9n5IuTeoxWvA105BXo+oMBBSQwBR4IBtct02uc7iQx4NK7kU9G7uPt45qi1WHb9BKPfxSmBh8GSyS/4CV4/cr2MLD48JAFOVTucgZ8SE9tro8Y/YdDhx7mFfmp6GQrJHSv7RJtKqYbUBgPCcE7of9tUwpvLKs07gNvJEWNkTadXQf/3StDiB20jTCjQcNmucwOuqx6rFbeRuzVT45x8ncBv5vQZCgvKHE7iNXK2BkKBccYKcEYFfaqMlAMplJ8wZUWWyNmoCIFxwwpyRbD3nWVyLfShQWIjaTDjHOSNLq+LnaqLKByKMHd0qfzvHef8joiXm2auXlPsgz0hTlhHgxorK8YNyE+Fbd1GekeE+mVflk5VV5QPhw8JvKUXD7fiUxhoz/ESAlZRyw3iHIANKhWti8HyhkaKx1kibZFbw04FnRBkq9WWr7C+XOKdHUN54sLI8InyW7JbdpU6VH/0KbwOXHpQmH1xsnuO9cicr3suDE7pW7zOJayZWI6YjSvsXvXK7XIWK85EvO+WOoWwDpkOXVj3T1gJbK5mAKiZWx3plBoMO4MfQpFXPxYjSnnpFfl2uYlUzxGSX3Gqep02Uw8G1VU3qXowty/WEg+fP0wNp3WbAMIs7G0JH4ZooQ8leGfVyna8NA4lxbRBllyp7gQ1+cpTgBvARBkf87IAItIVj6LTW340SV9iO0Iv3JVcL4azafLUmy8nhPpn3qyW0TTWJcX1clU6x6VBhs8DTwFqgeanKv8Ad4CrKZYQLUZsJ91D8Ef8n/gPe9EFOkI01QwAAAABJRU5ErkJggg=="}}></Image></Text>                  
                  <View>
                    <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
                    <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
                  </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.showInfo()}>
                  <Text style={styles.mail}> e-mail: {this.props.userData.email} <Image style={styles.infoButton} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAERUlEQVRoge2aS2xUVRjHf9+902nHtsRUIQFWFjWyMDEu21rSBxqaujKzg2YqCyVS4oMEtroCjRpoNIQYHBh1U+LGgCV0aCi1G4IrowRoXfGS+IZOO/Tez0V7J3eenfugUwy/1XfPPfc7//+ce++cc+6BR6wuJKxEO0e1xYrQKUKHwmZgE7AOaFyqcg+4Dcwo/CzKD9l6zn/zkvwZRvuBjCTGtQGbuAoDonQDhscUFpAWJaUmJ5NdMudXiy8j8SmNNWV4S5V3Edb7bTwP5abCx7OP8flIm2S8Xu7ZyOCY9qvBYZSnvF5bJTMq7DneLae8XFS1kcS4NojFQRX2eNfmi1R0ljePviqz1VSuysj2CV0fyXIa4YVg2jxzCYP+ZJfcWq7iskZeH9NWWzgLtIYizTvThvLysV6ZqVSpopEdZ3SdGWESeCZUad6ZwaC9Us+UfV3GpzRmmpyh9iYAWrE5lRjXhnIVyhppzHAo4DORVWWfYbHRsNgI7AeyAfK9iM2n5U6WvLUGx7Rfhe8CNAqwP9kjB90FibTuAw4ESWpD34ke+b6wvKhH4lMaU+FQkMYAFuo4UVRocDxoXgOGS91iRUYa59hNCG+o6Fxxb9s2ZtC8wCZRdhUW5hlZGju9E0Jj2CY7SjRWVOYHVfYW9kokv3XioY2d4INEWjEsUpAz9n5IuTeoxWvA105BXo+oMBBSQwBR4IBtct02uc7iQx4NK7kU9G7uPt45qi1WHb9BKPfxSmBh8GSyS/4CV4/cr2MLD48JAFOVTucgZ8SE9tro8Y/YdDhx7mFfmp6GQrJHSv7RJtKqYbUBgPCcE7of9tUwpvLKs07gNvJEWNkTadXQf/3StDiB20jTCjQcNmucwOuqx6rFbeRuzVT45x8ncBv5vQZCgvKHE7iNXK2BkKBccYKcEYFfaqMlAMplJ8wZUWWyNmoCIFxwwpyRbD3nWVyLfShQWIjaTDjHOSNLq+LnaqLKByKMHd0qfzvHef8joiXm2auXlPsgz0hTlhHgxorK8YNyE+Fbd1GekeE+mVflk5VV5QPhw8JvKUXD7fiUxhoz/ESAlZRyw3iHIANKhWti8HyhkaKx1kibZFbw04FnRBkq9WWr7C+XOKdHUN54sLI8InyW7JbdpU6VH/0KbwOXHpQmH1xsnuO9cicr3suDE7pW7zOJayZWI6YjSvsXvXK7XIWK85EvO+WOoWwDpkOXVj3T1gJbK5mAKiZWx3plBoMO4MfQpFXPxYjSnnpFfl2uYlUzxGSX3Gqep02Uw8G1VU3qXowty/WEg+fP0wNp3WbAMIs7G0JH4ZooQ8leGfVyna8NA4lxbRBllyp7gQ1+cpTgBvARBkf87IAItIVj6LTW340SV9iO0Iv3JVcL4azafLUmy8nhPpn3qyW0TTWJcX1clU6x6VBhs8DTwFqgeanKv8Ad4CrKZYQLUZsJ91D8Ef8n/gPe9EFOkI01QwAAAABJRU5ErkJggg=="}}></Image></Text>                
                </TouchableOpacity>
          }
          
          <Text style={styles.posteos}>Mis posteos ({this.state.posteos.length}):</Text>
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
        marginHorizontal: 10
    },
    welcome:{
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    mail:{
      fontSize: 16,
      marginTop: '10px',
      marginBottom: '20px',
      fontWeight: 'bold',
      color: 'grey'
    },
    element:{
      color: 'grey', 
      fontStyle: 'italic',
    },
    touchable:{
      padding: 10,
      backgroundColor: '#dc3545',
      borderRadius: 4,
      width: '40%',
      marginLeft: '30%',
      marginBottom: '20px',
    },
    touchableText:{
      fontWeight: 'bold',
      color:'#fff',
      textAlign: 'center'
    },
    infoButton:{
      alignSelf: 'flex-start',
      width: '15px',
      height: '15px',
    },
    posteos:{
      marginTop: '5px',
      marginLeft: '5px',
      marginBottom: '10px',
},
    
    
});

export default Profile;