/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')

/* Initialize EmailJS with your public key (recommended) so errors are clearer.
    If you prefer not to init globally you can still pass the publicKey in sendForm. */
try { emailjs.init('FOx0bVaYdGlBpuRi2'); } catch (err) { /* safe-fail if emailjs not loaded */ }

const sendEmail = (e) =>{
    e.preventDefault()

    // Basic client-side validation so we don't send empty submissions
    const name = contactForm.user_name?.value?.trim()
    const email = contactForm.user_email?.value?.trim()
    const message = contactForm.user_message?.value?.trim()

    if (!name || !email || !message){
        contactMessage.textContent = 'Please fill all fields before sending.'
        return
    }

    // serviceID - templateID - formElement
    emailjs.sendForm('service_0ole9sp','template_b2jvkhl', contactForm)
    .then((response) =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅'

        // Remove message after five seconds
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 5000)

        // Clear input fields
        contactForm.reset()
    }).catch((err) => {
        // Show error message and log details for debugging (412 often means a template precondition failed)
        console.error('EmailJS send error', err)

        // Attach HTTP status (if available) so it's visible in the UI while debugging
        const status = err?.status || err?.statusCode
        contactMessage.textContent = `Message not sent (service error) ❌${status ? ' — ' + status : ''}`

        /* Common causes for 412 (Precondition Failed):
           - template expects variables that weren't provided
           - service/template IDs don't match your EmailJS account
           - public key or account config is invalid

           Next steps: check the template variables in your EmailJS dashboard and ensure
           the form field names match required variable names (or use emailjs.send and
           pass an object with the correct variable names for your template).
        */
    })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 400,
    // reset: true, //Animation repeat
})

sr.reveal(`.perfil, .contact__form`)
sr.reveal(`.info`, {origin: 'left', delay: 800})
sr.reveal(`.skills`, {origin: 'left', delay: 1000})
sr.reveal(`.about`, {origin: 'right', delay: 1200})
sr.reveal(`.projects__card, .services__card, .experience__card`, {interval: 100})
