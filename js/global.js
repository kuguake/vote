//提示信息

var cbms = {


    stopF:function (event) {
        if (window.event) {// IE
            cancelBubble = true;
        } else {
            event.stopPropagation();
        }
    },
 
	/**
	 * @title:        弹框标题
	 * @con:          弹框内容容器obj或url:http://xxx 或文本内容
	 * @id:           弹框唯一标识
	 * @fun:          回调函数
	 * @isafter:      回调函数执行的地方,默认在代码末尾执行{1:末尾执行;0:开头执行}
	 *
	 **/

	dialog : "",
	getDialog : function(title, con, id, fun, isafter) {

		if (id === undefined || id === null) {
			id = 'globalDialog';
		}
		var url = con.toLowerCase().substr(0, 6);
		var conBox = con.toLowerCase().substr(0, 1), autoClose = false;

		if ( typeof (isafter) === 'undefined' || isafter === '' || isafter === null) {
			isafter = 1;
		}
		if ( typeof (fun) === 'undefined' || fun === '' || fun === null) {
			fun = '';
		}

		var dialog = art.dialog({
			id : id,
			padding : 0,
			title : title,
			lock : true

		});
		this.dialog = dialog;
		dialog.hidden();

		if (url === 'http:/' || url === 'https:' || (con.toLowerCase().indexOf(".html") > 0 && !(con.toLowerCase().indexOf("getfile") > 0)) || con.toLowerCase().indexOf(".php") > 0) {
			$('#dialogContBox').load(con + '?_=' + Math.random(), function(data) {
				if (isafter !== 1) {
					if ( typeof (fun) === 'function') {
						fun(data);
					}
				}
				dialog._reset();
				dialog.visible();
				if (isafter === 1) {
					if ( typeof (fun) === 'function') {
						fun(data);
					}
				}
			});
		} else {
			var _con = con;
			if (conBox == '#' && $(con).length > 0) {
				_con = $(con).html();
			}

			if (isafter !== 1) {
				if ( typeof (fun) === 'function') {
					fun(_con);
				}
			}
			if (_con.toLowerCase().indexOf("div") < 0) {
				_con = '<div style="padding:10px 30px;">' + _con + '</div>';
				dialog.content(_con);
				autoClose = true;
			} else {
				dialog.content(_con);
			}

			dialog._reset();
			dialog.visible();
			if (isafter === 1) {
				if ( typeof (fun) === 'function') {
					fun(_con);
				}
			}

            dialog._reset();
            dialog.visible();
            if (isafter === 1) {if(typeof(fun) === 'function') {fun(_con); } }

            if(autoClose){
                //setTimeout(this.setTmClose, 3000);
            }
        }
    },
    //关闭弹出层窗口
    setTmClose:function(){
       document.getElementById("dialogClose").click();
    },
    closeDialog:function(){
        this.dialog.close();
    },
    
    /*加载图标*/
    loading:function(){
    	var ele = '<div id="loading" class="loading"></div>'+
		'<div style="z-index: 9990; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; display: block;" class="d-mask"></div>';

		$("body").append(ele);
		function rePosition(){
			var tab = $("#loading");
			tab.offset({ top:(document.documentElement.clientHeight - tab[0].offsetHeight) / 2 - 80 , left: (document.documentElement.clientWidth - tab[0].offsetWidth) / 2});	
		}
		
		$(window).resize(function(){
			rePosition();
		});
		rePosition();
		
    },
    /*加载图标*/
    closeLoading:function(){
    	$("#loading,.d-mask").remove();
    }

};


