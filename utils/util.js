export default{
  saveHistory({key , data , attr}) {
    // 如果是其余的数据 判断的属性可能就不叫name了
    // 拼接一个名字
    let name = key + 'History';
    
    let history = wx.getStorageSync(name);
    if (history) {
        // 之前已经存储过了
        let arr = wx.getStorageSync(name);
        // 检测数据是否已经存在
        let item = null;
        if (typeof data === 'string') {
            item = arr.find(i => {
                return i[attr] === data;
            });
        } else {
            item = arr.find(i => {
                return i[attr] === data[attr];
            });
        }
        // 数组当中没有当前数据
        if (!item) {
            if (typeof data === 'string') {
                let obj = {
                    [attr]: data
                };
                arr.unshift(obj);
            } else {
                arr.unshift(data);
            }
            wx.setStorageSync(name,arr)
        }
    } else {
        // 第一次存储
        // 把存储的数据都转换成对象
        let arr = [];
        if (typeof data === 'string') {
            let obj = {
                name: data
            };
            arr.unshift(obj);
        } else {
            arr.unshift(data);
        }
        wx.setStorageSync(name,arr)
    }
},
// 获取存储记录
getHistory({ key }) {
    let name = key + 'History';
    let arr = wx.getStorageSync(name)
    if (arr) return (arr);
    else return null;
}
}