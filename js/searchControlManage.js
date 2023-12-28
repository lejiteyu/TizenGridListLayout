var SearchControlManage = {
    TAG: "SearchControlManage",
    ListType: "list", //列表型態
    GridType: "grid", //網格型態,像是更多頁面,電視頻道頁面
    currentArea: "mainContent", //目前區域 mainContent：右側內容 / menu：左側選單
    RowItemList: [],
    rowFocus: [],
    MeunPos: 0,
    RowPos: 0,
    ItemPos: 0,
    rowPos: 0,
    rowMax: 4,
    iskeyDown: false,
    setControlTool: function(rowMax) {
        //設定控件
        SearchControlManage.rowMax = rowMax;
        var contentList = document.querySelectorAll('.focus-item');
        SearchControlManage.RowItemList = contentList;
        for (var j = 0; j < contentList.length; j++) {
            var element = contentList[j];
            var elementId = element.id;
            var nextUpId = elementId;
            var nextdownId = elementId;
            var nextleftId = elementId;
            var nextRightId = elementId;

            $('#' + elementId).focus(function() {
                var element = $(this);
                Log.d(SearchControlManage.TAG, "element focus:" + element.id)
            })



            Log.d(SearchControlManage.TAG, "SearchControlManage.js[" + j + "] setKeyListener(" + elementId + ", up:" + nextUpId + ", down:" + nextdownId + ", left:" + nextleftId + ", right:" + nextRightId + ")");
            SearchControlManage.setKeyListener(elementId, nextUpId, nextdownId, nextleftId, nextRightId, SearchControlManage.GridType);
        }
        if (SearchControlManage.RowItemList.length > 0) {
            var rowitem = SearchControlManage.RowItemList;
            rowitem[SearchControlManage.rowPos].focus();
        }

        setTimeout(function(){
            $('img.lazyload').lazyload({effect : "fadeIn"});
        },1000)
    },
    setKeyListener: function(elementId, nextUpId, nextdownId, nextleftId, nextRightId, rowType) {
        Log.d(SearchControlManage.TAG, "SearchControlManage.js setKeyListener(" + elementId + ", " + nextUpId + ", " + nextdownId + ", " + nextleftId + ", " + nextRightId + ")");
        Log.d(SearchControlManage.TAG, "SearchControlManage ");
        var key = document.getElementById(elementId);
        var element = $('#' + elementId);
        //element.attr('tabindex', '0');

        key.addEventListener("keydown", function(e) {
            Log.d(SearchControlManage.TAG, "keyBoardControl keyCode:" + e.keyCode+" iskeyDown:"+SearchControlManage.iskeyDown);
            var element = $('#' + elementId);
            if (SearchControlManage.iskeyDown) {
                return;
            }
            var layoutType = element.attr("layoutType");
           
            //try {
            Log.d(SearchControlManage.TAG, "keyBoardControl elementId:" + elementId);
            var pos = parseInt(element.attr('data-pos'));
            var contentList = SearchControlManage.RowItemList;
            Log.d(SearchControlManage.TAG, "pos:" + pos + ", contentList length:" + contentList.length);
            switch (e.keyCode) {
                case 37: //Left arrow.
                    e.preventDefault();
                    // console.log('Left ←');
                    if(layoutType==SearchControlManage.ListType){
                        if (element.hasClass('cabinet-slider-item')) {
                            if (!SearchControlManage.iskeyDown){
                                SearchControlManage.ItemPos--;
                                SearchControlManage.iskeyDown = true;
                            }
                            setTimeout(function() {
                                SearchControlManage.iskeyDown = false;
                            }, 50)
                            if (SearchControlManage.ItemPos < 0) {
                                SearchControlManage.ItemPos = 0;
                            } else {
                                var rowList = SearchControlManage.RowItemList[SearchControlManage.RowPos];
                                var item = rowList[SearchControlManage.ItemPos];
                                nextleftId = item.id;
                                SearchControlManage.rowFocus[SearchControlManage.RowPos] = SearchControlManage.ItemPos;
                            }
                        }
                    }else{
                        if (!SearchControlManage.iskeyDown){
                            SearchControlManage.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SearchControlManage.iskeyDown = false;
                        }, 50)
                        if (pos > 0) {
                            var l = pos - 1;
                            if (l < 0) {
                                l = 0;
                            }
                            SearchControlManage.rowPos = l;
                            nextleftId = contentList[l].id;
                            Log.d(SearchControlManage.TAG, "nextleftId:" + nextUpId)
                        }
                    }
                    var k = document.getElementById(nextleftId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "nearest", //垂直捲軸的位置
                        // inline: "center",//決定水平捲軸的位置
                    });
                    Log.d(SearchControlManage.TAG, "keyBoardControl Left:" + nextleftId);
                    break;
                case 39: //Right arrow.
                    e.preventDefault();
                    // console.log('Right →');
                    if(layoutType==SearchControlManage.ListType){
                        if (element.hasClass('cabinet-slider-item')) {
                            if (!SearchControlManage.iskeyDown){
                                SearchControlManage.ItemPos++;
                                SearchControlManage.iskeyDown = true;
                            }
                            setTimeout(function() {
                                SearchControlManage.iskeyDown = false;
                            }, 50)
                            var rowList = SearchControlManage.RowItemList[SearchControlManage.RowPos];
                            if (SearchControlManage.ItemPos > rowList.length - 1) {
                                SearchControlManage.ItemPos = rowList.length - 1;
                            }
                            var item = rowList[SearchControlManage.ItemPos];
                            nextRightId = item.id;
                            SearchControlManage.rowFocus[SearchControlManage.RowPos] = SearchControlManage.ItemPos;
                        }
                    }else{
                        if (!SearchControlManage.iskeyDown){
                            SearchControlManage.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SearchControlManage.iskeyDown = false;
                        }, 50)
                        if (pos < contentList.length - 1) {
                            var r = pos + 1;
                            if (r > contentList.length - 1) {
                                r = contentList.length - 1;
                            }
                            SearchControlManage.rowPos = r;
                            Log.d(SearchControlManage.TAG, "r:" + r)
                            nextRightId = contentList[r].id;
                            Log.d(SearchControlManage.TAG, "nextRightId:" + nextUpId)
                        }
                    }
                    var k = document.getElementById(nextRightId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "nearest", //垂直捲軸的位置
                        // inline: "center",//決定水平捲軸的位置
                    });
                    Log.d(SearchControlManage.TAG, "keyBoardControl Right:" + nextRightId);
                    break;
                case 38: //Up arrow.
                    e.preventDefault();
                    // console.log('Up ↑');
                    if(layoutType==SearchControlManage.ListType){
                        if (element.hasClass('focus-item')) {
                            if (!SearchControlManage.iskeyDown){
                                SearchControlManage.RowPos--;
                                SearchControlManage.iskeyDown = true;
                            }
                            setTimeout(function() {
                                SearchControlManage.iskeyDown = false;
                            }, 50)
                            if (SearchControlManage.RowPos < 0) {                                                       
                                SearchControlManage.RowPos = 0;
                                $(".search-input").focus();
                                return;
                            }
                            var RowItemList = SearchControlManage.RowItemList;
                            SearchControlManage.ItemPos = SearchControlManage.rowFocus[SearchControlManage.RowPos]
                            var rowList = RowItemList[SearchControlManage.RowPos];
                            var item = rowList[SearchControlManage.ItemPos];
                            nextUpId = item.id;
                        }
                    }else{
                        var ii = (pos + 1);
                        if (!SearchControlManage.iskeyDown){
                            SearchControlManage.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SearchControlManage.iskeyDown = false;
                        }, 50)
                        if (ii > SearchControlManage.rowMax) {
                            var p = pos - SearchControlManage.rowMax;
                            if (p < 0) {
                                p = 0;
                            }
                            SearchControlManage.rowPos = p;
                            nextUpId = contentList[p].id;
                          
                        }
                    }
                    Log.d(SearchControlManage.TAG, "nextUpId:" + nextUpId)
                    var k = document.getElementById(nextUpId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "nearest", //垂直捲軸的位置
                        // inline: "center",//決定水平捲軸的位置
                    });

                    Log.d(this.TAG, "keyBoardControl Up:" + nextUpId);
                    break;
                case 40: //Down arrow.
                    e.preventDefault();

                    if(layoutType==SearchControlManage.ListType){
                        if (element.hasClass('focus-item')) {
                            var rowItemList = SearchControlManage.RowItemList;
                            if (!SearchControlManage.iskeyDown){
                                SearchControlManage.RowPos++;
                                SearchControlManage.iskeyDown = true;
                            }
                            setTimeout(function() {
                                SearchControlManage.iskeyDown = false;
                            }, 50)
                            if (SearchControlManage.RowPos > rowItemList.length - 1) {
                                SearchControlManage.RowPos = rowItemList.length - 1;
                            }
                            SearchControlManage.ItemPos = SearchControlManage.rowFocus[SearchControlManage.RowPos]
                            var rowList = rowItemList[SearchControlManage.RowPos];
                            var item = rowList[SearchControlManage.ItemPos];
                            nextdownId = item.id;
                        }
                    }else{
                        if (!SearchControlManage.iskeyDown){
                            SearchControlManage.iskeyDown = true;
                        }
                        setTimeout(function() {
                            SearchControlManage.iskeyDown = false;
                        }, 50)
                        var iii = pos + SearchControlManage.rowMax;
                        if (iii > contentList.length - 1) {
                            iii = contentList.length - 1;
                        }
                        SearchControlManage.rowPos = iii;
                        Log.d(SearchControlManage.TAG, "iii:" + iii)
                        var content = contentList[iii];
                        Log.d(SearchControlManage.TAG, "element:" + JSON.stringify(content));
                        nextdownId = content.id;
                    }
                   
                    
                    Log.d(SearchControlManage.TAG, "nextdownId:" + nextdownId)
                    var k = document.getElementById(nextdownId);
                    k.focus({ preventScroll: false });
                    k.scrollIntoView({
                        behavior: "auto", //auto「跳」、smooth「滑」
                        block: "nearest", //垂直捲軸的位置
                        // inline: "center",//決定水平捲軸的位置
                    });
                    Log.d(SearchControlManage.TAG, "keyBoardControl Down:" + nextdownId);
                    break;
                case 13: //enter
                    // console.log('Enter ↓');
                    e.preventDefault();
                    if (!SearchControlManage.iskeyDown){
                        SearchControlManage.iskeyDown = true;
                    }
                    setTimeout(function() {
                        SearchControlManage.iskeyDown = false;
                    }, 50)
                    $('#' + elementId).click();
                    Log.d(SearchControlManage.TAG, "keyBoardControl Up:" + elementId);
                    break;
                case 10009:
                case 27: // Return/ Esc //RETURN button
                    // console.log('RETURN ');
                    e.preventDefault();
                    if (!SearchControlManage.iskeyDown){
                        SearchControlManage.iskeyDown = true;
                    }
                    setTimeout(function() {
                        SearchControlManage.iskeyDown = false;
                    }, 50)
                    var MeunRecommend = SearchControlManage.RowItemList[0];
                    var isfocus = $("#"+MeunRecommend.id).is(":focus");
                    Log.d(SearchControlManage.TAG, "keyBoardControl MeunRecommend Return/ Esc //RETURN button focus:" + MeunRecommend.id);
                    Log.d(SearchControlManage.TAG, "keyBoardControl MeunRecommend Return/ Esc //RETURN button isfocus:" + isfocus);
                    if (!isfocus) {
                        MeunRecommend.focus();
                        Log.d(SearchControlManage.TAG, "keyBoardControl MeunRecommend focus:" + MeunRecommend.id);
                        break;
                    } else {
                        Log.d(SearchControlManage.TAG, "keyBoardControl MeunRecommend back()");
                        window.history.back();
                    }
                    break;
                case 229: //呼叫鍵盤 Other keys
                    e.preventDefault()
                    Log.d(SearchControlManage.TAG, "keydown 呼叫鍵盤")
                    return;
                case 65376: // key Done
                    Log.d(SearchControlManage.TAG, "keydown Done")
                    break;
                case 65385: //Cancel
                    Log.d(SearchControlManage.TAG, "key Cancel")
                    break;
                case 32: //Space
                    Log.d(SearchControlManage.TAG, "key Space")
                    break;
                case 8: //Backspace
                    Log.d(SearchControlManage.TAG, "key Backspace")
                    break;
                case 46: //Delete All
                    Log.d(SearchControlManage.TAG, "key Delete All")
                    break;
            }
            // } catch (e) {
            //     Log.e(SearchControlManage.TAG, "" + e)
            // }
        })

    },
    setSearchKey: function(element) {
        //設定控件
        SearchControlManage.rowFocus = [];
        SearchControlManage.RowItemList = [];
        SearchControlManage.RowPos = 0;
        SearchControlManage.ItemPos = 0;
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
            SearchControlManage.rowFocus.push(0);
            SearchControlManage.RowItemList.push(contentList);
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
                Log.d(SearchControlManage.TAG, "SearchControlManage.js[" + j + "] setKeyListener(" + elementId + ", up:" + nextUpId + ", down:" + nextdownId + ", left:" + nextleftId + ", right:" + nextRightId + ")");
                SearchControlManage.setKeyListener(elementId, nextUpId, nextdownId, nextleftId, nextRightId, SearchControlManage.GridType);
            }
        }
        if (SearchControlManage.RowItemList.length > 0) {
            var rowitem = SearchControlManage.RowItemList[SearchControlManage.RowPos];
            rowitem[SearchControlManage.ItemPos].focus();
        }  
        
        setTimeout(function(){
            $('img.lazyload').lazyload({effect : "fadeIn"});
        },1000)
    },
    setBackKey: function() {
        document.addEventListener("keydown", function(e) {
            Log.d(SearchControlManage.TAG, "keyBoardControl document keyCode:" + e.keyCode+" iskeyDown:"+SearchControlManage.iskeyDown);
            
            if (SearchControlManage.iskeyDown) {
                return;
            }
            
            if (!SearchControlManage.iskeyDown){
                SearchControlManage.iskeyDown = true;
            }
            setTimeout(function() {
                SearchControlManage.iskeyDown = false;
            }, 50)
            switch (e.keyCode) {
                case 10009:
                case 27: // Return/ Esc //RETURN button
                    // console.log('RETURN ');
                    e.preventDefault();
                    var row = SearchControlManage.RowItemList;
                    if (row.length > 0) {
                        var elementList = SearchControlManage.RowItemList[0];
                        if (elementList.length > 0) {
                            var element = elementList[0] //[SearchControlManage.RowPos][SearchControlManage.ItemPos];
                            var elementId = element.id;
                            var isfocus = $("#" + elementId).is(":focus");
                            if (!isfocus) {
                                element.focus();
                                return true;
                            } else
                                window.history.back();
                        } else
                            window.history.back();

                    } else
                        window.history.back();
                    return;
            }
        })

    }
}