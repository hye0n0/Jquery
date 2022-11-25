<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<style>
    .boardFrm {
        border: 1px solid black;
        margin-top: 50px;
        height: 300px;
        width: 700px;
    }

    .boardFrm form {
        width: 100%;
        line-height: 50px;
    }

    .boardFrm label {
        vertical-align: -webkit-baseline-middle;
        background-color: rgb(44 189 159);
        color: white;
        width: 50px;
        padding: 5px 15px;
        border-radius: 30px;
        font-size: 20px;
    }

    .boardFrm input[type=text] {
        vertical-align: text-top;
        width: 300px;
        margin-left: 25px;
        height: 30px;
        border: 1px solid #e3dddd;
        border-radius: 3px;
        box-shadow: 0px 0px 4px -2px silver;
    }

    .boardFrm textarea {
        vertical-align: text-top;
        width: 300px;
        height: 100px;
        margin-left: 25px;
        border: 1px solid #e3dddd;
        border-radius: 3px;
        box-shadow: 0px 0px 4px -2px silver;
    }

    .boardFrm input[type=button] {
        padding: 8px 31px;
        font-size: 15px;
        border: none;
        background-color: #ddd;
        border-radius: 5px;
        margin: 0px 10px;
    }

    .boardFrm input[type=reset] {
        padding: 8px 31px;
        font-size: 15px;
        border: none;
        background-color: #ddd;
        border-radius: 5px;
        margin: 0px 10px;
    }

    .tbl_board{
        margin-top: 50px;
        width: 700px;
    }

    .tbl_board table{
        width: 100%;
        text-align: center;
        border-collapse:collapse;
    }
    .tbl_board tr{
        height: 50px;
        border-top: 1px solid #bbb;
    }
    .tbl_board tbody tr:last-child{
        border-bottom: 2px solid #aaa;
    }
    .tbl_board th{
        background-color: #ddd;
    }
</style>

<div class="boardFrm">
    <form name="boardFrm" action="">
        <label for="boardTitle">제목</label><input type="text" id="boardTitle" name="boardTitle"><br>
        <label for="boardContent">내용</label><textarea id="boardContent" name="boardContent"></textarea><br>
        <label for="boardWriter">작성자</label><input type="text" id="boardWriter" name="boardWriter"><br>
        <input type="button" value="등록" id="addBtn">
        <input type="reset" value="취소">
    </form>
</div>

<div class="tbl_board">
    <table>
        <thead>
            <tr>
                <th style="width: 30%;">No.</th>
                <th style="width: 40%;">제목</th>
                <th style="width: 30%;">작성자</th>
            </tr>
        </thead>
        <tbody id="boardList">
        </tbody>
    </table>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
    $(function () {
        // 글 목록 출력
        $.ajax({
            url: 'boardList.do',
            method: 'get',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $.each(result, function (prop, item) {
                    $('#boardList').append(makeTr(item));
                })
            },
            error: function (error) {
                console.log(error);
            }
        });

        //글추가 이벤트
        $('#addBtn').on('click', addBoard);
    })

    // 글목록 tr 생성
    function makeTr(e) {
        return $('<tr />').append(
            $('<td />').text(e.boardNo).on('click', e.boardNo, reply),
            $('<td />').text(e.title),
            $('<td />').text(e.writer)
        )
    }

    function reply(e) {
        sessionStorage.setItem("boardNo", e.data);
        location.href = "reply.do"
    }

    function addBoard() {
        $.ajax({
            url: 'boardAdd.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: $('form[name="boardFrm"]').serialize(),
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#boardList').append(makeTr(result));
                init();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function init() {
        $('input[name="boardTitle"]').val("");
        $('textarea[name="boardContent"]').val("");
        $('input[name="boardWriter"]').val("");
    }
</script>