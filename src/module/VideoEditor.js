import { Platform } from 'react-native';
import {VESDK, Configuration, ForceTrimMode, CanvasAction, VideoCodec, ExistingTheme} from './VESDK';

class VideoEditor {
    //사용하기 전에 반드시 라이선스를 초기화해주어야 한다
    static unlockLicense(){
        // if(isLicenseUnlocked == true){
        //     return;
        // }

        if(Platform.OS == 'android'){
            VESDK.unlockWithLicense(require('./vesdk_license.android.json'));
        } else if(Platform.OS == 'ios'){
            VESDK.unlockWithLicense(require('./vesdk_license.ios.json'));    
        }

        // isLicenseUnlocked = true;
    } 

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
                minimumDuration: 0,
                maximumDuration: 15,
                forceMode: ForceTrimMode.SILENT,
            },
            export: {
                video: {
                    codec: VideoCodec.H264,
                    bitRate: bitRate,
                },
                //cameraroll과 동일한 폴더명. 폴더 내 파일을 지우려면 카메라롤의 clean 함수를 쓰면 된다.
                filename: 'anilog_temp/' + filename,
            },
            
        };
        
        return VESDK.openEditor(videoUrl, configuration);
    }
}
export default VideoEditor;