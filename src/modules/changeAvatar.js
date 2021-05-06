'use strict';
const changeAvatar = () => {
    const command = document.getElementById('command');
    const comandPhotos = document.querySelectorAll('.command__photo');
    let comandPhotosImg = [];
    
    command.addEventListener('mouseover', (event) => {
      
      let target = event.target;

      for(let i = 0; i < comandPhotos.length; i++) {

        if (target === comandPhotos[i]) {
          comandPhotosImg[i] = event.target.src;
          event.target.src = event.target.dataset.img;
        }

      }

    });

    command.addEventListener('mouseout', (event) => {

      let target = event.target;

      for(let i = 0; i < comandPhotos.length; i++) {

        if (target === comandPhotos[i]) {
          event.target.src = comandPhotosImg[i];
        }

      }

    });
  };

  export default changeAvatar;