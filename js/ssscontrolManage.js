var SsssssControlManager = {
    TAG: "SsssssControlManager",
    ListType: "list", //列表型態
    GridType: "grid", //網格型態,像是更多頁面,電視頻道頁面
    currentArea: "inputKeyWord", //目前區域 inputKeyWord：輸入關鍵字 / searchResult：搜尋結果
    MeunList: [],
    RowItemList: [],
    rowFocus: [],
    MeunPos: 0,
    RowPos: 0,
    ItemPos: 0,
    iskeyDown: false,
    menuSetTimeOut: function() {},
    setKeyListener: function(elementId, nextUpId, nextdownId, nextleftId, nextRightId, rowType) {
        Log.d(SsssssControlManager.TAG, "SsssssControlManager.js setKeyListener(" + elementId + ", " + nextUpId + ", " + nextdownId + ", " + nextleftId + ", " + nextRightId + ")");
        Log.d(SsssssControlManager.TAG, "SsssssControlManager ");
        var key = document.getElementById(elementId);
        var element = $('#' + elementId);
        //element.attr('tabindex', '0');

        key.addEventListener("keydown", function(e) {
            Log.d(SsssssControlManager.TAG, "keyBoardControl keyCode:" + e.keyCode);

            var element = $('#' + elementId);
            if (SsssssControlManager.iskeyDown)
                return;

            switch (e.keyCode) {
                case 37: //Left arrow.
                    e.preventDefault();
                    // console.log('Left ←');
                    if (element.hasClass('cabinet-slider-item')) {
                        if (!SsssssControlManager.iskeyDown){
                            SsssssControlManager.ItemPos--;
                            SsssssControlManager.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SsssssControlManager.iskeyDown = false;
                        }, 50)
                        if (SsssssControlManager.ItemPos < 0) {
                            SsssssControlManager.ItemPos = 0;
                        } else {
                            var rowList = SsssssControlManager.RowItemList[SsssssControlManager.RowPos];
                            var item = rowList[SsssssControlManager.ItemPos];
                            nextleftId = item.id;
                            SsssssControlManager.rowFocus[SsssssControlManager.RowPos] = SsssssControlManager.ItemPos;
                        }
                    }
                    var k = document.getElementById(nextleftId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」「跳」、smooth「滑」
                        block: "center", //垂直捲軸的位置 定义垂直方向的对齐，start、center、end 或 nearest 之一。默认为 start。
                        inline: "center", //決定水平捲軸的位置 定义水平方向的对齐，start、center、end 或 nearest 之一。默认为 nearest。
                    });
                    Log.d(SsssssControlManager.TAG, "keyBoardControl Left:" + nextleftId);
                    break;
                case 39: //Right arrow.
                    e.preventDefault();
                    // console.log('Right →');
                    if (element.hasClass('cabinet-slider-item')) {
                        if (!SsssssControlManager.iskeyDown){
                            SsssssControlManager.ItemPos++;
                            SsssssControlManager.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SsssssControlManager.iskeyDown = false;
                        }, 50)
                        var rowList = SsssssControlManager.RowItemList[SsssssControlManager.RowPos];
                        if (SsssssControlManager.ItemPos > rowList.length - 1) {
                            SsssssControlManager.ItemPos = rowList.length - 1;
                        }
                        var item = rowList[SsssssControlManager.ItemPos];
                        nextRightId = item.id;
                        SsssssControlManager.rowFocus[SsssssControlManager.RowPos] = SsssssControlManager.ItemPos;
                    }
                    var k = document.getElementById(nextRightId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "center", //垂直捲軸的位置 定义垂直方向的对齐，start、center、end 或 nearest 之一。默认为 start。
                        inline: "center", //決定水平捲軸的位置 定义水平方向的对齐，start、center、end 或 nearest 之一。默认为 nearest。
                    });
                    Log.d(SsssssControlManager.TAG, "keyBoardControl Right:" + nextRightId);
                    break;
                case 38: //Up arrow.
                    e.preventDefault();
                    // console.log('Up ↑');
                    	
                    if (element.hasClass('focus-item')) {
                        if (!SsssssControlManager.iskeyDown){
                            SsssssControlManager.RowPos--;
                            SsssssControlManager.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SsssssControlManager.iskeyDown = false;
                        }, 50)
                        if (SsssssControlManager.RowPos < 0) {                                                       
                            SsssssControlManager.RowPos = 0;
                            $(".search-input").focus();
                            return;
                        }
                        var RowItemList = SsssssControlManager.RowItemList;
                        SsssssControlManager.ItemPos = SsssssControlManager.rowFocus[SsssssControlManager.RowPos]
                        var rowList = RowItemList[SsssssControlManager.RowPos];
                        var item = rowList[SsssssControlManager.ItemPos];
                        nextUpId = item.id;
                    }

                    var k = document.getElementById(nextUpId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "center", //垂直捲軸的位置
                        inline: "center", //決定水平捲軸的位置 定义水平方向的对齐，start、center、end 或 nearest 之一。默认为 nearest。
                    });

                    Log.d(SsssssControlManager.TAG, "keyBoardControl Up:" + nextUpId);
                    break;
                case 40: //Down arrow.
                    e.preventDefault();
                    if (element.hasClass('focus-item')) {
                        var rowItemList = SsssssControlManager.RowItemList;
                        if (!SsssssControlManager.iskeyDown){
                            SsssssControlManager.RowPos++;
                            SsssssControlManager.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SsssssControlManager.iskeyDown = false;
                        }, 50)
                        if (SsssssControlManager.RowPos > rowItemList.length - 1) {
                            SsssssControlManager.RowPos = rowItemList.length - 1;
                        }
                        SsssssControlManager.ItemPos = SsssssControlManager.rowFocus[SsssssControlManager.RowPos]
                        var rowList = rowItemList[SsssssControlManager.RowPos];
                        var item = rowList[SsssssControlManager.ItemPos];
                        nextdownId = item.id;
                    }
                    var k = document.getElementById(nextdownId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "center", //垂直捲軸的位置
                        inline: "center", //決定水平捲軸的位置 定义水平方向的对齐，start、center、end 或 nearest 之一。默认为 nearest。
                    });
                    Log.d(SsssssControlManager.TAG, "keyBoardControl Down:" + nextdownId);
                    break;
                case 13: //enter
                case "Select":
                    // console.log('Enter ↓');
                    e.preventDefault();
                    if(elementId === "search-input"){
                        clearKeySearch();
                        searchKeyWord();
                    }else {
                        $('#' + elementId).click();
                    }
                    

                    Log.d(SsssssControlManager.TAG, "keyBoardControl Up:" + elementId);
                    break;
                case 10009:
                case 27: // Return/ Esc //RETURN button
                    // console.log('RETURN ');
                    // e.preventDefault();
                    // let isfocus = $("#search-input").is(":focus");
                    // if(isfocus){
                    //     window.history.back();
                    // } else {
                    //     $(".search-input").focus();
                    // }
                    return;
                case 229: //呼叫鍵盤 Other keys
                    e.preventDefault()
                    Log.d(SsssssControlManager.TAG, "keydown 呼叫鍵盤")
                    return;
                case 65376: // key Done
                    Log.d(SsssssControlManager.TAG, "keydown Done")
                    break;
                case 65385: //Cancel
                    Log.d(SsssssControlManager.TAG, "key Cancel")
                    break;
                case 32: //Space
                    Log.d(SsssssControlManager.TAG, "key Space")
                    break;
                case 8: //Backspace
                    Log.d(SsssssControlManager.TAG, "key Backspace")
                    break;
                case 46: //Delete All
                    Log.d(SsssssControlManager.TAG, "key Delete All")
                    break;
            }
        })
    },
    setSearchKey: function(element) {
        //設定控件
        SsssssControlManager.rowFocus = [];
        SsssssControlManager.RowItemList = [];
        SsssssControlManager.RowPos = 0;
        SsssssControlManager.ItemPos = 0;
        var contentRow = document.querySelectorAll('.focus-row:not([style*="display:none"]):not([style*="display: none"])');

        for (var i = 0; i < contentRow.length; i++) {
            var row = contentRow[i];
            var contentList = row.querySelectorAll('.focus-item:not([style*="display:none"]):not([style*="display: none"])');

            //
            if (row.style.display == 'none') {
                continue;
            }
            if (contentList.length < 1)
                continue;
            SsssssControlManager.rowFocus.push(0);
            SsssssControlManager.RowItemList.push(contentList);
            for (var j = 0; j < contentList.length; j++) {
                var element = contentList[j];
                var elementId = element.id;
                var nextUpId = elementId;
                var nextdownId = elementId;
                var nextleftId = elementId;
                var nextRightId = elementId;

                	if(elementId=='search-input'){
                		continue;
                	}
                Log.d(SsssssControlManager.TAG, "SsssssControlManager.js[" + j + "] setKeyListener(" + elementId + ", up:" + nextUpId + ", down:" + nextdownId + ", left:" + nextleftId + ", right:" + nextRightId + ")");
                SsssssControlManager.setKeyListener(elementId, nextUpId, nextdownId, nextleftId, nextRightId, SsssssControlManager.GridType);
            }
        }
        if (SsssssControlManager.RowItemList.length > 0) {
            var rowitem = SsssssControlManager.RowItemList[SsssssControlManager.RowPos];
            rowitem[SsssssControlManager.ItemPos].focus();
        }  
        
        setTimeout(function(){
            $('img.lazyload').lazyload({effect : "fadeIn"});
        },1000)
    },
    setBackkey: function() {

        document.addEventListener("keydown", function(e) {
            if (SsssssControlManager.iskeyDown)
            return;

            SsssssControlManager.iskeyDown = true;
            setTimeout(function() {
                SsssssControlManager.iskeyDown = false;
            }, 50)
            
            switch (e.keyCode) {
                case 10009:
                case 27: // Return/ Esc //RETURN button
                    // console.log('RETURN ');
                    e.preventDefault();
                    var isfocus = $(".search-input").is(":focus");
                    if(isfocus){
                        var isShow=$('.search-index').is(':visible')
                        if(isShow){
                            window.history.back();
                        }else{
                            this.location.reload();
                        }
                        
                    } else {
                        $(".search-input").focus();
                    }
                    break;
                case 40://down
                    var isfocus = $(".search-input").is(":focus");
                    if(isfocus){
                        if (SsssssControlManager.RowItemList.length > 0) {
                            var rowitem = SsssssControlManager.RowItemList[SsssssControlManager.RowPos];
                            rowitem[SsssssControlManager.ItemPos].focus();
                        }  
                    }

                    break;
                case "Select":
                    // console.log('Enter ↓');
                    e.preventDefault();
                    clearKeySearch();
                    searchKeyWord();

                    Log.d(SsssssControlManager.TAG, "keyBoardControl Up:" + elementId);
                    break;
            }
        })
    }
}