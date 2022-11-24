package co.micol.prj.board.command;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.board.service.BoardService;
import co.micol.prj.board.service.impl.BoardServiceImpl;
import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.common.Command;

public class BoardList implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		BoardService dao = new BoardServiceImpl();
		List<BoardVO> boards = new ArrayList<>();
		boards = dao.boardSelectList();
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(boards);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "ajax:" + json;
	}

}
