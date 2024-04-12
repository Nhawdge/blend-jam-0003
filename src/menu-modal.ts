document.getElementById('menuTrigger')?.addEventListener('click', () => {
    openModal('menu-modal');
  });
  
  document.getElementsByClassName('close')[0]?.addEventListener('click', () => {
    closeModal('menu-modal');
  });
  
  window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('menu-modal')) {
      closeModal('menu-modal');
    }
  });
  
  
  function closeModal(modalId: string) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
      }
    }
  
   function openModal(modalId: string) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    }