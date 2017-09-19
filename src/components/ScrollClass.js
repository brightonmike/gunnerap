export default class ScrollClass {
	constructor(element, options) {
		this.element = element;
		this.scrollClass = options[0];
		this.offset = options[1];
		this.handleScroll();
	}

	handleScroll() {
		const element = this.element,
			scrollClass = this.scrollClass,
			offset = this.offset || element.offsetTop;

		window.addEventListener('scroll', () => {
			if (scrollClass && window.scrollY > offset) {
				element.classList.add(scrollClass);
			}
		});
	}
}