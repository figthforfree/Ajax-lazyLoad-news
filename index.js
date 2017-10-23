

var perPageCount = 10,
curPage = 1;
var isloaded = false;
var clock
getNewlist()
document.body.onload = waterfall

$(window).scroll(function () {
if (clock) {
      clearTimeout(clock)
    } 
clock = setTimeout(function () {
  if(isloaded){
    return
  }
  isloaded = true;
  if (isVisible($('#loadline'))) {
  main()
  }
  isloaded = false;
      }, 100)
  })

function main() {
getNewlist()
waterfall()
}

function waterfall() {
var colSumHeigth = [],
  nodeWidth = $('.hide').outerWidth(true);
var colNum = parseInt($('.wrap').width() / nodeWidth)
for (var i = 0; i < colNum; i++) {
  colSumHeigth[i] = 0;
}
$('.item').each(function () {
  var minValue = Math.min.apply(null, colSumHeigth)
  var minIndex = colSumHeigth.indexOf(minValue)
  $(this).css({
    top: minValue,
    left: nodeWidth * minIndex,
    opacity: 1
  })
  colSumHeigth[minIndex] += $(this).outerHeight(true)
  $(this).parents().find('.item-ct').height(Math.max.apply(null, colSumHeigth))
})
}

function getNewlist() {
$.ajax({
  url: "http://platform.sina.com.cn/slide/album_tech",
  dataType: "jsonp",
  jsonp: "jsoncallback",
  data: {
    app_key: "1271687855",
    num: perPageCount,
    page: curPage
  }
}).done(function (ret) {
  if (ret && ret.status && ret.status.code === '0') {
    $('.item-ct').append(getNdoe(ret))
    curPage++
  }
})
}

function getNdoe(ret) {
var i = 0 ;
var html = "";
for(i;i<perPageCount;i++){
  html += '<li class="item">'
  html += '<div>'
  html += '<a href="' + ret.data[i].url + '">'
  html += '<img src="' + ret.data[i].img_url + '">'
  html += '</a>'
  html += '<h4>' + ret.data[i].name + '</h4>'
  html += '<p>' + ret.data[i].short_intro + '</p>'
  html += '</div>'
  html += '</li>'
  }
  return $(html);
}    


function isVisible($node) {
var scrollTop = $(window).scrollTop()
var windowHeight = $(window).height()
var offSetHeight = $node.offset().top
if (offSetHeight < scrollTop + windowHeight+500) {
  return true
}
}