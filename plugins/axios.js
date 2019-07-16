import {Message} from 'element-ui'
export default ({$axios})=>{
    $axios.onError(err=>{
        const {message, statusCode} = err.response.data;

        if(statusCode === 400){
            // 错误警告
            Message.warning(message)
        }
    })
}