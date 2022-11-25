<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>
    .board_info {
        width: 1000px;
        border: 1px solid black;
        margin-top: 50px;
    }

    .board_info table {
        width: 70%;
    }

    .board_info tr:nth-child(odd) {
        height: 50px;
    }

    #replyList {
        width: 700px;
        margin-top: 50px;
    }

    #replyList div {
        width: 100%;
        border-bottom: 1px solid black;
    }

    #replyList tr {
        height: 32px;
    }

    #replyList td {
        vertical-align: middle;
    }

    #replyList td:first-child {
        background-color: #ddd;
        text-align: center;
        border-radius: 10px;
        font-size: 14px;
    }

    #replyList td:nth-child(2) {
        padding: 0px 10px;
    }

    #replyList button {
        border: none;
        font-size: 15px;
        padding: 5px 18px;
        background-color: #ddd;
        border-radius: 5px;

    }

    .replyFrm {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .replyFrm textarea {
        vertical-align: middle;
        width: 500px;
        height: 100px;
        border: 1px solid #e3dddd;
        border-radius: 3px;
        box-shadow: 2px 2px 6px -2px silver;
    }

    .replyFrm input {
        vertical-align: middle;
        margin-left: 30px;
        background-color: #52a6e9;
        color: white;
        border: none;
        padding: 10px 25px;
        font-size: 15px;
        border-radius: 5px;
    }
</style>
<div class="board_info">
    <table>
        <tr>
            <td>제목:</td>
            <td colspan="3" id="board_title"></td>
        </tr>
        <tr>
            <td>내용:</td>
            <td colspan="3" id="board_content"></td>
        </tr>
        <tr>
            <td style="width: 15%;">작성자:</td>
            <td id="board_writer" style="width: 30%;"></td>
            <td style="width: 15%;">작성일자</td>
            <td id="board_writeDate" style="width: 30%;"></td>
        </tr>
    </table>
</div>
<div class="replyList">
    <table id="replyList">
    </table>
</div>
<div class="replyFrm">
    <form>
        <textarea id="reply_content" name="reply_content"></textarea>
        <input type="button" value="글쓰기" id="addBtn">
    </form>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
    $(function () {
        let boardNo = sessionStorage.getItem('boardNo');
        // 글 상세 출력
        $.ajax({
            url: 'boardSelect.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                "boardNo": boardNo
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#board_title').text(result.title);
                $('#board_content').text(result.content);
                $('#board_writer').text(result.writer);
                $('#board_writeDate').text(result.writeDate);
            },
            error: function (error) {
                console.log(error);
            }
        })

        // 댓글 목록 출력
        $.ajax({
            url: 'replyList.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                "boardNo": boardNo
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $.each(result, function (prop, item) {
                    $('#replyList').append(makeReply(item));
                })
            },
            error: function (error) {
                console.log(error);
            }
        })

        //댓글추가 이벤트
        $('#addBtn').on('click', addReply);
    })

    function addReply() {
        let content = $('#reply_content').val();
        let boardNo = sessionStorage.getItem('boardNo');

        $.ajax({
            url: 'replyAdd.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                boardNo: boardNo,
                content: content
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $('#replyList').append(makeReply(result));
                init();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function makeReply(e) {
        return $('<div />').append(
            $('<tr />').append(
                $('<td />').text("No: " + e.replyNo + "\u00A0\u00A0" + e.writer).css('width', '25%'),
                $('<td />').attr("rowspan", 2).text(e.content).css('width', '65%'),
                $('<td />').attr("rowspan", 2).append($('<button />').text("삭제").on('click', e.replyNo,
                    deleteReply)).css('width', '10%')
            ),
            $('<tr />').append(
                $('<td />').text(e.writeDate)
            )
        )
    }

    function deleteReply(e) {
        let replyNo = e.data;
        let reply = $(this).parentsUntil('table');

        $.ajax({
            url: 'replyDelete.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
                replyNo: replyNo
            },
            success: function (result) {
                console.log(result);
                if (result == 'Success') {
                    $(reply).remove();
                } else if (result == 'Fail') {
                    alert('처리건수가 없습니다');
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function init() {
        $('textarea[name="reply_content"]').val("");
    }
</script>