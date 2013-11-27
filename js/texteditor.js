/*****************************************
Globle variables initialize
*******************************************/
var EditorDefaultAlign = "left";
var EditorDefaultValign = "top";
var EditorDefaultFont = "Arial, Helvetica, sans-serif";
var EditorDefaultFontsize = "12px";
var EditorDefaultLineheight = "NA";
var EditorDefaultColor = "#000000";
var EditorDefaultWidth = "";
var EditorDefaultHeight = "";
var EditorDefaultPadding = new Array("0", "0", "0", "0");  //top,right,bottom,left
var editorundo= new Array();
var editorredo= new Array();
/*****************************************
Execute immediately
*******************************************/
$(document).ready(function() {
	$("#texteditorpanel").draggable({
		distance: 20,
		cancel: "#textdemo,input,textarea,button,select,option",
	});
	$("#editorfontsize ul.dropdown-menu a").click(function() {
		changetext($(this).parent().parent().parent().prev(), $(this).text().replace(/px/g,''), "fontsize")
	});
	$("#editorlineheight ul.dropdown-menu a").click(function() {
		changetext($(this).parent().parent().parent().prev(), $(this).text().replace(/px/g,''), "lineheight")
	});
	$("#editorfontsizeinsert ul.dropdown-menu a").click(function() {
		changetext($(this).parent().parent().parent().prev(), $(this).text().replace(/px/g,''))
	});
	$("textarea#defaultfontsize").change(function() {
		setgvarineditor($(this).val().replace(/\s+/g,''), "fontsize");
	});
	$("textarea#defaultlineheight").change(function() {
		setgvarineditor($(this).val().replace(/\s+/g,''), "lineheight");
	});
	$("textarea#textineditor").bind("change keyup",
	function() {
		if($("textarea#textineditor").val().match('  ')&&$("#nbspmod").hasClass("active")){
			var foo=convertspace($("textarea#textineditor").val())
			$("textarea#textineditor").val(foo.str);
			var selend=$("textarea#textineditor").val().length-foo.distancetoend;
			$("textarea#textineditor").setSelection(selend, selend);
		}
		synceditabletd();
	});
	$("textarea#textineditor").keydown(function() {
		if ((event.ctrlKey&&event.keyCode==89)||(event.metaKey&&event.shiftKey&&event.keyCode==90)) {
			event.preventDefault();
			geteditorredo();
		}else if ((event.ctrlKey||event.metaKey)&&event.keyCode==90) {
			event.preventDefault();
			geteditorundo();
		}
	});
	$("textarea#textineditor").change(function(){
		funcofeditorundo();
	});
	$("input#linkstyleinherit").on('ifChecked', function(){
		insertstyleinherit();
	});
	$("input#linkstyleinherit").on('ifUnchecked', function(){
		noinsertstyleinherit();
	});
	$("input#linkstyle").on('ifChecked', function(){
		if($("input#linkstyleinherit").parent().hasClass("checked")==true){
			insertstyleinherit();
		}
	});
	$("input#linkstyle").on('ifUnchecked', function(){
		noinsertstyleinherit();
	});
	$("input#bulletmod").on('ifChecked', function(){
		$("#addtablestate").iCheck('disable');
	});
	$("input#bulletmod").on('ifUnchecked', function(){
		$("#addtablestate").iCheck('enable');
	});
});
function insertstyleinherit(){
	$("#insertattribute").hide();
}
function noinsertstyleinherit(){
	$("#insertattribute").show();
}
/*****************************************
Function of undo and redo
*******************************************/
function funcofeditorundo(){
	editorundo.unshift($("textarea#textineditor").val());
}
function geteditorundo(){
	if(editorundo.length){
		if (editorundo[0]==$("textarea#textineditor").val()) {
			editorundo.shift();
			geteditorundo();
		}else {
			editorredo.unshift($("textarea#textineditor").val());
			$("textarea#textineditor").val(editorundo.shift());
			synceditabletd();
		}
	}else if ($("textarea#textineditor").val()) {
		editorredo.unshift($("textarea#textineditor").val());
		$("textarea#textineditor").val('');
		synceditabletd();
	}
}
function geteditorredo(){
	if(editorredo.length){
		editorundo.unshift($("textarea#textineditor").val());
		$("textarea#textineditor").val(editorredo.shift());
		synceditabletd();
	}
}
/*****************************************
Confirm
*******************************************/
function confirmeditor() {
	funcofundo();
	$("[setEditor='true']").removeAttr("imgorder"); 
	$("[setEditor='true']").removeAttr("align");
	$("[setEditor='true']").removeAttr("valign");
	$("[setEditor='true']").removeAttr("imgseq");
	$("[setEditor='true']").removeAttr("style");
	$("[setEditor='true']").removeAttr("styleattribute");
	var getcontentofeditor = $("#textdemo").html();
	if(EditorDefaultWidth){
		$("[setEditor='true']").attr("width",EditorDefaultWidth);
		$("[setEditor='true']").attr("widthattribute",EditorDefaultWidth);
	}else{
		$("[setEditor='true']").attr("width","500");
		$("[setEditor='true']").removeAttr("widthattribute");
	}
	if(EditorDefaultHeight) $("[setEditor='true']").attr("height",EditorDefaultHeight);
	else $("[setEditor='true']").removeAttr("height");
	if($("#addtablestate").parent().hasClass("checked")){
		if(parseInt(EditorDefaultPadding[0])!=0 || parseInt(EditorDefaultPadding[1])!=0 || parseInt(EditorDefaultPadding[2])!=0 || parseInt(EditorDefaultPadding[3])!=0) getcontentofeditor='<editoraddtable><table cellpadding="0" cellspacing="1" border="0" style="border-collapse: separate; background-color: '+bordercolor[campaignmod-1]+'; border-spacing: 1px;"><tr><td align="left" valign="top" bgcolor="#ffffff" style="padding:'+EditorDefaultPadding.join(' ')+';" styleattribute="padding:'+EditorDefaultPadding.join(' ')+';">'+getcontentofeditor+'</td></tr></table></editoraddtable>';
		else getcontentofeditor='<editoraddtable><table cellpadding="0" cellspacing="1" border="0" style="border-collapse: separate; background-color: '+bordercolor[campaignmod-1]+'; border-spacing: 1px;"><tr><td align="left" valign="top" bgcolor="#ffffff">'+getcontentofeditor+'</td></tr></table></editoraddtable>';
	}else $("[setEditor='true']").css("padding",EditorDefaultPadding.join(' '));
	$("[setEditor='true']").attr("align",EditorDefaultAlign);
	$("[setEditor='true']").attr("valign",EditorDefaultValign);
	$("[setEditor='true']").css({
		"text-align": EditorDefaultAlign,
		"vertical-align": EditorDefaultValign,
		"font-family": EditorDefaultFont,
		"font-size": EditorDefaultFontsize,
		"line-height": (EditorDefaultLineheight == 'NA') ? '': EditorDefaultLineheight,
		"color": EditorDefaultColor
	});
	if($("#addtablestate").parent().hasClass("checked")) $("[setEditor='true']").attr("styleattribute",'font-family:'+EditorDefaultFont+'; font-size:'+EditorDefaultFontsize+'; line-height:'+((EditorDefaultLineheight == 'NA') ? "": EditorDefaultLineheight)+'; color:'+EditorDefaultColor+'; padding:0 0 0 0;');
	else $("[setEditor='true']").attr("styleattribute",'font-family:'+EditorDefaultFont+'; font-size:'+EditorDefaultFontsize+'; line-height:'+((EditorDefaultLineheight == 'NA') ? "": EditorDefaultLineheight)+'; color:'+EditorDefaultColor+'; padding:'+EditorDefaultPadding.join(' ')+';');
	var gettextofeditor=$("#textdemo").text();
	if ((gettextofeditor.indexOf("<") != -1) || (gettextofeditor.indexOf(">") != -1)) {
		alert('Detected < or > in text. Please check!');
	}
	if (gettextofeditor.indexOf('"') != -1) {
		alert('Detected " in text. Please check!');
	}
	$("[setEditor='true']").removeAttr("imgorder");
	$("[setEditor='true']").removeAttr("imgseq");
	$("[setEditor='true']").html(getcontentofeditor);
	$("#textEditor").modal('hide');
}
/*****************************************
Change titles when clicking on the list
*******************************************/
function changetitle(target, getvalue, globlevar) {
	target.attr("title", getvalue);
	$('#textEditor [title]').tooltip('destroy');
	$('#textEditor [title]').tooltip({
		container: '#textEditor'
	});
	setgvarineditor(getvalue, globlevar)
}
/*****************************************
Change text when clicking on the list
*******************************************/
function changetext(target, getvalue, globlevar) {
	target.val(getvalue);
	$('#textEditor [title]').tooltip('destroy');
	$('#textEditor [title]').tooltip({
		container: '#textEditor'
	});
	setgvarineditor(getvalue, globlevar)
}
/*****************************************
Set globle variables when changing the states
of editor
*******************************************/
function setgvarineditor(getvalue, globlevar) {
	switch (globlevar)
	 {
	case "align":
		EditorDefaultAlign = getvalue;
		break;
	case "valign":
		EditorDefaultValign = getvalue;
		break;
	case "font":
		EditorDefaultFont = getvalue;
		break;
	case "fontsize":
		EditorDefaultFontsize = getvalue.replace(/px/g,'')+'px';
		break;
	case "lineheight":
		EditorDefaultLineheight = getvalue.replace(/px/g,'')+'px';
		break;
	case "color":
		EditorDefaultColor = '#'+(getvalue.replace(/#/g,'')?getvalue.replace(/#/g,''):'000000');
		break;
	case "width":
		EditorDefaultWidth = getvalue;
		break;
	case "height":
		EditorDefaultHeight = getvalue;
		break;
	case "paddingtop":
		EditorDefaultPadding[0] = parseInt(getvalue)?getvalue:getvalue.replace(/px/g,'');
		break;
	case "paddingright":
		EditorDefaultPadding[1] = parseInt(getvalue)?getvalue:getvalue.replace(/px/g,'');
		break;
	case "paddingbottom":
		EditorDefaultPadding[2] = parseInt(getvalue)?getvalue:getvalue.replace(/px/g,'');
		break;
	case "paddingleft":
		EditorDefaultPadding[3] = parseInt(getvalue)?getvalue:getvalue.replace(/px/g,'');
		break;
	}
	$("td#textdemo").css({
		"text-align": EditorDefaultAlign,
		"vertical-align": EditorDefaultValign,
		"width": EditorDefaultWidth,
		"height": EditorDefaultHeight?EditorDefaultHeight+'px':"150px",
		"font-family": EditorDefaultFont,
		"font-size": EditorDefaultFontsize,
		"line-height": (EditorDefaultLineheight.replace(/px/g, '') == 'NA') ? '': EditorDefaultLineheight,
		"color": EditorDefaultColor,
		"padding": EditorDefaultPadding.join(' ')
	});
	return getvalue.replace(/px/g, '');
}
/*****************************************
Function of processing &nbsp;
*******************************************/
function convertspace(str){
	var sel = $("textarea#textineditor").getSelection();
	var distancetoend=$("textarea#textineditor").val().length-sel.end;
	str=str.replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');
	var spaces=new Array();
	var getmatch = new RegExp('  +', "g");
	for (var i = 0;; i++) {
		var spacestest = getmatch.exec(str);
		if (spacestest != null) {
			var newspace = 1;
			for (var j = spaces.length - 1; j >= 0; j--) {
				if (spaces[j] == spacestest.toString()) newspace = 0;
			};
			if (newspace == 1) spaces.push(spacestest.toString());
		} else break;
	}
	for (var i = 0; i < spaces.length; i++) {
		var matchspace=new RegExp(spaces[i],'g');
		str=str.replace(matchspace,spaces[i].replace(/ /g,"&nbsp;"));
	}
	return {
		str:str,
		distancetoend:distancetoend
	};
}
/*****************************************
Function of adding style
*******************************************/
function synctextarea() {
	var getcontentofdemo = $("#textdemo").html();
	getcontentofdemo = getcontentofdemo.replace(/<br>/g, '\n');
	$("#textineditor").val(getcontentofdemo);
}
function synceditabletd() {
	var getcontentofeditor = $("#textineditor").val();
	getcontentofeditor = getcontentofeditor.replace(/\n/g, '<br />');
	$("#textdemo").html(getcontentofeditor);
}
function getFirstRange() {
	var sel = rangy.getSelection();
	return sel.rangeCount ? sel.getRangeAt(0) : null;
}
function collapseSelectionToEnd() {
	rangy.getSelection().collapseToEnd();
}
function insertstyle() {
	funcofeditorundo();
	var linkstate=$("#linkstyle").parent().hasClass("checked")?1:0;
	var inheritstate=$("#linkstyleinherit").parent().hasClass("checked")?1:0;
	var insertstyle={
		color: '#'+$("input#insertcolor").val().replace(/\s+/g,'').replace(/#/g,''),
		textdecoration: $("#underlinestate").hasClass("active")?"underline":"",
		fontsizespan: $("#fontsizespan").val().replace(/\s+/g,'').replace(/px/g,'')+'px'
	};
	if($("input#insertcolor").val().replace(/\s+/g,'')=='') insertstyle.color='';
	if($("#fontsizespan").val().replace(/\s+/g,'')=='' || $("#fontsizespan").val().replace(/\s+/g,'')=='NA') insertstyle.fontsizespan='';
	if(linkstate){
		if(inheritstate){
			if(document.activeElement.id=="textineditor"){
				var seltextarea = window.getSelection();
				var acolor=' color:'+EditorDefaultColor+';';
				var adecoration=" text-decoration:none;";
				var seladda='<a href="http://replace" alias="replace"'+((campaignmod==1)?' conversion="true"':'')+' style="'+acolor+adecoration+'">' + seltextarea.toString() + '</a>';
				$("#textineditor").replaceSelectedText(seladda, "select");
				synceditabletd();
			}else{
				var range = getFirstRange();
				if (range) {
					var el = document.createElement("a");
					el.style.color = EditorDefaultColor;
					el.style.textDecoration = 'none';
					el.setAttribute("href" , 'http://replace');
					el.setAttribute("alias" , 'replace');
					if(campaignmod==1) el.setAttribute("conversion" , 'true');
					try {
						range.surroundContents(el);
					} catch(ex) {
						if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
							alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
						} else {
							alert("Unexpected errror: " + ex);
						}
					}
				}
				synctextarea();
			}
		}else{
			if(document.activeElement.id=="textineditor"){
				var seltextarea = window.getSelection();
				var acolor=' color:'+(insertstyle.color?insertstyle.color:EditorDefaultColor)+';';
				var adecoration=' text-decoration:'+(insertstyle.textdecoration?"underline":"none")+';';
				var afontsize=(insertstyle.fontsizespan!='')?(' font-size:'+insertstyle.fontsizespan+';'):'';
				var seladdspan = '<a href="http://replace" alias="replace"'+((campaignmod==1)?' conversion="true"':'')+' style="'+acolor+adecoration+afontsize+'">' + seltextarea.toString() + '</a>';
				$("#textineditor").replaceSelectedText(seladdspan, "select");
				synceditabletd();
			}else{
				var range = getFirstRange();
				if (range) {
					var el = document.createElement("a");
					if(insertstyle.color) el.style.color = insertstyle.color;
					else el.style.color = EditorDefaultColor;
					if(insertstyle.textdecoration=="underline") el.style.textDecoration = insertstyle.textdecoration;
					else el.style.textDecoration = "none";
					if(insertstyle.fontsizespan) el.style.fontSize = insertstyle.fontsizespan;
					el.setAttribute("href" , 'http://replace');
					el.setAttribute("alias" , 'replace');
					if(campaignmod==1) el.setAttribute("conversion" , 'true');
					try {
						range.surroundContents(el);
					} catch(ex) {
						if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
							alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
						} else {
							alert("Unexpected errror: " + ex);
						}
					}
				}
				synctextarea();
			}
		}
	}else{
		if(!insertstyle.color&&!insertstyle.fontsizespan&&!insertstyle.textdecoration){
			alert("There is no style setted! please check!");
		}else if(document.activeElement.id=="textineditor"){
			var seltextarea = window.getSelection();
			var spancolor=(insertstyle.color!='')?(' color:'+insertstyle.color+';'):'';
			var spandecoration=(insertstyle.textdecoration=="underline")?(' text-decoration:'+insertstyle.textdecoration+';'):'';
			var spanfontsize=(insertstyle.fontsizespan!='')?(' font-size:'+insertstyle.fontsizespan+';'):'';
			var seladdspan = '<span style="'+spancolor+spandecoration+spanfontsize+'">' + seltextarea.toString() + '</span>';
			$("#textineditor").replaceSelectedText(seladdspan, "select");
			synceditabletd();
		}else{
			var range = getFirstRange();
			if (range) {
				var el = document.createElement("span");
				if(insertstyle.color) el.style.color = insertstyle.color;
				if(insertstyle.textdecoration=="underline") el.style.textDecoration = insertstyle.textdecoration;
				if(insertstyle.fontsizespan) el.style.fontSize = insertstyle.fontsizespan;
				try {
					range.surroundContents(el);
				} catch(ex) {
					if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
						alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
					} else {
						alert("Unexpected errror: " + ex);
					}
				}
			}
			synctextarea();
		}
	}
}
function insertbold(){
	funcofeditorundo();
	if(document.activeElement.id=="textineditor"){
		var seltextarea = window.getSelection();
		var seladdstrong='<strong>' + seltextarea.toString() + '</strong>';
		$("#textineditor").replaceSelectedText(seladdstrong, "select");
		synceditabletd();
	}else{
		var range = getFirstRange();
		if (range) {
			var el = document.createElement("strong");
			try {
				range.surroundContents(el);
			} catch(ex) {
				if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
					alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
				} else {
					alert("Unexpected errror: " + ex);
				}
			}
		}
		synctextarea();
	}
}
function insertitalic(){
	funcofeditorundo();
	if(document.activeElement.id=="textineditor"){
		var seltextarea = window.getSelection();
		var seladditalic='<em>' + seltextarea.toString() + '</em>';
		$("#textineditor").replaceSelectedText(seladditalic, "select");
		synceditabletd();
	}else{
		var range = getFirstRange();
		if (range) {
			var el = document.createElement("em");
			try {
				range.surroundContents(el);
			} catch(ex) {
				if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
					alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
				} else {
					alert("Unexpected errror: " + ex);
				}
			}
		}
		synctextarea();
	}
}
function insertsup(){
	funcofeditorundo();
	if(document.activeElement.id=="textineditor"){
		var seltextarea = window.getSelection();
		var seladdsup='<sup style="font-size:9px; line-height:0;">' + seltextarea.toString() + '</sup>';
		$("#textineditor").replaceSelectedText(seladdsup, "select");
		synceditabletd();
	}else{
		var range = getFirstRange();
		if (range) {
			var el = document.createElement("sup");
			el.style.fontSize='9px';
			el.style.lineHeight='0';
			try {
				range.surroundContents(el);
			} catch(ex) {
				if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
					alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
				} else {
					alert("Unexpected errror: " + ex);
				}
			}
		}
		synctextarea();
	}
}
/*****************************************
Function of clearing formate
*******************************************/
function clearformat(){
	funcofeditorundo();
	if(document.activeElement.id=="textineditor"){
		var seltextarea = window.getSelection();
		var selclear='<clearformat>' + seltextarea.toString() + '</clearformat>';
		$("#textineditor").replaceSelectedText(selclear);
		$("#textineditor").val(doclear($("#textineditor").val()));
		synceditabletd();
	}else{
		var range = getFirstRange();
		if (range) {
			var el = document.createElement("clearformat");
			try {
				range.surroundContents(el);
			} catch(ex) {
				if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
					alert("Unable to clear format, maybe because you select a range across nodes. You can try to narrow the range of seceletion.");
				} else {
					alert("Unable to clear format, maybe because you select a range across nodes. You can try to narrow the range of seceletion.");
				}
			}
		}
		$("#textdemo").html(doclear($("#textdemo").html()));
		synctextarea();
		collapseSelectionToEnd();
	}
}
function doclear(text){
	var matchclearout=text.match(/<clearformat>.*?<\/clearformat>/)
	if(matchclearout){
		var matchclearout=matchclearout.toString();
		var matchclearin=matchclearout.replace(/<clearformat>/g,'').replace(/<\/clearformat>/g,'');
		matchclearin=matchclearin.replace(/<strong>(.*?)<\/strong>/g,'$1');
		matchclearin=matchclearin.replace(/<em>(.*?)<\/em>/g,'$1');
		matchclearin=matchclearin.replace(/<a[^>]*>(.*?)<\/a>/g,'$1');
		matchclearin=matchclearin.replace(/<span[^>]*>(.*?)<\/span>/g,'$1');
		matchclearin=matchclearin.replace(/<sup[^>]*>(.*?)<\/sup>/g,'$1');
		text=text.split(matchclearout).join('<clearformat>'+matchclearin+'</clearformat>');
	}
	var cleara1=text.match(/<a[^>]*>.*?<clearformat>/);
	var cleara2=text.match(/<\/clearformat>.*?<\/a>/);
	var clearspan1=text.match(/<span[^>]*>.*?<clearformat>/);
	var clearspan2=text.match(/<\/clearformat>.*?<\/span>/);
	var clearsup1=text.match(/<sup[^>]*>.*?<clearformat>/);
	var clearsup2=text.match(/<\/clearformat>.*?<\/sup>/);
	var clearitalic1=text.match(/<em>.*?<clearformat>/);
	var clearitalic2=text.match(/<\/clearformat>.*?<\/em>/);
	var clearbold1=text.match(/<strong>.*?<clearformat>/);
	var clearbold2=text.match(/<\/clearformat>.*?<\/strong>/);
	if(cleara1 && cleara2) if(!(cleara1.toString().match(/<\/a>/)||cleara2.toString().match(/<a[^>]*>/))){
		text=text.replace(/<a[^>]*>(.*?)<clearformat>/g,'$1<clearformat>');
		text=text.replace(/<\/clearformat>(.*?)<\/a>/g,'</clearformat>$1');
	}
	if(clearspan1 && clearspan2) if(!(clearspan1.toString().match(/<\/span>/)||clearspan2.toString().match(/<span[^>]*>/))){
		text=text.replace(/<span[^>]*>(.*?)<clearformat>/g,'$1<clearformat>');
		text=text.replace(/<\/clearformat>(.*?)<\/span>/g,'</clearformat>$1');
	}
	if(clearsup1 && clearsup2) if(!(clearsup1.toString().match(/<\/sup>/)||clearsup2.toString().match(/<sup[^>]*>/))){
		text=text.replace(/<sup[^>]*>(.*?)<clearformat>/g,'$1<clearformat>');
		text=text.replace(/<\/clearformat>(.*?)<\/sup>/g,'</clearformat>$1');
	}
	if(clearitalic1 && clearitalic2) if(!(clearitalic1.toString().match(/<\/em>/)||clearitalic2.toString().match(/<em>/))){
		text=text.replace(/<em>(.*?)<clearformat>/g,'$1<clearformat>');
		text=text.replace(/<\/clearformat>(.*?)<\/em>/g,'</clearformat>$1');
	}
	if(clearbold1 && clearbold2) if(!(clearbold1.toString().match(/<\/strong>/)||clearbold2.toString().match(/<strong>/))){
		text=text.replace(/<strong>(.*?)<clearformat>/g,'$1<clearformat>');
		text=text.replace(/<\/clearformat>(.*?)<\/strong>/g,'</clearformat>$1');
	}
	text=text.replace(/<clearformat>/g,'');
	text=text.replace(/<\/clearformat>/g,'');
	return text;
}