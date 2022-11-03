/* TESTIMONIALES */
const testimonialsContainer = document.querySelector('.testimoniales__contenedor')
const testimonial = document.querySelector('.testimoniales__texto')
const userImage = document.querySelector('.testimoniales__imagen')
const username = document.querySelector('.testimoniales__username')

const testimonials = [
    {
      name: 'Cindy Vázquez',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
      text:
        "Excelente servicio. Son muy atentos y respondieron todas mis dudas",
    },
    {
      name: 'Daniela Hernández',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      text:
        'Mi pedido llegó mucho más rápido de lo que pensé. Muy bueno',
    },
    {
      name: 'Elizabeth Méndez',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      text:
        "Hay mucha variedad en la tienda y el sitio web funciona muy bien",
    },
    {
      name: 'Sandra García',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      text:
        "Excelente servicio, el personal fue muy atento y pude llevarme todo lo que quería",
    },
    {
      name: 'Jonathan Álvarez',
      photo: 'https://randomuser.me/api/portraits/men/43.jpg',
      text:
        "Ahora Vennoir es mi tienda de ropa favorita, es genial la variedad de su catálogo",
    },
    {
      name: 'Ximena Domínguez',
      photo:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
      text:
        'Excelente. Todo fue muy rápido y sencillo de entender, súper recomendable',
    },
    {
      name: 'Juan Espinoza',
      photo: 'https://randomuser.me/api/portraits/men/97.jpg',
      text:
        'Hay muchas opciones a la hora de elegir la compra, me encantó el estilo de la tienda',
    },
  ]

let idx = 1

function updateTestimonial() {
    const {name, position, photo, text} = testimonials[idx];
    testimonial.innerHTML = text;
    userImage.src = photo;
    username.innerHTML = name;

    idx++

    if (idx > testimonials.length - 1) {
        idx = 0
    }
}

setInterval(updateTestimonial, 10000)

/* MAIN PRODUCTOS */
const productos = document.querySelector(".productostabs");
const btns = document.querySelectorAll(".tab-btn");
const productosgrid = document.querySelectorAll(".productostabs__bloque");
productos.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // hide other articles
    productosgrid.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

/* HERO */
class IndexForSiblings {
    static get(el) {
        let children = el.parentNode.children;
        for (var i = 0; i < children.length; i++) {
            let child = children [i];
            if (child == el) return i;
        }
    }
}

class Slider {
    constructor (selector, movimiento=true) {
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.slider = document.querySelector(selector);
        this.itemsCount = this.slider.querySelectorAll(".container > *").length;
        this.interval = null;
        this.contador = 0;
        this.movimiento = movimiento;

        this.start();
        this.buildControls();
        this.bindEvents();
    }

    start() {
        if(!this.movimiento) return;
        this.interval = window.setInterval(this.move, 5000);
    }

    restart() {
        if(this.interval) window.clearInterval(this.interval);
        this.start();
    }

    bindEvents() {
        this.slider.querySelectorAll(".controls li")
            .forEach(item => {
                item.addEventListener("click", this.moveByButton)
            });
    }

    moveByButton(ev) {
        let index = IndexForSiblings.get(ev.currentTarget);
        this.contador = index;
        this.moveTo(index);
        this.restart();
    }

    buildControls() {
        for (var i = 0; i < this.itemsCount; i++) {
            let control = document.createElement("li");
            if (i == 0) control.classList.add("active");
            this.slider.querySelector(".controls ul").appendChild(control);
        }
    }

    move() {
        // this -> Objeto
        this.contador++;
        if (this.contador > this.itemsCount - 1) this.contador = 0;
        this.moveTo(this.contador);
    }

    resetIndicador() {
        this.slider.querySelectorAll(".controls li.active")
            .forEach(item => item.classList.remove("active"));
    }

    moveTo(index) {
        let left = index * 100;
        this.resetIndicador();
        this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");
        this.slider.querySelector(".container").style.left = "-"+left+"%";
    }
}

(function() {
    new Slider (".slider", true); // Se cambia a false para detener el movimiento automático
})();