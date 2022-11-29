/**
 * 
 */

export default class UL {
	constructor(data) {
		this.data = data;
		this.makeUl();
		return this.ul;
	}
	makeUl() {
		this.ul = document.createElement('ul');
		this.makeli();
	}
	makeli() {
		for (let item of this.data) {
			let li = document.createElement('li');
			li.innerText = item;
			this.ul.append(li);
		}

	}
}