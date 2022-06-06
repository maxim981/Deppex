
/*
	1. SLIDER
	2. SELECTORS
	3. VARIABLES
	4. SCROLL
		4.1. SCROLL HEADER HEIGHT
		4.2. SCROLL ACTIVE LINK
	5. ANCHORS
	6. OBSERVER
		6. 1. OBSERVER MAIN CALLBACK
		6. 2. OBSERVER READY DEMOS
		6. 3. OBSERVER PURCHASE PARALLAX
		6. 4. OBSERVER BENEFITS PROGRESS

*/

'use strict';

// 1. SLIDER
const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 4,
	speed: 600,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 4000,
	}
});


// 2. SELECTORS
const bg 				= document.querySelector('.purchase__parallax-bg');
const purchase 			= document.querySelector('.purchase');
const header 			= document.querySelector('.header');
const sections	 		= document.querySelectorAll('.anchor-section');
const navLinks 			= document.querySelectorAll('.header__nav-item');
const benefits 			= document.querySelector('.benefits');
const skillPercent 		= document.querySelectorAll('.skill-table__percent');
const skillProgress 	= document.querySelectorAll('.skill-table__progress');
const demos 			= document.querySelector('.about__ready-amount')


// 3. VARIABLES
let speed 				= 50;
let progressFlag 		= true;
let skillVal 			= 0;
let readyDemosVal 		= 0;
let demosFlag			= true;



// 4. SCROLL
window.onload = function() {
	headerHeight();
	navActiveLinkScroll();
	window.addEventListener('scroll', scroll);
}
function scroll() {
	headerHeight();
	navActiveLinkScroll();
}

// 4.1. SCROLL HEADER HEIGHT
function headerHeight() {
	if(window.scrollY > 50) {
		header.classList.add('header--height');
	}
	else {
		header.classList.remove('header--height');
	}
}

// 4.2. SCROLL ACTIVE LINK 
function navActiveLinkScroll() {
	sections.forEach(item=> {
		let top 	= item.offsetTop - 100;
		let bottom 	= top + item.offsetHeight;
		let scroll 	= Math.floor(window.scrollY);
		let id 		= item.getAttribute('id');
		if(scroll > top && scroll < bottom) {
			navLinks.forEach(item=> {
				item.classList.remove('header__nav-item--active');
			})
			let activeLink = document.querySelector(`a[href="#${id}"]`).closest('.header__nav-item');
			activeLink.classList.add('header__nav-item--active');
		}
	})
}



// 5. ANCHORS 
navLinks.forEach(item=> {
	item.addEventListener('click', function(event) {
		event.preventDefault();
		let id = item.querySelector(`a[href]`).getAttribute('href');
		document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
	})
})




// 6. OBSERVER
const obs = new IntersectionObserver(watch);
sections.forEach(item=> {
	obs.observe(item);
})

// 6. 1. OBSERVER MAIN CALLBACK
function watch(entries) {
	entries.forEach(item=> {
		if(item.isIntersecting) {
			if(item.target.classList.contains('about')) {
				if(demosFlag) readyDemos();
			}
			if(item.target.classList.contains('benefits')) {
				if(progressFlag) benefitsProgress();
			}
			if(item.target.classList.contains('purchase')) {
				window.onscroll = parallax;
			}
		}
		else {
			if(item.target.classList.contains('purchase')) {
				window.onscroll = null;
			}
		}
	})
}


// 6. 2. OBSERVER READY DEMOS
function readyDemos() {
	let fps = 5;
	setTimeout(()=> {
		readyDemosVal++;
		demos.innerHTML = readyDemosVal;
		if(readyDemosVal < 12) readyDemos();
		else demosFlag = false;
	}, 1000 / fps);

}

// 6. 3. OBSERVER PURCHASE PARALLAX
function parallax(event) {
	let scroll = Math.floor(window.scrollY) - purchase.offsetTop;
	let center = purchase.offsetHeight / 2;
	let posY = Math.floor(-((scroll + center) * speed / 100));
	bg.style.backgroundPosition = `center ${posY}px`;
}

// 6. 4. OBSERVER BENEFITS PROGRESS
function benefitsProgress() {
	let fps = 50;
	setTimeout(()=> {
		skillVal++;
		skillPercent.forEach(item=> {
			item.innerHTML = skillVal + '%';
		})
		skillProgress.forEach(item=> {
			item.style.width = skillVal + '%';
		})
		if(skillVal < 100) benefitsProgress();
		else progressFlag = false;
	}, 1000 / fps);
}

