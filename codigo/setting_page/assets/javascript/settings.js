const myModal = document.querySelector('#myModal')

myModal.addEventListener('show.bs.modal', event => {
  return event.preventDefault() // stops modal from being shown
})