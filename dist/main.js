!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var o=()=>{const e=document.querySelector(".menu"),t=document.querySelector("menu"),r=document.querySelector(".close-btn"),o=t.querySelectorAll("ul>li"),n=()=>{t.classList.toggle("active-menu")};e.addEventListener("click",n),t.addEventListener("click",()=>{let e=event.target;e===r&&n();for(let t=0;t<o.length;t++)e===o[t].firstElementChild&&n()})};var n=()=>{let e;const t=document.querySelector(".popup"),r=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content");let n=0;const l=()=>{n+=.05,o.style.opacity=n,t.style.display="block",n>=1&&(clearInterval(e),n=0)};r.forEach(r=>{r.addEventListener("click",()=>{window.innerWidth>768?e=setInterval(l,20):t.style.display="block"})}),t.addEventListener("click",r=>{let o=r.target;o.classList.contains("popup-close")?(t.style.display="none",clearInterval(e)):(o=o.closest(".popup-content"),o||(t.style.display="none"))})};var l=()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),r=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{let o=e.target;o=o.closest(".service-header-tab"),o&&t.forEach((e,n)=>{e===o&&(e=>{for(let o=0;o<r.length;o++)e===o?(t[o].classList.add("active"),r[o].classList.remove("d-none")):(t[o].classList.remove("active"),r[o].classList.add("d-none"))})(n)})})};var a=()=>{const e=document.querySelectorAll(".portfolio-item"),t=(document.querySelectorAll(".portfolio-btn"),document.querySelector(".portfolio-content")),r=document.getElementsByClassName("portfolio-dots")[0];let o,n=0;(()=>{for(let t=0;t<e.length;t++){let e=document.createElement("li");e.classList.add("dot"),r.appendChild(e),0===t&&e.classList.add("dot-active")}})();let l=document.querySelectorAll(".dot");const a=(e,t,r)=>{e[t].classList.remove(r)},c=(e,t,r)=>{e[t].classList.add(r)},u=()=>{a(e,n,"portfolio-item-active"),a(l,n,"dot-active"),n++,n>=e.length&&(n=0),c(e,n,"portfolio-item-active"),c(l,n,"dot-active")},s=(e=3e3)=>{o=setInterval(u,e)};t.addEventListener("click",t=>{t.preventDefault();let r=t.target;r.matches(".portfolio-btn, .dot")&&(a(e,n,"portfolio-item-active"),a(l,n,"dot-active"),r.matches("#arrow-right")?n++:r.matches("#arrow-left")?n--:r.matches(".dot")&&l.forEach((e,t)=>{e===r&&(n=t)}),n>=e.length?n=0:n<0&&(n=e.length-1),c(e,n,"portfolio-item-active"),c(l,n,"dot-active"))}),t.addEventListener("mouseover",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(o)}),t.addEventListener("mouseout",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&s()}),s(1500)};var c=()=>{const e=document.getElementById("command"),t=document.querySelectorAll(".command__photo");let r=[];e.addEventListener("mouseover",e=>{let o=e.target;for(let n=0;n<t.length;n++)o===t[n]&&(r[n]=e.target.src,e.target.src=e.target.dataset.img)}),e.addEventListener("mouseout",e=>{let o=e.target;for(let n=0;n<t.length;n++)o===t[n]&&(e.target.src=r[n])})};var u=e=>{const t=document.querySelector(e),r=t.querySelectorAll("input"),o=t.querySelector("button");let n,l,a;r.forEach(e=>{if("user_name"===e.getAttribute("name")){let t=/.{2,50}/gi;e.addEventListener("input",()=>{e.value=e.value.replace(/[^а-яё \-]/gi,"")}),e.addEventListener("blur",()=>{e.value=e.value.toLowerCase(),e.value=e.value.replace(/( |^)[а-яё]/g,(function(e){return e.toUpperCase()})),e.value=e.value.replace(/\s+/g," "),e.value=e.value.replace(/\-+/g,"-"),e.value=e.value.replace(/^\s*/,""),n=t.test(e.value),console.log(n+" -validName"),n?n&&l&&a&&(o.style.cursor="default",o.disabled=!1):(o.style.cursor="not-allowed",o.disabled=!0),console.log(n+" -validName")})}if("user_email"===e.getAttribute("name")){let t=/[a-z@.!~*'\_\-]+?@.+\.[a-z]{2,4}/gi;e.addEventListener("input",()=>{e.value=e.value.replace(/[^a-z@.!~*'\_\-]/gi,""),a=t.test(e.value),a?n&&l&&a&&(o.style.cursor="default",o.disabled=!1):(o.style.cursor="not-allowed",o.disabled=!0)})}if("user_phone"===e.getAttribute("name")){let t=/\+?[0-9]{11}/gi;e.addEventListener("input",()=>{e.value=e.value.replace(/[^0-9\+]/g,""),l=t.test(e.value),l?n&&l&&a&&(o.style.cursor="default",o.disabled=!1):(o.style.cursor="not-allowed",o.disabled=!0)})}"user_message"===e.getAttribute("name")&&(e.addEventListener("input",()=>{e.value=e.value.replace(/[^а-яё0-9 \.,!\-]/gi,"")}),e.addEventListener("blur",()=>{e.value=e.value.replace(/\s+/g," "),e.value=e.value.replace(/\-+/g,"-"),e.value=e.value.replace(/^\s*/,"")}))})};var s=e=>{document.querySelectorAll(e).forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/\D/g,"")})})};var i=(e=100)=>{const t=document.querySelector(".calc-block"),r=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),n=document.querySelector(".calc-day"),l=document.querySelector(".calc-count"),a=document.getElementById("total"),c=()=>{let t=0,c=1,u=1;const s=r.options[r.selectedIndex].value,i=+o.value;l.value>1&&(c+=(l.value-1)/10),n.value&&n.value<5?u*=2:n.value&&n.value<10&&(u*=1.5),s&&i&&(t=Math.round(e*s*i*c*u));a.textContent=0,(({timing:e,draw:t,duration:r},o)=>{let n=performance.now();requestAnimationFrame((function o(l){let a=(l-n)/r;a>1&&(a=1);let c=e(a);t(c),a<1&&requestAnimationFrame(o)}))})({duration:1e3,timing:e=>e,draw(e){a.textContent=Math.floor(e*t)}})};t.addEventListener("change",e=>{const t=e.target;t!==r&&t!==o&&t!==n&&t!==l||c()})};var d=(e,t)=>{const r=document.getElementById(e),o=document.createElement("div");o.style.cssText=t,r.addEventListener("submit",e=>{e.preventDefault(),r.appendChild(o),o.textContent="Загрузка...";const t=new FormData(r);let n={};t.forEach((e,t)=>{e?n[t]=e:alert("Поле имя не заполнено")});var l;(l=n,fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l),credentials:"include"})).then(e=>{if(200!==e.status)throw new Error("status network not 200");o.textContent="Спасибо! Мы скоро с вами свяжемся!",r.reset(),setTimeout(()=>{o.textContent=""},4e3)}).catch(e=>{o.textContent="Что-то пошло не так...",console.error(e)})})};(function(e){let t,r=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");function l(e){return e<10?e="0"+e:e}t=setInterval((function(){let a=function(){let t,r,o,n=(new Date(e).getTime()-(new Date).getTime())/1e3;return n>0?(t=l(Math.floor(n%60)),r=l(Math.floor(n/60%60)),o=l(Math.floor(n/60/60))):(t="00",r="00",o="00"),{timeRemaning:n,hours:o,minutes:r,seconds:t}}();r.textContent=a.hours,o.textContent=a.minutes,n.textContent=a.seconds,a.timeRemaning<0&&clearInterval(t)}),1e3)})("8 may 2021"),o(),n(),l(),a(),c(),u("#form1"),u("#form2"),u("#form3"),s(".calc-block > input"),i(100),d("form1","font-size: 2rem;"),d("form2","font-size: 2rem;"),d("form3","font-size: 2rem; color: white;")}]);