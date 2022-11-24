/**
 *  ajaxjquery.js
 */
console.log('ajaxjquery')

$(function () {
	// 도서목록 json 타입 -> 화면에 출력.
	$.ajax({
		url: 'ajaxBookList.do',
		method: 'get',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			$.each(result, function (prop, item) {
				$('#list').append(makeTr(item));
			})
		},
		error: function (error) {
			console.log(error);
		}
	});

	//등록이벤트
	$('#addBtn').on('click', addBookFnc);
});

function addBookFnc() {
	let code = $('input[name="bCode"]').val();
	let title = $('input[name="bTitle"]').val();
	let author = $('input[name="bAuthor"]').val();
	let press = $('input[name="bPress"]').val();
	let price = $('input[name="bPrice"]').val();

	console.log($('form[name="myfrm"]').serialize());

	$.ajax({
		url: 'ajaxBookAdd.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		//data: {bCode: code, bTitle: title, bAuthor: author, bPress: press, bPrice: price},
		data: $('form[name="myfrm"]').serialize(),
		dataType: 'json',
		success: function (result) {
			console.log(result);
			$('#list').append(makeTr(result));
			init();
		},
		error: function (error) {
			console.log(error);
		}
	})
}

function init() {
	$('input[name="bCode"]').val("");
	$('input[name="bTitle"]').val("");
	$('input[name="bAuthor"]').val("");
	$('input[name="bPress"]').val("");
	$('input[name="bPrice"]').val("");
}

function makeTr(book = {
	bookCode: "",
	bookTitle: "",
	bookAuthor: "",
	bookPress: "",
	bookPrice: ""
}) {
	return $('<tr />').append(
		$('<td />').text(book.bookCode),
		$('<td />').text(book.bookTitle),
		$('<td />').text(book.bookAuthor),
		$('<td />').text(book.bookPress),
		$('<td />').text(book.bookPrice),
		$('<td />').append($('<button />').text('수정').on('click', book, modifyfrm)),
		$('<td />').append($('<button />').text('삭제').on('click', book, deleteData))
	).on('click', book, modalData);
}

//모달창 정보 출력
function modalData(e) {
	let code = e.data.bookCode;
	let thisTr = $(this);
	// 조회컨트롤
	$.ajax({
		url: 'ajaxBookSelect.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
		data: {
			bookCode: code
		},
		dataType: 'json',
		success: function (result) {
			console.log(result);
			$('#id01').css('display', 'block');
			$('.container input').eq(0).val(result.bookCode);
			$('.container input').eq(1).val(result.bookTitle);
			$('.container input').eq(2).val(result.bookAuthor);
			$('.container input').eq(3).val(result.bookPress);
			$('.container input').eq(4).val(result.bookPrice);
		},
		error: function (error) {
			console.log(error);
		}
	})
	$('.container button:contains(OK)').on('click', function () {
		localStorage.setItem('code', $(this).parentsUntil('.modal').find('input').eq(0).val());
		localStorage.setItem('title', $(this).parentsUntil('.modal').find('input').eq(1).val());
		localStorage.setItem('author', $(this).parentsUntil('.modal').find('input').eq(2).val());
		localStorage.setItem('press', $(this).parentsUntil('.modal').find('input').eq(3).val());
		localStorage.setItem('price', $(this).parentsUntil('.modal').find('input').eq(4).val());
		modifyData();
	})
}

// 테이블 아래 정보 출력
function selectData(e) {
	let code = e.data.bookCode;

	// 조회컨트롤
	$.ajax({
		url: 'ajaxBookSelect.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
		data: {
			bookCode: code
		},
		dataType: 'json',
		success: function (result) {
			console.log(result);
			$('#content').children().eq(0).children().last().text(result.bookCode);
			$('#content').children().eq(1).children().last().text(result.bookTitle);
			$('#content').children().eq(2).children().last().text(result.bookAuthor);
			$('#content').children().eq(3).children().last().text(result.bookPress);
			$('#content').children().eq(4).children().last().text(result.bookPrice);
		},
		error: function (error) {
			console.log(error);
		}
	})
}

function deleteData(e) {
	console.log(e.data);
	let code = e.data.bookCode;
	let btn = $(this);

	// 삭제컨트롤
	$.ajax({
		url: 'ajaxBookDelete.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
		data: {
			bookCode: code
		},
		success: function (result) {
			console.log(result);
			if (result == 'Success') {
				$(btn).parentsUntil('#list').remove();
			} else if (result == 'Fail') {
				alert('처리건수가 없습니다');
			}
		},
		error: function (error) {
			console.log(error);
		}
	})

	localStorage.removeItem('code');
	localStorage.removeItem('title');
	localStorage.removeItem('author');
	localStorage.removeItem('press');
	localStorage.removeItem('price');
}

function modifyfrm(e) {
	console.log(e.data);
	localStorage.setItem('code', e.data.bookCode);
	localStorage.setItem('title', e.data.bookTitle);
	localStorage.setItem('author', e.data.bookAuthor);
	localStorage.setItem('press', e.data.bookPress);
	localStorage.setItem('price', e.data.bookPrice);
	let thisTr = $(this);
	localStorage.setItem('thisTr', thisTr);

	let newTr = $('<tr />').append(
		$('<td />').text(e.data.bookCode),
		$('<td />').append($('<input />').val(e.data.bookTitle).on('change', function () {
			localStorage.setItem('title', $(this).val());
		})),
		$('<td />').append($('<input />').val(e.data.bookAuthor).on('change', function () {
			localStorage.setItem('author', $(this).val());
		})),
		$('<td />').append($('<input />').val(e.data.bookPress).on('change', function () {
			localStorage.setItem('press', $(this).val());
		})),
		$('<td />').append($('<input />').val(e.data.bookPrice).on('change', function () {
			localStorage.setItem('price', $(this).val());
		})),
		$('<td />').append($('<button />').text('변경').on('click', modifyData))
	);

	$(this).parentsUntil('#list').replaceWith(newTr);
}

function modifyData(e) {
	let code = localStorage.getItem('code');
	let title = localStorage.getItem('title');
	let author = localStorage.getItem('author');
	let press = localStorage.getItem('press');
	let price = localStorage.getItem('price');
	let thisTr = localStorage.getItem('thisTr');
	console.log(thisTr);
	let book = {
		bookCode: code,
		bookTitle: title,
		bookAuthor: author,
		bookPress: press,
		bookPrice: price
	};
	let btn = $(this);
	// 수정컨트롤
	$.ajax({
		url: 'ajaxBookModify.do',
		method: 'post',
		contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
		data: book,
		success: function (result) {
			console.log(result);
			if (result == 'Success') {
				let newTr = makeTr(book);
				$(btn).parentsUntil('#list').replaceWith(newTr);
			} else if (result == 'Fail') {
				alert('처리건수가 없습니다');
			}
		},
		error: function (error) {
			console.log(error);
		}
	})

	localStorage.removeItem('code');
	localStorage.removeItem('title');
	localStorage.removeItem('author');
	localStorage.removeItem('press');
	localStorage.removeItem('price');
	localStorage.removeItem('price');
}