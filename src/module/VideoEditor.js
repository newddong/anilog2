import { Platform } from 'react-native';
import {VESDK, Tool, ForceTrimMode, CanvasAction, VideoCodec} from './VESDK';

export type VideoEditorOption = {
    uri: string,  //카메라롤의 ph://{local identifier} 외의 형태 (iOS만 적용. android는 별도 uri 필요 없음)
    duration: number,   //비디오의 길이
    bitRate?: number,   //default 3500
    minTrimmedDuration?: number, //default 0.5
    maxTrimmedDuration?: number, //default 15,
    saveName?: String, //default null
};

class VideoEditor {
    //사용하기 전에 반드시 라이선스를 초기화해주어야 한다
    static unlockLicense(){
        if(Platform.OS == 'android'){
            VESDK.unlockWithLicense(require('vesdk_license.android.json'));
        } else if(Platform.OS == 'ios'){
            VESDK.unlockWithLicense(require('vesdk_license.ios.json'));    
        }
    } 

    static openVideoEditor(option: VideoEditorOption): Promise<VideoEditorResult | null>{
        if(option.duration <= (!option.minTrimmedDuration ? option.minTrimmedDuration : 0.5)) {    
            console.log("자르고자 하는 길이보다 비디오의 길이가 짧음");
            return null;
        }

        var configuration = {
            mainCanvasActions: [CanvasAction.SOUND_ON_OFF],
            tools: [Tool.TRIM],
            trim: {
                minimumDuration: !option.minTrimmedDuration ? 0.5 : option.minTrimmedDuration,
                maximumDuration: !option.maxTrimmedDuration ? 15 : option.maxTrimmedDuration,
                forceMode: ForceTrimMode.SILENT,
            },
            export: {
            video: {
                codec: VideoCodec.H264,
                bitRate: !option.bitRate ? option.bitRate : 3500,
            },
            //ios만 폴더 지정해주어야 함. android는 캐싱되는 폴더 지정시 오류
            filename: (!option.saveName ? 'anilog_temp/' + Math.floor(Math.random() * 1000000) : 'anilog_temp/' + option.saveName),
            }
        };
        if (Platform.OS == 'android') {
            delete configuration.export.filename
        }
        return VESDK.openEditor(option.uri, configuration);
    }
}
export default VideoEditor;