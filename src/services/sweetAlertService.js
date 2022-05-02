import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function fireSuccess(message) {
  return Toast.fire({
    icon: 'success',
    title: message
  });
}

function fireFail(message) {
  return Toast.fire({
    icon: 'error',
    title: message
  });
}

function fireAlert(message){
  return Swal.fire(message);
}


export default { fireSuccess, fireFail, fireAlert };