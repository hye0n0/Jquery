<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="boardFrm" style="border: 1px solid black;">
    <form name="boardFrm" action="">
        <label for="boardTitle">제목</label><input type="text" id="boardTitle" name="boardTitle">
        <label for="boardContent">내용</label><textarea type="text" id="boardContent" name="boardContent"></textarea>
        <label for="boardWriter">작성자</label><input type="text" id="boardWriter" name="boardWriter">
        <input type="button" value="등록" id="addBtn">
        <input type="reset" value="취소">
    </form>
</div>

<div class="tbl_board">
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
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
            $('<td />').text(e.boardNo).on('click', e.boardNo , reply),
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