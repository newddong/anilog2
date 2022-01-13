import { Dimensions,Platform, StatusBar } from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const XD_WIDTH = 750;
const XD_HEIGHT = 1624;
const DPW = WIDTH / XD_WIDTH;
const DPH = HEIGHT/XD_HEIGHT*1.05;

export default DP=(()=>{
   // if(HEIGHT/WIDTH>(17/9)){
   //    return DPW;
   // }else{
   //    return DPH;
   // }
   return DPW;
})()
export const svg_size = {width:'100%',height:'100%'};


export const isNotch = (()=>{
   if(Platform.OS === 'ios'){
      return HEIGHT >=812; 
   }
   if(Platform.OS === 'android'){
      return StatusBar.currentHeight !== 24;
   }
})();

//ios notch size top 44pt bottom 34pt horizontal 16pt
//iPhone 12 Pro Max  428x926 9:19.5
//iPhone 12 Pro      390x844 9:19.5
//iPhone 12          390x844 9:19.5
//iPhone 12 mini     375x812 9:19.5
//iPhone 11 Pro Max  414x896 9:19.5
//iPhone 11 Pro      375x812 9:19.5
//iPhone 11          414x896 9:19.5
//iPhone Xs Max      414x896 9:19.5
//iPhone Xs          375x812 9:19.5
//iPhone Xr          414x896 9:19.5
//iPhone X           375x812 9:19.5
//iPhone 8 Plus      414x736 9:16
//iPhone 8           375x667 9:16
//iPhone 7 Plus      414x736 9:16
//iPhone 7           375x667 9:16
//iPhone 6s Plus     414x736 9:16
//iPhone 6s          375x667 9:16
//iPhone 6 Plus      414x736 9:16
//iPhone 6           375x667 9:16
//4.7" iPhone SE     375x667 9:16
//4" iPhone SE       320x568 9:16

//android standart status bar 24pt otherwise there is a notch.
//9:16 => 1440x2560, 1080x1920
//9:18 => 1440x2880, 1080x2160
//9:18.5 => 1440x2960, 1080x2220
//9:19 => 1440x3040, 1080x2280
//9:19.5 => 1440x3120, 1080x2340
//9:20 => 1440x3200, 1080x2400



//428 414 390 375 320 
//926 896 844 812 736 667 568