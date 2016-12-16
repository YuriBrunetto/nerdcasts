'use strict'

var request = new XMLHttpRequest()
var url = 'https://api.jovemnerd.com.br/wp-json/jovemnerd/v1/nerdcasts'

request.open('GET', url, true)

request.onload = function() {
  if (request.status >= 200 && request.status < 400) { // success
    var str = ''
    var data = JSON.parse(request.responseText);
    var content = document.getElementById('content')

    data.forEach(function(nc) {
      var episode = {
        link: nc.url,
        title: nc.title,
        num: nc.episode,
        description: nc.description,
        duration: parseInt(nc.duration / 60),
        guests: nc.guests,
        published: nc.published_at,
        image: nc.image,
        audio_low: nc.audio_low,
        audio_medium: nc.audio_medium,
        audio_high: nc.audio_high,
        audio_zip: nc.audio_zip,
        guests: nc.guests.split(','),
        product_name: nc.product_name
      }

      console.log(nc);

      var product;

      if (episode.product_name == 'NerdTech')
        product = 'NerdTech '
      else if (episode.product_name == 'Empreendedor')
        product = 'Empreendedor '

      str += '<article class="ep">'
      str += '<header style="background-image: url(' + episode.image + ');">'
      str += '<div class="wrap">'
      str += '<h1>' + (product ? product : '') + '#' + episode.num + ' - ' + episode.title + '</h1>'
      str += '<h2>' + episode.description + '</h2>'
      str += '<p class="duration">' + episode.duration + ' minutos</p>'
      for (var i = 0; i < episode.guests.length; i++) {
        str += '<span class="guests">' + episode.guests[i] + '</span>'
      }
      str += '</div>'
      str += '</header>'
      str += '<div class="main">'
      str += '<div class="qualidades">'
      str += '<a href="' + episode.audio_high +'" title="Alta qualidade" target="_blank">Alta qualidade</a>'
      str += '<a href="' + episode.audio_medium +'" title="Média qualidade" target="_blank">Média qualidade</a>'
      str += '<a href="' + episode.audio_low +'" title="Baixa qualidade" target="_blank">Baixa qualidade</a>'
      str += '<a href="' + episode.audio_zip +'" title="Arquivo .zip" target="_blank">Arquivo .zip</a>'
      str += '</div>'
      str += '</div>'
      str += '</article>'

      content.innerHTML = str
    })
  } else {
    console.log('we reached our target server, but it returned an error')
  }
}

request.onerror = function() {
  console.log('there was a connection error of some sort')
}

request.send()
