function _createModal(options) {
   const modal = document.createElement('div')
   modal.classList.add('vmodal')
   modal.insertAdjacentHTML('afterbegin', `
      <div class="modal__overlay">
         <div class="modal__wrapper">
            <div class="modal__close-btn"><span></span></div>
            <div class="modal__window">
               <img src="assets/pets-jennifer.png" class="modal__image">
               <div class="modal__content pet">
                  <h2 class="pet__title">
                     Jennifer
                     <p class="pet__subtite">Dog - Labrador</p>
                  </h2>
                  <p class="pet__info">Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.</p>
                  <ul class="pet__parameters">
                     <li>Age: 2 months</li>
                     <li>Inoculations: none</li>
                     <li>Diseases: none</li>
                     <li>Parasites: none</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   `)
   document.body.appendChild(modal)
   return modal
}

$.modal = function (options) {
   const ANIMATION_SPEED = 200
   const $modal = _createModal(options)
   let closing = false

   return {
      open() {
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
      destroy() { }
   }
}