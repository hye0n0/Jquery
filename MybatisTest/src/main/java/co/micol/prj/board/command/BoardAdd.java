package co.micol.prj.board.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.common.Command;

public class BoardAdd implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		String title = request.getParameter("boardTitle");
		String content = request.getParameter("boardContent");
		String writer = request.getParameter("boardWriter");
		
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setContent(content);
		vo.setWriter(writer);
		
		BoardService service = new BoardServiceImpl();
		service.boardInsert(vo);
		
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
