
// load進 共用的資料
jQuery.loadScript = function(url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}
if (typeof someObject == 'undefined') $.loadScript('./js/cabinet_slider.js'); //slider樣式生成

var hotList;
var nearList;
$(function() {
    var TAG = "SearchView.js"

    addHotKeyList();
    $(".search-input").attr("layoutType",SearchControlManage.ListType);
    $(".search-input").focus();
    setTimeout(function(){
        SearchControlManage.setSearchKey();
    },500);

    function addHotKeyList(){
        var rowName = "hotkey-row";
        var itemEl = `
        <section class="section-cabinet">        
            <div id="${rowName}" class="cabinet vertical">
                <h6 class="cabinet-name">熱門關鍵字</h6>
                <div class="cabinet-scroll-area ">
                    <div class="cabinet-container focus-row">
                    </div>
                </div>
            </div>
        </section>
    `
        $('.search-index').append(itemEl);
        var cabinetItemNum = 10;
        var cabinetItemWidth=0;
        for(var index=0;index<cabinetItemNum;index++){
            var elmId="HotKey_"+index
            var Elm =`
            <div id="${elmId}" class="cabinet-slider-item cabinet-slider-item-0 focus-item hot-key-item" data-num="1" data-pos="0" tabindex="0">
  
              <div class="cabnet-item-content ">
                  <div class="cabnet-item-text"><h6>${elmId}</h6></div>
  
              </div>
          </div>
            `
            
            $('#hotkey-row .cabinet-scroll-area .cabinet-container').append(Elm);
            $('#'+elmId).attr("layoutType",SearchControlManage.ListType);
            cabinetItemWidth = cabinetItemWidth+$('#'+elmId).outerWidth()+60;
        }

          // 計算櫃位寬度
          $('#' + rowName).find('.cabinet-container').width(cabinetItemWidth)
          var cabnetItemHeight = $('#' + rowName).height()
          var cabnetItemPadding = ((cabnetItemHeight * 1.2) - cabnetItemHeight)/2
          $('#' + rowName).find('.cabinet-container').css({'padding-top': cabnetItemPadding})
          $('#' + rowName).find('.cabinet-container').css({'padding-bottom': cabnetItemPadding})

    }
})