package co.micol.prj.emp.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.micol.prj.common.DataSource;
import co.micol.prj.emp.mapper.EmpMapper;
import co.micol.prj.emp.service.EmpService;
import co.micol.prj.emp.vo.EmpVO;

public class EmpServiceImpl implements EmpService{
	private SqlSession sqlSession = DataSource.getInstance().openSession(true);
	private EmpMapper map = sqlSession.getMapper(EmpMapper.class);
	@Override
	public List<EmpVO> empSelectList() {

		return map.empSelectList();
	}

	@Override
	public EmpVO empSelect(EmpVO vo) {

		return map.empSelect(vo);
	}

	@Override
	public int empInsert(EmpVO vo) {

		return map.empInsert(vo);
	}

	@Override
	public int empDelete(EmpVO vo) {

		return map.empDelete(vo);
	}

	@Override
	public int empUpdate(EmpVO vo) {

		return map.empUpdate(vo);
	}

	@Override
	public List<EmpVO> jobSelectList() {

		return map.jobSelectList();
	}

}
