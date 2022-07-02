import { useRef, useState } from "react";
import Backdrop from "../src/components/Backdrop";
import DeleteModal from "../src/components/DeleteModal";

function App() {
  const inputPostRef = useRef();
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostContentCount, setNewPostContentCount] = useState(0);
  const [newsFeedData, setNewsFeedData] = useState([]);
  const [updatePostId, setUpdatePostId] = useState("");
  const [updatePostContent, setUpdatePostContent] = useState("");
  const [updatePostContentCount, setUpdatePostContentCount] = useState(0);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  function handleAdd(e) {
    e.preventDefault();

    const inputPost = inputPostRef.current.value;

    const newPost = [
      {
        id: new Date().getTime(),
        content: inputPost,
        timestamp: new Date().toLocaleString(),
      },
    ];

    setNewsFeedData((prevNewsFeedData) => {
      return prevNewsFeedData.concat(newPost);
    });

    //alert("Your post has been published!");
    setNewPostContent("");
    setNewPostContentCount(0);
  }

  function handleOnChangeNewPost(e) {
    setNewPostContent(e.target.value);
    setNewPostContentCount(e.target.value.length);
  }

  function handleOnChangeUpdatePost(e) {
    setUpdatePostContent(e.target.value);
    setUpdatePostContentCount(e.target.value.length);
  }

  function handleUpdate(id) {
    const updatedPosts = newsFeedData.map((post) => {
      if (post.id === id) {
        post.content = updatePostContent;
      }
      return post;
    });
    setNewsFeedData(updatedPosts);
    setUpdatePostId("");
  }

  function handleDelete(id) {
    setNewsFeedData((prevNewsFeedData) => {
      return prevNewsFeedData.filter((post) => post.id !== id);
    });

    setDeleteModalIsOpen(false);
  }

  return (
    <div>
      <header>
        <div className="logo">SSN</div>
        <div className="greetings">Welcome back!</div>
      </header>
      <div className="content">
        <form className="newPostForm" onSubmit={handleAdd}>
          <textarea
            maxLength="500"
            placeholder="What's happening?"
            ref={inputPostRef}
            value={newPostContent}
            onChange={handleOnChangeNewPost}
          ></textarea>

          <div className="newPostAction">
            <span className="charCount">{newPostContentCount}/500</span>
            <button disabled={!newPostContent}>Post</button>
          </div>
        </form>

        <div className="newsFeed">
          <ul>
            {newsFeedData.map((post) => (
              <li key={post.id} className="postItem">
                {post.id === updatePostId ? (
                  <div className="postContent">
                    <textarea
                      maxLength="500"
                      value={updatePostContent}
                      onChange={handleOnChangeUpdatePost}
                    ></textarea>
                    <span className="charCount">
                      {updatePostContentCount}/500
                    </span>
                  </div>
                ) : (
                  <div className="postContent">
                    <span>Posted on {post.timestamp}</span>
                    <p>{post.content}</p>
                  </div>
                )}

                {post.id === updatePostId ? (
                  <div className="postItemAction">
                    <button
                      disabled={!updatePostContent}
                      onClick={() => handleUpdate(post.id)}
                    >
                      Save
                    </button>
                    <button onClick={() => setUpdatePostId("")}>Cancel</button>
                  </div>
                ) : (
                  <div className="postItemAction">
                    <button onClick={() => setUpdatePostId(post.id)}>
                      Edit
                    </button>
                    <button onClick={() => setDeleteModalIsOpen(true)}>
                      Delete
                    </button>
                  </div>
                )}

                {deleteModalIsOpen && (
                  <DeleteModal
                    onConfirm={() => handleDelete(post.id)}
                    onCancel={() => setDeleteModalIsOpen(false)}
                  />
                )}
                {deleteModalIsOpen && <Backdrop />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
