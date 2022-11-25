package co.micol.prj.board.command;

import java.text.SimpleDateFormat;
import java.util.Date;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.ReplyVO;
import co.micol.prj.common.Command;


public class ReplyAdd implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		int boardNo = Integer.parseInt(request.getParameter("boardNo"));
		String content = request.getParameter("content");
		
		HttpSession session = request.getSession();
		String name = (String) session.getAttribute("name");
		
		ReplyVO vo = new ReplyVO();
		vo.setBoardNo(boardNo);
		vo.setContent(content);
		vo.setWriter(name);
		
		Date date = new Date();
		SimpleDateFormat sidf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String d = sidf.format(date);
		vo.setWriteDate(d);
		
		BoardService service = new BoardServiceImpl();
		service.replyInsert(vo);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		
		try {
			json = mapper.writeValueAsString(vo);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return "ajax:" + json;
	}

}
