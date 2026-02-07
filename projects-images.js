async function initProjectsImages () {
  const container = document.getElementById('image-gallery')
  if (!container) {
    console.error('Elemento #image-gallery não encontrado!')
    return
  }

  let i = 1
  while (true) {
    const thumb = `./assets/images/projetos/${i}.jpg`

    try {
      const res = await fetch(thumb, { method: 'HEAD' })

      if (!res.ok) {
        // stop when file not found
        break
      }

      const col = document.createElement('div')
      col.className = 'col-lg-6 col-md-6'
      col.innerHTML = `
        <div class="nf-team-card ratio ratio-16x9" data-id="${i}">
          <img src="${thumb}" alt="image thumbnail" class="img-fluid rounded">
        </div>
      `
      container.appendChild(col)

      i++
    } catch {
      // stop on fetch/network error
      break
    }
  }
}
