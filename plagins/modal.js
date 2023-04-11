Element.prototype.appendAfter = function (element) {// метод для реализации футера в модалку
   element.parentNode.insertBefore(this/* - это Элемент(в данном случае футер)*/, element.nextSibling)
}
function noop() { }//пустая функция

function _createModalFooter(buttons = []) {// создания футера
   if (buttons.length === 0) {
      return document.createElement('div')
   }
   const wrapper = document.createElement('div')
   wrapper.classList.add('modal__footer')

   buttons.forEach(btn => {// создание кнопок
      const $btn = document.createElement('button')
      $btn.textContent = btn.text
      $btn.classList.add('btn')
      $btn.classList.add(`btn-${btn.type || 'secondary'}`)
      $btn.onclick = btn.handler || noop//(noop это пустая функция, если кнопок нет) 

      wrapper.appendChild($btn)
   })

   return wrapper
}

function _createModal(options) {
   const DEFAULT_WIDTH = '952px'
   const modal = document.createElement('div')
   modal.classList.add('vmodal')
   modal.insertAdjacentHTML('afterbegin', `
      <div class="modal__overlay" data-close="true">
         <div class="modal__wrapper" data-close="true" style="width: ${options.width || DEFAULT_WIDTH}">
            ${options.closable ? `<div class="modal__close-btn" data-close="true"><span data-close="true">&#215</span></div>` : ''}
               <div class="modal__window" data-footer>
               <div class="image__wrapper" data-image>${options.image}</div>
               <div class="modal__content pet">
               <h2 class="pet__title" data-name>${options.name || "Pets'name"}</h2>
                  <p class="pet__subtite" data-subtitle>${options.type || "Pets'type"}-${options.breed}</p>
               <p class="pet__info" data-content>${options.description || "Pets'info"}</p>
               <ul class="pet__parameters">
                  <li data-age>Age: ${options.age || "Pets'age"}</li>
                  <li data-inoculations>Inoculations: ${options.inoculations || "Pets'inoculations"}</li>
                  <li data-diseases>Diseases: ${options.diseases || "Pets'diseases"}</li>
                  <li data-parasites>Parasites: ${options.parasites || "Pets'parasites"}</li>
               </ul>
            </div>
         </div>
      </div>
   </div>
`)
   const footer = _createModalFooter(options.footerButtons)
   footer.appendAfter(modal.querySelector('[data-footer]'))// вставляем футер после элемента с этим дата атрибутом
   document.body.appendChild(modal)//добавление узла в дом дерева
   return modal
}

$.modal = function (options) {
   const ANIMATION_SPEED = 200
   const $modal = _createModal(options)
   let closing = false
   let destroyed = false

   const modal = {
      open() {
         if (destroyed) {
            return console.log('Modal is destroyed')
         }
         !closing && $modal.classList.add('open')
      },
      close() {
         closing = true
         $modal.classList.remove('open')
         $modal.classList.add('hide')
         setTimeout(() => {
            $modal.classList.remove('hide')
            closing = false
         }, ANIMATION_SPEED)
      },
   }

   const listener = event => {// функция слушателя клика на закрытие окна
      //console.log('Clicked', event.target.dataset.close)
      if (event.target.dataset.close) {// клик на элементы с дата-атрибутами
         modal.close()
      }
   }

   $modal.addEventListener('click', listener)// обработчик клика

   return Object.assign(modal, {
      destroy() {
         $modal.parentNode.removeChild($modal)// удаления узла из дом дерева
         $modal.removeEventListener('click', listener)// удаление обработчика 
         destroyed = true
      },
      setTitle(html) { 
         $modal.querySelector('[data-name]').innerHTML = html
      },
      setImage(html) {
         $modal.querySelector('[data-image]').innerHTML = html
      },
      setContent(html) {
         $modal.querySelector('[data-content]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      },
      setSubtitle(html) {
         $modal.querySelector('[data-subtitle]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      },
      setAge(html) {
         $modal.querySelector('[data-age]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      },
      setInoculations(html) {
         $modal.querySelector('[data-inoculations]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      },
      setDiseases(html) {
         $modal.querySelector('[data-diseases]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      },
      setParasites(html) {
         $modal.querySelector('[data-parasites]').innerHTML = html//можно изменять контент в элементах с этим дата атрибутом
      }
   })
}


