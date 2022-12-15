import React,{useState} from 'react'
import { Pressable, SafeAreaView, StyleSheet,View,Text,Image,} from 'react-native'
import { useSelector } from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import { setPageDataInformation } from '../../Redux/Slice';
import {useDispatch} from 'react-redux';
import { FlashList } from '@shopify/flash-list';

 function Event({navigation}) {
  const userData = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  //const [status,setStatus] = useState(false);
 const [size,setSize] = useState(20);
  const DATA = [];
 try{
  for(  let prop = 0; prop <= size; prop++){
      DATA.push({data:{
        key:Math.random().toString(12).substring(0),
        date_info:userData.GlobalDataUser.data.events[prop].created_at.replace('-','/').replace('-','/'),
          latitude:userData.GlobalDataUser.data.events[prop].latitude,
          longitude:userData.GlobalDataUser.data.events[prop].longitude,
          picture:userData.GlobalDataUser.data.events[prop].event_type.picto,
          titre:userData.GlobalDataUser.data.events[prop].event_type.map.name,
          info:userData.GlobalDataUser.data.events[prop].event_type.name
        }
                 });
    }
 }catch (e) {
 }
const SelectTask = (data)=>{
  dispatch(setPageDataInformation({data}));
  navigation.navigate('PageEventInfo');
}
const ItemSeparator = () => <View style={{
  height: 1,
  backgroundColor: "#f1f1f1",
  marginLeft: 10,
  marginRight: 10,
}}

/>
  const Item = ({data})=>(
  <View style={styles.item}>
    <Pressable style={styles.button} onPress={()=>SelectTask(data)}>
    <View style={{textAlign:'center',alignItems:'flex-start',alignSelf:'flex-start'
}}>
<Image source={{
  uri:data.picture === undefined ? null : data.picture  
}} 
style={styles.picture}/>
</View>
<View style={styles.alertInfo}>
<Text style={styles.text}>{data.titre}</Text>
<Text style={styles.text}>{data.info}</Text>
<Text style={styles.text}>{data.latitude}</Text>
<Text style={styles.text}>{data.longitude}</Text>
<Text style={styles.text}>{data.date_info}</Text>
</View>
</Pressable>
</View>
  )
      const renderItem = ({ item }) => (
        <Item data={item.data} />
      );
    const BottomComponent =()=>(
      <View style={styles.more}>
      <Pressable onPress={()=>setSize(size + 5)}>
      <Svg x="0px" y="0px"
      width="50" height="50"
      viewBox="0 -5 50 50"><Path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
      </Svg>
      </Pressable>
      </View>
    );
  return (
    <SafeAreaView style={styles.eventlists}>
   <FlashList
    data={DATA}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={renderItem}
    keyExtractor={(item) => item.data.key}
    ListFooterComponent={BottomComponent}
    ListFooterComponentStyle={styles.listFooter}
    estimatedItemSize={514}
    />
        <View style={styles.tab}>
    <Pressable onPress={()=>{navigation.navigate('Body')}} style={{flexDirection:'row'}}>
    <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 -5 50 50">
                    <Path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
    <Text style={styles.textBottom}>Home</Text>
    </Pressable>
    <Pressable>
      <Image style={styles.sos} 
         source={require('../../Picture/sos-btn.png')}/>
    </Pressable>
    <Pressable onPress={()=>{navigation.navigate('Map')}} style={{flexDirection:'row' ,justifyContent:'space-around'}}>
    <Text style={styles.textBottom}>Map</Text>
      <Image style={styles.map} source={require('../../Picture/Map.png')}/>
    </Pressable>
  </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  listFooter:{alignItems:'center',alignSelf:'center',justifyContent:'center'},
  tab:{
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'stretch',
    alignItems: 'center',
  },
  textBottom:{
      color:'#ffffff',
      marginVertical:10,
      fontSize:30,
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center',
  },
  button:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  text:{
    color:'#f1f1f1',
    fontSize:15,
    alignItems:'center',
    textAlign:'center',
  },
  alertInfo:{
    marginTop:8,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end',
    textAlign:'flex-end',
  },
  picture:{
    height:80,
    width:80,
  },
  sos:{
    height:70,
    width:70,
  },
  map:{
    height:50,
    width:50,
  },
  eventlists:{
    flex: 4,
   width:'100%',
   height:'100%',
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
