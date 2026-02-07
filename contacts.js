function setupContactFormValidation () {
    loadLanguage(getLanguage())
    //const sendBtn = document.getElementById('sendButton')
  //if (!sendBtn) return

  //sendBtn.addEventListener('click', function () {
  //  hideFormError()
  //  const fields = [
  //    { id: 'labelid', label: 'Nome' },
  //    { id: 'emailid', label: 'Email' },
  //    { id: 'subjectid', label: 'Assunto' },
  //    { id: 'messageid', label: 'Mensagem' }
  //  ]

  //  let hasError = false

  //  fields.forEach(field => {
  //    const input = document.getElementById(field.id)
  //    const error = document.getElementById(`${field.id}-error`)
  //    const value = input.value.trim()

  //    if (!value) {
  //      input.classList.add('input-error-color')
  //      if (error) {
  //        error.style.display = 'block'
  //      }
  //      hasError = true
  //    } else {
  //      input.classList.remove('input-error-color')
  //      if (error) {
  //        error.style.display = 'none'
  //      }
  //    }
  //  })

  //  if (!hasError) {
  //    const name = document.getElementById('labelid').value
  //    const email = document.getElementById('emailid').value
  //    const subject = document.getElementById('subjectid').value
  //    const message = document.getElementById('messageid').value

  //    if (isMobileDevice()) {
  //      hideFormError()
  //      SendWhatsApp({ name, email, subject, message })
  //    } else {
  //      showFormError()
  //    }
  //  }
  //})
}

function isMobileDevice () {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
}

function SendWhatsApp ({ name, email, subject, message }) {
  const phone = '+351910857380'

  const whatsappMessage = `Olá, meu nome é ${name}. Email: ${email}. Assunto: ${subject}. Mensagem: ${message}`

  const whatsappUrl =
    'https://wa.me/' + phone + '?text=' + encodeURIComponent(whatsappMessage)

  window.open(whatsappUrl, '_blank')
}

function showFormError () {
  const errorEl = document.getElementById('form-error')
  if (errorEl) {
    errorEl.style.display = 'block'
  }
}

function hideFormError () {
  const errorEl = document.getElementById('form-error')
  if (errorEl) {
    errorEl.style.display = 'none'
  }
}

function getParametroURL (nome) {
  const params = new URLSearchParams(window.location.search)
  return params.get(nome)
}

document.addEventListener('DOMContentLoaded', () => {
  buildArchitecture(() => {
    let param = getParametroURL('parameter')

    if (param) {
      getTranslationFromLangFile(param).then(value => {
        const input = document.getElementById('subjectid')
        if (input) input.value = value
      })
    }
  })
})
