// Esperar a que el DOM esté completamente cargado
// Este código solo se ejecutará cuando toda la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    // 1. NAVEGACIÓN SUAVE
    // Hace que los enlaces del menú se desplacen suavemente a las secciones
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        // se aplica el scroll suave para enlaces internos en la misma página
        if(targetId.startsWith('#')) {
            e.preventDefault(); // Evita el comportamiento normal del enlace
            if(targetId === '#') return; // Si solo es # no hace nada
        
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Desplaza la página suavemente con un espacio de 100px desde arriba
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    }

    // 2. VALIDACIÓN DEL FORMULARIO
    // Comprueba que los campos del formulario sean correctos antes de enviar
    const contactForm = document.querySelector('form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que el formulario se envíe automáticamente
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            let isValid = true;
            
            // Limpia mensajes de error anteriores
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Revisa si el nombre está vacío
            if(!nombre.value.trim()) {
                showError(nombre, 'El nombre es obligatorio');
                isValid = false;
            }
            
            // Revisa si el email está vacío o no es válido
            if(!email.value.trim()) {
                showError(email, 'El correo electrónico es obligatorio');
                isValid = false;
            } else if(!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un correo electrónico válido');
                isValid = false;
            }
            
            // Revisa si el mensaje está vacío
            if(!mensaje.value.trim()) {
                showError(mensaje, 'El mensaje es obligatorio');
                isValid = false;
            }
            
            // Si todo está bien, muestra mensaje de éxito
            if(isValid) {
                // Crea y muestra mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
                contactForm.appendChild(successMessage);
                
                // Limpia el formulario
                contactForm.reset();
                
                // Quita el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Función para mostrar mensajes de error
        function showError(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.textContent = message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
            input.classList.add('input-error');
            
            // Quita el error cuando el usuario empieza a escribir
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
                if(this.nextSibling.classList && this.nextSibling.classList.contains('error-message')) {
                    this.nextSibling.remove();
                }
            }, {once: true});
        }
        
        // Función para verificar si un email es válido
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // 3. EFECTOS EN TARJETAS DE SERVICIOS
    //  efectos visuales cuando el mouse pasa sobre las tarjetas
    const serviceCards = document.querySelectorAll('.servicio');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });

    // 4. CARGA DE IMÁGENES
    // Carga las imágenes solo cuando se hacen visibles 
    if('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
    
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // La imagen es visible, carga la imagen real
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // 5. ANIMACIONES AL HACER SCROLL
    // Activa animaciones cuando los elementos aparecen en pantalla
    if('IntersectionObserver' in window) {
        const elementsToAnimate = document.querySelectorAll('.slide-up, .fade-in');
        
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // El elemento es visible, inicia la animación
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Activa cuando al menos 20% del elemento es visible
        });
        
        elementsToAnimate.forEach(element => animationObserver.observe(element));
    }
    
    // 6. BOTÓN PARA VOLVER ARRIBA
    // Crea un botón que aparece al desplazarse y permite volver al inicio
    const createScrollTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.classList.add('scroll-top-btn');
        button.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(button);
        
        // Muestra/oculta el botón según la posición de desplazamiento
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
        
        // Al hacer clic, vuelve suavemente al inicio de la página
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createScrollTopButton();
});