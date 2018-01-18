/**
 * Created by Administrator on 2017/7/21.
 */
export default {
    enterPush:function(obj,enterComponent,params){
        if(params){
        }else{
            params={ }
        }
        params.navigator=obj.props.navigator;
        obj.props.navigator.push({
           component:enterComponent,
           params:params,
           index:obj.props.index+1,
       });
    },
    popOver:function(obj,enterComponent,params){
        try{
            if(obj.props.navigator){
                obj.props.navigator.pop();
            }
        }catch(e){

        }
    }
};
