'use strict'

const request = new XMLHttpRequest()
const url = 'https://api.jovemnerd.com.br/wp-json/jovemnerd/v1/nerdcasts'

request.open('GET', url, true)

request.onload = function() {
  if (request.status >= 200 && request.status < 400) { // sucess
    var data = JSON.parse(request.responseText);
    data.forEach(function(nc) {
      var episode = {
        link: nc.url,
        title: nc.title,
        description: nc.description,
        duration: nc.duration,
        guests: nc.guests,
        published: nc.published_at,
        image: nc.image
      }
    })
  } else { // we reached our target server, but it returned an error
    console.log('error! :(')
  }
}

request.onerror = function() {
  // there was a connection error of some sort
}

// request.send()
