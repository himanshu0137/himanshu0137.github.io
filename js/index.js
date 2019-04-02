const constants = {
	dob: new Date(1996, 1, 15)
}

class StickyNavigation {

	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		$('.profile-tab').click((event) => {
			this.onTabClick(event, $(event.currentTarget));
		});
		$(window).scroll(() => this.onScroll());
		$(window).resize(() => this.onResize());
	}

	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}

	onScroll() {
		this.checkTabContainerPosition();
		this.findCurrentTabSelector();
	}

	onResize() {
		if (this.currentId) {
			this.setSliderCss();
		}
	}

	checkTabContainerPosition() {
		let offset = $('.profile-tabs').offset().top + $('.profile-tabs').height() - this.tabContainerHeight;
		if ($(window).scrollTop() > offset) {
			$('.profile-tabs-container').addClass('profile-tabs-container--top');
		}
		else {
			$('.profile-tabs-container').removeClass('profile-tabs-container--top');
		}
	}

	findCurrentTabSelector() {
		let newCurrentId;
		let newCurrentTab;
		$('.profile-tab').each((index, element) => {
			let id = $(element).attr('href');
			let offsetTop = $(id).offset().top - this.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - this.tabContainerHeight;
			if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(element);
			}
		});
		if (this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}

	setSliderCss() {
		let width = 0;
		let left = 0;
		if (this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.profile-tab-slider').css('width', width);
		$('.profile-tab-slider').css('left', left);
	}
}

new StickyNavigation();

document.getElementById('age').innerText = new Date().getFullYear() - constants.dob.getFullYear();