function buildArchitecture (callback) {
  const tasks = []

  // Header
  tasks.push(
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data
      })
      .catch(err => console.error('Erro ao carregar header.html', err))
  )

  // Index section
  const indexSectionEl = document.getElementById('index-section-placeholder')
  if (indexSectionEl) {
    tasks.push(
      fetch('index-section.html')
        .then(res => res.text())
        .then(data => {
          indexSectionEl.innerHTML = data
          loadLanguage(getLanguage())
        })
        .catch(err => console.error('Erro ao carregar index-section.html', err))
    )
  }

  // Company section
  const companySectionEl = document.getElementById(
    'company-section-placeholder'
  )
  if (companySectionEl) {
    tasks.push(
      fetch('company-section.html')
        .then(res => res.text())
        .then(data => {
          companySectionEl.innerHTML = data
          loadLanguage(getLanguage())
        })
        .catch(err =>
          console.error('Erro ao carregar company-section.html', err)
        )
    )
  }

  // Services section
  const servicesectionEl = document.getElementById(
    'services-section-placeholder'
  )
  if (servicesectionEl) {
    tasks.push(
      fetch('services-section.html')
        .then(res => res.text())
        .then(data => {
          servicesectionEl.innerHTML = data
          loadLanguage(getLanguage())
        })
        .catch(err =>
          console.error('Erro ao carregar services-section.html', err)
        )
    )
  }

  // Projects section
  const projectsectionEl = document.getElementById(
    'projects-section-placeholder'
  )
  if (projectsectionEl) {
    tasks.push(
      fetch('projects-section.html')
        .then(res => res.text())
        .then(data => {
          projectsectionEl.innerHTML = data
          if (typeof initProjectsImages === 'function') {
            initProjectsImages()
          }
          if (typeof initProjectsVideos === 'function') {
            initProjectsVideos()
          }
        })
        .catch(err =>
          console.error('Erro ao carregar projects-section.html', err)
        )
    )
  }

  // Social section
  const socialsectionEl = document.getElementById('social-section-placeholder')
  if (socialsectionEl) {
    tasks.push(
      fetch('social-section.html')
        .then(res => res.text())
        .then(data => {
          socialsectionEl.innerHTML = data
          if (typeof initSocialSection === 'function') {
            initSocialSection()
          }
        })
        .catch(err =>
          console.error('Erro ao carregar social-section.html', err)
        )
    )
  }

  // Contacts section
  const contactsectionEl = document.getElementById(
    'contacts-section-placeholder'
  )
  if (contactsectionEl) {
    tasks.push(
      fetch('contacts-section.html')
        .then(res => res.text())
        .then(data => {
          contactsectionEl.innerHTML = data
          if (typeof setupContactFormValidation === 'function') {
            setupContactFormValidation()
          }
        })
        .catch(err =>
          console.error('Erro ao carregar contacts-section.html', err)
        )
    )
  }

  // Footer
  tasks.push(
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data
      })
      .catch(err => console.error('Erro ao carregar footer.html', err))
  )

  // Espera por todas as tarefas
  Promise.all(tasks).then(() => {
    if (typeof callback === 'function') {
      callback()
    }
  })
}
