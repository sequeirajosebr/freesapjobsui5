sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	jQuery.sap.require("sap.m.MessageBox");
	//Just DEMO code here, did not really spend much time here...make it better please ;)
	return Controller.extend("mydemo.com.brzsapjobs.controller.Main", {
		onInit: function() {
			this.mytable	= this.byId("mytable");
			this.mymodule	= this.byId("mymodule");
			this.mycountry	= this.byId("mycountry");
			this._data = {
				Countries: []
			};
			this.jModel = new sap.ui.model.json.JSONModel();
			this.jModel.setSizeLimit(300);
			this.jModel.setData(this._data);
			this.mytable.setModel(this.jModel);
			this.onrefresh();
		},
		stripHtml: function(html) {
			var tmp = document.createElement("DIV");
			tmp.innerHTML = html;
			return tmp.textContent || tmp.innerText || "";
		},
		onrefresh: function() {
			var that = this;
			var rcountry = this.mycountry.getSelectedKey();
			var rmodule	 = this.mymodule.getSelectedKey();
			//the Start variable indicates the list page of JOBs, it's hardcoded 0 here for you to evolve this in order to get
			//"pagged" results :) If you debug it, the service tells you the total jobs and current page results...
			var url = "https://cors-anywhere.herokuapp.com/https://p1153320trial-trial.apim1.hanatrial.ondemand.com/p1153320trial/sapjobs?module="
			+ rmodule + "&country=" + rcountry + "&start=0";
			//In order to work here, i had to use the Cors Anywhere NodeJS Service solution ;)
			//Find more about it here: https://github.com/Rob--W/cors-anywhere/#documentation
			$.ajax({
				url: url,
				dataType: "json",
				contentType: "application/json",
				headers: {
					"X-Requested-With": "XMLHttpRequest"
				},
				beforeSend: function() {
					sap.ui.core.BusyIndicator.show(0);
				},
				success: function(data, textStatus, jqXHR) {
					//Loop in return array to create model...
					for (var i = 0; i < data.results.length; i++) {
						var row = data.results[i];
						var snippet = that.stripHtml(row.snippet);
						that._data.Countries.push({
							jobtitle: row.jobtitle,
							location: row.formattedLocation,
							date: row.date,
							url: row.url,
							company: row.company,
							snippet: snippet,
							latitude: row.latitude,
							longitude: row.longitude
						});
						that.jModel.refresh();
					}
					sap.ui.core.BusyIndicator.hide();
				},
				error: function(error) {
					//Error message...
					sap.m.MessageBox.show(that.getView().getModel("i18n").getResourceBundle().getText("jobError"), {//Just something...
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "NodeJS Service",
						actions: [sap.m.MessageBox.Action.OK]
					});
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		onopenmap: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oObject = oContext.getObject();
			var url = "https://maps.google.com/?q=" + oObject.latitude + "," + oObject.longitude;
			//Open Google Maps...
			window.open(url);
		},
		onrefreshmain: function() {
			this.oncleartable();
			this.onrefresh();
		},
		oncleartable: function() {
			//Rows...
			this._data = {
				Countries: []
			};
			this.jModel.setData(this._data);
			// this.jModel.refresh();
		}
	});
});