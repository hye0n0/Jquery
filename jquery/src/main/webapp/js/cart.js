<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

function number_format(amount) {
	return new Intl.NumberFormat('ko-KR', {
		style: 'currency',
		currency: 'KRW'
	}).format(amount);
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function () {
	if (this == 0) return 0;
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
	return nstr;
};

let basket = {
	cartCount: 0, // 상품갯수
	cartTotal: 0, // 합계금액
	delCheckedItem: function () {
		// 선택삭제기능.
		
	},
	delAllItem: function () {
		// 장바구니비우기.
	},
	reCalc: function () {
		// 합계금액 계산.
	},
	updateUI: function () {
		// 상품전체갯수, 합계금액 변경.
	},
	changePNum: function () {
		// 상품수량 변경기능.
	},
	delItem: function () {
		// 삭제버튼.
	},
	init: function() {
		// 상품목록 출력.	
		// fetch() => 화면출력	
	}
};

basket.init();