package co.micol.prj.cart.service;

import java.util.HashMap;
import java.util.List;

public interface CartService {
	List<HashMap<String, Object>> cartSelectList();
	int cartDelete(int no);
	int cartUpdate(int no, int qty);
}
