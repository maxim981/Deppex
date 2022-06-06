
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
		if(readyDemosVal < 12) {
			readyDemosVal++;
			demos.innerHTML = readyDemosVal;
			requestAnimationFrame(readyDemos);
		}
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
		if(skillVal < 100) {
			requestAnimationFrame(benefitsProgress);
		}
		else progressFlag = false;
	}, 1000 / fps);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKlxyXG5cdDEuIFNMSURFUlxyXG5cdDIuIFNFTEVDVE9SU1xyXG5cdDMuIFZBUklBQkxFU1xyXG5cdDQuIFNDUk9MTFxyXG5cdFx0NC4xLiBTQ1JPTEwgSEVBREVSIEhFSUdIVFxyXG5cdFx0NC4yLiBTQ1JPTEwgQUNUSVZFIExJTktcclxuXHQ1LiBBTkNIT1JTXHJcblx0Ni4gT0JTRVJWRVJcclxuXHRcdDYuIDEuIE9CU0VSVkVSIE1BSU4gQ0FMTEJBQ0tcclxuXHRcdDYuIDIuIE9CU0VSVkVSIFJFQURZIERFTU9TXHJcblx0XHQ2LiAzLiBPQlNFUlZFUiBQVVJDSEFTRSBQQVJBTExBWFxyXG5cdFx0Ni4gNC4gT0JTRVJWRVIgQkVORUZJVFMgUFJPR1JFU1NcclxuXHJcbiovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vLyAxLiBTTElERVJcclxuY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlcicsIHtcclxuXHRsb29wOiB0cnVlLFxyXG5cdHNsaWRlc1BlclZpZXc6IDQsXHJcblx0c3BlZWQ6IDYwMCxcclxuXHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuXHRcdHByZXZFbDogJy5zd2lwZXItYnV0dG9uLXByZXYnLFxyXG5cdH0sXHJcblx0YXV0b3BsYXk6IHtcclxuXHRcdGRlbGF5OiA0MDAwLFxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLy8gMi4gU0VMRUNUT1JTXHJcbmNvbnN0IGJnIFx0XHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHVyY2hhc2VfX3BhcmFsbGF4LWJnJyk7XHJcbmNvbnN0IHB1cmNoYXNlIFx0XHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnB1cmNoYXNlJyk7XHJcbmNvbnN0IGhlYWRlciBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuY29uc3Qgc2VjdGlvbnNcdCBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5jaG9yLXNlY3Rpb24nKTtcclxuY29uc3QgbmF2TGlua3MgXHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX19uYXYtaXRlbScpO1xyXG5jb25zdCBiZW5lZml0cyBcdFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZW5lZml0cycpO1xyXG5jb25zdCBza2lsbFBlcmNlbnQgXHRcdD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsLXRhYmxlX19wZXJjZW50Jyk7XHJcbmNvbnN0IHNraWxsUHJvZ3Jlc3MgXHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbC10YWJsZV9fcHJvZ3Jlc3MnKTtcclxuY29uc3QgZGVtb3MgXHRcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX3JlYWR5LWFtb3VudCcpXHJcblxyXG5cclxuLy8gMy4gVkFSSUFCTEVTXHJcbmxldCBzcGVlZCBcdFx0XHRcdD0gNTA7XHJcbmxldCBwcm9ncmVzc0ZsYWcgXHRcdD0gdHJ1ZTtcclxubGV0IHNraWxsVmFsIFx0XHRcdD0gMDtcclxubGV0IHJlYWR5RGVtb3NWYWwgXHRcdD0gMDtcclxubGV0IGRlbW9zRmxhZ1x0XHRcdD0gdHJ1ZTtcclxuXHJcblxyXG5cclxuLy8gNC4gU0NST0xMXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRoZWFkZXJIZWlnaHQoKTtcclxuXHRuYXZBY3RpdmVMaW5rU2Nyb2xsKCk7XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbCk7XHJcbn1cclxuZnVuY3Rpb24gc2Nyb2xsKCkge1xyXG5cdGhlYWRlckhlaWdodCgpO1xyXG5cdG5hdkFjdGl2ZUxpbmtTY3JvbGwoKTtcclxufVxyXG5cclxuLy8gNC4xLiBTQ1JPTEwgSEVBREVSIEhFSUdIVFxyXG5mdW5jdGlvbiBoZWFkZXJIZWlnaHQoKSB7XHJcblx0aWYod2luZG93LnNjcm9sbFkgPiA1MCkge1xyXG5cdFx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0taGVpZ2h0Jyk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0aGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0taGVpZ2h0Jyk7XHJcblx0fVxyXG59XHJcblxyXG4vLyA0LjIuIFNDUk9MTCBBQ1RJVkUgTElOSyBcclxuZnVuY3Rpb24gbmF2QWN0aXZlTGlua1Njcm9sbCgpIHtcclxuXHRzZWN0aW9ucy5mb3JFYWNoKGl0ZW09PiB7XHJcblx0XHRsZXQgdG9wIFx0PSBpdGVtLm9mZnNldFRvcCAtIDEwMDtcclxuXHRcdGxldCBib3R0b20gXHQ9IHRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0bGV0IHNjcm9sbCBcdD0gTWF0aC5mbG9vcih3aW5kb3cuc2Nyb2xsWSk7XHJcblx0XHRsZXQgaWQgXHRcdD0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcblx0XHRpZihzY3JvbGwgPiB0b3AgJiYgc2Nyb2xsIDwgYm90dG9tKSB7XHJcblx0XHRcdG5hdkxpbmtzLmZvckVhY2goaXRlbT0+IHtcclxuXHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fbmF2LWl0ZW0tLWFjdGl2ZScpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRsZXQgYWN0aXZlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbaHJlZj1cIiMke2lkfVwiXWApLmNsb3Nlc3QoJy5oZWFkZXJfX25hdi1pdGVtJyk7XHJcblx0XHRcdGFjdGl2ZUxpbmsuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19uYXYtaXRlbS0tYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuXHJcblxyXG4vLyA1LiBBTkNIT1JTIFxyXG5uYXZMaW5rcy5mb3JFYWNoKGl0ZW09PiB7XHJcblx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IGlkID0gaXRlbS5xdWVyeVNlbGVjdG9yKGBhW2hyZWZdYCkuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKS5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcclxuICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcsXHJcbiAgICAgICAgfSk7XHJcblx0fSlcclxufSlcclxuXHJcblxyXG5cclxuXHJcbi8vIDYuIE9CU0VSVkVSXHJcbmNvbnN0IG9icyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih3YXRjaCk7XHJcbnNlY3Rpb25zLmZvckVhY2goaXRlbT0+IHtcclxuXHRvYnMub2JzZXJ2ZShpdGVtKTtcclxufSlcclxuXHJcbi8vIDYuIDEuIE9CU0VSVkVSIE1BSU4gQ0FMTEJBQ0tcclxuZnVuY3Rpb24gd2F0Y2goZW50cmllcykge1xyXG5cdGVudHJpZXMuZm9yRWFjaChpdGVtPT4ge1xyXG5cdFx0aWYoaXRlbS5pc0ludGVyc2VjdGluZykge1xyXG5cdFx0XHRpZihpdGVtLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Fib3V0JykpIHtcclxuXHRcdFx0XHRpZihkZW1vc0ZsYWcpIHJlYWR5RGVtb3MoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihpdGVtLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2JlbmVmaXRzJykpIHtcclxuXHRcdFx0XHRpZihwcm9ncmVzc0ZsYWcpIGJlbmVmaXRzUHJvZ3Jlc3MoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihpdGVtLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3B1cmNoYXNlJykpIHtcclxuXHRcdFx0XHR3aW5kb3cub25zY3JvbGwgPSBwYXJhbGxheDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmKGl0ZW0udGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHVyY2hhc2UnKSkge1xyXG5cdFx0XHRcdHdpbmRvdy5vbnNjcm9sbCA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuLy8gNi4gMi4gT0JTRVJWRVIgUkVBRFkgREVNT1NcclxuZnVuY3Rpb24gcmVhZHlEZW1vcygpIHtcclxuXHRsZXQgZnBzID0gNTtcclxuXHRzZXRUaW1lb3V0KCgpPT4ge1xyXG5cdFx0aWYocmVhZHlEZW1vc1ZhbCA8IDEyKSB7XHJcblx0XHRcdHJlYWR5RGVtb3NWYWwrKztcclxuXHRcdFx0ZGVtb3MuaW5uZXJIVE1MID0gcmVhZHlEZW1vc1ZhbDtcclxuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlYWR5RGVtb3MpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBkZW1vc0ZsYWcgPSBmYWxzZTtcclxuXHR9LCAxMDAwIC8gZnBzKTtcclxuXHJcbn1cclxuXHJcbi8vIDYuIDMuIE9CU0VSVkVSIFBVUkNIQVNFIFBBUkFMTEFYXHJcbmZ1bmN0aW9uIHBhcmFsbGF4KGV2ZW50KSB7XHJcblx0bGV0IHNjcm9sbCA9IE1hdGguZmxvb3Iod2luZG93LnNjcm9sbFkpIC0gcHVyY2hhc2Uub2Zmc2V0VG9wO1xyXG5cdGxldCBjZW50ZXIgPSBwdXJjaGFzZS5vZmZzZXRIZWlnaHQgLyAyO1xyXG5cdGxldCBwb3NZID0gTWF0aC5mbG9vcigtKChzY3JvbGwgKyBjZW50ZXIpICogc3BlZWQgLyAxMDApKTtcclxuXHRiZy5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBgY2VudGVyICR7cG9zWX1weGA7XHJcbn1cclxuXHJcbi8vIDYuIDQuIE9CU0VSVkVSIEJFTkVGSVRTIFBST0dSRVNTXHJcbmZ1bmN0aW9uIGJlbmVmaXRzUHJvZ3Jlc3MoKSB7XHJcblx0bGV0IGZwcyA9IDUwO1xyXG5cdHNldFRpbWVvdXQoKCk9PiB7XHJcblx0XHRza2lsbFZhbCsrO1xyXG5cdFx0c2tpbGxQZXJjZW50LmZvckVhY2goaXRlbT0+IHtcclxuXHRcdFx0aXRlbS5pbm5lckhUTUwgPSBza2lsbFZhbCArICclJztcclxuXHRcdH0pXHJcblx0XHRza2lsbFByb2dyZXNzLmZvckVhY2goaXRlbT0+IHtcclxuXHRcdFx0aXRlbS5zdHlsZS53aWR0aCA9IHNraWxsVmFsICsgJyUnO1xyXG5cdFx0fSlcclxuXHRcdGlmKHNraWxsVmFsIDwgMTAwKSB7XHJcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShiZW5lZml0c1Byb2dyZXNzKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgcHJvZ3Jlc3NGbGFnID0gZmFsc2U7XHJcblx0fSwgMTAwMCAvIGZwcyk7XHJcbn1cclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
