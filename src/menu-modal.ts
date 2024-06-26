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

const modalClosedEvent = new Event('modalClosed');


function closeModal(modalId: string) {
    let audio: HTMLAudioElement = document.getElementById('menuMusic') as HTMLAudioElement;
    audio.pause();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
    document.dispatchEvent(modalClosedEvent);
}

function openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}