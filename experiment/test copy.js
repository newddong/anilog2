import React, { Children, Component } from 'react';

import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';

export default Test = () => {



    return (
        <View style={{flex:1,backgroundColor:'yellow',zIndex:100}}
         onStartShouldSetResponder={()=>{console.log('onstart'+'최상위'); return true;}}//2
         onStartShouldSetResponderCapture={(e)=>{console.log('onStartShouldSetResponderCapture'+'최상위'); return false;}}//1
         onResponderGrant={(e)=>{console.log('onResponderGrant'+'최상위');}}//1이 false고 2가 true일때 동작, 1이 true이면 바로 동작
         onResponderReject={(e)=>{console.log('onResponderReject'+'최상위');}}
         onResponderMove={(e)=>{console.log('onResponderMove'+'최상위');}}//touch move시
         onMoveShouldSetResponder={(e)=>{console.log('onMoveShouldSetResponder'+'최상위');return false;}}//M1이 false일때 true이면 grant, 자식의 m1이 true이면 자식의 termination request실행
         onMoveShouldSetResponderCapture={(e)=>{console.log('onMoveShouldSetResponderCapture'+'최상위');return false;}}//M1 touch move가 시작할때
         onResponderRelease={(e)=>{console.log('!!!onResponderRelease'+'최상위');}}//3 touch종료시
         onResponderTerminate={(e)=>{console.log('onResponderTerminate'+'최상위');}}
         onResponderTerminationRequest={(e)=>{console.log('onResponderTerminationRequest'+'최상위');}}
        >
            <Text>최상위</Text>

            <View style={{top:300,width:300,height:200,backgroundColor:'gray',position:'relative', zIndex:102}}
                onStartShouldSetResponder={()=>{console.log('onstart'+'형제'); return true;}}
                onStartShouldSetResponderCapture={()=>{console.log('onStartShouldSetResponderCapture'+'형제'); return false;}}
                onResponderGrant={(e)=>{console.log('onResponderGrant'+'형제');}}
                onResponderReject={(e)=>{console.log('onResponderReject'+'형제');}}
                onResponderMove={(e)=>{console.log('onResponderMove'+'형제');}}
                onMoveShouldSetResponder={(e)=>{console.log('onMoveShouldSetResponder'+'형제');return true;}}
                onMoveShouldSetResponderCapture={(e)=>{console.log('onMoveShouldSetResponderCapture'+'형제');return true;}}
                onResponderRelease={(e)=>{console.log('!!!onResponderRelease'+'형제');}}
                onResponderTerminate={(e)=>{console.log('onResponderTerminate'+'형제');}}
                onResponderTerminationRequest={(e)=>{console.log('onResponderTerminationRequest'+'형제');}}
            >
                <Text>형제</Text>
        
            </View>
            
            {/* <View style={{position:'absolute',width:1000,backgroundColor:'blue',height:1000}} onStartShouldSetResponder={()=>{console.log('test');return true;}}> */}
                <View style={{top:30,width:200,height:400,backgroundColor:'green',position:'absolute',zIndex:101}}
                    onStartShouldSetResponder={()=>{console.log('onstart'+'자식'); return true;}}
                    onStartShouldSetResponderCapture={(e)=>{console.log('onStartShouldSetResponderCapture'+'자식'); return false;}}
                    onResponderGrant={(e)=>{console.log('onResponderGrant'+'자식');}}
                    onResponderReject={(e)=>{console.log('onResponderReject'+'자식');}}
                    onResponderMove={(e)=>{console.log('onResponderMove'+'자식');}}
                    onMoveShouldSetResponder={(e)=>{console.log('onMoveShouldSetResponder'+'자식');return true;}}
                    onMoveShouldSetResponderCapture={(e)=>{console.log('onMoveShouldSetResponderCapture'+'자식');return false;}}
                    onResponderRelease={(e)=>{console.log('!!!onResponderRelease'+'자식');}}
                    onResponderTerminate={(e)=>{console.log('onResponderTerminate'+'자식');}}
                    onResponderTerminationRequest={(e)=>{console.log('onResponderTerminationRequest'+'자식');}}
                >
                    <Text>자식</Text>

                    <View style={{top:30,width:100,height:300,backgroundColor:'red',position:'absolute', zIndex:102}}
                    onStartShouldSetResponder={()=>{console.log('onstart'+'손자'); return true;}}
                    onStartShouldSetResponderCapture={(e)=>{console.log('onStartShouldSetResponderCapture'+'손자'); return false;}}
                    onResponderGrant={(e)=>{console.log('onResponderGrant'+'손자'+e.nativeEvent.locationX);}}
                    onResponderReject={(e)=>{console.log('onResponderReject'+'손자');}}
                    onResponderMove={(e)=>{console.log('onResponderMove'+'손자');}}
                    onMoveShouldSetResponder={(e)=>{console.log('onMoveShouldSetResponder'+'손자');return true;}}
                    onMoveShouldSetResponderCapture={(e)=>{console.log('onMoveShouldSetResponderCapture'+'손자');return false;}}
                    onResponderRelease={(e)=>{console.log('!!!onResponderRelease'+'손자');}}
                    onResponderTerminate={(e)=>{console.log('onResponderTerminate'+'손자');}}
                    onResponderTerminationRequest={(e)=>{console.log('onResponderTerminationRequest'+'손자');}}
                    >
                        <Text>손자</Text>
            
                    </View>





                </View>
        
            {/* </View> */}
            


        
        
        </View>
    );
}