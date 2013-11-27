/*****************************************
Name: processstyleattribute
Function: Set Arributes of each style 
with the given order.
Parameters: mod
*******************************************/
function processstyleattribute(str,mod) {
	var styles=new Array();
	var stylesordered=new Array();
	var getmatch = new RegExp('style="[^"]+"', "g");
	for (var i = 0;; i++) {
		var stylestest = getmatch.exec(str);
		if (stylestest != null) {
			var newstyle = 1;
			for (var j = styles.length - 1; j >= 0; j--) {
				if (styles[j] == stylestest.toString()) newstyle = 0;
			};
			if (newstyle == 1) styles.push(stylestest.toString());
		} else break;
	}
	for (var i = 0; i < styles.length; i++) {
		var attrval = new Array();
		var attr = new Array('font','font-family','font-size','line-height','color','text-decoration','padding','display');
		for (var j = 0; j < attr.length; j++) {
			getmatch = new RegExp(attr[j] + ':[^;]+;', "g");
			var attrvaltest = getmatch.exec(styles[i]);
			if (attrvaltest) {
				attrval[j] = attrvaltest.toString();
				attrval[j] = attrval[j].match(/:[^;]+;/).toString();
				attrval[j] = attrval[j].replace(/:/g, '');
				attrval[j] = attrval[j].replace(/;/g, '');
			}
		}
		stylesordered[i] = 'style="';
		if(mod==1){
			if(parseInt(attrval[2])==0 && parseInt(attrval[3])==1) stylesordered[i]=styles[i];
			else {
				for (var j = 0; j < attr.length; j++) {
					if (attrval[j]){
						if(j==6){
							var paddingvalue= new Array();
							paddingvalue=attrval[j].split(' ');
							var paddingname=new Array('padding-top','padding-right','padding-bottom','padding-left');
							for(var k=0;k<4;k++){
								if(parseInt(paddingvalue[k])!=0) stylesordered[i]+=' ' + paddingname[k] + ':' + paddingvalue[k].replace(/px/g,"") + 'px;';
							}
						}else if(j==3){
							stylesordered[i]+=' mso-line-height-rule:exactly; ' + attr[j] + ':' + attrval[j] + ';';
						}else stylesordered[i]+=' ' + attr[j] + ':' + attrval[j] + ';';
					}
				}
				stylesordered[i] += '"';
			}
		}else if(mod==2){
			if(attrval[0]) stylesordered[i]+=' ' + attr[0] + ':' + attrval[0] + ';';
			if(attrval[1]&&attrval[2]) stylesordered[i]+=' font:' + attrval[2] + ' ' + attrval[1] + ';';
			else if(attrval[1]) stylesordered[i]+=' font:' + attrval[1] + ';';
			else if(attrval[2]) stylesordered[i]+=' font:' + attrval[2] + ';';
			for (var j = 3; j < attr.length; j++) {
				if(attrval[j]) stylesordered[i]+=' ' + attr[j] + ':' + attrval[j] + ';';
			}
			stylesordered[i] += '"';
		}
	}
	for (var i = 0; i < styles.length; i++) {
		str = str.split(styles[i]).join(stylesordered[i]);
	}
	return str;
}
/*****************************************
Name: setElementArributeOrders
Function: Set Arributes of each elements 
with the given order.
Parameters: str, elementname, attr[]
*******************************************/
function setElementArributeOrder(str, elementname, attr) {
	var elements = new Array();
	var elementsordered = new Array();
	var getmatch = new RegExp('<' + elementname + ' .*?>', "g");
	for (var i = 0;; i++) {
		var elementstest = getmatch.exec(str);
		if (elementstest != null) {
			var newelements = 1;
			for (var j = elements.length - 1; j >= 0; j--) {
				if (elements[j] == elementstest.toString()) newelements = 0;
			};
			if (newelements == 1) elements.push(elementstest.toString());
		} else break;
	}
	for (var i = 0; i < elements.length; i++) {
		var attrval = new Array();
		for (var j = 0; j < attr.length; j++) {
			getmatch = new RegExp(attr[j].replace(/\s+/g, '') + '=".*?"', "g");
			var attrvaltest = getmatch.exec(elements[i]);
			if (attrvaltest) {
				attrval[j] = attrvaltest.toString();
				attrval[j] = attrval[j].match(/"[^"]*"/).toString();
				attrval[j] = attrval[j].replace(/"/g, '');
			}
		}
		elementsordered[i] = '<' + elementname;
		for (var j = 0; j < attr.length; j++) {
			if (attrval[j]) elementsordered[i] += ' ' + attr[j] + '="' + attrval[j] + '"';
		}
		if (elements[i].match(' />')) {
			elementsordered[i] += ' />';
		} else {
			elementsordered[i] += '>';
		}
	}
	for (var i = 0; i < elements.length; i++) {
		str = str.split(elements[i]).join(elementsordered[i]);
	}
	return str;
}
/*****************************************
Name: setElementArribute
Function: Set Arributes of each elements 
with the given order and value.
Parameters: str, elementname, attr[]
*******************************************/
function setElementArribute(str, elementname, attr) {
	var elements = new Array();
	var elementsordered = new Array();
	var getmatch = new RegExp('<' + elementname + ' .*?>', "g");
	for (var i = 0;; i++) {
		var elementstest = getmatch.exec(str);
		if (elementstest != null) {
			var newelements = 1;
			for (var j = elements.length - 1; j >= 0; j--) {
				if (elements[j] == elementstest.toString()) newelements = 0;
			};
			if (newelements == 1) elements.push(elementstest.toString());
		} else break;
	}
	for (var i = 0; i < elements.length; i++) {
		var attrval = new Array();
		for (var j = 0; j < attr[0].length; j++) {
			attrval[j] = getattrvalue(elements[i], attr[1], j);
		}
		elementsordered[i] = '<' + elementname;
		for (var j = 0; j < attr[0].length; j++) {
			if (attrval[j]) elementsordered[i] += ' ' + attr[0][j] + '="' + attrval[j] + '"';
		}
		if (elements[i].match(' />') || elementname == "img") {
			elementsordered[i] += ' />';
		} else {
			elementsordered[i] += '>';
		}
	}
	for (var i = 0; i < elements.length; i++) {
		str = str.split(elements[i]).join(elementsordered[i]);
	}
	return str;
}
/*****************************************
Name: getattrvalue
Function: Get value of specific attr in the tag
Parameters: str, attr, j
*******************************************/
function getattrvalue(str, attr, j) {
	var attrval;
	if (attr[j].match(/\!\|/)) {
		var spareattr = new Array();
		attr[j]=attr[j].replace(/\s*\!\|\s*/g,'!|');
		spareattr = attr[j].split("!|");
		for (var x = 0; x < spareattr.length; x++) {
			spareattr[x] = getattrvalue(str, spareattr, x);
			if (spareattr[x]) {
				break;
			}
		}
		attrval = spareattr[x];
		return attrval;
	} else if (attr[j].match(/\+/)) {
		var multiattr = new Array();
		attr[j]=attr[j].replace(/\s*\+\s*/g,'+');
		multiattr = attr[j].split("+");
		for (var k = 0; k < multiattr.length; k++) {
			multiattr[k] = getattrvalue(str, multiattr, k);
			if (multiattr[k]) {
				if (attrval) attrval += multiattr[k];
				else attrval = multiattr[k];
			} else {
				return false;
			}
		}
		return attrval;
	} else {
		if (attr[j].match(/!="[^"]*"/)) {
			var detectattr = attr[j].replace(/\!/g, '');
			var getmatch = new RegExp(' '+detectattr.replace(/\s+/g, ''));
			var attrvaltest = getmatch.exec(str);
			if (attrvaltest) {
				return false;
			} else {
				getmatch = new RegExp(' '+detectattr.replace(/="[^"]*"/g, '') + '=".*?"');
				attrvaltest = getmatch.exec(str);
				if (attrvaltest) {
					attrval = attrvaltest.toString();
					attrval = attrval.match(/"[^"]+"/).toString();
					attrval = attrval.replace(/"/g, '');
				}
			}
		} else if (attr[j].match(/="[^"]*"/)) {
			var getmatch = new RegExp(' '+attr[j].replace(/\s+/g, ''));
			var attrvaltest = getmatch.exec(str);
			if (attrvaltest) {
				attrval = attrvaltest.toString();
				attrval = attrval.match(/"[^"]+"/).toString();
				attrval = attrval.replace(/"/g, '');
			}
		} else if (attr[j].match(/"[^"]*"/)) attrval = attr[j].match(/"[^"]*"/).toString().replace(/"/g, '');
		else {
			var getmatch = new RegExp(' '+attr[j].replace(/\s+/g, '') + '=".*?"');
			var attrvaltest = getmatch.exec(str);
			if (attrvaltest) {
				attrval = attrvaltest.toString();
				attrval = attrval.match(/"[^"]+"/).toString();
				attrval = attrval.replace(/"/g, '');
			}
		}
		return attrval;
	}
}
/*****************************************
Name: addOuterTagofImg
Function: Add a tag out of a flagged <img>
Parameters: str, attr, tagstart, tagend, flag
*******************************************/
function addOuterTagofImg(str, attr, tagstart, tagend, flag) {
	var elements = new Array();
	var getmatch = new RegExp('<img[^>]*' + attr + '[^>]* />', "g");
	for (var i = 0;; i++) {
		var elementstest = getmatch.exec(str);
		if (elementstest) {
			var newelements = 1;
			for (var j = elements.length - 1; j >= 0; j--) {
				if (elements[j] == elementstest.toString()) newelements = 0;
			};
			if (newelements == 1) elements.push(elementstest.toString());
		} else break;
	}
	for (var i = 0; i < elements.length; i++) {
		var elementswithnewtag = tagstart + elements[i] + tagend;
		str = str.split(elements[i]).join(elementswithnewtag);
	}
	if (flag) str = str.split(attr).join('');
	str = str.replace(/\s+/g, ' ');
	return str;
}
/*****************************************
Name: deleteaTagofImg
Function: Delete specific tag out of a flagged <img>
Parameters: str, attr
*******************************************/
function deleteaTagofImg(str, attr, flag) {
	var elements = new Array();
	var getmatch = new RegExp('<a[^>]*?><img[^>]*' + attr + '[^>]* /></a>', "g");
	for (var i = 0;; i++) {
		var elementstest = getmatch.exec(str);
		if (elementstest != null) {
			var newelements = 1;
			for (var j = elements.length - 1; j >= 0; j--) {
				if (elements[j] == elementstest.toString()) newelements = 0;
			};
			if (newelements == 1) elements.push(elementstest.toString());
		} else break;
	}
	for (var i = 0; i < elements.length; i++) {
		var elementswithnewtag = elements[i];
		elementswithnewtag = elementswithnewtag.replace(/<a[^>]*?>/g, '');
		elementswithnewtag = elementswithnewtag.split('</a>').join('');
		str = str.split(elements[i]).join(elementswithnewtag);
	}
	if (flag) str = str.split(attr).join('');
	str = str.replace(/\s+/g, ' ');
	return str;
}
/*****************************************
Name: deleteOuterTagofImg
Function: Delete specific tag out of a flagged <img>
Parameters: str, attr, tag, flag
*******************************************/
//This function is under testing

function deleteOuterTagofImg(str, attr, tag, flag) {
	var elements = new Array();
	var getmatch = new RegExp('<' + tag + '[^>]*>.*?(?!</' + tag + '>)<img[^>]*' + attr + '[^>]* />.*?</' + tag + '>', "g");
	//var getmatchimg=new RegExp('<img[^>]*'+attr+'[^>]* />',"g");
	for (var i = 0;; i++) {
		var elementstest = getmatch.exec(str);
		alert(elementstest);
		if (elementstest != null) {
			var newelements = 1;
			for (var j = elements.length - 1; j >= 0; j--) {
				if (elements[j] == elementstest.toString()) newelements = 0;
			};
			if (newelements == 1) elements.push(elementstest.toString());
		} else break;
	}
	for (var i = 0; i < elements.length; i++) {
		var elementswithnewtag = elements[i];
		var tagstart = new RegExp('<' + tag + '[^>]*>', "g");
		elementswithnewtag = elementswithnewtag.replace(tagstart, '');
		elementswithnewtag = elementswithnewtag.split('</' + tag + '>').join('');
		str = str.split(elements[i]).join(elementswithnewtag);
	}
	if (flag) str = str.split(attr).join('');
	str = str.replace(/\s+/g, ' ');
	return str;
}
/*****************************************
Name: isArray
Function: Returen true if the object is Array
Parameters: obj
*******************************************/
var isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
}
/*****************************************
Convert Dec to Hec
*******************************************/
function toHex(num1){
	num=parseInt(num1);
　　var rs = "";
　　var temp;
　　while(num/16 > 0){
　　　　temp = num%16;
　　　　rs = (temp+"").replace("10","a").replace("11","b").replace("12","c").replace("13","d").replace("14","e").replace("15","f") + rs;
　　　　num = parseInt(num/16);
　　}
	var twodigit;
	if(rs){
		twodigit=(rs<10)?'0'+rs:rs;
	}else twodigit='00';
　　return twodigit;
}
/*****************************************
Convert the value of color to Hex
*******************************************/
function colortoHex(str){
	var colors=new Array();
	var getmatch = new RegExp(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\);/g);
	for (var i = 0;; i++) {
		var colorstest = getmatch.exec(str);
		if (colorstest != null) {
			var newcolor = 1;
			for (var j = colors.length - 1; j >= 0; j--) {
				if (colors[j] == colorstest.toString()) newcolor = 0;
			};
			if (newcolor == 1) colors.push(colorstest.toString());
		} else break;
	}
	for (var i = 0; i < colors.length; i++) {
		var colorredinhex=colors[i].replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\);/g,'$1');
		var colorgreeninhex=colors[i].replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\);/g,'$2');
		var colorblueinhex=colors[i].replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\);/g,'$3');
		var colorinhex='#'+toHex(colorredinhex)+toHex(colorgreeninhex)+toHex(colorblueinhex)+';';
		str=str.split(colors[i]).join(colorinhex);
	}
	return str;
}