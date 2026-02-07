document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('nav a')

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = link.getAttribute('href').substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    })
  })
})

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contacto');
    const subjectInput = document.querySelector('#assunto');

    // Click nos "Saber mais"
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.js-saber-mais');
        if (!link) return;

        const assunto = link.dataset.assunto || '';
        // Deixa o href funcionar como âncora, mas com scroll suave + foco
        e.preventDefault();
        if (subjectInput) {
            subjectInput.value = assunto;
            subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => subjectInput && subjectInput.focus(), 350);
        }
        history.replaceState(null, '', '#contacto'); // atualiza hash
    });

    // Suporta deep-link: ?assunto=... ou #assunto=...
    const fromQuery = new URLSearchParams(location.search).get('assunto');
    const fromHash = new URLSearchParams(location.hash.replace(/^#/, '?')).get('assunto');
    const preset = fromQuery || fromHash;
    if (preset && subjectInput) {
        subjectInput.value = decodeURIComponent(preset);
    }
});
