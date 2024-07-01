const Utils = () => {

  const select = (selector) => {
    return document.querySelector(selector)
  }

  const selectAll = (selector) => {
    return document.querySelectorAll(selector)
  }

  const selectForEach = (selector, callback) => {
    const items = document.querySelectorAll(selector)
    if(items && items.length > 0){
      items.forEach((item) => callback(item))
    }
  }

  const enableScroll = () => {
    if(window.pd_smoother){
      window.pd_smoother.paused(false)
    } 
  }

  const disableScroll = () => {
    if(window.pd_smoother){
      window.pd_smoother.paused(true)
    }
  }

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const isTouchDevice = () =>  {
    return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
  } 


  return {
    enableScroll,
    disableScroll,
    debounce,
    select,
    selectAll,
    selectForEach,
    isTouchDevice
  }
}

export const utils = Utils()