# FREE SAP JOBs Search Worldwide, DEMO App using SAPUI5

Free SAP Job Search, using SAPUI5, and consuming the API Management (Service) + NodeJS Cors solution. Just simple DEMO code here for you to use it as "base" on your solution...

PS: I'm using the https://cors-anywhere.herokuapp.com/ API to avoid CORS issues, it's down sometimes so you can uses your own desired solution to solve this.

The API Management service created is: https://p1153320trial-trial.apim1.hanatrial.ondemand.com:443/p1153320trial/sapjobs 

You should put the parameters on the URL, like this: 
https://p1153320trial-trial.apim1.hanatrial.ondemand.com:443/p1153320trial/sapjobs?module={Module}&country={Country}&start={PageStart} 

Modules: SAP Modules, like: ABAP, HANA, SD, HCM, etc.

Country: Use the Alpha-2 code at https://www.iban.com/country-codes, example: for Germany use DE.

PageStart: It brings the last 25 results, and it can be paged at each 25 results (check the service result for more details).

This SAPUI5 code version is running at: https://freesapjobsui5.web.app/

More details here: https://blogs.sap.com/2020/04/28/api-management-as-the-source-for-sap-jobs-search-worldwide-and-some-sapui5-sample/

Regards.
