package co.micol.prj.board.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.common.Command;

public class BoardSelect implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		int no = Integer.parseInt(request.getParameter("boardNo"));

		BoardVO vo = new BoardVO();
		vo.setBoardNo(no);

		BoardService service = new BoardServiceImpl();
		BoardVO board = new BoardVO();
		board = service.boardSelect(vo);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(board);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return "ajax:" + json;
	}

}
