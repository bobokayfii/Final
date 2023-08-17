import { PER_PAGE } from "../../const";
import { request } from "../../server/request";

export const fetchCategories = (page = 1) => {
  return async(dispatch) => {
    dispatch({type: "CATEGORY_LOADING"})
    let { data } = await request.get("category", {params: {limit: PER_PAGE, page},})
    dispatch({ type: "GET_CATEGORIES", payload: data});
    console.log(data);
  }
}

export const deleteCategoryAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY"});
    await request.delete(`category/${id}`);
    dispatch(fetchCategories());
  }
}