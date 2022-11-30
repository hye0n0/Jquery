package co.micol.prj.emp.service;

import java.util.List;

import co.micol.prj.emp.vo.EmpVO;

public interface EmpService {
	List<EmpVO> empSelectList(); // 전체목록
	EmpVO empSelect(EmpVO vo); // 회원 정보
	int empInsert(EmpVO vo); // 등록
	int empDelete(EmpVO vo); // 삭제
	int empUpdate(EmpVO vo); // 수정
	List<EmpVO> jobSelectList(); // 전체목록
}
