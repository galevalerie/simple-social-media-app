function DeleteModal(props) {
  function onCancel() {
    props.onCancel();
  }

  function onConfirm() {
    props.onConfirm();
  }

  return (
    <div className="modal">
      <p>Are you sure you want to delete this post?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
}

export default DeleteModal;
