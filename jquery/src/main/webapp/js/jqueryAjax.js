// 화면에 출력.

let data = [{
	item: '상품1',
	itemCode: 'G001',
	price: 5000,
	salePrice: 4000,
	likeIt: 5,
	image: 'img1.jpg'
}, {
	item: '상품2',
	itemCode: 'G002',
	price: 5500,
	salePrice: 4500,
	likeIt: 4,
	image: 'img2.jpg'
}, {
	item: '상품3',
	itemCode: 'G003',
	price: 4000,
	salePrice: 3000,
	likeIt: 4.5,
	image: 'img3.jpg'
}, {
	item: '상품4',
	itemCode: 'G004',
	price: 7000,
	salePrice: 5000,
	likeIt: 3.5,
	image: 'img4.jpg'
}, {
	item: '상품5',
	itemCode: 'G005',
	price: 5500,
	salePrice: 4500,
	likeIt: 3.5,
	image: 'img5.jpg'
}, {
	item: '상품6',
	itemCode: 'G006',
	price: 8000,
	salePrice: 7000,
	likeIt: 2,
	image: 'img6.jpg'
}]

$(function() {
	$(data).each(function(idx, item) {
		let clon = $('#template>div').clone();
		$(clon).find('.fw-bolder').text(item.item);
		$(clon).find('.text-muted').text(item.price);
		$(clon).find('.card-body>div').contents()[12].replaceWith("\u00A0\u00A0" + item.salePrice);
		$(clon).find('.bi-star-fill').each(function(idx, star) {
			if (idx + 1 > item.likeIt) {
				$(this).remove();
			}
		})
		if (item.likeIt % 1 != 0) {
			$(clon).find('.d-flex').append('<div class="bi-star-half"></div>');
		}
		$(clon).find('.card-img-top').attr('src', 'img/'+item.image);
		console.log(clon.get());
		$('#list').append(clon);
	})
})