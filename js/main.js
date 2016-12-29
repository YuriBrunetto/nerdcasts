'use strict'

const url = 'https://api.jovemnerd.com.br/wp-json/jovemnerd/v1/nerdcasts'
const content = document.getElementById('content')

fetch(url).then(res => {
  if (res.ok) {
    return res.json().then(ncs => {
      ncs.forEach(nc => {
        let episode = {
          link: nc.url,
          title: nc.title,
          num: nc.episode,
          description: nc.description,
          duration: parseInt(nc.duration / 60),
          guests: nc.guests,
          published: moment(nc.published_at).format('LL'),
          image: nc.image,
          audio_low: nc.audio_low,
          audio_medium: nc.audio_medium,
          audio_high: nc.audio_high,
          audio_zip: nc.audio_zip,
          guests: nc.guests.split(','),
          product_name: nc.product_name
        }

        let product;
        if (episode.product_name == 'NerdTech')
          product = 'NerdTech'
        else if (episode.product_name == 'Empreendedor')
          product = 'Empreendedor'

        content.innerHTML += `
          <article class="ep">
            <header style="background-image: url(${episode.image});">
              <div class="wrap">
                <h1>${product ? product : ''} #${episode.num} ${episode.title}</h1>
                <h2>${episode.description}</h2>
                <p class="duration">${episode.published} - ${episode.duration} minutos</p>
                ${episode.guests.map(guest => `<span class="guests">${guest}</span>`).join('\n')}
              </div>
            </header>
            <div class="main">
              <div class="qualidades">
                <a href="${episode.audio_high}" title="Alta qualidade" target="_blank">Alta qualidade</a>
                <a href="${episode.audio_medium}" title="Média qualidade" target="_blank">Média qualidade</a>
                <a href="${episode.audio_low}" title="Baixa qualidade" target="_blank">Baixa qualidade</a>
                <a href="${episode.audio_zip}" title="Arquivo .zip" target="_blank">Arquivo .zip</a>
              </div>
            </div>
          </article>
        `
      })
    })
  }
})
