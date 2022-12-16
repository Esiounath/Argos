import React from 'react'
import { SafeAreaView, Text,StyleSheet,View,Pressable,Image } from 'react-native'
      //Appels de la fonction de remise à zéro des informations de click de la liste déroulante des Events
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux'
import { deletePageDataInformation } from '../../Redux/Slice';
import Svg, {Path} from 'react-native-svg';
/*Page individuel du click des clicks de boutton d'alertes cette page va afficher les informations des alertes clické et
 ensuite effacés en cas de click sur la liste déroulante  */
export default function PageEventInfo({navigation}) {
    const Information = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const ExitPage = (value) =>{
      //Fonction de remise à zéro des informations de click de la liste déroulante des Events
        dispatch(deletePageDataInformation) ;
        //Retour de navigation d'une page à l'autre
        navigation.navigate(value);
    }
    //Rendu Principale de la page 
  return (
    <SafeAreaView style={{
        flex: 4,
        width:'100%',
        height:'100%',
    }}>
        <View style={styles.EventInfo}>
            <Image source={{
                uri:Information.PageDataInformation.picture,
            }} style={styles.picture}/>
        <Text style={styles.text}>
            {Information.PageDataInformation.titre}
       </Text>
       <Text style={styles.text}>
        {Information.PageDataInformation.info}
       </Text>
       <Text style={styles.text}>
       {`Longitude : ${Information.PageDataInformation.longitude}`}
       </Text>
       <Text style={styles.text}>
        {`Latitude : ${Information.PageDataInformation.latitude}`}
       </Text>
       <Text style={styles.text}>
       {`Date Time : ${Information.PageDataInformation.date_info}`}
       </Text>
        </View>
        <View style={styles.tab}>
    <Pressable onPress={()=>{ExitPage('Event')}} style={{flexDirection:'row'}}>
    <Svg x="0px" y="0px"
width="60" height="60"
viewBox="0 -5 50 50">
                    <Path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h23.1l9.9 9.9V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V17.55h-8.55V9H9v30Zm4.95-5.55h20.1v-3h-20.1Zm0-15.9H24v-3H13.95Zm0 7.95h20.1v-3h-20.1ZM9 9v8.55V9v30V9Z" stroke="#f1f1f1" strokeWidth="0.5" width="30" height="30" fill="#f1f1f1" />
                   </Svg>
    <Text style={styles.textBottom}>Events</Text>
    </Pressable>
    <Pressable>
      <Image style={styles.sos} 
         source={require('../../Picture/sos-btn.png')}/>
    </Pressable>
    <Pressable onPress={()=>{ExitPage('Map')}} style={{flexDirection:'row' ,justifyContent:'space-around'}}>
    <Text style={styles.textBottom}>Map</Text>
      <Image style={styles.map} source={require('../../Picture/Map.png')}/>
    </Pressable>
  </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    picture:{
        height:100,
        width:100
    },
    EventInfo: {
        flex: 4,
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center',
    },
    text:{
        color:"#f1f1f1",
        fontSize:22,
    },
    sos:{
        height:70,
        width:70,
      },
      map:{
        height:50,
        width:50,
      },
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

});
