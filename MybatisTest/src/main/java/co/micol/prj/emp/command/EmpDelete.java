package co.micol.prj.emp.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.micol.prj.common.Command;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.service.impl.EmpServiceImpl;
import co.micol.prj.emp.vo.EmpVO;

public class EmpDelete implements Command {

	@Override
	public String exec(HttpServletRequest request, HttpServletResponse response) {
		int employeeId = Integer.parseInt(request.getParameter("employeeId"));

		EmpVO vo = new EmpVO();
		vo.setEmployeeId(employeeId);

		EmpService service = new EmpServiceImpl();
		int result = service.empDelete(vo);

		String json = null;
		if(result > 0) {
			json = "Success";
		}else {
			json = "Fail";
		}

		return "ajax:" + json;
	}

}
