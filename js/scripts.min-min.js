!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),o[this.key]=this,e+=1}var e=0,o={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete o[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in o)e.push(o[n]);for(var i=0,r=e.length;r>i;i++)e[i][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in o)o[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=i.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+o,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,o+=1,i.windowContext||(i.windowContext=!0,i.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var o=0,n={},i=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),o=this.element==this.element.window;t&&e&&!o&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,i.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||i.isTouch)&&(e.didScroll=!0,i.requestAnimationFrame(t))})},e.prototype.handleResize=function(){i.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var o in e){var n=e[o],i=n.newScroll>n.oldScroll,r=i?n.forward:n.backward;for(var a in this.waypoints[o]){var s=this.waypoints[o][a];if(null!==s.triggerPoint){var l=n.oldScroll<s.triggerPoint,c=n.newScroll>=s.triggerPoint,p=l&&c,u=!l&&!c;(p||u)&&(s.queueTrigger(r),t[s.group.id]=s.group)}}}for(var h in t)t[h].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var o in this.waypoints[e])t.push(this.waypoints[e][o]);for(var n=0,i=t.length;i>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,o=e?void 0:this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:o.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:o.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var a=t[r];for(var s in this.waypoints[r]){var l,c,p,u,h,d=this.waypoints[r][s],f=d.options.offset,y=d.triggerPoint,g=0,b=null==y;d.element!==d.element.window&&(g=d.adapter.offset()[a.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(a.contextDimension*f/100))),l=a.contextScroll-a.contextOffset,d.triggerPoint=Math.floor(g+l-f),c=y<a.oldScroll,p=d.triggerPoint>=a.oldScroll,u=c&&p,h=!c&&!p,!b&&u?(d.queueTrigger(a.backward),n[d.group.id]=d.group):!b&&h?(d.queueTrigger(a.forward),n[d.group.id]=d.group):b&&a.oldScroll>=d.triggerPoint&&(d.queueTrigger(a.forward),n[d.group.id]=d.group)}}return i.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},i.requestAnimationFrame=function(e){var o=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;o.call(window,e)},i.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function o(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},i=window.Waypoint;o.prototype.add=function(t){this.waypoints.push(t)},o.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},o.prototype.flushTriggers=function(){for(var o in this.triggerQueues){var n=this.triggerQueues[o],i="up"===o||"left"===o;n.sort(i?e:t);for(var r=0,a=n.length;a>r;r+=1){var s=n[r];(s.options.continuous||r===n.length-1)&&s.trigger([o])}}this.clearTriggerQueues()},o.prototype.next=function(e){this.waypoints.sort(t);var o=i.Adapter.inArray(e,this.waypoints),n=o===this.waypoints.length-1;return n?null:this.waypoints[o+1]},o.prototype.previous=function(e){this.waypoints.sort(t);var o=i.Adapter.inArray(e,this.waypoints);return o?this.waypoints[o-1]:null},o.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},o.prototype.remove=function(t){var e=i.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},o.prototype.first=function(){return this.waypoints[0]},o.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},o.findOrCreate=function(t){return n[t.axis][t.name]||new o(t)},i.Group=o}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,o=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,o){t.prototype[o]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[o].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(o,n){t[n]=e[n]}),o.adapters.push({name:"jquery",Adapter:t}),o.Adapter=t}(),function(){"use strict";function t(t){return function(){var o=[],n=arguments[0];return t.isFunction(arguments[0])&&(n=t.extend({},arguments[1]),n.handler=arguments[0]),this.each(function(){var i=t.extend({},n,{element:this});"string"==typeof i.context&&(i.context=t(this).closest(i.context)[0]),o.push(new e(i))}),o}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}(),!function(t){t.fn.formValidation=function(){return this.each(function(){function e(t){f.html(t).slideDown(300)}function o(){f.slideUp(300)}function n(t,o){t.focus().addClass("error"),e(o)}function i(){d.removeClass("error")}function r(){d.val("")}function a(t){var e=/^[\w\.-]+@[\w\.-]+\.\w+$/;return e.test(t)}function s(){var o=l.serialize();t.post(y,o,function(t){1==t?(e("Thanks "+c.val()+", your message has been sent"),r()):e("Sorry "+c.val()+", there was a problem sending your message")})}var l=t(this),c=l.find("#name"),p=l.find("#email"),u=l.find("#message"),h=l.find("#spam"),d=l.find("input, textarea"),f=l.find(".status"),y=l.attr("action");l.submit(function(t){t.preventDefault(),i(),""===c.val()?n(c,"Please enter your name"):a(p.val())?""===u.val()?n(u,"Please enter your message"):""!==h.val()?n(u,"Spam Attack"):(e("Email being sent..."),s()):n(p,"Please enter a valid email")}),l.on("reset",function(){i(),o()})})}}(jQuery);var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var t=Math.PI/180,e=180/Math.PI,o=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,n=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,i=/[achlmqstvz]/gi,r=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,a=_gsScope._gsDefine.globals.TweenLite,s=function(t){window.console&&console.log(t)},l=function(e,o){var n,i,r,a,s,l,c=Math.ceil(Math.abs(o)/90),p=0,u=[];for(e*=t,o*=t,n=o/c,i=4/3*Math.sin(n/2)/(1+Math.cos(n/2)),l=0;c>l;l++)r=e+l*n,a=Math.cos(r),s=Math.sin(r),u[p++]=a-i*s,u[p++]=s+i*a,r+=n,a=Math.cos(r),s=Math.sin(r),u[p++]=a+i*s,u[p++]=s-i*a,u[p++]=a,u[p++]=s;return u},c=function(o,n,i,r,a,s,c,p,u){if(o!==p||n!==u){i=Math.abs(i),r=Math.abs(r);var h=a%360*t,d=Math.cos(h),f=Math.sin(h),y=(o-p)/2,g=(n-u)/2,b=d*y+f*g,w=-f*y+d*g,v=i*i,m=r*r,x=b*b,S=w*w,A=x/v+S/m;A>1&&(i=Math.sqrt(A)*i,r=Math.sqrt(A)*r,v=i*i,m=r*r);var $=s===c?-1:1,M=(v*m-v*S-m*x)/(v*S+m*x);0>M&&(M=0);var T=$*Math.sqrt(M),k=T*(i*w/r),z=T*-(r*b/i),P=(o+p)/2,C=(n+u)/2,N=P+(d*k-f*z),q=C+(f*k+d*z),B=(b-k)/i,E=(w-z)/r,j=(-b-k)/i,D=(-w-z)/r,O=Math.sqrt(B*B+E*E),H=B;$=0>E?-1:1;var _=$*Math.acos(H/O)*e;O=Math.sqrt((B*B+E*E)*(j*j+D*D)),H=B*j+E*D,$=0>B*D-E*j?-1:1;var W=$*Math.acos(H/O)*e;!c&&W>0?W-=360:c&&0>W&&(W+=360),W%=360,_%=360;var G,R,F,Q=l(_,W),I=d*i,L=f*i,V=f*-r,Y=d*r,X=Q.length-2;for(G=0;X>G;G+=2)R=Q[G],F=Q[G+1],Q[G]=R*I+F*V+N,Q[G+1]=R*L+F*Y+q;return Q[Q.length-2]=p,Q[Q.length-1]=u,Q}},p=function(t){var e,n,i,a,l,p,u,h,d,f,y,g,b,w=(t+"").replace(r,function(t){var e=+t;return 1e-4>e&&e>-1e-4?0:e}).match(o)||[],v=[],m=0,x=0,S=w.length,A=2,$=0;if(!t||!isNaN(w[0])||isNaN(w[1]))return s("ERROR: malformed path data: "+t),v;for(e=0;S>e;e++)if(b=l,isNaN(w[e])?(l=w[e].toUpperCase(),p=l!==w[e]):e--,i=+w[e+1],a=+w[e+2],p&&(i+=m,a+=x),0===e&&(h=i,d=a),"M"===l)u&&u.length<8&&(v.length-=1,A=0),m=h=i,x=d=a,u=[i,a],$+=A,A=2,v.push(u),e+=2,l="L";else if("C"===l)u||(u=[0,0]),u[A++]=i,u[A++]=a,p||(m=x=0),u[A++]=m+1*w[e+3],u[A++]=x+1*w[e+4],u[A++]=m+=1*w[e+5],u[A++]=x+=1*w[e+6],e+=6;else if("S"===l)"C"===b||"S"===b?(f=m-u[A-4],y=x-u[A-3],u[A++]=m+f,u[A++]=x+y):(u[A++]=m,u[A++]=x),u[A++]=i,u[A++]=a,p||(m=x=0),u[A++]=m+=1*w[e+3],u[A++]=x+=1*w[e+4],e+=4;else if("Q"===l)f=i-m,y=a-x,u[A++]=m+2*f/3,u[A++]=x+2*y/3,p||(m=x=0),m+=1*w[e+3],x+=1*w[e+4],f=i-m,y=a-x,u[A++]=m+2*f/3,u[A++]=x+2*y/3,u[A++]=m,u[A++]=x,e+=4;else if("T"===l)f=m-u[A-4],y=x-u[A-3],u[A++]=m+f,u[A++]=x+y,f=m+1.5*f-i,y=x+1.5*y-a,u[A++]=i+2*f/3,u[A++]=a+2*y/3,u[A++]=m=i,u[A++]=x=a,e+=2;else if("H"===l)a=x,u[A++]=m+(i-m)/3,u[A++]=x+(a-x)/3,u[A++]=m+2*(i-m)/3,u[A++]=x+2*(a-x)/3,u[A++]=m=i,u[A++]=a,e+=1;else if("V"===l)a=i,i=m,p&&(a+=x-m),u[A++]=i,u[A++]=x+(a-x)/3,u[A++]=i,u[A++]=x+2*(a-x)/3,u[A++]=i,u[A++]=x=a,e+=1;else if("L"===l||"Z"===l)"Z"===l&&(i=h,a=d,u.closed=!0),("L"===l||Math.abs(m-i)>.5||Math.abs(x-a)>.5)&&(u[A++]=m+(i-m)/3,u[A++]=x+(a-x)/3,u[A++]=m+2*(i-m)/3,u[A++]=x+2*(a-x)/3,u[A++]=i,u[A++]=a,"L"===l&&(e+=2)),m=i,x=a;else if("A"===l){for(g=c(m,x,1*w[e+1],1*w[e+2],1*w[e+3],1*w[e+4],1*w[e+5],(p?m:0)+1*w[e+6],(p?x:0)+1*w[e+7]),n=0;n<g.length;n++)u[A++]=g[n];m=u[A-2],x=u[A-1],e+=7}else s("Error: malformed path data: "+t);return v.totalPoints=$+A,v},u=function(t,e){var o,n,i,r,a,s,l,c,p,u,h,d,f,y,g=0,b=.999999,w=t.length,v=e/((w-2)/6);for(f=2;w>f;f+=6)for(g+=v;g>b;)o=t[f-2],n=t[f-1],i=t[f],r=t[f+1],a=t[f+2],s=t[f+3],l=t[f+4],c=t[f+5],y=1/(Math.floor(g)+1),p=o+(i-o)*y,h=i+(a-i)*y,p+=(h-p)*y,h+=(a+(l-a)*y-h)*y,u=n+(r-n)*y,d=r+(s-r)*y,u+=(d-u)*y,d+=(s+(c-s)*y-d)*y,t.splice(f,4,o+(i-o)*y,n+(r-n)*y,p,u,p+(h-p)*y,u+(d-u)*y,h,d,a+(l-a)*y,s+(c-s)*y),f+=6,w+=6,g--;return t},h=function(t){var e,o,n,i,r="",a=t.length,s=100;for(o=0;a>o;o++){for(i=t[o],r+="M"+i[0]+","+i[1]+" C",e=i.length,n=2;e>n;n++)r+=(i[n++]*s|0)/s+","+(i[n++]*s|0)/s+" "+(i[n++]*s|0)/s+","+(i[n++]*s|0)/s+" "+(i[n++]*s|0)/s+","+(i[n]*s|0)/s+" ";i.closed&&(r+="z")}return r},d=function(t){for(var e=[],o=t.length-1,n=0;--o>-1;)e[n++]=t[o],e[n++]=t[o+1],o--;for(o=0;n>o;o++)t[o]=e[o];t.reversed=!t.reversed},f=function(t){var e,o=t.length,n=0,i=0;for(e=0;o>e;e++)n+=t[e++],i+=t[e];return[n/(o/2),i/(o/2)]},y=function(t){var e,o,n,i=t.length,r=t[0],a=r,s=t[1],l=s;for(n=6;i>n;n+=6)e=t[n],o=t[n+1],e>r?r=e:a>e&&(a=e),o>s?s=o:l>o&&(l=o);return t.centerX=(r+a)/2,t.centerY=(s+l)/2,t.size=(r-a)*(s-l)},g=function(t){for(var e,o,n,i,r,a=t.length,s=t[0][0],l=s,c=t[0][1],p=c;--a>-1;)for(r=t[a],e=r.length,i=6;e>i;i+=6)o=r[i],n=r[i+1],o>s?s=o:l>o&&(l=o),n>c?c=n:p>n&&(p=n);return t.centerX=(s+l)/2,t.centerY=(c+p)/2,t.size=(s-l)*(c-p)},b=function(t,e){return e.length-t.length},w=function(t,e){var o=t.size||y(t),n=e.size||y(e);return Math.abs(n-o)<(o+n)/20?e.centerX-t.centerX||e.centerY-t.centerY:n-o},v=function(t,e){var o,n,i=t.slice(0),r=t.length,a=r-2;for(e|=0,o=0;r>o;o++)n=(o+e)%a,t[o++]=i[n],t[o]=i[n+1]},m=function(t,e,o,n,i){var r,a,s,l,c=t.length,p=0,u=c-2;for(o*=6,a=0;c>a;a+=6)r=(a+o)%u,l=t[r]-(e[a]-n),s=t[r+1]-(e[a+1]-i),p+=Math.sqrt(s*s+l*l);return p},x=function(t,e,o){var n,i,r,a=t.length,s=f(t),l=f(e),c=l[0]-s[0],p=l[1]-s[1],u=m(t,e,0,c,p),h=0;for(r=6;a>r;r+=6)i=m(t,e,r/6,c,p),u>i&&(u=i,h=r);if(o)for(n=t.slice(0),d(n),r=6;a>r;r+=6)i=m(n,e,r/6,c,p),u>i&&(u=i,h=-r);return h/6},S=function(t,e,o){for(var n,i,r,a,s,l,c=t.length,p=99999999999,u=0,h=0;--c>-1;)for(n=t[c],l=n.length,s=0;l>s;s+=6)i=n[s]-e,r=n[s+1]-o,a=Math.sqrt(i*i+r*r),p>a&&(p=a,u=n[s],h=n[s+1]);return[u,h]},A=function(t,e,o,n,i,r){var a,s,l,c,p,u=e.length,h=0,d=Math.min(t.size||y(t),e[o].size||y(e[o]))*n,f=999999999999,g=t.centerX+i,b=t.centerY+r;for(s=o;u>s&&(a=e[s].size||y(e[s]),!(d>a));s++)l=e[s].centerX-g,c=e[s].centerY-b,p=Math.sqrt(l*l+c*c),f>p&&(h=s,f=p);return p=e[h],e.splice(h,1),p},$=function(t,e,o,n){var i,r,a,l,c,p,h,f=e.length-t.length,m=f>0?e:t,$=f>0?t:e,M=0,T="complexity"===n?b:w,k="position"===n?0:"number"==typeof n?n:.8,z=$.length,P="object"==typeof o&&o.push?o.slice(0):[o],C="reverse"===P[0]||P[0]<0,N="log"===o;if($[0]){if(m.length>1&&(t.sort(T),e.sort(T),p=m.size||g(m),p=$.size||g($),p=m.centerX-$.centerX,h=m.centerY-$.centerY,T===w))for(z=0;z<$.length;z++)m.splice(z,0,A($[z],m,z,k,p,h));if(f)for(0>f&&(f=-f),m[0].length>$[0].length&&u($[0],(m[0].length-$[0].length)/6|0),z=$.length;f>M;)l=m[z].size||y(m[z]),a=S($,m[z].centerX,m[z].centerY),l=a[0],c=a[1],$[z++]=[l,c,l,c,l,c,l,c],$.totalPoints+=8,M++;for(z=0;z<t.length;z++)i=e[z],r=t[z],f=i.length-r.length,0>f?u(i,-f/6|0):f>0&&u(r,f/6|0),C&&!r.reversed&&d(r),o=P[z]||0===P[z]?P[z]:"auto",o&&(r.closed||Math.abs(r[0]-r[r.length-2])<.5&&Math.abs(r[1]-r[r.length-1])<.5?"auto"===o||"log"===o?(P[z]=o=x(r,i,0===z),0>o&&(C=!0,d(r),o=-o),v(r,6*o)):"reverse"!==o&&(z&&0>o&&d(r),v(r,6*(0>o?-o:o))):!C&&("auto"===o&&Math.abs(i[0]-r[0])+Math.abs(i[1]-r[1])+Math.abs(i[i.length-2]-r[r.length-2])+Math.abs(i[i.length-1]-r[r.length-1])>Math.abs(i[0]-r[r.length-2])+Math.abs(i[1]-r[r.length-1])+Math.abs(i[i.length-2]-r[0])+Math.abs(i[i.length-1]-r[1])||o%2)?(d(r),P[z]=-1,C=!0):"auto"===o?P[z]=0:"reverse"===o&&(P[z]=-1),r.closed!==i.closed&&(r.closed=i.closed=!1));return N&&s("shapeIndex:["+P.join(",")+"]"),P}},M=function(t,e,o,n){var i=p(t[0]),r=p(t[1]);$(i,r,e||0===e?e:"auto",o)&&(t[0]=h(i),t[1]=h(r),("log"===n||n===!0)&&s('precompile:["'+t[0]+'","'+t[1]+'"]'))},T=function(t,e,o){return e||o||t||0===t?function(n){M(n,t,e,o)}:M},k=function(t,e){if(!e)return t;var o,i,r,a=t.match(n)||[],s=a.length,l="";for("reverse"===e?(i=s-1,o=-2):(i=(2*(parseInt(e,10)||0)+1+100*s)%s,o=2),r=0;s>r;r+=2)l+=a[i-1]+","+a[i]+" ",i=(i+o)%s;return l},z=function(t,e){var o,n,i,r,a,s,l,c=0,p=parseFloat(t[0]),u=parseFloat(t[1]),h=p+","+u+" ",d=.999999;for(i=t.length,o=.5*e/(.5*i-1),n=0;i-2>n;n+=2){if(c+=o,s=parseFloat(t[n+2]),l=parseFloat(t[n+3]),c>d)for(a=1/(Math.floor(c)+1),r=1;c>d;)h+=(p+(s-p)*a*r).toFixed(2)+","+(u+(l-u)*a*r).toFixed(2)+" ",c--,r++;h+=s+","+l+" ",p=s,u=l}return h},P=function(t){var e=t[0].match(n)||[],o=t[1].match(n)||[],i=o.length-e.length;i>0?t[0]=z(e,i):t[1]=z(o,-i)},C=function(t){return isNaN(t)?P:function(e){P(e),e[1]=k(e[1],parseInt(t,10))}},N=function(t,e){var o=document.createElementNS("http://www.w3.org/2000/svg","path"),n=Array.prototype.slice.call(t.attributes),i=n.length;for(e=","+e+",";--i>-1;)-1===e.indexOf(","+n[i].nodeName+",")&&o.setAttributeNS(null,n[i].nodeName,n[i].nodeValue);return o},q=function(t,e){var o,i,r,a,s,l,c,p,u,h,d,f,y,g,b,w,v,m,x,S,A,$=t.tagName.toLowerCase(),M=.552284749831;return"path"!==$&&t.getBBox?(l=N(t,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),"rect"===$?(a=+t.getAttribute("rx")||0,s=+t.getAttribute("ry")||0,i=+t.getAttribute("x")||0,r=+t.getAttribute("y")||0,h=(+t.getAttribute("width")||0)-2*a,d=(+t.getAttribute("height")||0)-2*s,a||s?(f=i+a*(1-M),y=i+a,g=y+h,b=g+a*M,w=g+a,v=r+s*(1-M),m=r+s,x=m+d,S=x+s*M,A=x+s,o="M"+w+","+m+" V"+x+" C"+[w,S,b,A,g,A,g-(g-y)/3,A,y+(g-y)/3,A,y,A,f,A,i,S,i,x,i,x-(x-m)/3,i,m+(x-m)/3,i,m,i,v,f,r,y,r,y+(g-y)/3,r,g-(g-y)/3,r,g,r,b,r,w,v,w,m].join(",")+"z"):o="M"+(i+h)+","+r+" v"+d+" h"+-h+" v"+-d+" h"+h+"z"):"circle"===$||"ellipse"===$?("circle"===$?(a=s=+t.getAttribute("r")||0,p=a*M):(a=+t.getAttribute("rx")||0,s=+t.getAttribute("ry")||0,p=s*M),i=+t.getAttribute("cx")||0,r=+t.getAttribute("cy")||0,c=a*M,o="M"+(i+a)+","+r+" C"+[i+a,r+p,i+c,r+s,i,r+s,i-c,r+s,i-a,r+p,i-a,r,i-a,r-p,i-c,r-s,i,r-s,i+c,r-s,i+a,r-p,i+a,r].join(",")+"z"):"line"===$?o="M"+t.getAttribute("x1")+","+t.getAttribute("y1")+" L"+t.getAttribute("x2")+","+t.getAttribute("y2"):("polyline"===$||"polygon"===$)&&(u=(t.getAttribute("points")+"").match(n)||[],i=u.shift(),r=u.shift(),o="M"+i+","+r+" L"+u.join(","),"polygon"===$&&(o+=","+i+","+r+"z")),l.setAttribute("d",o),e&&t.parentNode&&(t.parentNode.insertBefore(l,t),t.parentNode.removeChild(t)),l):t},B=function(t,e,o){var i,r,l="string"==typeof t;return(!l||(t.match(n)||[]).length<3)&&(i=l?a.selector(t):t&&t[0]?t:[t],i&&i[0]?(i=i[0],r=i.nodeName.toUpperCase(),e&&"PATH"!==r&&(i=q(i,!1),r="PATH"),t=i.getAttribute("PATH"===r?"d":"points")||"",i===o&&(t=i.getAttributeNS(null,"data-original")||t)):(s("WARNING: invalid morph to: "+t),t=!1)),t},E="Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",j=_gsScope._gsDefine.plugin({propName:"morphSVG",API:2,global:!0,version:"0.8.6",init:function(t,e,o,n){var r,a,l,c,p;return"function"==typeof t.setAttribute&&("function"==typeof e&&(e=e(n,t)),r=t.nodeName.toUpperCase(),p="POLYLINE"===r||"POLYGON"===r,"PATH"===r||p?(a="PATH"===r?"d":"points",("string"==typeof e||e.getBBox||e[0])&&(e={shape:e}),c=B(e.shape||e.d||e.points||"","d"===a,t),p&&i.test(c)?(s("WARNING: a <"+r+"> cannot accept path data. "+E),!1):(c&&(this._target=t,t.getAttributeNS(null,"data-original")||t.setAttributeNS(null,"data-original",t.getAttribute(a)),l=this._addTween(t,"setAttribute",t.getAttribute(a)+"",c+"","morphSVG",!1,a,"object"==typeof e.precompile?function(t){t[0]=e.precompile[0],t[1]=e.precompile[1]}:"d"===a?T(e.shapeIndex,e.map||j.defaultMap,e.precompile):C(e.shapeIndex)),l&&(this._overwriteProps.push("morphSVG"),l.end=c,l.endProp=a)),!0)):(s("WARNING: cannot morph a <"+r+"> SVG element. "+E),!1))},set:function(t){var e;if(this._super.setRatio.call(this,t),1===t)for(e=this._firstPT;e;)e.end&&this._target.setAttribute(e.endProp,e.end),e=e._next}});j.pathFilter=M,j.pointsFilter=P,j.subdivideRawBezier=u,j.defaultMap="size",j.pathDataToRawBezier=function(t){return p(B(t,!0))},j.equalizeSegmentQuantity=$,j.convertToPath=function(t,e){"string"==typeof t&&(t=a.selector(t));for(var o=t&&0!==t.length?t.length&&t[0]&&t[0].nodeType?Array.prototype.slice.call(t,0):[t]:[],n=o.length;--n>-1;)o[n]=q(o[n],e!==!1);return o},j.pathDataToBezier=function(t,e){var o,n,i,r,s,l,c,u,h=p(B(t,!0))[0]||[],d=0;if(e=e||{},u=e.align||e.relative,r=e.matrix||[1,0,0,1,0,0],s=e.offsetX||0,l=e.offsetY||0,"relative"===u||u===!0?(s-=h[0]*r[0]+h[1]*r[2],l-=h[0]*r[1]+h[1]*r[3],d="+="):(s+=r[4],l+=r[5],u&&(u="string"==typeof u?a.selector(u):u&&u[0]?u:[u],u&&u[0]&&(c=u[0].getBBox()||{x:0,y:0},s-=c.x,l-=c.y))),o=[],i=h.length,r)for(n=0;i>n;n+=2)o.push({x:d+(h[n]*r[0]+h[n+1]*r[2]+s),y:d+(h[n]*r[1]+h[n+1]*r[3]+l)});else for(n=0;i>n;n+=2)o.push({x:d+(h[n]+s),y:d+(h[n+1]+l)});return o}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}("MorphSVGPlugin"),$(function(){function t(){navOpen?($sideBar.removeClass("open"),$ham.removeClass("open")):($sideBar.addClass("open"),$ham.addClass("open")),navOpen=!navOpen}function e(){$penguinSection.velocity("scroll",{duration:duration})}function o(){var t=$("<div>",{class:"modal"}),e=$("<div>",{class:"modal-container"}),o=$("<img>",{alt:""}),n=$("<div>",{class:"next"}),i=$("<div>",{class:"prev"});return t.append(e.append(o,n,i)),t}function n(){N.append(C)}function i(){C.detach()}function r(t){C.find("img").attr("src",t)}$ham=$("header .hamburger"),$sideBar=$("main .sidebar"),$projectSideBar=$("main #project-sidebar"),$penguinSection=$("#penguin-section"),navOpen=!1,$aboutMe=$("main .about-me"),$landing=$(".wrapper .landing-part"),$scrollDown=$(".scroll-down"),$homeProject=$("#penguin-section"),$project=$(".project-page main .project"),$homeHeader=$("#home-header"),$deviceScreen=$(".model .device-animation"),duration=400,$ham.click(t),$penguinSection.waypoint(function(t){if("down"===t){var e=new TimelineMax;e.add(TweenMax.to($projectSideBar.addClass("open-nav"))),e.add(TweenMax.to($homeHeader.addClass("open-header"),{delay:5}))}else $landing.velocity("scroll",{duration:duration}),$projectSideBar.removeClass("open-nav"),$homeHeader.removeClass("open-header")},{offset:"20%"});var a=$(".landing-part");a.waypoint(function(t){"down"===t&&e()},{offset:"-1%"}),$scrollDown.click(function(){e()}),MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");var s=$("#kiwi"),l=$("#name-2"),c=$("#myself-2"),p=$("#bird"),u=$("#designer-2"),h=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1});h.to(s,2,{morphSVG:{shape:l},ease:Back.easeInOut}),h.to(s,2,{morphSVG:{shape:p},ease:Back.easeInOut}),h.to(s,2,{morphSVG:{shape:c},ease:Back.easeInOut}),h.to(s,2,{morphSVG:{shape:u},ease:Back.easeInOut});var d=$("svg #Ellipse-1"),f=$("svg #Ellipse-2"),y=$("svg #Ellipse-3"),g=$("svg #Ellipse-4"),b=$("svg #Ellipse-5"),w=$("svg #Ellipse-6"),v=$("svg #Ellipse-7"),m=$("svg #Ellipse-8"),x=$("svg #Ellipse-9"),S=$("svg #Ellipse-10"),A=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1});bubble2=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble3=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble4=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble5=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble6=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble7=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble8=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble9=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),bubble10=new TimelineMax({repeat:-1,yoyo:!0,repeatDelay:.5,delay:1}),A.to(d,3,{x:20,y:-30,opacity:.27}),A.to(d,2.5,{x:10,y:-25,opacity:.09}),A.to(d,2.5,{x:-10,y:-17,opacity:.05}),bubble2.to(f,1.7,{x:-20,y:-25,opacity:.08}),bubble2.to(f,3.2,{x:-10,y:5,opacity:.35}),bubble2.to(f,2,{x:12,y:15,opacity:.12}),bubble3.to(y,2,{x:35,y:23,opacity:.12}),bubble3.to(y,3,{x:25,y:-15,opacity:.09}),bubble3.to(y,2.2,{x:12,y:5,opacity:.27}),bubble4.to(g,1.3,{x:16,y:20,opacity:.35}),bubble4.to(g,1.6,{x:-12,y:7,opacity:.05}),bubble4.to(g,2,{x:-20,y:6,opacity:.22}),bubble5.to(b,3,{x:-20,y:13,opacity:.06}),bubble5.to(b,3.6,{x:-40,y:-9,opacity:.2}),bubble5.to(b,4,{x:-20,y:9,opacity:.12}),bubble6.to(w,2.8,{x:20,y:-10,opacity:.06}),bubble6.to(w,3.3,{x:5,y:-15,opacity:.27}),bubble6.to(w,2.1,{x:-15,y:-16,opacity:.12}),bubble7.to(v,3.5,{x:-33,y:-34,opacity:.22}),bubble7.to(v,2.7,{x:-60,y:-20,opacity:.05}),bubble7.to(v,3.1,{x:-10,y:5,opacity:.18}),bubble8.to(m,6,{x:60,y:-30,opacity:.12}),bubble8.to(m,2.8,{x:40,y:-60,opacity:.27}),bubble8.to(m,4,{x:-10,y:-25,opacity:.09}),bubble9.to(x,3.6,{x:-35,y:23,opacity:.15}),bubble9.to(x,4.2,{x:-42,y:-33,opacity:.22}),bubble9.to(x,2.5,{x:-10,y:-15,opacity:.4}),bubble10.to(S,3,{x:-30,y:-15,opacity:.27}),bubble10.to(S,4.2,{x:-50,y:5}),bubble10.to(S,3,{x:-30,y:-21});var M=new TimelineMax({repeat:-1,repeatDelay:.7});M.to(".texts h1",.7,{opacity:.7}),M.to(".texts h1",.7,{opacity:1});var T=$(".scroll-down .down-btn");downButton=new TimelineMax({repeat:-1,repeatDelay:1.5,delay:1}),downButton.to(T,.5,{x:0,y:"-=20"}),downButton.to(T,.5,{x:0,y:0}),downButton.to(T,.5,{x:0,y:"-=20"}),downButton.to(T,.5,{x:0,y:0});var k=$(".contact-form");k.formValidation();var z=$(".devices"),P=$(".project-info");z.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 80%"}:{"background-position":"0px 100%"})},{offset:"60%"}),z.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 60%"}:{"background-position":"0px 80%"})},{offset:"50%"}),z.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 40%"}:{"background-position":"0px 60%"})},{offset:"40%"}),z.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 20%"}:{"background-position":"0px 40%"})},{offset:"20%"}),z.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 5%"}:{"background-position":"0px 20%"})},{offset:"-20%"}),P.waypoint(function(t){$deviceScreen.css("down"===t?{"background-position":"0px 40%"}:{"background-position":"0px 60%"})},{offset:"40%"});var C,N=$("body"),q=$(".sketch-pics img"),B=-1,E=q.length,j=E-1;C=o(),q.click(function(){var t=$(this).data("img");B=q.index(this),r(t),n()}),C.click(function(t){t.currentTarget===t.target&&i()}),C.find(".next").click(function(){j>B?B++:B=0;var t=q.eq(B).data("img");r(t)}),C.find(".prev").click(function(){B>0?B--:B=j;var t=q.eq(B).data("img");r(t)})});