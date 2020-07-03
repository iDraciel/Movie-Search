import React,{useState} from 'react';
import axios from 'axios';
import { StyleSheet, View,Text, TextInput, ScrollView, Image, TouchableHighlight, Modal, Button } from 'react-native';

export default function App() {
const apiurl = "http://www.omdbapi.com/?apikey=efcd779a";
const [state, setState]= useState({
  s:"Enter a movie ...",
  results: [],
  selected: {}
});
const search = () => {
  axios(apiurl + "&s="+state.s).then(({data})=>{
    let results = data.Search
    //console.log(results)
    setState(prevState=>{
      return{
        ...prevState,
        results: results
      }
    })
  })
}
openPopup = (id) => {
axios(apiurl+"&i="+ id).then(({data})=>{
  let result=data;
  setState(prevState =>{
    return{...prevState, selected: result}
  });
});
}

  return (
    <View style={styles.container}>
  <Text style={styles.title}> MovieSpace</Text>
   <TextInput style={styles.searchbox} onChangeText={text => setState(prevState =>{
     return{
       ...prevState,
       s:text
     }
   })} value={state.s} onSubmitEditing={search} />
<ScrollView style={styles.results}>
{state.results.map(result =>(
  <TouchableHighlight key={result.imdbID} onPress={()=>openPopup(result.imdbID)}>
  <View  style={styles.result}>
    <Image source={{uri: result.Poster}}
    style={{width:'100%', height:350, alignItems:'center',justifyContent:'center'}}
    resizeMode="cover" />
<Text style={styles.heading}>{result.Title}</Text>
  </View>
  </TouchableHighlight>
))}
</ScrollView>
      <Modal animationType="fade" transparent={false} visible={(typeof state.selected.Title != "undefined")}>
      <ScrollView>
        <View style={styles.popup}>
          
<Text style={styles.poptitle}>{state.selected.Title}</Text>
<Image source={{uri: state.selected.Poster}}
    style={{margin:20,width:"90%", height:300, alignItems:'center',justifyContent:'center'}}
    resizeMode="cover" />
<Text style={styles.rating}>Rating:{state.selected.imdbRating}</Text>
<Text style={styles.director}>Directed by {state.selected.Director}</Text>
<Text style={styles.plot}> "{state.selected.Plot}"</Text>
<Text style={styles.released}>Released On:{state.selected.Released}</Text>
<Text style={styles.Actors}>Starring:{state.selected.Actors}</Text>
<Text style={styles.boxoffice}>Box Office collection:{state.selected.BoxOffice}</Text>
        </View>
        </ScrollView>
 <Button style={styles.Button} onPress={()=>setState(prevState =>{
          return{...prevState, selected: {}}
        })} title="Close"/>
      </Modal>
    </View>
  );
}

const styles= StyleSheet.create({
 container: {
   flex:1,
   backgroundColor:'#27282e',
   justifyContent:'flex-start',
   alignItems:'center',
   paddingTop:75,
   paddingHorizontal: 20
 },
 title : {
color:'white',
fontSize:32,
textAlign:'center',
fontWeight:'700',
marginBottom:20
 },
 searchbox: {
  fontSize:22,
  fontWeight:'300',
  padding:20,
  width:"100%",
  backgroundColor:'white',
  borderRadius:8,
  marginBottom: 40
 },
 results: {
   flex:1
 },
 result: {
   width: '100%',
   marginBottom: 18,
 },
 heading: {
   color:'white',
   fontSize:18,
   padding:20,
   fontWeight:'700',
   backgroundColor:'#445565'
 },
 poptitle: {
   marginTop:10,
   textAlign:"center",
   fontWeight:'700',
   fontSize:35
 },
 rating: {
   fontSize:22,
   textAlign:'center',
   fontWeight:'700'
 },
 director: {
  fontSize:25,
  textAlign:'center',
  fontWeight:'700'
},
plot: {
  marginLeft:10,
  marginRight:10,
  marginTop:7,
  textAlign:"center",
  alignContent:'center',
  fontSize:20,
  fontWeight:'300'
},
released:{
  marginTop:5,
  textAlign:'center',
  fontSize:18,
  fontWeight:'bold'
},
Actors:{
  textAlign:'center',
  marginLeft:10,
  marginRight:10,
  marginTop:5,
  fontWeight:'700',
  fontSize:20,
},
boxoffice: {
  textAlign:'center',
  marginLeft:10,
  marginRight:10,
  marginTop:5,
  fontWeight:'700',
  fontSize:17,
},
Button: {
  alignContent:'center',
  textAlign:'center',
  color:'white',
  fontSize:25,
  fontWeight:'700',
  padding:80
}




});
