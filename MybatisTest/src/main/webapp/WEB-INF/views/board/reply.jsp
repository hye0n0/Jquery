<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
            <td>작성자:</td>
            <td id="board_writer"></td>
            <td>작성일자</td>
            <td id="board_writeDate"></td>
        </tr>
    </table>
</div>
<div>
    <table>
        <tr>
            <td><span>작성자</span><span>작성일자</span></td>
            <td>내용</td>
            <td>삭제</td>
        </tr>
    </table>
</div>
<div>
    <form>
        <textarea id="reply_content" name="reply_content"></textarea>
        <input type="button" value="글쓰기">
    </form>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
    $(function(){
        let boardNo = sessionStorage.getItem('boardNo');
        // 글 상세 출력
        $.ajax({
            url: 'boardSelect.do',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {"boardNo": boardNo},
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

        // 댓글목록출력
        // $.ajax({
        //     url: 'replyList.do',
        //     method: 'post',
        //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        //     data: {"boardNo": boardNo},
        //     dataType: 'json',
        //     success: function (result) {
        //         console.log(result);
        //         $('#boardList').append(makeTr(result));
        //         init();
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // })
    })
</script>