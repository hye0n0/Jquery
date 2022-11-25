package co.micol.prj.board.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.ReplyVO;
import co.micol.prj.book.service.BookService;
import co.micol.prj.book.service.impl.BookServiceImpl;
import co.micol.prj.book.vo.BookVO;
import co.micol.prj.common.Command;

public class ReplyDelete implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		int replyNo = Integer.parseInt(request.getParameter("replyNo"));

		ReplyVO vo = new ReplyVO();
		vo.setReplyNo(replyNo);

		BoardService service = new BoardServiceImpl();
		int result = service.replyDelete(vo);
		String json = null;
		if (result > 0) {
			json = "Success";
		} else {
			json = "Fail";
		}

		return "ajax:" + json;
	}

}
