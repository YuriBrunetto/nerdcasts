"use strict";const request=new XMLHttpRequest,url="https://api.jovemnerd.com.br/wp-json/jovemnerd/v1/nerdcasts";request.open("GET",url,!0),request.onload=function(){if(request.status>=200&&request.status<400){var e=JSON.parse(request.responseText);e.forEach(function(e){({link:e.url,title:e.title,description:e.description,duration:e.duration,guests:e.guests,published:e.published_at,image:e.image})})}else console.log("error! :(")},request.onerror=function(){};