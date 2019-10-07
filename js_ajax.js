import axios from 'axios';
// 添加请求拦截器，在进行请求前让请求拦截器给请求头header加上前缀token
let axiosIns = axios.interceptors.request.use(function(config) {
    //在发送请求之前做些什么
    //1.可以在这里进行设置config的请求头
    let loginToken = sessionStorage.getItem('loginToken');
    if (loginToken) {
        config.headers.Authorization = loginToken;
    }
    return config;
}, function(error) {
    //对请求错误做些什么
    return new Promise.reject(error);
})

//2.设置全局默认Ajax请求头设置
axios.defaults.headers.common["Authorization"] = sessionStorage.getItem('loginToken');
//3.自定义实例默认值
const instance = axios.create({
    baseURL: 'https://api.example.com'
});
instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('loginToken');

/****jquery Ajax设置headers的方式*****/
$.ajaxSetup({
    headers: {
        'Authorization': Cookies.get('author_token'),
        'zip': 'aicoder.com'
    },
    statusCode: { //这个是面对服务器返回的不同的状态码的处理
        '401': function(status, xhr) {
            //用户没有登录直接访问了 /api/接口
            //因为这个是异步执行的所以要把下一步要放在alert的函数里，否则直接执行。
            $.messager.alert('提醒消息', '请先登录!', 'warning', function() {
                //然后让页面跳转到初始页面
                window.location.href = '/login.html';
            });
        }

    }
});