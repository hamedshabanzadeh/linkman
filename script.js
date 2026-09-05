const shareButton = document.getElementById('shareButton');
const toast = document.getElementById('toast');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

shareButton.addEventListener('click', async () => {
  const shareData = {
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast('Link copied');
  } catch (error) {
    if (error?.name !== 'AbortError') {
      showToast('Could not share the link');
    }
  }
});
