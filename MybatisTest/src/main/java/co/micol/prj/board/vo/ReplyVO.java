package co.micol.prj.board.vo;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReplyVO {
	private int replyNo;
	private int boardNo;
	private String content;
	private String writer;
	private String writeDate;
}
