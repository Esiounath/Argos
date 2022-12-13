import React,{useEffect,useState} from 'react'
import { Pressable, SafeAreaView, StyleSheet,View,StatusBar,Text,Image,FlatList} from 'react-native'
import { useSelector } from 'react-redux';
import Svg, {Path} from 'react-native-svg';

 function Event({navigation}) {
  const userData = useSelector((state) => state.auth)
  const [DATA,setData] = useState([])
  const [status,setStatus] = useState(false);
  console.log(status)
  let i = 0 ;
    useEffect(()=>{
      if(!status){
    const compteur = setTimeout(()=>{
      try{
        for(  let prop = 0; prop <= userData.GlobalDataUser.data.events.length - userData.GlobalDataUser.data.events.length + 10 ; prop++){
          i++;
          console.log("Value i:",i)
          setData([...DATA,{id:i,data:{
  date_info:userData.GlobalDataUser.data.events[prop].created_at,
    latitude : userData.GlobalDataUser.data.events[prop].latitude,
    longitutde:userData.GlobalDataUser.data.events[prop].longitude,
    picture:userData.GlobalDataUser.data.events[prop].event_type.picto,
    titre:userData.GlobalDataUser.data.events[prop].event_type.map.name,
    info:userData.GlobalDataUser.data.events[prop].event_type.name
  }
           }])
        }
        console.log(DATA)
        setStatus(true)
        return () => clearTimeout(compteur);
      }catch(error){
        return () => clearTimeout(compteur);
      }
    },2000)
      }
    },[])
    /*
      <View style={styles.item}>
    <View style={{
      flexDirection:'row',textAlign:'center',alignItems:'flex-end',justifyContent:'space-between'
    }}>
    <Image source={{
      uri:picture
    }} 
    style={styles.picture}/>
    </View>
  <View style={styles.alertInfo}>
    <Text style={styles.text}>{titre}</Text>
    <Text style={styles.text}>{info}</Text>
  </View>
  </View>
  */
 //console.log(DATA)
  const Item = ({data})=>{
  try{
    return(      <View style={styles.item}>
          <View style={{
      flexDirection:'row',textAlign:'center',alignItems:'flex-end',justifyContent:'space-between'
    }}>
      <Image source={{
        uri:data.picture === undefined ? null : data.picture  
      }} 
      style={styles.picture}/>
      </View>
    <View style={styles.alertInfo}>
      <Text style={styles.text}>{data.titre}</Text>
      <Text style={styles.text}>{data.info}</Text>
      <Text style={styles.text}>{data.date_info}</Text>
      <Text style={styles.text}>{data.latitude}</Text>
      <Text style={styles.text}>{data.ongitude}</Text>
    </View>
    </View>);
  }catch(error){

  }
    }
    useEffect(()=>{
        const time = setTimeout(()=>{
          if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
            navigation.navigate('Login')
          }
        },200)
        return () => clearTimeout(time)
      },[userData.username,userData.password,userData.token,userData.alertNumber]);
      const renderItem = ({ item }) => (
        <Item data={item.data}/>
      );
  return (
    <SafeAreaView style={styles.eventlists}>
   <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />
        <View style={styles.Backhome}>
        <Pressable onPress={()=>{navigation.navigate('Body')}}>
                 <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 0 50 50">
                    <Path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
                 </Pressable>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
  },
  text:{
    color:'#f1f1f1',
    fontSize:15,
  },
  alertInfo:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'center',
    flexDirection:'column',
    textAlign:'flex-end',
  },
  picture:{
    height:80,
    width:80,
  },
  eventlists:{
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent:'space-evenly'
  },
  scrollView:{
    marginHorizontal: 15,
  },
  Backhome:{
    flexDirection: 'row',
    justifyContent:"flex-start",
    alignSelf:'center',
    alignItems: 'center',
    width:'100%',
    height:40
  }
});
export default Event ;
