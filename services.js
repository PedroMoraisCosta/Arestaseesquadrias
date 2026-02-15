function initServices () {
  const email = 'arestaseesquadrias@gmail.com'

  document.querySelectorAll('.email-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()

      const subject = this.getAttribute('data-subject-key')

      getTranslationFromLangFile(subject).then(translatedSubject => {
        const mailto = `mailto:${email}?subject=${encodeURIComponent(
          translatedSubject
        )}`

        window.location.href = mailto
      })
    })
  })
}
