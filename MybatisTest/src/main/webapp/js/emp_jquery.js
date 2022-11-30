let emp = {
	selectEmp: function (e) {
		// 회원 조회
		let employeeId = $(e).parentsUntil('tbody').find('.text-center').eq(0).text();
		$.ajax({
			url: '../empSelect.do',
			method: 'post',
			contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
			data: {
				employeeId: employeeId
			},
			dataType: 'json',
			success: function (result) {
				$('#form1').find('input').eq(0).val(result.employeeId).prop("readonly", true);
				$('#form1').find('input').eq(1).val(result.firstName);
				$('#form1').find('input').eq(2).val(result.lastName);
				$('#form1').find('input').eq(3).val(result.email);
				$('#form1').find('input').eq(4).val(result.hireDate);
				$('#form1 select').val(result.jobId);
			},
			error: function (error) {
				console.log(error);
			}
		})
	},
	addEmp: function () {
		// 존재하는 사번인지 확인
		let id = $('#form1').find('input').eq(0).val();
		let check = true;
		$('.table>tbody>tr').not('[style="display: none"]').each(function (prop, emp) {
			if ($(emp).find('.text-center').eq(0).text() == id) {
				alert('이미 있는 사번입니다');
				check = false;
				return;
			}
		})
		if (check == false) {
			return;
		}

		// 회원 등록
		$.ajax({
			url: '../empAdd.do',
			method: 'post',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: $('#form1').serialize(),
			dataType: 'json',
			success: function (result) {
				console.log(result);
				let data = $('.table>tbody>tr').eq(0).clone();
				$(data).css("display", "");
				$(data).find('.text-center').eq(0).text(result.employeeId);
				$(data).find('.text-center').eq(1).text(result.lastName + " " + result
					.firstName);
				$(data).find('.text-center').eq(2).text(result.jobTitle);
				$('.table>tbody').append(data);
			},
			error: function (error) {
				console.log(error);
			}
		})
	},
	updateEmp: function () {
		// 회원 수정
		$.ajax({
			url: '../empModify.do',
			method: 'post',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: $('#form1').serialize(),
			dataType: 'json',
			success: function (result) {
				$('.table>tbody>tr').not('[style="display: none"]').each(function (prop, emp) {
					if ($(emp).find('.text-center').eq(0).text() == result.employeeId) {
						$(emp).find('.text-center').eq(1).text(result.lastName + " " +
							result.firstName);
						$(emp).find('.text-center').eq(2).text(result.jobTitle);
					}
				})
			},
			error: function (error) {
				console.log(error);
			}
		})
	},
	delEmp: function (e) {
		// 회원 삭제
		let employeeId = $(e).parentsUntil('tbody').find('.text-center').eq(0).text();
		$.ajax({
			url: '../empDelete.do',
			method: 'post',
			contentType: 'application/x-www-form-urlencoded;chartset=UTF-8',
			data: {
				employeeId: employeeId
			},
			success: function (result) {
				if (result == 'Success') {
					$(e).parentsUntil('tbody').remove();
				} else if (result == 'Fail') {
					alert('처리건수가 없습니다');
				}
			},
			error: function (error) {
				console.log(error);
			}
		})
	},
	init: function () {
		// 회원목록 출력
		$.ajax({
			url: '../empList.do',
			method: 'get',
			dataType: 'json',
			async: false,
			success: function (result) {
				$(result).each(function (prop, item) {
					let data = $('.table>tbody>tr').eq(0).clone();
					$(data).css("display", "");
					$(data).find('.text-center').eq(0).text(item.employeeId);
					$(data).find('.text-center').eq(1).text(item.lastName + " " + item
						.firstName);
					$(data).find('.text-center').eq(2).text(item.jobTitle);
					$('.table>tbody').append(data);
				})
			},
			error: function (error) {
				console.log(error);
			}
		});

		// 직업선택목록 출력
		$.ajax({
			url: '../jobList.do',
			method: 'get',
			dataType: 'json',
			async: false,
			success: function (result) {
				$(result).each(function (prop, item) {
					$('.form-control[name="job_id"]').append($('<option />').attr('id',
						item.jobId).val(item.jobId).text(item.jobTitle));
				})
			},
			error: function (error) {
				console.log(error);
			}
		});
	},
	reset: function () {
		// 입력창 초기화
		$('#form1').find('input').eq(0).val("").prop("readonly", false);
		$('#form1').find('input').eq(1).val("");
		$('#form1').find('input').eq(2).val("");
		$('#form1').find('input').eq(3).val("");
		$('#form1').find('input').eq(4).val("");
		$('#form1 select').val("");
	}
}

emp.init();