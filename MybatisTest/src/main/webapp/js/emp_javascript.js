let emp = {
    selectEmp: function (e) {
        // 회원 조회
        let employeeId = e.closest('tr').children[0].textContent;
        let data = "employeeId=" + employeeId;
        fetch('../empSelect.do', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: data
            })
            .then(result => {
                return result.json();
            })
            .then(result => {
                document.querySelectorAll('#form1 input')[0].value = result.employeeId;
                document.querySelectorAll('#form1 input')[0].setAttribute("readonly", true);
                document.querySelectorAll('#form1 input')[1].value = result.firstName;
                document.querySelectorAll('#form1 input')[2].value = result.lastName;
                document.querySelectorAll('#form1 input')[3].value = result.email;
                document.querySelectorAll('#form1 input')[4].value = result.hireDate;
                document.querySelector('#form1 select').value = result.jobId;
            })
            .catch(error => {
                console.log(error);
            })
    },
    addEmp: function () {
        // 존재하는 사번인지 확인
        let id =   document.querySelectorAll('#form1 input')[0].value;
        let check = true;
        document.querySelectorAll('.table>tbody>tr').forEach(tr => {
            if (tr.style.display != "none" && tr.children[0].textContent == id) {
                alert('이미 있는 사번입니다');
                check = false;
                return;
            }
        });
        if(check == false){
            return;
        }

        // 회원 등록
        let data = "";
        document.querySelectorAll('#form1 input[class="form-control"]').forEach((input, index) => {
            if (index == 0) {
                data += input.getAttribute('name') + "=" + input.value;
            } else {
                data += "&" + input.getAttribute('name') + "=" + input.value;
            }
        });
        let select = document.querySelector('#form1 select');
        data += "&" + select.getAttribute('name') + "=" + select.value;
        console.log(data);
        fetch('../empAdd.do', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: data
            })
            .then(result => {
                return result.json();
            })
            .then(result => {
                let data = document.querySelectorAll('.table>tbody>tr')[0].cloneNode(true);
                data.style.display = "";
                data.querySelectorAll('td')[0].textContent = result.employeeId;
                data.querySelectorAll('td')[1].textContent = result.lastName + " " + result
                    .firstName;
                data.querySelectorAll('td')[2].textContent = result.jobTitle;
                document.querySelector('.table>tbody').append(data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    updateEmp: function () {
        // 회원 수정
        let data = "";
        document.querySelectorAll('#form1 input[class="form-control"]').forEach((input, index) => {
            if (index == 0) {
                data += input.getAttribute('name') + "=" + input.value;
            } else {
                data += "&" + input.getAttribute('name') + "=" + input.value;
            }
        });
        let select = document.querySelector('#form1 select');
        data += "&" + select.getAttribute('name') + "=" + select.value;
        console.log(data);
        fetch('../empModify.do', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: data
            })
            .then(result => {
                return result.json();
            })
            .then(result => {
                document.querySelectorAll('.table>tbody>tr').forEach(tr => {
                    if (tr.style.display != "none" && tr.children[0].textContent == result
                        .employeeId) {
                        tr.children[1].textContent = result.lastName + " " + result.firstName;
                        tr.children[2].textContent = result.jobTitle;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            })
    },
    delEmp: function (e) {
        // 회원 삭제
        let employeeId = e.closest('tr').children[0].textContent;
        let data = "employeeId=" + employeeId;
        fetch('../empDelete.do', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: data
            })
            .then(result => {
                return result.text();
            })
            .then(result => {
                if (result == 'Success') {
                    e.closest('tr').remove();
                } else if (result == 'Fail') {
                    alert('처리건수가 없습니다');
                }
            })
            .catch(error => {
                console.log(error);
            })
    },
    init: function () {
        // 회원목록 출력
        fetch('../empList.do')
            .then(result => {
                return result.json();
            })
            .then(result => {
                result.forEach(item => {
                    let data = document.querySelectorAll('.table>tbody>tr')[0].cloneNode(true);
                    data.style.display = "";
                    data.querySelectorAll('td')[0].textContent = item.employeeId;
                    data.querySelectorAll('td')[1].textContent = item.lastName + " " + item
                        .firstName;
                    data.querySelectorAll('td')[2].textContent = item.jobTitle;
                    document.querySelector('.table>tbody').append(data);
                });
            })
            .catch(error => {
                console.log(error);
            })

        // 직업선택목록 출력
        fetch('../jobList.do')
            .then(result => {
                return result.json();
            })
            .then(result => {
                result.forEach(item => {
                    let option = document.createElement('option')
                    option.setAttribute('value', item.jobId);
                    option.setAttribute('id', item.jobId);
                    option.textContent = item.jobTitle;
                    document.querySelector('.form-control[name="job_id"]').append(option);
                });
            })
            .catch(error => {
                console.log(error);
            })
    },
    reset: function () {
        // 입력창 초기화
        document.querySelectorAll('#form1 input')[0].value = "";
        document.querySelectorAll('#form1 input')[0].removeAttribute("readonly");
        document.querySelectorAll('#form1 input')[1].value = "";
        document.querySelectorAll('#form1 input')[2].value = "";
        document.querySelectorAll('#form1 input')[3].value = "";
        document.querySelectorAll('#form1 input')[4].value = "";
        document.querySelector('#form1 select').value = "";
    }
}

emp.init();