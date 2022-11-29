package co.micol.prj.cart.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;


public interface CartMapper {
	List<HashMap<String, Object>> cartSelectList();
	int cartDelete(int no);
	int cartUpdate(@Param("no") int no,@Param("qty") int qty);
}
