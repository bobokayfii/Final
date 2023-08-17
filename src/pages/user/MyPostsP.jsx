import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { request } from "../../server/request";
import { Form, Input, Modal, Pagination, Select } from "antd";
import "./mypost.css";
import { IMG_URL, PAGE_LIMIT } from "../../const";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Load/Loading";
import { ExclamationCircleFilled } from "@ant-design/icons";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { categoriesName } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [categoryId, setCategoryId] = useState(categoriesName[0]?.value);
  const [imgId, setImgId] = useState("");
  const [photoModal, setPhotoModal] = useState({});

  const changeImg = async (e) => {
    let img = e.target.files[0];
    let form = new FormData();
    img && form.append("file", img);
    try {
      const { data } = img && (await request.post("upload", form));
      setPhotoModal(data);
      setImgId(data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      let { data } = await request.get(
        `post/user?search=${search}&page=${page}&limit=${PAGE_LIMIT}`
      );
      setPosts(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  const onChange = (current) => {
    console.log(current);
    setPage(current);
  };

  useEffect(() => {
    getPosts();
  }, [search, page]);

  const openModal = () => {
    setOpen(true);
    !selected ? setCategoryId(categoriesName[0]?.value) : setCategoryId();
  };

  const closeModal = () => {
    form.resetFields();
    setImgId("");
    setPhotoModal({});
    setOpen(false);
  };

  const submit = async () => {
    let result = await form.validateFields();
    result = {
      ...result,
      tags: result.tags.split(","),
      category: categoryId,
      photo: imgId,
    };
    if (!selected) {
      try {
        await request.post("post", result);
      } finally {
        getPosts();
      }
    } else {
      try {
        await request.put(`post/${selected}`, result);
      } finally {
        getPosts();
      }
    }
    closeModal();
  };

  const searchMyPost = (e) => {
    setSearch(e.target.value);
    getPosts();
  };

  const handleChange = (value) => {
    setCategoryId(value);
    console.log(value);
  };

  const editPost = async (id) => {
    setSelected(id);
    openModal();
    try {
      const { data } = await request(`post/${id}`);
      console.log(data);
      let { tags, title, description, category, photo } = data;
      console.log(photo);
      tags = tags.join(",");
      form.setFieldsValue({ title, description, tags });
      setCategoryId(category);
      setImgId(photo._id);
      setPhotoModal(photo);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCategory = async (id) => {
    Modal.confirm({
      title: "Do you want to delete this post?",
      icon: <ExclamationCircleFilled />,
      async onOk() {
        try {
          const response = await request.delete(`post/${id}`);
          getPosts();
          if (response.status === 204) {
            message.success("Deleted successfully!");
            getPosts();
          } else {
            message.error("Error while deleting post.");
          }
        } catch (err) {
          console.log(err);
          message.error("Error while deleting post.");
        } finally {
          closeModal();
        }
      },
    });
  };

  const enterThisPost = (id) => {
    navigate(`/posts/${id}`);
  };

  const validateMessages = {
    required: "Please fill this area!",
  };

  return (
    <section className="all_mypost container">
      <div className="head_text_mypost">
        <div>
          <h4>My Posts</h4>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" onClick={openModal}>
            Add Post
          </button>
        </div>
      </div>
      <hr />
      <input onChange={searchMyPost} type="text" placeholder="Search...." />

      <div className="card_all_mypost">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            {posts.map(({ category, title, description, _id, photo }) => (
              <div className="card_mypost" key={_id}>
                <img
                  src={IMG_URL + photo?._id + "." + photo.name?.split(".")[1]}
                  alt="Img"
                />
                <div className="text_mypost">
                  <p>{category.name}</p>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <button
                    onClick={() => editPost(_id)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    onClick={() => deleteCategory(_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center pagination-container">
              <Pagination
                current={page}
                total={total}
                pageSize={PAGE_LIMIT}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}
      </div>
      <div>
        <Modal
          title={(selected ? "Editing" : "Adding") + " Post"}
          open={open}
          onOk={submit}
          okText={selected ? "Save" : "Add"}
          onCancel={closeModal}
        >
          <div className="py-3 text-center">
            <img
              style={{
                height: "150px",
                width: "50%",
                margin: "auto",
                paddingBottom: "10px",
              }}
              src={
                IMG_URL + photoModal?._id + "." + photoModal.name?.split(".")[1]
              }
              alt="Choose Img"
            />
            <input onChange={changeImg} type="file" placeholder="Img File" />
          </div>
          <Form
            form={form}
            name="modalForm"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="title"
              rules={[{ required: true, min: 5, max: 50 }]}
              onClick={() => enterThisPost(_id)}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ required: true, min: 10, max: 500 }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>

            <Form.Item name="tags" rules={[{ required: true }]}>
              <Input placeholder="Tags" />
            </Form.Item>
          </Form>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={categoriesName}
          />
        </Modal>
      </div>
    </section>
  );
};

export default MyPostsP;
