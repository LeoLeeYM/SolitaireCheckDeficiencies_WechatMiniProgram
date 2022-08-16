// index.js
Page({

    CardClick_Check :function() { /** 一键查缺按钮按下 */
        wx.navigateTo({
            url:"../../pages/check/check"
        })
    },
    CardClick_NameList :function() { /** 我的名单按钮按下 */
        wx.navigateTo({
            url:"../../pages/nameList/nameList"
        })
    },
    CardClick_Help :function() { /** 使用教程按钮按下 */
        wx.navigateTo({
            url:"../../pages/help/help"
        })
    }
})
