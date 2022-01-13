import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image} from 'react-native';

import FeedList from 'Screens/feed/profile/subcomponent/feedlist';
import profiledata from 'Screens/feed/profile/profiledata.json';
import { useNavigationState } from '@react-navigation/native';
import SearchContext from '../searchcontext';
import {SearchItem} from './searchlist';
import DP from 'Screens/dp';

export default FeedSearchList = (props) => {
   

   return (
      <SearchContext.Consumer>
      {({isInput})=><Inside {...props} isInput={isInput}/>}
      </SearchContext.Consumer>
   );


}

const Inside = ({isInput})=>{
   const state = useNavigationState(state => state);
   const arr = Array.from({length:10},(_,i)=>i);
   return (
      <View style={{flex:1,backgroundColor:'#fff',paddingHorizontal:isInput?48*DP:0}}>
         <ScrollView contentContainerStyle={{paddingTop:isInput?40*DP:0}}>
            {!isInput?<FeedList  data={profiledata.profile.feeds}/>:
            arr.map((_,i)=><SearchItem ishash={i%2===0} border={i%3===0} key={Math.random()}/>)}            
         </ScrollView>
      </View>
   );
}

const list = StyleSheet.create({



})