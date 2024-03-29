import React, {Fragment, useState} from "react"
import classes from "../Posts/PostItem.module.css"
import EditPostItem from "./EditPostItem"
import Modal from "../UI/Modal"
import Actions from "../svg/Actions"

const PostItem = (props) => {
  console.log("props", props)
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [modalActionsIsShown, setModalActionsIsShown] = useState(false)

  const showModalActionsHandler = () => {
    setModalActionsIsShown(true)
  }

  const hideModalActionsHandler = () => {
    setModalActionsIsShown(false)
  }

  const editPostHandler = () => {
    setIsEditing(true)
  }

  const openModalPostHandler = () => {
    setIsModalOpen(true)
  }

  const hideModalPostHandler = () => {
    setIsModalOpen(false)
    setIsEditing(false)
  }

  const postComments = props.comments?.map((comment) => (
    <li key={comment.id}>{comment.text}</li>
  ))

  const postCommentsLength = props.comments?.length

  const displayCommentsLength = props.comments
    ? `${classes.postCommentsNumDisplay}`
    : " "
  const displayCommentsClasses = `${classes.postCommentsNum} ${displayCommentsLength}`

  return (
    <>
      <li onClick={openModalPostHandler} className={classes.post}>
        <img
          className={classes.postImage}
          src="https://picsum.photos/300/300"
        />
        {postCommentsLength && (
          <span className={displayCommentsClasses}>{postCommentsLength}</span>
        )}
      </li>

      {isModalOpen && (
        <Modal
          className={classes.modalPostItem}
          onHideModal={hideModalPostHandler}
        >
          <div className={classes.postItemModal}>
            <img
              className={classes.postImage}
              src="https://picsum.photos/300/300"
            />
            <div className={classes.postDetails}>
              <button
                className={classes.btnActionsMenu}
                onClick={showModalActionsHandler}
              >
                <Actions />
              </button>
              <div className={classes.captionText}>{props.caption}</div>
              <ul className={classes.postComments}>{postComments}</ul>
            </div>

            {modalActionsIsShown && (
              <Modal
                modalActions={classes.modalPostItemActionsMenu}
                onHideModal={hideModalActionsHandler}
              >
                <ul className={classes.postItemActions}>
                  {isEditing ? (
                    <EditPostItem
                      caption={props.caption}
                      onEdit={(caption) => {
                        props.onEditPost(caption)
                        setIsEditing(false)
                      }}
                    />
                  ) : (
                    <>
                      <div className={classes.captionText}>{props.caption}</div>
                      <li onClick={editPostHandler}>Edit</li>
                    </>
                  )}

                  <li onClick={props.onDeletePost}>Delete Post</li>
                </ul>
              </Modal>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default PostItem
