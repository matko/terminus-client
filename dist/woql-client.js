'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},UTILS=require('./utils'),CONST=require('./const'),ErrorMessage=require('./errorMessage');function ConnectionCapabilities(a,b){this.connection={},this.connectionConfig=a,this.connectionConfig.server&&b&&this.setClientKey(this.connectionConfig.server,b)}ConnectionCapabilities.prototype.setClientKey=function(a,b){'undefined'==typeof this.connection[a]&&(this.connection[a]={}),b=b.trim(),b&&(this.connection[a].key=b)},ConnectionCapabilities.prototype.addConnection=function(a,b){'undefined'==typeof this.connection[a]&&(this.connection[a]={});var c=b?Object.keys(b):[],d=!0,e=!1,f=void 0;try{for(var g,h,k=c[Symbol.iterator]();!(d=(g=k.next()).done);d=!0)if(h=g.value,'terminus:authority'===h&&b[h])for(var l=!0===Array.isArray(b[h])?b[h]:[b[h]],m=0;m<l.length;m+=1){var n=l[m]['terminus:authority_scope'],o=l[m]['terminus:action'];!1===Array.isArray(n)&&(n=[n]);for(var p,q=UTILS.authorityActionsToArr(o),r=0;r<n.length;r+=1)p=n[r],'undefined'==typeof this.connection[a][p['@id']]&&(this.connection[a][p['@id']]=p),this.connection[a][p['@id']]['terminus:authority']=q}else this.connection[a][h]=b[h]}catch(a){e=!0,f=a}finally{try{!d&&k.return&&k.return()}finally{if(e)throw f}}},ConnectionCapabilities.prototype.serverConnected=function(){return'undefined'!=typeof this.connection[this.connectionConfig.server]},ConnectionCapabilities.prototype.capabilitiesPermit=function(a,b,c){if(!this.connectionConfig.connectionMode()||!0!==this.connectionConfig.client_checks_capabilities||a===CONST.CONNECT)return!0;c=c||this.connectionConfig.server,b=b||this.connectionConfig.dbid;var d;if(d=a===CONST.CREATE_DATABASE?this.getServerRecord(c):this.getDBRecord(b),d){var e=d['terminus:authority'];if(e&&-1!==e.indexOf('terminus:'+a))return!0}else console.error('problem with ',a,c,b);return this.error=ErrorMessage.accessDenied(a,b,c),!1},ConnectionCapabilities.prototype.getServerRecord=function(a){var b=a||this.connectionConfig.server,c=this.connection[b]||{},d=!0,e=!1,f=void 0;try{for(var g,h,i=Object.keys(c)[Symbol.iterator]();!(d=(g=i.next()).done);d=!0)if(h=g.value,'terminus:Server'===this.connection[b][h]['@type'])return this.connection[b][h]}catch(a){e=!0,f=a}finally{try{!d&&i.return&&i.return()}finally{if(e)throw f}}return!1},ConnectionCapabilities.prototype.getDBRecord=function(a,b){var c=b||this.connectionConfig.server;return(a=a||this.connectionConfig.dbid,'object'===_typeof(this.connection[c]))&&('undefined'==typeof this.connection[c][a]?(a=this.dbCapabilityID(a),'undefined'==typeof this.connection[c][a]?void 0:this.connection[c][a]):this.connection[c][a])},ConnectionCapabilities.prototype.getServerDBRecords=function(a){var b=a||this.connectionConfig.server,c={},d=this.connection[b]||{},e=!0,f=!1,g=void 0;try{for(var h,i,j=Object.keys(d)[Symbol.iterator]();!(e=(h=j.next()).done);e=!0)i=h.value,'terminus:Database'===this.connection[b][i]['@type']&&(c[i]=this.connection[b][i])}catch(a){f=!0,g=a}finally{try{!e&&j.return&&j.return()}finally{if(f)throw g}}return c},ConnectionCapabilities.prototype.removeDB=function(a,b){a&&this.connectionConfig.dbid&&this.connectionConfig.dbid===a&&(this.connectionConfig.dbid=!1),a=a||this.connectionConfig.dbid;var c=b||this.connectionConfig.server;a=this.dbCapabilityID(a),delete this.connection[c][a]},ConnectionCapabilities.prototype.dbCapabilityID=function(a){return'doc:'+a},ConnectionCapabilities.prototype.getDBRecord=function(a,b){var c=b||this.connectionConfig.server;return(a=a||this.connectionConfig.dbid,'object'===_typeof(this.connection[c]))&&('undefined'==typeof this.connection[c][a]?(a=this.dbCapabilityID(a),'undefined'==typeof this.connection[c][a]?void 0:this.connection[c][a]):this.connection[c][a])},module.exports=ConnectionCapabilities;
'use strict';var TerminusIDParser=require('./terminusIDParser');function ConnectionConfig(a){var b=a||{};this.server=b.server||!1,this.dbid=b.db||!1,this.docid=b.document||!1,this.connected_mode=b.connected_mode||'connected',this.include_key=b.include_key||!0,this.client_checks_capabilities=b.client_checks_capabilities||!0}ConnectionConfig.prototype.serverURL=function(){return this.server},ConnectionConfig.prototype.connectionMode=function(){return'connected'===this.connected_mode},ConnectionConfig.prototype.includeKey=function(){return!0===this.include_key},ConnectionConfig.prototype.schemaURL=function(){return this.dbURL()+'/schema'},ConnectionConfig.prototype.queryURL=function(){return this.dbURL()+'/woql'},ConnectionConfig.prototype.frameURL=function(){return this.dbURL()+'/frame'},ConnectionConfig.prototype.docURL=function(){return this.dbURL()+'/document/'+(this.docid?this.docid:'')},ConnectionConfig.prototype.dbURL=function(a){return this.platformEndpoint()&&(!a||'create'!==a)?this.server.substring(0,this.server.lastIndexOf('/platform/'))+'/'+this.dbid+'/platform':this.platformEndpoint()&&'platform'===a?this.server.substring(0,this.server.lastIndexOf('/platform/'))+'/'+this.dbid:this.server+this.dbid},ConnectionConfig.prototype.platformEndpoint=function(){return!(this.server.lastIndexOf('/platform/')!==this.server.length-10)},ConnectionConfig.prototype.setServer=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseServerURL()&&(this.server=c.server(),!0)},ConnectionConfig.prototype.setDB=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseDBID()&&(c.server()&&(this.server=c.server()),this.dbid=c.dbid(),!0)},ConnectionConfig.prototype.setSchemaURL=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseSchemaURL()&&(c.server()&&(this.server=c.server()),this.dbid=c.dbid(),this.docid=!1,!0)},ConnectionConfig.prototype.setDocument=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseDocumentURL()&&(c.server()&&(this.server=c.server()),c.dbid()&&(this.dbid=c.dbid()),c.docid()&&(this.docid=c.docid()),!0)},ConnectionConfig.prototype.setQueryURL=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseQueryURL()&&(c.server()&&(this.server=c.server()),this.dbid=c.dbid(),this.docid=!1,!0)},ConnectionConfig.prototype.setClassFrameURL=function(a,b){var c=new TerminusIDParser(a,b);return!!c.parseClassFrameURL()&&(c.server()&&(this.server=c.server()),this.dbid=c.dbid(),this.docid=!1,!0)},module.exports=ConnectionConfig;
'use strict';module.exports=Object.freeze({CONNECT:'connect',GET_SCHEMA:'get_schema',CLASS_FRAME:'class_frame',WOQL_SELECT:'woql_select',GET_DOCUMENT:'get_document',DELETE_DATABASE:'delete_database',DELETE_DOCUMENT:'delete_document',CREATE_DATABASE:'create_database',WOQL_UPDATE:'woql_update'});
'use strict';var axios=require('axios'),CONST=require('./const.js'),ErrorMessage=require('./errorMessage');function getOptionsByAction(a,b,c){var d='get';switch(console.log('ACTIONACTION',b),b){case CONST.CONNECT:case CONST.GET_SCHEMA:case CONST.CLASS_FRAME:case CONST.WOQL_SELECT:case CONST.GET_DOCUMENT:c&&(a.params=c);break;case CONST.DELETE_DATABASE:case CONST.DELETE_DOCUMENT:d='delete';break;case CONST.CREATE_DATABASE:case CONST.UPDATE_SCHEMA:case CONST.CREATE_DOCUMENT:case CONST.UPDATE_DOCUMENT:case CONST.WOQL_UPDATE:d='post',a.headers={"Content-Type":'application/json'},a.data=JSON.stringify(c);break;default:return'get';}return d}function DispatchRequest(a,b,c){var d={mode:'cors',redirect:'follow',referrer:'client'},e=getOptionsByAction(d,b,c)||'get';return axios[e](a,d).then(function(a){return a.data}).catch(function(b){console.log(b),Promise.reject(new Error(ErrorMessage.getAPIErrorMessage(a,d)))})}module.exports=DispatchRequest;
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function getErrorAsMessage(a,b,c){var d='Code: '+c.status;return c.body&&(d+=', Message: '+c.body),c.action&&(d+=', Action: '+c.action),c.type&&(d+=', Type: '+c.type),a&&(d+=', url: '+a),b&&b.method&&(d+=', method: '+b.method),d}function accessDenied(a,b,c){var d={};return d.status=403,d.url=(c||'')+(b||''),d.type='client',d.action=a,d.body=d.action+' not permitted for '+d.url,d}function getAPIErrorMessage(a,b,c){return'API Error '+getErrorAsMessage(a,b,c)}function getAccessDeniedMessage(a,b,c){return'Access Denied '+getErrorAsMessage(a,b,c)}function getInvalidURIMessage(a,b){return'Invalid argument to\n            '+b+'. \n            '+a+'\n            is not a valid Terminus DB API endpoint'}function parseAPIError(a){var b={status:a.status,type:a.type};if(a.data&&'object'===_typeof(a.data)){var c;try{c=a.text()}catch(b){try{c=a.json()}catch(b){c=a.toString()}}b.body=c}else a.data&&(b.body=a.data);return b.url=a.url,b.headers=a.headers,b.redirected=a.redirected,b}module.exports={getErrorAsMessage:getErrorAsMessage,getAPIErrorMessage:getAPIErrorMessage,getAccessDeniedMessage:getAccessDeniedMessage,accessDenied:accessDenied,getInvalidURIMessage:getInvalidURIMessage,parseAPIError:parseAPIError};
'use strict';function TerminusIDParser(a,b){this.contents=a.trim(),this.context=b,this.server_url=!1,this.db=!1,this.doc=!1}TerminusIDParser.prototype.server=function(){return this.server_url},TerminusIDParser.prototype.dbid=function(){return this.db},TerminusIDParser.prototype.docid=function(){return this.doc},TerminusIDParser.prototype.parseServerURL=function(a){return a=a||this.contents,this.validURL(a)?this.server_url=a:this.context&&this.validPrefixedURL(a,context)&&(this.server_url=this.expandPrefixed(a,context)),this.server_url&&this.server_url.lastIndexOf('/')!==this.server_url.length-1&&(this.server_url+='/'),this.server_url},TerminusIDParser.prototype.parseDBID=function(a){if(a=a||this.contents,this.context&&this.validPrefixedURL(a,context)&&(a=this.expandPrefixed(a,context)),this.validURL(a)){a.lastIndexOf('/')===a.length-1&&(a=a.substring(0,a.length-1));var b=a.substring(0,a.lastIndexOf('/')),c=a.substring(a.lastIndexOf('/')+1);this.parseServerURL(b)&&(this.db=c)}else this.validIDString(a)&&(this.db=a);return this.db},TerminusIDParser.prototype.parseDocumentURL=function(a){return a=a||this.contents,this.context&&this.validPrefixedURL(a,context)&&(a=this.expandPrefixed(a,context)),this.validURL(a)?(-1!==a.lastIndexOf('/document/')&&(this.doc=a.substring(a.lastIndexOf('/document/')+11),a=a.substring(0,a.lastIndexOf('/document/'))),this.parseDBID(a)):!!this.validIDString(a)&&(this.doc=a,!0)},TerminusIDParser.prototype.parseSchemaURL=function(a){return a=a||this.contents,this.context&&this.validPrefixedURL(a,context)&&(a=this.expandPrefixed(a,context)),this.validURL(a)&&(a=this.stripOptionalPath(a,'schema')),this.parseDBID(a)},TerminusIDParser.prototype.parseQueryURL=function(a){return a=a||this.contents,this.context&&this.validPrefixedURL(a,context)&&(a=this.expandPrefixed(a,context)),this.validURL(a)&&(a=this.stripOptionalPath(a,'woql'),a=this.stripOptionalPath(a,'query')),this.parseDBID(a)},TerminusIDParser.prototype.stripOptionalPath=function(a,b){return-1!==a.indexOf('/'+b)&&(a=a.substring(0,a.indexOf('/'+b))),a},TerminusIDParser.prototype.parseClassFrameURL=function(a){return a=a||this.contents,this.context&&this.validPrefixedURL(a,context)&&(a=this.expandPrefixed(a,context)),this.validURL(a)&&(a=this.stripOptionalPath(a,'schema')),this.parseDBID(a)},TerminusIDParser.prototype.validURL=function(a){var b=/^(https?:\/\/)?localhost|((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;return b.test(a)},TerminusIDParser.prototype.validPrefixedURL=function(a,b){var c=a.split(':');return!(2!==c.length)&&!(1>c[0].length||1>c[1].length)&&!!(b&&b[c[0]]&&this.validIDString(c[1]))},TerminusIDParser.prototype.validIDString=function(a){return-1===a.indexOf(' ')&&-1===a.indexOf('/')},TerminusIDParser.prototype.expandPrefixed=function(a,b){var c=a.split(':');return b[c[0]]+c[1]},module.exports=TerminusIDParser;
'use strict';function authorityActionsToArr(a){return!1===Array.isArray(a)?[]:a.map(function(a){return a['@id']})}module.exports={authorityActionsToArr:authorityActionsToArr};
'use strict';var CONST=require('./const'),DispatchRequest=require('./dispatchRequest'),ErrorMessage=require('./errorMessage'),ConnectionCapabilities=require('./connectionCapabilities'),ConnectionConfig=require('./connectionConfig');function WOQLClient(a){var b=a?a.key:void 0;this.connectionConfig=new ConnectionConfig(a),this.connection=new ConnectionCapabilities(this.connectionConfig,b)}WOQLClient.prototype.connect=function(a,b){if(a&&!this.connectionConfig.setServer(a))return Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,CONST.CONNECT)));var c=this.connectionConfig.serverURL();b&&this.connection.setClientKey(c,b);var d=this;return this.dispatch(c,CONST.CONNECT).then(function(a){return d.connection.addConnection(c,a),a})},WOQLClient.prototype.createDatabase=function(a,b,c){if(console.log('SONO IN CREATE_DATABASE'),a&&!this.connectionConfig.setDB(a))return Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Create Database')));if(b&&b['@id']&&!this.connectionConfig.setDB(b['@id'],b['@context']))return Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(b['@id'],'Create Database')));b=this.makeDocumentConsistentWithURL(b,this.connectionConfig.dbURL());var d={};c&&(d.key=c);var e=this.addOptionsToDocument(b,d);return this.dispatch(this.connectionConfig.dbURL('create'),CONST.CREATE_DATABASE,e)},WOQLClient.prototype.deleteDatabase=function(a,b){if(a&&!this.connectionConfig.setDB(a))return Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Delete Database')));var c=this;return this.dispatch(this.connectionConfig.dbURL()+'/',CONST.DELETE_DATABASE,b).then(function(a){return c.connection.removeDB(),a})},WOQLClient.prototype.getSchema=function(a,b){return a&&this.connectionConfig.setSchemaURL(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Get Schema'))):this.dispatch(this.connectionConfig.schemaURL(),CONST.GET_SCHEMA,b)},WOQLClient.prototype.updateSchema=function(a,b,c){return a&&this.connectionConfig.setSchemaURL(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Update Schema'))):(b=this.addOptionsToDocument(b,c),this.dispatch(this.connectionConfig.schemaURL(),'update_schema',b))},WOQLClient.prototype.createDocument=function(a,b,c){return a&&!this.connectionConfig.setDocument(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Create Document'))):b&&b['@id']&&!this.connectionConfig.setDocument(b['@id'],b['@context'])?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(b['@id'],'Create Document'))):(b=this.addOptionsToDocument(this.makeDocumentConsistentWithURL(a,b),c),this.dispatch(this.docURL(),'create_document',b))},WOQLClient.prototype.getDocument=function(a,b){return!a||this.connectionConfig.setDocument(a)&&this.connectionConfig.docid?this.dispatch(this.docURL(),'get_document',b):Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Get Document')))},WOQLClient.prototype.updateDocument=function(a,b,c){return a&&!this.connectionConfig.setDocument(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Update Document'))):b&&b['@id']&&!this.connectionConfig.setDocument(b['@id'],b['@context'])?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(b['@id'],'Update Document'))):(b=this.addOptionsToDocument(this.makeDocumentConsistentWithURL(a,b),c),this.dispatch(this.docURL(),'update_document',b))},WOQLClient.prototype.deleteDocument=function(a,b){return!a||this.connectionConfig.setDocument(a)&&this.connectionConfig.docid?this.dispatch(this.docURL(),'delete_document',b):Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Delete Document')))},WOQLClient.prototype.select=function(a,b,c){if(a&&this.setQueryURL(a))return Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Select')));var d={query:b};return d=this.addOptionsToWOQL(d,c),this.dispatch(this.queryURL(),'woql_select',d)},WOQLClient.prototype.update=function(a,b,c){return a&&this.setQueryURL(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Update'))):(b=this.addOptionsToWOQL(b,c),this.dispatch(this.queryURL(),'woql_update',b))},WOQLClient.prototype.getClassFrame=function(a,b,c){return a&&this.setClassFrameURL(a)?Promise.reject(new URIError(ErrorMessage.getInvalidURIMessage(a,'Get Class Frame'))):(c||(c={}),c.class=b,this.dispatch(this.frameURL(),'class_frame',c))},WOQLClient.prototype.addOptionsToWOQL=function(a,b){return b&&b.key&&(a.key=b.key),a},WOQLClient.prototype.addOptionsToDocument=function(a,b){var c={"terminus:document":a};return c['@context']=a['@context'],delete c['terminus:document']['@context'],c['@type']='terminus:APIUpdate',b&&b.key&&(c.key=b.key),c},WOQLClient.prototype.addKeyToPayload=function(a){return a&&a.key?(a['terminus:user_key']=a.key,delete a.key):this.connection[this.server]&&this.connection[this.server].key&&(!a&&(a={}),a['terminus:user_key']=this.connection[this.server].key),a},WOQLClient.prototype.makeDocumentConsistentWithURL=function(a,b){return a['@id']=b,a},WOQLClient.prototype.dispatch=function(a,b,c){if(console.log('SONO IN DISPATCH'),b!==CONST.CONNECT&&this.connectionConfig.connectionMode()&&!this.connection.serverConnected(this.server)){console.log('CONNECT CALL AGAIN');var d=!!(c&&c.key)&&c.key,e=this;return this.connect(this.server,d).then(function(f){return d&&delete c.key,e.dispatch(a,b,c),f})}return this.connection.capabilitiesPermit(b)?(this.connectionConfig.includeKey()&&(c=this.addKeyToPayload(c)),new DispatchRequest(a,b,c)):Promise.reject(new Error(ErrorMessage.getAccessDeniedMessage(a,b,this.error)))},module.exports=WOQLClient;

//# sourceMappingURL=woql-client.js.map