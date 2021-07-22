import Fly from '../lib/wx';
let fly = new Fly();

// 基础路径
fly.config.baseURL = 'https://api.zhuishushenqi.com';

// 请求拦截
// 每次发请求的时候会触发
fly.interceptors.request.use(
    config => {
        wx.showLoading({
            title: '加载中...'
        });
        return config;
    },
    err => {
        wx.hideLoading();
        return Promise.reject(err);
    }
);

// 响应拦截
// 每一次请求有结果的时候会触发
fly.interceptors.response.use(
    res => {
        wx.hideLoading();
        return res.data;
    },
    err => {
        wx.hideLoading();
        console.log(err);
        let status = err.response && err.response.status;
        if (status === 400) {
            wx.showToast({
                title: '参数错误',
                icon: 'error'
            });
        }
        if (status === 401) {
            wx.showToast({
                title: '登录过期',
                icon: 'error'
            });
        }
        if (status === 403) {
            wx.showToast({
                title: '没有全选',
                icon: 'error'
            });
        }
        if (status === 404) {
            wx.showToast({
                title: '路径错误',
                icon: 'error'
            });
        }
        if (status === 500) {
            wx.showToast({
                title: '服务器错误',
                icon: 'error'
            });
        }
        if (status === 503) {
            wx.showToast({
                title: '服务器维护',
                icon: 'error'
            });
        }
        return Promise.reject(err);
    }
);

export default fly;