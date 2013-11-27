/*****************************************
Globle variables initialize
*******************************************/
var bordercolor = new Array("#ddb691", "#83a4b5");
var hovercolor = new Array("#fbf1e0", "#e1f0fe");
var fontcolor1 = new Array("#805b3a", "#3a6880");
var midbutton = new Array("button button-rounded button-flat-highlight", "button button-rounded button-flat-primary");
var winfocus = 1;
var imgOrder = 1;
var imgorderMax = 1;
var imginiAddr = 'D:/work/iProof request/MK/AWC/XN/images';
var accountName = "test";
var campaignId = "ab";
var date1 = "";
var imgid = new Array();
var initialHTML = '<table align="center" bgcolor="#ddb691" border="0" cellspacing="2" cellpadding="0" width="470" height="560" style="border-collapse: separate; background-color: #ddb691; border-spacing: 2px;"><tr><td width="500" bgcolor="#ffffff"></td></tr></table>';
var singleRow = '<td width="500" bgcolor="#ffffff"></td>';
var singleLine = "<tr>" + singleRow + '</tr>';
var addRow = '<table align="center" bgcolor="#ddb691" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: #ddb691; border-spacing: 1px;"><tr>' + singleRow + singleRow + '</tr></table>';
var addLine = '<table align="center" bgcolor="#ddb691" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: #ddb691; border-spacing: 1px;">' + singleLine + singleLine + '</table>';
var undo = new Array();
var unduNum = 0;
var undonsn = new Array();
var undoalt = new Array();
var rowNumber;
var colNumber;
var toolMod = 1;
var loadstate = 0;
var aliasdata = new Array();
var urldata = new Array();
var condata = new Array();
var scrollMod = 1;
var cwstableh = 0;
var scrollheight = 0;
var currentpageheight = 0;
var setbodyheight = 560;
var alertlgt = 0;
var alertquote = 0;
var campaignmod = 1;
var Samsungversion = 1;
var cwstdshow = 0;
/*****************************************
Extend function of sort Array
*******************************************/
function sortNumber(a, b) {
	return a - b
}
/*****************************************
Change the skin of the tool
*******************************************/
function changeSkin() {
	$("#head1").css("color", fontcolor1[campaignmod - 1]);
	$("div#a1 table").css("background-color", bordercolor[campaignmod - 1]);
	$("div#a1 table").attr("bgcolor", bordercolor[campaignmod - 1]);
	$("div#cwsDiv table").css("background-color", bordercolor[campaignmod - 1]);
	$("div#cwsDiv table").attr("bgcolor", bordercolor[campaignmod - 1]);
	$("#nextseqNum").css("border-color", bordercolor[campaignmod - 1]);
	$("#bodyheight").css("border-color", bordercolor[campaignmod - 1]);
	$("#midbutton :button").removeClass().addClass(midbutton[campaignmod - 1]);
	switch (toolMod) {
	case 1:
		sliceMod();
		break;
	case 2:
		imgMod();
		break;
	case 3:
		aliasMod();
		break;
	case 4:
		altMod();
		break;
	default:
		sliceMod();
	}
}
/*****************************************
JQ
Make the DOM of whole email
*******************************************/
$(document).ready(function() {
	$("div#a1").bind("contextmenu", function() { //block menu of right-click
		return false;
	});
	$("div#a1").on("mouseover", "td", function() { //high-light the mouseover img
		if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
			$(this).attr("bgcolor", hovercolor[campaignmod - 1]);
		}
	});
	$("div#a1").on("mouseout", "td", function() {
		if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
			$(this).attr("bgcolor", "#ffffff");
		}
	});
	$("div#a1").on("mousedown", "td", function() {
		clickflag = 0;
	});
	$("div#a1").on("mouseup", "td", function() {
		if (clickflag == 1) return false;
		if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
			funcofundo();
		} /*Slice Mod Start*/
		if (toolMod == 1) {
			rowNumber = rowNum.value;
			colNumber = colNum.value;
			$(this).removeAttr("imgorder"); //clear attr added in img mod when click
			$(this).removeAttr("align");
			$(this).removeAttr("valign");
			$(this).removeAttr("imgseq");
			$(this).removeAttr("style");
			$(this).removeAttr("styleattribute");
			$(this).html("");
			if ((event.button == 2) && (window.event.ctrlKey)) {
				if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
					if ($(this).parent("tr").children("td").length > 1 && (($(this).parent("tr").prev().children("td").length > 1) || ($(this).parent("tr").next().children("td").length > 1))) {
						$(this).parent("tr").parent().parent().remove();
					} else if ($(this).parent("tr").children("td").length == 1) {
						if ($(this).parent("tr").parent().parent("table").children().children("tr").length == 2) {
							var restoreflag;
							if ($(this).parent().prev().length) restoreflag = $(this).parent().prev().children().html();
							else restoreflag = $(this).parent().next().children().html();
							$(this).parent("tr").parent().parent().replaceWith(restoreflag);
						} else $(this).parent("tr").remove();
					} else if ($(this).parent("tr").children("td").length == 2) {
						var restoreflag;
						if ($(this).prev().length) restoreflag = $(this).prev().html();
						else restoreflag = $(this).next().html();
						$(this).parent("tr").parent().parent().replaceWith(restoreflag);
					} else $(this).remove();
				}
				if ($("div#a1").children().children().children().children().is("td") != true) $("div#a1").html(initialHTML);
				$("div#a1").children("table").attr({
					align: "center",
					bgcolor: bordercolor[campaignmod - 1],
					border: "0",
					cellspacing: "2",
					cellpadding: "0",
					width: "470",
					height: setbodyheight,
					style: "border-collapse:separate; background-color:" + bordercolor[campaignmod - 1] + "; border-spacing:2px; transition-duration:0.2s;"
				});
				$("div#a1 td[bgcolor]").attr("bgcolor", "#ffffff");
			} else if (event.button == 2) {
				if ($(this).next().is("td") || $(this).prev().is("td")) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						$(this).html(addLine); //add a table with 2 lines table->tr->td->tr->td
					}
				} else {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						if ($(this).parent().parent().parent().parent().is("div#a1") == true) {
							$(this).parent().after('<tr stacktable="1"><td width="500" bgcolor="#ffffff"></td></tr>'); //add single tr->td
						} else {
							$(this).parent().after(singleLine);
						}
					}
				}
			}
			if ((event.button == 0) && (window.event.ctrlKey)) {
				var addTable = '<table align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse:separate; background-color:' + bordercolor[campaignmod - 1] + '; border-spacing:1px;">';
				var addTableRow = "<tr>";
				for (var i = 1; i <= colNumber; i++) {
					addTableRow += singleRow;
				}
				addTableRow += '</tr>';
				for (var j = 1; j <= rowNumber; j++) {
					addTable += addTableRow;
				}
				addTable += '</table>'; //calculate the table(ctrl+left-click) accroding to given number
				if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
					if (rowNumber > 0 && colNumber > 0) {
						$(this).html(addTable); //add the calculated table
					}
				}
			} else if (event.button == 0) {
				if ($(this).parent().next().is("tr") || $(this).parent().prev().is("tr")) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						if ($(this).parent().parent().parent().parent().is("div#a1") == true) {
							$(this).html('<table needtodelete="1" align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: ' + bordercolor[campaignmod - 1] + '; border-spacing: 1px;"><tr><td width="500" bgcolor="#ffffff"></td><td width="500" bgcolor="#ffffff"></td></tr></table><needtodelete></needtodelete>');
						} else {
							$(this).html(addRow); //add a table with 2 rows table->tr->td->td
						}
					}
				} else {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						$(this).after(singleRow); //add single td
					}
				}
			}
			$("div#a1 td[bgcolor]").attr("bgcolor", "#ffffff");
			var re = document.getElementById("a1").innerHTML;
			$("div#a1").html(re); /*Img Mod Start*/
		} else if (toolMod == 2) {
			if (window.event.ctrlKey) {
				if (event.button == 0) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						$("div#a1 td").removeAttr("setEditor");
						$(this).removeAttr("imgorder");
						$(this).attr("setEditor", "true");
						$("#textEditor").modal('show');
					}
				} else if (event.button == 2) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						$(this).html("");
						$(this).html($(this).attr("imgorder"));
					}
				}
			} else {
				if (event.button == 0) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						$(this).removeAttr("align");
						$(this).removeAttr("valign");
						$(this).removeAttr("style");
						$(this).removeAttr("styleattribute");
						setimgSeq($(this));
						var autoaddseq = $(this).next();
						for (var i = 0; i <= 1000; i++) {
							if ((autoaddseq.is("td") == true) && ((autoaddseq.children().is("td") || autoaddseq.children().is("tr") || autoaddseq.children().is("table")) != true) && (autoaddseq.html() == "")) {
								setimgSeq(autoaddseq);
								autoaddseq = autoaddseq.next();
							} else {
								getnextSeq();
								break;
							}
						}
					}
				}
				if (event.button == 2) {
					if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
						if ($(this).html() > 0) {
							imgOrder = $(this).html();
							var imgNumber = parseInt(imgOrder);
							$(this).removeAttr("imgorder");
							$(this).removeAttr("imgseq");
							$(this).removeAttr("align");
							$(this).removeAttr("valign");
							$(this).removeAttr("style");
							$(this).removeAttr("styleattribute");
							$(this).html("");
							for (var x = imgNumber; x > 1; x--) {
								if (x > 2) {
									var numDetect = $("div#a1").html();
									var y = x - 1;
									var abc = 'imgorder="' + y + '"';
									if (numDetect.indexOf(abc) != -1) {
										for (var i = x; x <= (imgorderMax + 1); i++) { //this only work when deleting the replicated number
											var numDetect = $("div#a1").html();
											var abc = "imgorder=\"" + i + "\"";
											if (numDetect.indexOf(abc) == -1) {
												imgOrder = i;
												break;
											}
										}
										break;
									}
								} else {
									imgOrder = 2;
								}
							}
							nextseqNum.value = imgOrder;
						}
					}
				}
			}
			if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) {
				getexactseq();
			} /*img mod end*/
		} else if (toolMod == 3) {

		} //alias mod end
		if (($(this).children().is("td") || $(this).children().is("tr") || $(this).children().is("table") || $(this).parents().is("editoraddtable")) != true) clickflag = 1;
	});
	$("div#a1").on("change", "input", function() {
		funcofundo();
	});
	$("div#a1").on("keyup", "input", function() {
		$(this).removeAttr("alias");
		for (var j = 0; j < $("div#a1 input").length; j++) $("div#a1 input").eq(j).attr("inputnum", $("div#a1 input").eq(j).val());
		var cwsNum = $(this).val();
		if (aliasdata[cwsNum] && (cwsNum == parseInt(cwsNum))) {
			var aliasdatare = aliasdata[cwsNum];
			aliasdatare = aliasdatare.replace(/\s+/g, " ");
			$(this).attr("alias", aliasdatare);
		}
	});
	$("div#a1").on("focus", "textarea", function() {
		$("div#a1 textarea").animate({
			height: "20px"
		}, 100).not(this);
		$("div#a1 textarea").css("overflow", "auto");
		$("div#a1 textarea").dequeue();
		$("div#a1 textarea").animate({
			width: "60px"
		}, 100).not(this);
		$("div#a1 textarea").css("overflow", "auto");
		$("div#a1 textarea").dequeue();
		$(this).animate({
			width: "150px"
		}, 100);
		$("div#a1 textarea").css("overflow", "auto");
		$("div#a1 textarea").dequeue();
		$(this).animate({
			height: "100px"
		}, 100);
		$("div#a1 textarea").css("overflow", "auto");
		$("div#a1 textarea").dequeue();
	});
	$("div#a1").on("change", "textarea", function() {
		funcofundo();
	});
	$("div#a1").on("mousedown", "textarea", function() {
		var r = document.getSelection();
		r.collapse(true);
	});
	$("div#a1").on("keydown", "textarea", function() {
		if (event.keyCode == 16) {
			var sel = window.getSelection();
			var selconvert = sel.toString();
			if (selconvert == selconvert.toUpperCase()) {
				selconvert = selconvert.toLowerCase();
			} else {
				selconvert = selconvert.toUpperCase();
			}
			$(this).replaceSelectedText(selconvert, "select");
		}
		if (event.altKey && event.keyCode == 112) {
			$(this).replaceSelectedText("®");
		}
		if (event.altKey && event.keyCode == 113) {
			$(this).replaceSelectedText("™");
		}
		if (event.altKey && event.keyCode == 114) {
			$(this).replaceSelectedText("©");
		}
		if (event.ctrlKey && event.keyCode == 81) {
			var getaliasval = ($(this).parent().children("input").attr("alias")) ? $(this).parent().children("input").attr("alias") : "Can't match any Alias";
			$(this).replaceSelectedText(getaliasval);
		}
	});
	$("div#a1").on("keyup", "textarea", function() {
		var altvalue = $(this).val();
		altvalue = (altvalue) ? altvalue : "HasNoAltAttribute";
		altvalue = altvalue.replace(/\/g, ' ');
		altvalue = altvalue.replace(/\s+/g, " ");
		if ((altvalue.indexOf("<") != -1) || (altvalue.indexOf(">") != -1)) {
			altvalue = altvalue.replace(/</g, "");
			altvalue = altvalue.replace(/>/g, "");
			$(this).attr("alertlgt", "1");
		} else {
			$(this).removeAttr("alertlgt");
		}
		if (altvalue.indexOf('"') != -1) {
			altvalue = "detectfirstquote" + altvalue;
			altvalue = altvalue.replace(/detectfirstquote"/, "replace!ldquo");
			altvalue = altvalue.replace(/detectfirstquote/, "");
			altvalue = altvalue.replace(/\s"/g, " replace!ldquo");
			altvalue = altvalue.replace(/\("/g, "(replace!ldquo");
			altvalue = altvalue.replace(/"\s/g, "replace!rdquo ");
			altvalue = altvalue.replace(/"\)/g, "replace!rdquo)");
			altvalue = altvalue.replace(/"/g, "replace!rdquo");
			$(this).attr("alertquote", "1");
		} else {
			$(this).removeAttr("alertquote");
		}
		altvalue = altvalue.replace(/“/g, "replace!ldquo");
		altvalue = altvalue.replace(/”/g, "replace!rdquo");
		altvalue = altvalue.replace(/®/g, "replace!reg");
		altvalue = altvalue.replace(/™/g, "replace!trade");
		altvalue = altvalue.replace(/©/g, "replace!copy");
		altvalue = altvalue.replace(/—/g, "replace!mdash");
		altvalue = altvalue + '  ';
		altvalue = altvalue.replace(/\s\s+/g, "");
		$(this).nextAll("img").eq(0).attr("altattribute", altvalue);
	});
	$("div#a1").on("keydown", "textarea", function() {
		if ((event.keyCode == 65) && window.event.ctrlKey) {
			$(this).select();
		}
	});
	$("div#a1").on("keydown", "input", function() {
		if ((event.keyCode == 65) && window.event.ctrlKey) {
			$(this).select();
		}
	});
	$("#getlocalimg").click(function(evt) {
		$("#getlocalimg").val("");
	});
	$("#getlocalimg").change(function(evt) {
		funcofundo();
		var files = evt.target.files; // FileList object
		$("#list").empty();
		var output = [];
		var getimgfileseq = new Array();
		var getimgfileorder = new Array();
		//var getfirstimgseq=parseInt(files[0].name.split("_").pop());
		for (var i = 0, f; f = files[i]; i++) {
			if (!isNaN(parseInt(f.name.split("_").pop()))) {
				//getfirstimgseq=(parseInt(f.name.split("_").pop())<getfirstimgseq)?parseInt(f.name.split("_").pop()):getfirstimgseq;
				getimgfileseq[i] = parseInt(f.name.split("_").pop());
			} else {
				alert('The image "' + escape(f.name) + '" may be named incorrectly, pls check!');
			}
		}
		getimgfileseq.sort(sortNumber);
		for (var i = 1; i <= getimgfileseq.length; i++) {
			getimgfileorder[getimgfileseq[i - 1]] = i;
		}
		// Loop through the FileList and render image files as thumbnails.
		for (var i = 0, f; f = files[i]; i++) {

			// Only process image files.
			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				return function(e) {
					// Render thumbnail.
					var getfilename = new Array();
					getfilename = theFile.name.split("_");
					var getfileseq = parseInt(getfilename.pop());
					if (!isNaN(getfileseq)) {
						var imgTag = '<img src="' + e.target.result + '" srcattribute="' + escape(theFile.name) + '" border="0" style="display:block;" altattribute="replace">';
						var attrname = "[imgseq=\'" + getimgfileorder[parseInt(getfileseq)] + "\']";
						$(attrname).html(imgTag);
						var image = new Image();
						image.onload = function(evt) {
							var width = this.width;
							var height = this.height;
							$(attrname).children("img").attr("width", ((width == 0) ? 20 : width));
							$(attrname).children("img").attr("height", ((height == 0) ? 20 : height));
							if ((height < 20) && height) {
								$(attrname).css("font-size", "0");
								$(attrname).css("line-height", "1");
							}
						};
						image.src = e.target.result;
						var span = document.createElement('span');
						span.innerHTML = ['<img class="img-thumbnail" src="', e.target.result, '" title="', escape(theFile.name), '" width="80" height="40" />'].join('');
						document.getElementById('list').insertBefore(span, null);
					}
				};
			})(f); // Read in the image file as a data URL.
			reader.readAsDataURL(f);
		}
		$("div.insertimg").hide();
		$("div#a1 td:empty").html("No Image");
	});
	//$('input').iCheck('update');
	$(":radio[name='campaignRadios']").on('ifChanged', function() {
		var campaignname = $(":radio[name='campaignRadios']:checked").val();
		switch (campaignname) {
		case "MK":
			campaignmod = 1;
			$("#samsungversionselect").hide();
			break;
		case "Samsung":
			campaignmod = 2;
			$("#samsungversionselect").show();
			break;
		default:
			campaignmod = 1;
			$("#samsungversionselect").hide();
		}
		changeSkin();
		initialHTML = '<table align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="2" cellpadding="0" width="470" height="560" style="border-collapse: separate; background-color: ' + bordercolor[campaignmod - 1] + '; border-spacing: 2px;"><tr><td width="500" bgcolor="#ffffff"></td></tr></table>';
		singleRow = '<td width="500" bgcolor="#ffffff"></td>';
		singleLine = "<tr>" + singleRow + '</tr>';
		addRow = '<table align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: ' + bordercolor[campaignmod - 1] + '; border-spacing: 1px;"><tr>' + singleRow + singleRow + '</tr></table>';
		addLine = '<table align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: ' + bordercolor[campaignmod - 1] + '; border-spacing: 1px;">' + singleLine + singleLine + '</table>';
	});
	$(":radio[name='SamsungVerRadios']").on('ifChanged', function() {
		var samversion = $(":radio[name='SamsungVerRadios']:checked").val();
		switch (samversion) {
		case "SamsungV1":
			Samsungversion = 1;
			break;
		case "SamsungV2":
			Samsungversion = 2;
			break;
		default:
			Samsungversion = 1;
		}
	});
	$(":button[name='export']").click(function() {
		switch (campaignmod) {
		case 1:
			export1();
			break;
		case 2:
			export2();
			break;
		default:
			export1();
		}
	});
});

function reinsertimg() {
	var getimgfileseq = new Array();
	var getimgfileorder = new Array();
	for (var i = 0; i < $("output#list").children("span").length; i++) {
		if (!isNaN(parseInt($("output#list").children("span").eq(i).children().attr("title").split("_").pop()))) {
			getimgfileseq[i] = parseInt($("output#list").children("span").children().eq(i).attr("title").split("_").pop());
		} else {
			alert('The image "' + escape($("output#list").children("span").children().eq(i).attr("title")) + '" may be named incorrectly, pls check!');
		}
	}
	getimgfileseq.sort(sortNumber);
	for (var i = 1; i <= getimgfileseq.length; i++) {
		getimgfileorder[getimgfileseq[i - 1]] = i;
	}
	for (var i = 0; i < getimgfileseq.length; i++) {
		var getfileseq = parseInt($("output#list").children("span").eq(i).children().attr("title").split("_").pop());
		if (!isNaN(getfileseq)) {
			var imgsrc = $("output#list").children("span").eq(i).children().attr("src")
			var imgTag = '<img src="' + imgsrc + '" srcattribute="' + $("output#list").children("span").eq(i).children().attr("title") + '" border="0" style="display:block;" altattribute="replace">';
			var attrname = "[imgseq=\'" + getimgfileorder[parseInt(getfileseq)] + "\']";
			$(attrname).html(imgTag);
			var image = new Image();
			image.src = imgsrc;
			var width = image.width;
			var height = image.height;
			$(attrname).children("img").attr("width", ((width == 0) ? 20 : width));
			$(attrname).children("img").attr("height", ((height == 0) ? 20 : height));
			if ((height < 20) && height) {
				$(attrname).css("font-size", "0");
				$(attrname).css("line-height", "1");
			}
		}
	}
	$("div#a1 td:empty").html("No Image");
}
/*****************************************
Name: calculatewidth
Get width attribute of <table> and <td>
Just used in Samsung's campaign.
*******************************************/
function calculatewidth() {
	$("div#a1 table").css("border-spacing", "0px");
	$("div#a1 input").hide();
	$("div#a1 textarea").hide();
	for (var i = 0; i < $("div#a1 table").length; i++) {
		$("div#a1 table").eq(i).attr("widthattribute", $("div#a1 table").eq(i).width());
	}
	for (var i = 0; i < $("div#a1 td").length; i++) {
		var tdwidth = parseInt($("div#a1 td").eq(i).width());
		var tdwidthtotal = parseInt($("div#a1 td").eq(i).parent().width());
		if (tdwidthtotal >= 500) {
			var tdwidthper = parseInt(tdwidth / tdwidthtotal * 100);
			$("div#a1 td").eq(i).attr("width", tdwidthper + '%');
		}
	}
	$("div#a1 table").css("border-spacing", "1px");
	$("div#a1").children("table").css("border-spacing", "2px");
	if (toolMod == 3) $("div#a1 input").show();
	if (toolMod == 4) $("div#a1 textarea").show();
}
/*****************************************
Name: showinputnum
Show former numbers in input box when click
Undo button
*******************************************/
function showinputnum() {
	for (var j = 0; j < $("div#a1 input").length; j++) {
		$("div#a1 input").eq(j).val($("div#a1 input").eq(j).attr("inputnum"));
	}
}
/*****************************************
Name: inputprocess
Set alias, href, conversion and other attributes
according to the numbers/chars in the input boxes.
*******************************************/
function inputprocess() {
	$("div#a1 img").removeAttr("addurl");
	$("div#a1 img").removeAttr("addurlset");
	$("div#a1 img").removeAttr("imgclose");
	$("div#a1 input").removeAttr("inputnum");
	$("div#a1 input").removeAttr("href");
	$("div#a1 input").removeAttr("alias");
	$("div#a1 input").removeAttr("realias");
	$("div#a1 input").removeAttr("realiastbd");
	$("div#a1 input").removeAttr("conversion");
	for (var j = 0; j < $("div#a1 input").length; j++) {
		var cwsNum1 = $("div#a1 input").eq(j).val();
		if (aliasdata[cwsNum1] && (cwsNum1 == parseInt(cwsNum1))) {

		} else if ((cwsNum1 == "n") || (cwsNum1 == "N")) {
			$("div#a1 input").eq(j).nextAll("img").eq(0).attr("addurl", "n");
		} else if ((cwsNum1 == "r") || (cwsNum1 == "R")) {
			$("div#a1 input").eq(j).nextAll("img").eq(0).attr("addurl", "r");
		} else if ((cwsNum1 == "t") || (cwsNum1 == "T")) {
			$("div#a1 input").eq(j).nextAll("img").eq(0).attr("addurl", "t");
		} else if (cwsNum1 != "") {
			alert("The alias sequence can not be found! Please check!");
			$("div#a1 input").eq(j).val("");
		}
		$("div#a1 input").eq(j).attr("inputnum", $("div#a1 input").eq(j).val());
		var cwsNum = $("div#a1 input").eq(j).val();
		if (aliasdata[cwsNum] && (cwsNum == parseInt(cwsNum))) {
			var urldatareplace = urldata[cwsNum].split("&").join("replace!and");
			$("div#a1 input").eq(j).attr("href", urldatareplace);
			var aliasdatare = aliasdata[cwsNum];
			aliasdatare = aliasdatare.replace(/\s+/g, " ");
			$("div#a1 input").eq(j).attr("alias", aliasdatare);
			for (var i = 1; i < imgorderMax; i++) {
				var aliastest1 = aliasdatare;
				aliastest1 = aliastest1.split("\&").join("&amp;");
				aliastest1 = aliastest1.split("\"").join("&quot;");
				aliastest1 = aliastest1.split("\<").join("&lt;");
				aliastest1 = aliastest1.split("\>").join("&gt;");
				var numDetect = $("div#a1").html();
				var abc =new RegExp("alias=\"" + aliastest1 + "\" " + "realias=\"" + i + "\"",'i');
				if (!numDetect.match(abc)) {
					$("div#a1 input").eq(j).attr("realias", i);
					break;
				}
			}
			if(aliasdatare.match(/"/)||aliasdatare.match(/</)||aliasdatare.match(/>/)) $("div#a1 input").eq(j).attr("spacialcharinalias","1");
			else $("div#a1 input").eq(j).removeAttr("spacialcharinalias");
			if (campaignmod == 2) {
				$("div#a1 input").eq(j).attr("conversion", "null");
			} else if (cwsdataCon.value == "") {
				$("div#a1 input").eq(j).attr("conversion", "true");
			} else {
				if ((condata[cwsNum] == "Y") || (condata[cwsNum] == "y") || (condata[cwsNum] == "yes") || (condata[cwsNum] == "YES") || (condata[cwsNum] == "Yes")) {
					$("div#a1 input").eq(j).attr("conversion", "true");
				}
			}
		}
	}
}
/*****************************************
Name: getexactseq
Sort the imgs with the exact order
*******************************************/
function getexactseq() {
	var imgSeq = 0;
	for (var s = 1; s <= imgorderMax; s++) {
		var numDetect = $("div#a1").html();
		var abc = "imgorder=\"" + s + "\"";
		if (numDetect.indexOf(abc) != -1) {
			imgSeq++;
			var cba = "[imgorder=\'" + s + "\']"
			$(cba).attr("imgseq", imgSeq);
		}
	}
}
/*****************************************
Name: setimgSeq
Put the numbers into <td>s when u are adding
the order of img
*******************************************/
function setimgSeq(a) {
	imgOrder = nextseqNum.value;
	a.removeAttr("style");
	a.attr("imgorder", imgOrder);
	a.attr("align", "left");
	a.attr("valign", "top");
	a.html(imgOrder);
	imgOrder++;
	nextseqNumInt = parseInt(nextseqNum.value);
	nextseqNum.value = nextseqNumInt + 1;
	if (nextseqNumInt > imgorderMax) {
		imgorderMax = nextseqNumInt;
	}
}
/*****************************************
Name: getnextSeq
Calculate what the next number of img will be.
*******************************************/
function getnextSeq() {
	var imgNumber = parseInt(imgOrder);
	for (var x = imgNumber; x <= (imgorderMax + 1); x++) { //make sure the number will not be replicated
		var numDetect = $("div#a1").html();
		var abc = "imgorder=\"" + x + "\"";
		if (numDetect.indexOf(abc) == -1) {
			nextseqNum.value = x;
			break;
		}
	}
}
/*****************************************
Name: export
Do the string processing in order to export 
correct codes followed by ED rules.
export1() → MK
export2() → Samsung
*******************************************/
function export1() {
	funcofundo();
	inputprocess();
	if ($("[inputnum='']").is("input") == true) alert("One or more alias sequences are missed! Pls check!");
	$("div#a1 textarea").css("width", "60");
	$("div#a1 textarea").css("height", "20");
	if ($("[alertquote]").is("textarea") == true) alert('Detected " in alt, and already replaced with “(&ldquo;) or ”(&rdquo;). Pls check if it is correct!');
	if ($("[alertlgt]").is("textarea") == true) alert('Detected "<" or ">" in alt, and already deleted. Pls check!');
	var text = document.getElementById("a1").innerHTML;
	var setImgAttr = new Array(new Array(), new Array());
	setImgAttr[0][0] = 'src';
	setImgAttr[1][0] = '"images/"+srcattribute';
	setImgAttr[0][1] = 'alt';
	setImgAttr[1][1] = 'altattribute';
	setImgAttr[0][2] = 'width';
	setImgAttr[1][2] = 'width';
	setImgAttr[0][3] = 'height';
	setImgAttr[1][3] = 'height';
	setImgAttr[0][4] = 'border';
	setImgAttr[1][4] = '"0"';
	setImgAttr[0][5] = 'style';
	setImgAttr[1][5] = '"display:block;"';
	setImgAttr[0][6] = 'addurl';
	setImgAttr[1][6] = 'addurl';
	text = setElementArribute(text, "img", setImgAttr);
	text = text.split(' stacktable="1"').join("");
	text = text.split('<needtodelete></needtodelete>').join("");
	text = text.split('<editoraddtable>').join("");
	text = text.split('</editoraddtable>').join("");
	text = text.replace(/font-size:\s*0px/g,'font-size:0');
	text = text.replace(/line-height:\s*0px/g,'line-height:0');
	if ($("div#a1 input").is("input") != true) {
		text = addOuterTagofImg(text, '', '<a href="http://replace" target="_blank" alias="replace" conversion="true">', '</a>');
	} else {
		text = text.replace(/<input/g, '<a');
		text = addOuterTagofImg(text, '', '', '</a>');
	}
	text = text.replace(/<textarea[^>]+><\/textarea>/g, '');
	text = text.split("<tbody>").join("");
	text = text.split('</tbody>').join("");
	text = text.split("replace!and").join("&");
	text = text.split("replace!ldquo").join("&ldquo;");
	text = text.split("replace!rdquo").join("&rdquo;");
	text = text.split("replace!reg").join("&reg;");
	text = text.split("replace!trade").join("&trade;");
	text = text.split("replace!copy").join("&copy;");
	text = text.split("replace!mdash").join("&#8212;");
	text = text.replace(/\/g, ' ');
	if ($("[spacialcharinalias]").is("input") == true) alert('Detected "/</> in alias, and already transformed. Pls check!');
	text = text.split(' alt="HasNoAltAttribute"').join("");
	text = text.split(' alt=""').join("");
	text = text.split('alt=" ').join('alt="');
	var setTableAttr = new Array(new Array(), new Array());
	setTableAttr[0][0] = 'cellpadding';
	setTableAttr[1][0] = '"0"';
	setTableAttr[0][1] = 'cellspacing';
	setTableAttr[1][1] = '"0"';
	setTableAttr[0][2] = 'border';
	setTableAttr[1][2] = '"0"';
	text = setElementArribute(text, "table", setTableAttr);
	var setTdAttr = new Array(new Array(), new Array());
	setTdAttr[0][0] = 'width';
	setTdAttr[1][0] = 'widthattribute';
	setTdAttr[0][1] = 'height';
	setTdAttr[1][1] = 'height';
	setTdAttr[0][2] = 'align';
	setTdAttr[1][2] = 'align';
	setTdAttr[0][3] = 'valign';
	setTdAttr[1][3] = 'valign';
	setTdAttr[0][4] = 'style';
	setTdAttr[1][4] = 'styleattribute !| style';
	text = setElementArribute(text, "td", setTdAttr);
	var setaAttr = new Array(new Array(), new Array());
	setaAttr[0][0] = 'href';		setaAttr[1][0] = 'href !| "http://replace"';
	setaAttr[0][1] = 'target';		setaAttr[1][1] = '"_blank"';
	setaAttr[0][2] = 'alias';		setaAttr[1][2] = 'alias+"_"+realias!="1" !| alias !| "replace"';
	setaAttr[0][3] = 'conversion';	setaAttr[1][3] = 'conversion';
	setaAttr[0][4] = 'style';		setaAttr[1][4] = 'style=".*?text-decoration.*?"';
	text = setElementArribute(text, "a", setaAttr);
	text = deleteaTagofImg(text, 'addurl="r"', 0);
	text = addOuterTagofImg(text, 'addurl="r"', '<a href="http://replace" target="_blank" alias="replace" conversion="true">', '</a>', 1);
	text = deleteaTagofImg(text, 'addurl="t"', 0);
	text = addOuterTagofImg(text, 'addurl="t"', '<a href="http://TBD" target="_blank" alias="TBD" conversion="true">', '</a>', 1);
	text = deleteaTagofImg(text, 'addurl="n"', 1);
	text = processstyleattribute(text,campaignmod);
	text = text.replace(/<br>/g, '<br />');
	text = text.replace(/style=" /g, 'style="');
	text = text.replace(/“/g, "&ldquo;");
	text = text.replace(/”/g, "&rdquo;");
	text = text.replace(/®/g, "&reg;");
	text = text.replace(/™/g, "&trade;");
	text = text.replace(/©/g, "&copy;");
	text = text.replace(/—/g, "&#8212;");
	text = colortoHex(text);
	output.value = text;
}

function export2() {
	funcofundo();
	inputprocess();
	if ($("[inputnum='']").is("input") == true) alert("One or more alias sequences are missed! Pls check!");
	$("div#a1 textarea").css("width", "60");
	$("div#a1 textarea").css("height", "20");
	if ($("[alertquote]").is("textarea") == true) alert('Detected " in alt, and already replaced with &ldquo; or &rdquo;. Pls check if it is correct!');
	if ($("[alertlgt]").is("textarea") == true) alert('Detected "<" or ">" in alt, and already deleted. Pls check!');
	calculatewidth();
	var text = $("div#a1").children().children().html();
	var setImgAttr = new Array(new Array(), new Array());
	setImgAttr[0][0] = 'src';
	setImgAttr[1][0] = '"images/"+srcattribute';
	setImgAttr[0][1] = 'alt';
	setImgAttr[1][1] = 'altattribute';
	setImgAttr[0][2] = 'width';
	setImgAttr[1][2] = 'width';
	setImgAttr[0][3] = 'height';
	setImgAttr[1][3] = 'height';
	setImgAttr[0][4] = 'border';
	setImgAttr[1][4] = '"0"';
	setImgAttr[0][5] = 'style';
	setImgAttr[1][5] = '"display:block;"';
	setImgAttr[0][6] = 'addurl';
	setImgAttr[1][6] = 'addurl';
	text = setElementArribute(text, "img", setImgAttr);
	text = '<table width="500" cellpadding="0" cellspacing="0" border="0" class="fullwidth">' + text + '</table>';
	text = text.split('</tr><tr stacktable="1">').join('</tr></table><table width="500" cellpadding="0" cellspacing="0" border="0" class="fullwidth"><tr>');
	text = text.replace(/tr>\s+<tr stacktable="1">/g, 'tr></table><table width="500" cellpadding="0" cellspacing="0" border="0" class="fullwidth"><tr>');
	text = text.replace(/<textarea[^>]+><\/textarea>/g, '');
	text = text.split("<tbody>").join("");
	text = text.split('</tbody>').join("");
	text = text.split('<editoraddtable>').join("");
	text = text.split('</editoraddtable>').join("");
	text = text.split("replace!and").join("&");
	text = text.split("replace!ldquo").join("&ldquo;");
	text = text.split("replace!rdquo").join("&rdquo;");
	text = text.split("replace!reg").join("&reg;");
	text = text.split("replace!trade").join("&trade;");
	text = text.split("replace!copy").join("&copy;");
	text = text.split("replace!mdash").join("&#8212;");
	text = text.replace(/\/g, ' ');
	if ($("[spacialcharinalias]").is("input") == true) alert('Detected "/</> in alias, and already transformed. Pls check!');
	var setTableAttr = new Array(new Array(), new Array());
	setTableAttr[0][0] = 'needtodelete';
	setTableAttr[1][0] = 'needtodelete';
	setTableAttr[0][1] = 'width';
	setTableAttr[1][1] = 'widthattribute !| width';
	setTableAttr[0][2] = 'cellpadding';
	setTableAttr[1][2] = '"0"';
	setTableAttr[0][3] = 'cellspacing';
	setTableAttr[1][3] = '"0"';
	setTableAttr[0][4] = 'border';
	setTableAttr[1][4] = '"0"';
	setTableAttr[0][5] = 'class';
	setTableAttr[1][5] = '"fullwidth"';
	text = setElementArribute(text, "table", setTableAttr);
	if ($("div#a1 input").is("input") != true) {
		text = addOuterTagofImg(text, '', '<a href="http://replace" target="_blank" alias="replace" style="color:#000000;">', '</a>');
	} else {
		text = text.replace(/<input/g, '<a');
		text = addOuterTagofImg(text, '', '', '</a>');
	}

	var setTdAttr = new Array(new Array(), new Array());
	setTdAttr[0][0] = 'width';
	setTdAttr[1][0] = 'width=".*?%"';
	setTdAttr[0][1] = 'align';
	setTdAttr[1][1] = 'align !| "left"';
	setTdAttr[0][2] = 'valign';
	setTdAttr[1][2] = 'valign !| "top"';
	setTdAttr[0][3] = 'style';
	setTdAttr[1][3] = 'styleattribute !| "font: 12px Arial, Helvetica, sans-serif; color:#000000; padding:0 0 0 0;"';
	text = setElementArribute(text, "td", setTdAttr);
	var setaAttr = new Array(new Array(), new Array());
	setaAttr[0][0] = 'href';
	setaAttr[1][0] = 'href !| "http://replace"';
	setaAttr[0][1] = 'target';
	setaAttr[1][1] = '"_blank"';
	setaAttr[0][2] = 'alias';
	setaAttr[1][2] = 'alias+"_"+realias!="1" !| alias !| "replace"';
	setaAttr[0][3] = 'style';
	setaAttr[1][3] = 'style=".*?text-decoration.*?" !| "color:#000000;"';
	text = setElementArribute(text, "a", setaAttr);
	text = deleteaTagofImg(text, 'addurl="r"', 0);
	text = addOuterTagofImg(text, 'addurl="r"', '<a href="http://replace" target="_blank" alias="replace" style="color:#000000;">', '</a>', 1);
	text = deleteaTagofImg(text, 'addurl="t"', 0);
	text = addOuterTagofImg(text, 'addurl="t"', '<a href="http://TBD" target="_blank" alias="TBD" style="color:#000000;">', '</a>', 1);
	text = deleteaTagofImg(text, 'addurl="n"', 1);
	text = text.split('</td></tr></table><needtodelete></needtodelete>').join('');
	text = text.replace(/<td( width="\d+%")* align="left" valign="top" style="font: 12px Arial, Helvetica, sans-serif; color:#000000; padding:0 0 0 0;"><table needtodelete="1" width="\d+" cellpadding="0" cellspacing="0" border="0" class="fullwidth"><tr>/g, '');
	text = text.split(' alt="HasNoAltAttribute"').join("");
	text = text.split(' alt=""').join("");
	text = text.split('alt=" ').join('alt="');
	text = text.split(' stacktable="1"').join("");
	if (Samsungversion == 2) {
		text = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f1f1f1" align="center" valign="top">' + text + '</td></tr></table>';
		text = text.replace(/<\/table>\s*<table width="500" cellpadding="0" cellspacing="0" border="0" class="fullwidth">/g, '</table></td></tr></table><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f1f1f1" align="center" valign="top"><table width="500" cellpadding="0" cellspacing="0" border="0" class="fullwidth">');
	}
	text = text.replace(/line-height:\s*0px/g,'line-height:0');
	text = processstyleattribute(text,campaignmod);
	text = text.replace(/<br>/g, '<br />');
	text = text.replace(/style=" /g, 'style="');
	text = text.replace(/“/g, "&ldquo;");
	text = text.replace(/”/g, "&rdquo;");
	text = text.replace(/®/g, "&reg;");
	text = text.replace(/™/g, "&trade;");
	text = text.replace(/©/g, "&copy;");
	text = text.replace(/—/g, "&#8212;");
	text = colortoHex(text);
	output.value = text;
}
/*****************************************
Name: getUndo
Function of undo
*******************************************/
function getUndo() {
	if (undo != "") {
		$("div#a1").html(undo.shift());
		nextseqNum.value = undonsn.shift();
		$("div#a1 td[bgcolor]").attr("bgcolor", "#ffffff");
		for (var as = 0; as < $("div#a1 textarea").length; as++) {
			var altundovalue = $("div#a1 textarea").eq(as).nextAll("img").eq(0).attr("altattribute");
			altundovalue = altundovalue.replace(/replace!ldquo/g, "“");
			altundovalue = altundovalue.replace(/replace!rdquo/g, "”");
			altundovalue = altundovalue.replace(/replace!reg/g, "®");
			altundovalue = altundovalue.replace(/replace!trade/g, "™");
			altundovalue = altundovalue.replace(/replace!copy/g, "©");
			altundovalue = altundovalue.replace(/replace!mdash/g, "—");
			altundovalue = altundovalue.replace(/HasNoAltAttribute/g, "");
			$("div#a1 textarea").eq(as).val(altundovalue);
		}
	}
	showinputnum();
	$("div#a1 textarea").css("width", "60");
	$("div#a1 textarea").css("height", "20");
}
/*****************************************
Name: rebuild
Function of rebuild
*******************************************/
function rebuild() {
	funcofundo();
	if (confirm("Do you want to rebuild the BODY?") == true) {
		$("div#a1").html(initialHTML);
	}
	nextseqNum.value = 1;
}
/*****************************************
Name: addbottomline
Function of addbottomline
*******************************************/
function addbottomline() {
	funcofundo();
	if ($("div#a1").children().children().children().next().is("tr") || ($("div#a1").html() == initialHTML)) {
		$("div#a1").children().children().append('<tr stacktable="1"><td width="500" bgcolor="#ffffff"></td></tr>');
	} else {
		$("div#a1").children().children().html('<tr><td width="500" bgcolor="#ffffff"><table align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="100%" height="100%" style="border-collapse: separate; background-color: ' + bordercolor[campaignmod - 1] + '; border-spacing: 1px;">' + $("div#a1").children().children().html() + '</table></td></tr>' + '<tr stacktable="1"><td width="500" bgcolor="#ffffff"></td></tr>');
	}
}
/*****************************************
Switch the Model of the tool
*******************************************/
function sliceMod() {
	toolMod = 1;
	$("#seqNum").css("display", "none");
	$("#campaignInfo").css("display", "none");
	$("#cws").css("display", "none");
	$("#cwsTd").css("display", "none");
	$("#guideTd1").css("display", "");
	$("#guideTd2").css("display", "none");
	$("#guideTd3").css("display", "none");
	$("#guideTd4").css("display", "none");
	$("#addbottomline").css("display", "");
	//$("#txtarea").css("padding-top","100px");
	var buttonclass = "butmodnav" + campaignmod;
	$("#Mod1").removeClass().addClass(buttonclass);
	$("#Mod2").removeClass().addClass("butgrey");
	$("#Mod3").removeClass().addClass("butgrey");
	$("#Mod4").removeClass().addClass("butgrey");
	$("div#a1 input").hide();
	$("div#a1 textarea").hide();
}

function imgMod() {
	toolMod = 2;
	$("#seqNum").css("display", "");
	$("#campaignInfo").css("display", "");
	$("#cws").css("display", "none");
	$("#cwsTd").css("display", "none");
	$("#guideTd1").css("display", "none");
	$("#guideTd2").css("display", "");
	$("#guideTd3").css("display", "none");
	$("#guideTd4").css("display", "none");
	$("#addbottomline").css("display", "none");
	//$("#txtarea").css("padding-top","0px");
	var buttonclass = "butmodnav" + campaignmod;
	$("#Mod1").removeClass().addClass("butgrey");
	$("#Mod2").removeClass().addClass(buttonclass);
	$("#Mod3").removeClass().addClass("butgrey");
	$("#Mod4").removeClass().addClass("butgrey");
	$("div#a1 input").hide();
	$("div#a1 textarea").hide();
	$("#removelog").click();
}

function aliasMod() {
	toolMod = 3;
	showinputnum();
	$("#seqNum").css("display", "none");
	$("#campaignInfo").css("display", "none");
	$("#cws").css("display", "");
	$("#guideTd1").css("display", "none");
	$("#guideTd2").css("display", "none");
	$("#guideTd3").css("display", "");
	$("#guideTd4").css("display", "none");
	$("#addbottomline").css("display", "none");
	if(cwstdshow) $("#cwsTd").css("display", "");
	//$("#txtarea").css("padding-top","0px");
	var buttonclass = "butmodnav" + campaignmod;
	$("#Mod1").removeClass().addClass("butgrey");
	$("#Mod2").removeClass().addClass("butgrey");
	$("#Mod3").removeClass().addClass(buttonclass);
	$("#Mod4").removeClass().addClass("butgrey");
	$("div#a1 input").show();
	$("div#a1 textarea").hide();
	$("#removelog").click();
}

function altMod() {
	toolMod = 4;
	$("#seqNum").css("display", "none");
	$("#campaignInfo").css("display", "none");
	$("#cws").css("display", "none");
	$("#cwsTd").css("display", "none");
	$("#guideTd1").css("display", "none");
	$("#guideTd2").css("display", "none");
	$("#guideTd3").css("display", "none");
	$("#guideTd4").css("display", "");
	$("#addbottomline").css("display", "none");
	//$("#txtarea").css("padding-top","100px");
	var buttonclass = "butmodnav" + campaignmod;
	$("#Mod1").removeClass().addClass("butgrey");
	$("#Mod2").removeClass().addClass("butgrey");
	$("#Mod3").removeClass().addClass("butgrey");
	$("#Mod4").removeClass().addClass(buttonclass);
	$("div#a1 input").hide();
	$("div#a1 textarea").show();
	startaltmod();
	$("#removelog").click();
}

function startaltmod() {
	if ($("div#a1 textarea").is("textarea") != true) {
		$("div#a1 img").removeAttr("altattribute");
		$("div#a1 img").before('<textarea class="form-control" placeholder="Alt" style="width:60px; height:20px; font-size:13px; background-color:#edfffb; overflow:auto; padding:0px;"></textarea>');
	}
}
/*****************************************
Name: convertcws
Insert the table showing the info pasted from CWS.
*******************************************/
function convertcws() {
	funcofundo();
	if ((cwsdataAlias.value == "") || (cwsdataUrl.value == "")) {
		alert("Please paste data from CWS.");
	} else {
		if ($("div#a1 input").is("input") != true) {
			$("div#a1 img").before('<input class="form-control" type="text" style="width:23px; height:20px; padding:0px;">');
		}
		cws1 = cwsdataAlias.value;
		cws1 = cws1.replace(/\n/g, ",[],,");
		aliasdata = cws1.split(",[],,");
		cws2 = cwsdataUrl.value;
		cws2 = cws2.replace(/\n/g, ",[],,");
		urldata = cws2.split(",[],,");
		cws3 = cwsdataCon.value;
		cws3 = cws3.replace(/\n/g, ",[],,");
		condata = cws3.split(",[],,");
		var showcws = '<table class="table-striped" align="center" bgcolor="' + bordercolor[campaignmod - 1] + '" border="0" cellspacing="1" cellpadding="0" width="160" style="border-collapse:separate; background-color:' + bordercolor[campaignmod - 1] + '; border-spacing:1px;">';
		var numcount;
		numcount = cwsdataCon.value?Math.min(aliasdata.length, urldata.length, condata.length):Math.min(aliasdata.length, urldata.length);
		var urlerror = 0;
		for (var i = 0; i < numcount; i++) {
			aliasdata[i] = aliasdata[i] + 'endofalias!';
			aliasdata[i] = aliasdata[i].replace(/\s*endofalias\!/, '');
			var seqTd = '<td bgcolor="#ffffff" style="font-size:11px; font-weight:bold; color:#0080ff; padding-left:2px; padding-right:2px; line-height:14px;">' + i + '</td>';
			if ((!urldata[i]) && aliasdata[i]) {
				alert("The No." + i + " row misses URL attribute!");
			} else if (urldata[i] && (!aliasdata[i])) {
				alert("The No." + i + " row misses Alias attribute!");
			}
			if (urldata[i].indexOf("_SRCCODE__") != -1) {
				urldata[i] = urldata[i].replace(/_SRCCODE__/g, "%%Source_Code%%");
				urlerror = 1;
			}
			if ((urldata[i].indexOf("not") != -1) && (urldata[i].indexOf("clickable") != -1)) {
				alert("The No." + i + " row shows that it may not be clickable. Pls notice!");
			}
			if (urldata[i].replace(/ /g,'') == "ET") {
				var getthisalias=aliasdata[i];
				if (getthisalias.match(/web/i)&&getthisalias.match(/view/i)) {
					urldata[i]='%%view_email_url%%';
				}else if ((getthisalias.match(/send/i)||getthisalias.match(/forward/i))&&getthisalias.match(/friend/i)) {
					urldata[i]='%%ftaf_url%%';
				}else{
					urldata[i]='http://replace';
				}
				alert('The url in No.' + i + ' row is "ET" and is already replaced by "'+urldata[i]+'".');
			}
			if (urldata[i] || aliasdata[i]) {
				if (campaignmod == 2) {
					var aliasLine = "<tr>" + seqTd + '<td bgcolor="#ffffff" style="font-size:11px; padding-left:2px; padding-right:2px; line-height:14px;"><span style="display:block;" title="Conversion: Null&nbsp;&nbsp;&nbsp;Url: ' + urldata[i] + '" data-toggle="tooltip" data-placement="right" style="display:block;">' + aliasdata[i] + '</span></td></tr>';
				} else if (cwsdataCon.value == "") {
					var aliasLine = "<tr>" + seqTd + '<td bgcolor="#ffffff" style="font-size:11px; padding-left:2px; padding-right:2px; line-height:14px;"><span style="display:block;" title="Conversion: Y&nbsp;&nbsp;&nbsp;Url: ' + urldata[i] + '" data-toggle="tooltip" data-placement="right" style="display:block;">' + aliasdata[i] + '</span></td></tr>';
				} else {
					var conversiondata1;
					if ((condata[i] == "Y") || (condata[i] == "y") || (condata[i] == "yes") || (condata[i] == "YES") || (condata[i] == "Yes")) {
						conversiondata1 = "Y";
					} else {
						conversiondata1 = "N";
					}
					var aliasLine = "<tr>" + seqTd + '<td bgcolor="#ffffff" style="font-size:11px; padding-left:2px; padding-right:2px; line-height:14px;"><span style="display:block;" title="Conversion: ' + conversiondata1 + "&nbsp;&nbsp;&nbsp;Url: " + urldata[i] + '" data-toggle="tooltip" data-placement="right" style="display:block;">' + aliasdata[i] + '</span></td></tr>';
				}
				showcws += aliasLine;
			}
		}
		if (urlerror == 1) {
			alert('Detect "_SRCCODE__" in url and already replaced with %%Source_Code%%!');
			urlerror = 0;
		}
		showcws += '<tr><td bgcolor="#ffffff" style="font-size:11px; font-weight:bold; color:#0080ff; padding-left:2px; padding-right:2px; line-height:14px;">r</td><td bgcolor="#ffffff" style="font-size:11px; padding-left:2px; padding-right:2px; line-height:14px;"><span style="display:block;" title="Conversion: Y&nbsp;&nbsp;&nbsp;Url: http://replace" data-toggle="tooltip" data-placement="right" style="display:block;">replace</span></td></tr><tr><td bgcolor="#ffffff" style="font-size:11px; font-weight:bold; color:#0080ff; padding-left:2px; padding-right:2px; line-height:14px;">t</td><td bgcolor="#ffffff" style="font-size:11px; padding-left:2px; padding-right:2px; line-height:14px;"><span title="Conversion: Y&nbsp;&nbsp;&nbsp;Url: http://TBD" data-toggle="tooltip" data-placement="right" style="display:block;">TBD</span></td></tr>';
		showcws += '</table>';
		$("div#cwsDiv").html(showcws);
		$("#cwsTd").css("display", "");
		$("div#cwsDiv").css("display", "");
		cwstdshow=1;
	}
	$("#cwsDiv span").tooltip({
		container: 'body'
	});
	inputprocess();
}
/*****************************************
Name: resizebody
Function of resizebody
*******************************************/
function resizebody() {
	setbodyheight = bodyheight.value;
	$("div#a1").children("table").attr("height", setbodyheight);
}
/*****************************************
Name: followMod
Turn on/off the follow function of the CWS 
table in alias mod
*******************************************/
function followMod() {
	if (scrollMod == 1) {
		scrollMod = 0;
	} else {
		scrollMod = 1;
		var abc = $("#cwsTd").css("padding-top");
		abc = abc.split("px").join("");
		cwstableh = scrollheight - parseInt(abc);
	}
}
/*****************************************
Pin the part on the right
*******************************************/
window.onscroll = function() {
	var detectheight = parseInt(document.body.scrollHeight);
	if (currentpageheight != detectheight) {
		$(".pinned").pin();
		currentpageheight = detectheight;
	}
}
/*****************************************
Give an alert when close the window
*******************************************/
window.onbeforeunload = function(event) {
	var pageurl = window.location.href;
	if (pageurl.indexOf('http://') != -1) {
		return "Close the page will lose all of the data!";
	}
}
/*****************************************
Store the current state into undo stack
*******************************************/
function funcofundo() {
	undo.unshift($("div#a1").html());
	undonsn.unshift(nextseqNum.value);
}
/*****************************************
Get the intitial info when loaded the tool
*******************************************/
function getinitialHTML() {
	initialHTML = $("div#a1").html();
	initialHTML = initialHTML.split("#fbf1e0").join("#ffffff");
	initialHTML = initialHTML.split("#e1f0fe").join("#ffffff");
}
