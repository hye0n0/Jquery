package co.micol.prj.cart.service.impl;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import co.micol.prj.cart.mapper.CartMapper;
import co.micol.prj.cart.service.CartService;
import co.micol.prj.common.DataSource;

public class CartServiceImpl implements CartService{
	private SqlSession sqlSession = DataSource.getInstance().openSession(true);
	CartMapper map = sqlSession.getMapper(CartMapper.class);
	@Override
	public List<HashMap<String, Object>> cartSelectList() {

		return map.cartSelectList();
	}

	@Override
	public int cartDelete(int no) {

		return map.cartDelete(no);
	}

	@Override
	public int cartUpdate(int no, int qty) {

		return map.cartUpdate(no, qty);
	}

}
