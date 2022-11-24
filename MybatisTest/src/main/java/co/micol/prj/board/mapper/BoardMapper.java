package co.micol.prj.board.mapper;

import java.util.List;

import co.micol.prj.board.vo.BoardVO;
import co.micol.prj.board.vo.ReplyVO;

public interface BoardMapper {
	List<BoardVO> boardSelectList();
	BoardVO boardSelect(BoardVO vo);
	int boardInsert(BoardVO vo);
	
	List<ReplyVO> replySelectList(ReplyVO vo);
	int replyInsert(ReplyVO vo);
	int replyDelete(ReplyVO vo);
}
