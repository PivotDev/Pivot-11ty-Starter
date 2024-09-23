export default function focusHandler(){
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('navigation--keyboard');
      
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }
  
  function handleMouseDownOnce() {
    document.body.classList.remove('navigation--keyboard');
    
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }
  
  window.addEventListener('keydown', handleFirstTab);
}