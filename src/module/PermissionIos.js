import { Alert, NativeModules } from 'react-native';
import PermissionHandlerIos from './PermissionIosNative';
import { PERMISSION_IOS_TYPES, PERMISSION_IOS_STATUS } from './PermissionIosStatics';

export type AlertParams = {
    title: string,
    msg: string,
    okFunc?: Function,
    cancelFunc?: Function,
    okBtnLabel: string,
    cancelBtnLabel: string,
  };

class PermissionIos {
    /**
     * 퍼미션 상태를 체크하고 리퀘스트/팝업을 띄워주는 함수. 
     * 별도로 관리하지 않을 경우 디폴트 플로우로 진행되므로 그대로 가져다 사용해도 무방.
     */
    static updatePermission(){
        PermissionIos.checkPermission()
        .then(status => {
            console.log("current status:", status);

            if(status == PERMISSION_IOS_STATUS.NotDetermined){
                PermissionIos.requestPermission()
                .then(statusAfterRequest => {
                    console.log("after request status: ", statusAfterRequest);
                })
            }
            else if(status != PERMISSION_IOS_STATUS.Authorized){
                PermissionIos.popupAlert(PermissionIos.getDefaultAlertParams());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    /**
     * 퍼미션 상태 확인.
     * @returns PERMISSION_IOS_STATUS 를 리턴한다
     */
     static checkPermission():Promise<string> {
        // console.log("checkPermission");
        return PermissionHandlerIos.checkPermission();
    }

    /**
     * 설정 창으로 이동. 설정 창으로 넘어간 뒤, 바뀐 퍼미션은 별도로 체크해야 함
     */
    static openSetting(){
        // console.log("openSetting");
        PermissionHandlerIos.openSetting();
    }

    /**
     * 퍼미션 요청. iOS 14부터 버튼 3개인 기본 팝업 / iOS 14 미만은 버튼 2개인 기본 팝업
     * plist에 적은 description으로 메세지가 출력된다.
     * @warning 한 번이라도 퍼미션을 요청하여 해당 창이 뜬 적 있는 경우 반복 요청해도 팝업이 뜨지 않음
     * @returns PERMISSION_IOS_STATUS 를 리턴한다.
     */
    static requestPermission():Promise<string>{
        // console.log("requestPermission");
        return PermissionHandlerIos.requestPermission();
    }

    /**
     * Alert popup을 띄울 때의 기본값. 카카오톡에서 퍼미션 권한이 없을 때 뜨는 창과 동일한 창이다.
     * @returns AlertParams의 기본값
     */
    static getDefaultAlertParams():AlertParams{
        return {
            title: "",
            msg: "갤러리에 접근하려면 '갤러리' 접근 권한을 허용해야 합니다.",
            okFunc: PermissionIos.openSetting,
            cancelFunc: null,
            okBtnLabel: "설정",
            cancelBtnLabel: "취소"
          };
    }

/**
 * 버튼 2개짜리 ios native alert를 띄운다.
 */
    static popupAlert(params: AlertParams){
        Alert.alert(
            params.title,
            params.msg,
            [
                { //cancel button
                    text: params.cancelBtnLabel,
                    onPress: () => { 
                        if(params.cancelFunc != null) {
                            params.cancelFunc();}
                    }
                },
                { //ok button
                    text: params.okBtnLabel,
                    onPress: () => { 
                        if(params.okFunc != null) {
                            params.okFunc();}
                    }
                }
            ]
        )
    }
}
module.exports = PermissionIos;