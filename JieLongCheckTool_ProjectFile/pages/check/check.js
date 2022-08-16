// pages/check.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNameList : [],
        userNameListSelectIndex : 0,
        nameListInput : "",
        endNameList : "",
        endNameListTemp : "",

        multilineShow : false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            userNameList:app.globalData.userNameList
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    PickerChange_NameListSelect:function(value){
        this.setData({
            userNameListSelectIndex: value.detail.value
          })
    },

    Input_NameList: function(ipt) { /**接龙内容接收函数**/
        this.setData({
            nameListInput : ipt.detail.value
        })
    },

    ButtonClick_CheckNameList:function(){
        if(this.data.nameListInput != ""){

            var list = this.data.userNameList[this.data.userNameListSelectIndex].list;
            var temp = []
            for(var i of list){
                if(this.data.nameListInput.indexOf(i) != -1){
                    temp.push(i)
                }
            }

            let difference = temp.concat(list).filter(v => !temp.includes(v) || !list.includes(v))

            var tempString = "未接龙名单（长按可复制）：\n\n" + "人数：" + String(difference.length) + "\n"

            if(this.data.multilineShow){
                for(var i of difference){
                    tempString += i + "\n"
                }
            }else{
                for(var i of difference){
                    tempString += i + "；"
                }
            }

            
            this.setData({
                endNameList : tempString
            })

        }else{

            wx.showToast({
                title: '请输入接龙内容',
                icon: 'error',
                duration: 1500
            })

        }
    },

    SwitchChange_Multiline:function(value){
        this.setData({
            multilineShow:value.detail.value
        })
        this.ButtonClick_CheckNameList()
    },

    ButtonClick_CopyNameList:function(){
        var temp = this.data.endNameList.replace("未接龙名单（长按可复制）：\n\n","")
        wx.setClipboardData({data : temp})
    }
})