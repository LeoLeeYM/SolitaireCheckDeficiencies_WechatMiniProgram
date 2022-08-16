// pages/nameList/nameList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        userNameList : new Array(),

        /**创建新名单实现数据**/
        showNewNameListWindow : false,

        nameListTagInput : "",
        nameListInput : "",

        nameListModeSelect : true,

        nameList : new Array(),
        /**————————————————**/

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
        var that = this

        var temp = []

        try {
            var tagList = wx.getStorageSync('UserNameListTagList')
            for(var i of tagList){
                try{
                    var nameList = wx.getStorageSync(i)
                    var temp_ = []

                    temp_ = {
                        tag : i,
                        list : nameList,
                        string : ""
                    }

   
                    for(var c of nameList){         
                        temp_.string += c + "；"
                    }

                    temp.push(temp_)

                }catch(a){
                }
            }
            
            
            
            that.setData({
                userNameList:temp,
            })

            app.globalData.userNameList = temp

        } catch (i) {
            
        }
        
        
        

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


    ButtonClick_NewNameList:function(){
        this.setData({
            showNewNameListWindow : true
        })
    },

    /**创建新名单触发函数**/
    Input_NameListTag: function(ipt) { /**名单Tag接收函数**/
        this.setData({
            nameListTagInput : ipt.detail.value
        })
    },
    Input_NameList: function(ipt) { /**名单内容接收函数**/
        this.setData({
            nameListInput : ipt.detail.value
        })
    },

    RadioChange_CreatModeSelect : function(value) { /**名单处理模式接收函数**/
        console.log(this.data.nameListModeSelect)
        if(value.detail.value == "jielong"){

            this.setData({
                nameListModeSelect : true
            })

        }
        else if(value.detail.value == "diy"){

            this.setData({
                nameListModeSelect : false
            })

        }
        
    },

    ButtonClick_CancelCreatNameList:function(){
        this.setData({
            showNewNameListWindow : false
        })
    },

    ButtonClick_CreatNameList : function() {

        if(this.data.nameListTagInput != ""){

            if (this.data.nameListInput != ""){

                var handleData = this.HandleNameListData(this.data.nameListModeSelect)

                var that = this
                wx.getStorage({
                    key: 'UserNameListTagList'
                }).then(data => {

                    var tempDataList = data.data

                    if(!tempDataList.includes(that.data.nameListTagInput)){
                        tempDataList.push(that.data.nameListTagInput)

                        wx.setStorage({
                            key:"UserNameListTagList",
                            data:tempDataList
                        })

                        wx.setStorage({
                            key:that.data.nameListTagInput,
                            data:handleData["list"]
                        })
                    }             
                    
                }).catch(err => {
                    wx.setStorage({
                        key:"UserNameListTagList",
                        data: new Array(that.data.nameListTagInput)
                    })

                    wx.setStorage({
                        key:that.data.nameListTagInput,
                        data:handleData["list"]
                    })
                })

                wx.showToast({
                    title: '创建成功',
                    icon : "success",
                    duration: 1500
                })

                this.setData({
                    showNewNameListWindow : false
                })

                wx.redirectTo({
                    url:"../../pages/nameList/nameList"
                })

            }
            else
            {
                wx.showToast({
                    title: '请输入名单内容',
                    icon: 'error',
                    duration: 1500
                })
            }

        }
        else
        {

            wx.showToast({
                title: '请输入名单标签',
                icon: 'error',
                duration: 1500
              })

        }
    },

    /**处理名单内容**/
    HandleNameListData : function(mode){
        if (mode){

            var matching = /[1-9]{0,1}[0-9]{1,999999}\.\ /g;
            var temp = this.data.nameListInput.split("\n")
            var tempList = new Array()
            for (var i of temp){
                if(matching.test(i)){
                    tempList.push(i.replace(matching,""))
                }
            }

            var endDataList = {
                "name" : this.data.nameListTagInput,
                "list" : tempList
            }

            return(endDataList)

        }else{

            var temp = this.data.nameListInput
            temp = temp.replace(/，/g,",")
            temp = temp.replace(/;/g,",")
            temp = temp.replace(/；/g,",")
            temp = temp.replace(/，/g,",")
            temp = temp.replace(/\n/g,",")
            temp = temp.replace(/,,/g,",")
            console.log(temp)
            temp = temp.split(",")
            var tempList = new Array()

            
            var endDataList = {
                "name" : this.data.nameListTagInput,
                "list" : temp
            }

            return(endDataList)
        }
    },
    /**————————————————**/

    ButtonClick_DelNameListCard:function(event){
        var tag = event.currentTarget.dataset.tag
        wx.getStorage({
            key: 'UserNameListTagList'
        }).then(data => {

            var tempDataList = data.data
            var tempNewList = []

            for(var i of tempDataList){
                if(tag != i){
                    tempNewList.push(i)
                }
            }

            wx.setStorage({
                key:"UserNameListTagList",
                data:tempNewList
            })           

            wx.redirectTo({
                url:"../../pages/nameList/nameList"
            })
            
        }).catch(err => {

        })
    }
})