// ==UserScript==
// @id             linkstarstats
// @name           IITC plugin: Linkstart Stats
// @category       Layer
// @version        0.1.3.20160702.002
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/Hurqalia/linkstarstats/raw/master/linkstarstats.meta.js
// @downloadURL    https://github.com/Hurqalia/linkstarstats/raw/master/linkstarstats.user.js
// @installURL     https://github.com/Hurqalia/linkstarstats/raw/master/linkstarstats.user.js
// @description    [linkstarstats-2016-07-02-002] LinkstarStats
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// ==/UserScript==

function wrapper(plugin_info) {
	if(typeof window.plugin !== 'function') window.plugin = function() {};
	plugin_info.buildName = 'hurqalia22';
	plugin_info.dateTimeVersion = '20160702.002';
	plugin_info.pluginId = 'linkstarstats';

	// PLUGIN START ////////////////////////////////////////////////////////

	// use own namespace for plugin
	window.plugin.linkstarstats = function() {};
	window.plugin.linkstarstats.datas	= {};
	window.plugin.linkstarstats.isSmart	= undefined;
	window.plugin.linkstarstats.isAndroid	= function() {
		if(typeof android !== 'undefined' && android) {
			return true;
		}
		return false;
	};

	window.plugin.linkstarstats.ICON_TOOLBAR = 'data:image/png;base64,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';
	window.plugin.linkstarstats.dialogBox  = '<div id="linkstarContent"></div>';
	window.plugin.linkstarstats.contentBox = '<div>' +
		'<h2><span class="lks-lighter" id="txt_portal_name">qsdqsdqsdq</span></h2>' +
		'<table id="lks-table"><thead>' +
		'<tr><th></th><th>Count</th><th>Smaller</th><th>Average</th><th>Longer</th></tr>'+
		'</thead><tbody>' +
                '<tr><td class="lks-darker lks-left-row">Outgoing</td><td><span class="lks-darker lks-cell" id="txt_out_count"></span></td><td><span class="lks-darker lks-cell" id="txt_out_small"></span></td><td><span class="lks-darker lks-cell" id="txt_out_avg"></span></td><td><span class="lks-darker lks-cell" id="txt_out_long"></span></td></tr>' +
                '<tr><td class="lks-darker lks-left-row">Incoming</td><td><span class="lks-darker lks-cell" id="txt_in_count"></span></td><td><span class="lks-darker lks-cell" id="txt_in_small"></span></td><td><span class="lks-darker lks-cell" id="txt_in_avg"></span></td><td><span class="lks-darker lks-cell" id="txt_in_long"></span></td></tr>' +
                '<tr><td class="lks-left-row">Total</td><td><span class="lks-cell" id="txt_total_count"></span></td><td><span class="lks-cell" id="txt_total_small"></span></td><td><span class="lks-cell" id="txt_total_avg"></span></td><td><span class="lks-cell" id="txt_total_long"></span></td></tr>' +
                '</tbody></table>' +
                '<span class="lks-lighter">Total links distance : </span><span class="lks-cell" id="txt_total_distance"></span> ' +
		'</div>';

		/*
		'<tr><td>Outgoing</td><td><span class="" id="txt_out_count"></span></td><td><span class="" id="txt_out_small"></span></td><td><span class="" id="txt_out_avg"></span></td><td><span class="" id="txt_out_long"></span></td></tr>' +
		'<tr><td>Incoming</td><td><span class="" id="txt_in_count"></span></td><td><span class="" id="txt_in_small"></span></td><td><span class="" id="txt_in_avg"></span></td><td><span class="" id="txt_in_long"></span></td></tr>' +
		'<tr><td>Total</td><td><span class="" id="txt_total_count"></span></td><td><span class="" id="txt_total_small"></span></td><td><span class="" id="txt_total_avg"></span></td><td><span class="" id="txt_total_long"></span></td></tr>' +
		'</tbody></table>' +
		'</div>';
		*/

	// dialogs
	window.plugin.linkstarstats.onDialog = function() {

		if ($('.ui-dialog-linkstarstats').is(':visible')) {
			return;
		}
		if (!window.plugin.linkstarstats.getLinks()) {
			return;
		}

		dialog({
		    html: window.plugin.linkstarstats.dialogBox,
		    width:'400px',
		    dialogClass:'ui-dialog-linkstarstats',
		    title:'LinkStar Summary',
		    buttons:{
		        'OK' : function() {
		            $(this).dialog('close');
		        }
		    }
		});
		window.plugin.linkstarstats.contentRefresh();
    	};

    	window.plugin.linkstarstats.contentRefresh = function() {

    		var converter = function(linkLength) {
    			linkLength = Math.round(linkLength);
    			linkLength = linkLength < 1000 ? linkLength + ' m' : digits(linkLength/1000) + ' km';
    			return linkLength;
    		};

		var buildlink = function(key, type) {
			if (window.plugin.linkstarstats.datas.details[key][type] === 0 ) {
				return converter(window.plugin.linkstarstats.datas.details[key][type]);
			}

			var label    = converter(window.plugin.linkstarstats.datas.details[key][type]);
			var str_link = "<a title=\"Go to Portal\" onClick=\"window.plugin.linkstarstats.goToPortal('" + window.plugin.linkstarstats.datas.portals[key][type].guid + "', " +
				window.plugin.linkstarstats.datas.portals[key][type].lat + ", " +
				window.plugin.linkstarstats.datas.portals[key][type].lng + ");\">" +
				label + "</a>";
			return str_link;
		};

    		$('#linkstarContent').html(window.plugin.linkstarstats.contentBox);
		$('#txt_portal_name').html(window.portals[selectedPortal].options.data.title);

    		$('#txt_out_count').html(window.plugin.linkstarstats.datas.count.out);
    		$('#txt_in_count').html(window.plugin.linkstarstats.datas.count.in);
    		$('#txt_total_count').html(window.plugin.linkstarstats.datas.count.total);
    		$('#txt_out_small').html(buildlink('out', 'smallest'));
    		$('#txt_in_small').html(buildlink('in', 'smallest'));
    		$('#txt_total_small').html(converter(window.plugin.linkstarstats.datas.total.smallest));
    		$('#txt_out_avg').html(converter(window.plugin.linkstarstats.datas.details.out.average));
    		$('#txt_in_avg').html(converter(window.plugin.linkstarstats.datas.details.in.average));
    		$('#txt_total_avg').html(converter(window.plugin.linkstarstats.datas.total.average));
    		$('#txt_out_long').html(buildlink('out', 'longest'));
    		$('#txt_in_long').html(buildlink('in', 'longest'));
    		$('#txt_total_long').html(converter(window.plugin.linkstarstats.datas.total.longest));
		$('#txt_total_distance').html(converter(window.plugin.linkstarstats.datas.total.distance));
    	};

	// get links datas
	window.plugin.linkstarstats.getLinks = function() {
		if (!selectedPortal) {
			alert('Select a portal');
			return false;	
		}
		var portalLinks = getPortalLinks(selectedPortal);
		
		var countLinks  = { 
			total : portalLinks.in.length + portalLinks.out.length,
			in    : portalLinks.in.length,
			out   : portalLinks.out.length
		};
		if (countLinks.total === 0) {
			alert('No links on this portal');
			return false;
		}


		var summaryLinks    = {};
		var l_smallest        = 6881280;
		var l_longest         = 0;
		var total_distance  = 0;
		var distant_portals = { 'in' : { 'smallest' : '' , 'longest' : '' }, 'out' : { 'smallest' : '', 'longest' : ''} };
		$.each(['in', 'out'], function(ki, ks) {
			var ks_smallest       = 6881280;
			var ks_longest        = 0;
			var ks_total_distance = 0;
			$.each(portalLinks[ks], function(li, lk) {
				var klink    = window.links[lk].options.data;
				var distance = L.latLng(klink.oLatE6/1E6, klink.oLngE6/1E6).distanceTo([klink.dLatE6/1E6, klink.dLngE6/1E6]);
				var dortal   = {};
				if (selectedPortal !== klink.dGuid) {
					dportal = { guid : klink.dGuid, lat : klink.dLatE6/1E6, lng : klink.dLngE6/1E6 };
				} else {
					dportal = { guid : klink.oGuid, lat : klink.oLatE6/1E6, lng : klink.oLngE6/1E6 };
				}

				total_distance    += distance;
				ks_total_distance += distance;

				if (distance < l_smallest) {
					l_smallest = distance;
					distant_portals[ks].smallest = dportal;
				}
				if (distance > l_longest) {
					l_longest = distance;
					distant_portals[ks].longest = dportal;
				}
				if (distance < ks_smallest) {
					ks_smallest = distance;
					distant_portals[ks].smallest  =dportal;
				}
				if (distance > ks_longest) {
					ks_longest = distance;
					distant_portals[ks].longest = dportal;
				}
			});
			summaryLinks[ks] = {
				'smallest' : (countLinks[ks]) ? ks_smallest : 0,
				'longest'  : (countLinks[ks]) ? ks_longest : 0,
				'distance' : (countLinks[ks]) ? ks_total_distance : 0,
				'average'  : (countLinks[ks]) ? (ks_total_distance / countLinks[ks]) : 0
			};
		});

		window.plugin.linkstarstats.datas = {
			'total' : {
				'smallest' : (countLinks.total) ? l_smallest : 0,
				'longest'  : (countLinks.total) ? l_longest : 0,
				'distance' : (countLinks.total) ? total_distance : 0,
				'average'  : (countLinks.total) ? (total_distance / countLinks.total) : 0
			},
			'details' : summaryLinks,
			'count'   : countLinks,
			'portals' : distant_portals
		};

		return true;
	};

	window.plugin.linkstarstats.goToPortal = function(guid, lat, lng) {	
		var position = L.latLng(lat, lng);
		zoomToAndShowPortal(guid, position);
	};

	// init setup
	window.plugin.linkstarstats.setup = function() {
		window.plugin.linkstarstats.isSmart = window.isSmartphone();
		window.plugin.linkstarstats.initCss();
		window.plugin.linkstarstats.initToolbar();
		$('#toolbox').append('<a href="#" onclick="window.plugin.linkstarstats.onDialog();">Linkstar Summ</a>');
	};

	window.plugin.linkstarstats.initCss = function() {
		$('head').append('<style>.lks-pane-ico { background-image: url(' + window.plugin.linkstarstats.ICON_TOOLBAR + '); background-repeat: no-repeat; background-position: 0px;}</style>');
		$('head').append('<style>#lks-table { border-width:1px; border-style:solid;  border-color: 1px solid #13858C; border-collapse:collapse; padding:5px; color:white; font-weight:normal; } .lks-darker { color:#aaa!important; } .lks-lighter { color:#00c5ff; }.lks-left-row { background-color:rgba(8,48,78,.85); font-weight:bold; text-align:left!important; } #lks-table th { background-color:rgba(8,48,78,.85); font-weight:bold; color:#aaa!important; text-align:center!important;} #lks-table th, #lks-table td { border-width:1px; border-style:solid; border-color:#13858C; padding:5px; border-collapse:collapse; text-align:right; } .lks-cell { color:white; }</style>');
		if (window.plugin.linkstarstats.isSmart) {
			$('head').append('<style>.leaflet-lks a { background-color: #fff; border-bottom: 1px solid #ccc; width: 30px; height: 30px; line-height: 30px; text-align: center; text-decoration: none; color: black; display: block; box-shadow: 0 1px 5px rgba(0,0,0,0.65); border-radius: 4px; margin-left:2px;} .leaflet-lks{width:30px;}</style>');
		} else {
			$('head').append('<style>.leaflet-lks a { background-color: #fff; border-bottom: 1px solid #ccc; width: 26px; height: 26px; line-height: 26px; text-align: center; text-decoration: none; color: black; display: block; box-shadow: 0 1px 5px rgba(0,0,0,0.65); border-radius: 4px;} .leaflet-lks{width:26px;}</style>');
		}
	};

	window.plugin.linkstarstats.initToolbar = function() {
		L.Control.lksToolbar = L.Control.extend({
			options: {
				position : 'topleft'
			},
			onAdd: function() {
				var container = L.DomUtil.create('div', 'leaflet-lks');
				this._Button('Open Linkstar Panel', 'lks-pane-ico', 'lks-control-pane',  container, window.plugin.linkstarstats.onDialog);
				return container;
			},
			_Button: function(title, classname, index, container, callback) {
				var link   = L.DomUtil.create('a', 'leaflet-bar-part lks-control-img ' + classname, container);
				link.href  = '#';
				link.title = title;
				link.id    = index;
				L.DomEvent
					.on(link, 'click', L.DomEvent.stopPropagation)
					.on(link, 'click', L.DomEvent.preventDefault)
					.on(link, 'click', callback)
					.on(link, 'dblclick', L.DomEvent.stopPropagation);
				return link;
			}
		});
		L.Map.mergeOptions({
			lksControl: true
		});
		L.Map.addInitHook(function () {
			this.lksControl = new L.Control.lksToolbar();
			this.addControl(this.lksControl);
		});
		L.control.lkscontrol = function () {
			return new L.Control.lksToolbar();
		};
		L.Map.mergeOptions({
			lksControl: false
		});
		map.addControl(L.control.lkscontrol());
	};

	// runrun
	var setup =  window.plugin.linkstarstats.setup;

	setup.info = plugin_info; //add the script info data to the function as a property
	if(!window.bootPlugins) window.bootPlugins = [];
	window.bootPlugins.push(setup);
	// if IITC has already booted, immediately run the 'setup' function
	if(window.iitcLoaded && typeof setup === 'function') {
		setup();
	}

    // PLUGIN END ////////////////////////////////////////////////////////
} // WRAPPER END ////////////////////////////////////////////////////////

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
