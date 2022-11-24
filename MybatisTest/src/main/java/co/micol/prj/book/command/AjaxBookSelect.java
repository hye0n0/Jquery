package co.micol.prj.book.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.book.service.BookService;
import co.micol.prj.book.service.impl.BookServiceImpl;
import co.micol.prj.book.vo.BookVO;
import co.micol.prj.common.Command;

public class AjaxBookSelect implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		String code = request.getParameter("bookCode");

		BookVO vo = new BookVO();
		vo.setBookCode(code);

		BookService service = new BookServiceImpl();
		BookVO book = new BookVO();
		book = service.bookSelect(vo);
		
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(book);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return "ajax:" + json;
	}

}
