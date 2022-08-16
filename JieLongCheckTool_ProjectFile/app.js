// app.js
App({

    globalData:{
        userNameList : new Array()
    },
    onLaunch: function () {

        /**初始化读取名单数据 */
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
            
            this.globalData.userNameList = temp

        } catch (i) {
            
        }
    }

})
