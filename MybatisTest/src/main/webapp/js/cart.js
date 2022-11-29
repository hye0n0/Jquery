function number_format(amount) {
	return new Intl.NumberFormat('ko-KR', {
		style: 'currency',
		currency: 'KRW'
	}).format(amount);
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function() {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};

let basket = {
	cartCount: 0, // 상품갯수
	cartTotal: 0, // 합계금액
	delCheckedItem: function() {
		// 선택삭제기능.
		$('input:checkbox:checked').parentsUntil('#basket').remove();
		this.updateUI();
	},
	delAllItem: function() {
		// 장바구니비우기.
		$('.data').remove();
		this.updateUI();
	},
	reCalc: function() {
		// 합계금액 계산.
		$('.data').each(function(prop, item) {
			let price = $(item).find('#p_price1').val();
			let qty = $(item).find('#p_num1').val();
			let sum = price * qty;
			$(item).find('.sum').text(number_format(sum) + "원");
			$(item).find('.sum').attr('sum', sum);
		})
		this.updateUI();
	},
	updateUI: function() {
		// 상품전체갯수, 합계금액 변경.
		let count = 0;
		let total = 0;
		$('.data').each(function(prop, item) {
			count += parseInt($(item).find('#p_num1').val())
			total += parseInt($(item).find('.sum').attr('sum'));
		});
		this.cartCount = count;
		this.cartTotal = total;
		$('#sum_p_num').text("상품갯수: " + this.cartCount + "개");
		$('#sum_p_price').text("합계금액: " + number_format(this.cartTotal) + "원");
	},
	changePNum: function(e, n) {
		// 상품수량 변경기능.
		let prevNum = $(e).parentsUntil('#basket').find('#p_num1').val();
		let num = parseInt(prevNum) + n;
		if (num == 0) {
			$(e).parentsUntil('#basket').remove();
		}
		$(e).parentsUntil('#basket').find('#p_num1').val(num);
		this.reCalc();
	},
	delItem: function(e) {
		// 삭제버튼.
		$(e).parentsUntil('#basket').remove();
		this.updateUI();
	},
	init: function() {

		// 상품목록 출력.
		$.ajax({
			url: '../cartList.do',
			method: 'get',
			dataType: 'json',
			async: false,
			success: function(result) {
				$(result).each(function(prop, item) {
					let data = $('.data').clone().eq(0);
					$(data).attr('id', item.NO).css("display", "block");
					console.log(item);
					$(data).find('.pname>span').text(item.PRODUCT_NM);
					$(data).find('#p_price1').val(item.PRICE);
					$(data).find('.basketprice').contents()[2].replaceWith(
						number_format(item.PRICE) + "원");
					$(data).find('#p_num1').val(item.QTY);
					$('#basket').append(data);
				})
			},
			error: function(error) {
				console.log(error);
			}
		});
		this.reCalc();
		this.updateUI();
	}
};

basket.init();