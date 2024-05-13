import '../css/index.scss';
import * as bootstrap from 'bootstrap'

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import { utils } from './modules/utils';


import Alpine from 'alpinejs'
 
window.Alpine = Alpine

// Add Alpine extensions here
 
Alpine.start()


// Add GSAP to window and Register plugins
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.ScrollSmoother = ScrollSmoother;

gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(ScrollTrigger);


const {select} = utils

document.addEventListener("DOMContentLoaded", function(){

  var smoother = ScrollSmoother.create({
    wrapper: ".pd_ss_wrapper",
    content: ".pd_ss_inner",
    smooth: 1,
    effects: true,
    ignoreMobileResize: true,
    normalizeScroll: false,
    smoothTouch: false
    // preventDefault: true
  });

  window.pd_smoother = smoother

  select('.navbar-collapse').addEventListener('hide.bs.collapse', function(){
    select('body').classList.remove('mobile-nav-open')
  })
  select('.navbar-collapse').addEventListener('show.bs.collapse', function(){
    select('body').classList.add('mobile-nav-open')
  })


  function handlePageHeader(){
    const siteHeader = document.querySelector('#site-header');
    let header_progress = 0;
    let header_direction = 1;
    ScrollTrigger.create({
      trigger: ".pd_ss_inner",
      start: "+=100",
      end: 'bottom bottom',
      //markers: true,
      onUpdate: function (self) {
        // console.log(self.progress)
        header_progress = self.progress.toFixed(2);
        header_direction = self.direction;
        if (header_progress == 0.00) {
          siteHeader.classList.add('pd-top');
          siteHeader.classList.remove('pd-notTop');
          document.body.classList.remove('pd-is-scrolled');
        } else {
          siteHeader.classList.remove('pd-top');
          siteHeader.classList.add('pd-notTop');
          document.body.classList.add('pd-is-scrolled');
        }
        if (header_direction == -1) {
          siteHeader.classList.add('pd-pinned');
        } else {
          siteHeader.classList.remove('pd-pinned');
        }
      }
    });
  }

  handlePageHeader();

  console.log('hello from index.js')

})


