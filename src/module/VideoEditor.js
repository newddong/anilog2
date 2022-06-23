import { Platform } from 'react-native';

import {VESDK, Tool, Configuration, ForceTrimMode, CanvasAction, VideoCodec, ExistingTheme} from './VESDK';

/*
export type VideoEditorOption = {
    uri: string,  //카메라롤의 ph://{local identifier} 외의 형태 (iOS만 적용. android는 별도 uri 필요 없음)
    duration: number,   //비디오의 길이
    bitRate?: number,   //default 3500
    minTrimmedDuration?: number, //default 0.5
    maxTrimmedDuration?: number, //default 15,
    saveName?: String, //default null
};
*/
class VideoEditor {
    //사용하기 전에 반드시 라이선스를 초기화해주어야 한다
    static unlockLicense(){



        if(Platform.OS == 'android'){
            VESDK.unlockWithLicense(require('./vesdk_license.android.json'));
        } else if(Platform.OS == 'ios'){
            VESDK.unlockWithLicense(require('./vesdk_license.ios.json'));    
        }
    } 

  //    static openVideoEditor(option: VideoEditorOption): Promise<VideoEditorResult | null>{
//        if(option.duration <= (!option.minTrimmedDuration ? option.minTrimmedDuration : 0.5)) {    
    static openVideoEditor(videoUrl, videoDuration, trimmedDuration = 15, bitRate = 30, filename = 'temp'){
        if(videoDuration <= trimmedDuration) {    
            console.log("자르고자 하는 길이보다 비디오의 길이가 짧음");
            return null;
        }


        let configuration = {
            mainCanvasActions: [CanvasAction.SOUND_ON_OFF],
            // tools: [Tool.TRIM],
            enableZoom:false,
            trim: {
                //minimumDuration: !option.minTrimmedDuration ? 0.5 : option.minTrimmedDuration,
                //maximumDuration: !option.maxTrimmedDuration ? 15 : option.maxTrimmedDuration,
                minimumDuration: 0,
                maximumDuration: 15,
                forceMode: ForceTrimMode.SILENT,
            },
            export: {
                video: {
                    codec: VideoCodec.H264,
                    bitRate: bitRate,
                    //bitRate: !option.bitRate ? option.bitRate : 3500,
                },
                //cameraroll과 동일한 폴더명. 폴더 내 파일을 지우려면 카메라롤의 clean 함수를 쓰면 된다.
                // filename: 'anilog_temp/' + filename,
                // filename: (!option.saveName ? 'anilog_temp/' + Math.floor(Math.random() * 1000000) : 'anilog_temp/' + option.saveName),
            },
            
        };
      
        if (Platform.OS == 'android') {
            delete configuration.export.filename
        }
      //return VESDK.openEditor(option.uri, configuration);
        return VESDK.openEditor(videoUrl, configuration);

    }
}
export default VideoEditor;