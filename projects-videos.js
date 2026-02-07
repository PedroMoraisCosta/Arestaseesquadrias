function initProjectsVideos () {
  const filePath = './assets/projetos/videos.txt'

  function extractVideoId (link) {
    const match =
      link.match(/youtu\.be\/([a-zA-Z0-9_-]+)/) ||
      link.match(/v=([a-zA-Z0-9_-]+)/) ||
      link.match(/shorts\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : link
  }

  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('video-gallery')
      if (!container) {
        console.error('Elemento #video-gallery não encontrado!')
        return
      }

      const links = data
        .replace(/\r/g, '')
        .split('\n')
        .map(link => link.trim())
        .filter(Boolean)

      links.forEach(link => {
        const videoId = extractVideoId(link)
        if (!videoId) return

        const col = document.createElement('div')
        col.className = 'col-lg-6 col-md-6'

        const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        col.innerHTML = `
          <div class="nf-team-card ratio ratio-16x9 video-placeholder" data-id="${videoId}">
            <img src="${thumb}" alt="Video thumbnail" class="img-fluid rounded">
            <div class="play-button">▶</div>
          </div>
        `

        container.appendChild(col)
      })

      // Add click event to each placeholder
      container.addEventListener('click', function (e) {
        const placeholder = e.target.closest('.video-placeholder')
        if (!placeholder) return

        const variables =
          'rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3'

        const videoId = placeholder.dataset.id
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&${variables}`
        iframe.frameBorder = '0'
        iframe.className = 'w-100 h-100' // fills ratio container
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        iframe.allowFullscreen = true

        iframe.style.position = 'absolute'
        iframe.style.top = '0'
        iframe.style.left = '0'
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        iframe.style.borderRadius = '0.25rem'

        placeholder.innerHTML = ''
        placeholder.appendChild(iframe)
      })
      loadLanguage(getLanguage())
    })
    .catch(err => {
      console.error('Erro ao carregar videos.txt:', err)
    })
}
