import {Fragment, useState} from "react"
import {useParams} from "react-router-dom"
import Header from "../Layout/Header"
import OpenModalButton from "../UI/OpenModalButton"
import Modal from "../UI/Modal"
import PostForm from "../Posts/PostForm"
import Posts from "../Posts/Posts"
import MaxAvatar from "../../assets/Max_mochi_avatar.jpeg"
import MichaelaAvatar from "../../assets/Michaela_mochi_avatar.jpeg"
import PukiAvatar from "../../assets/Puki_avatar.avif"
import MukiAvatar from "../../assets/Muki_avatar.jpeg"

const DUMMY_PROFILES = [
  {id: "u1", name: "Max Voronov", profileImage: MaxAvatar, userName: "red"},
  {
    id: "u2",
    name: "Michaela Voronov",
    profileImage: MichaelaAvatar,
    userName: "syntaxcat"
  },
  {
    id: "u3",
    name: "Puki Ben-Puki",
    profileImage: PukiAvatar,
    userName: "poopoo"
  },
  {
    id: "u4",
    name: "Muki Ben-Muki",
    profileImage: MukiAvatar,
    userName: "muuumooo"
  }
]

const DUMMY_POSTS = [
  {
    id: "p1",
    caption: "Chilling & killing"
  },
  {
    id: "p2",
    caption: "Best day of my life"
  },
  {
    id: "p3",
    caption: "love my mama <3"
  },
  {
    id: "p4",
    caption: "another day another..."
  }
]

const ProfilePage = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS)
  const [modalIsShown, setModalIsShown] = useState(false)

  let {userId} = useParams()

  const foundProfile = DUMMY_PROFILES.find((profile) => {
    return profile.userName === userId
  })

  const addPostHandler = (caption) => {
    const newPost = {
      id: DUMMY_POSTS.length + 1,
      caption
    }
    setPosts((currentPosts) => {
      return [newPost, ...currentPosts]
    })
    setModalIsShown(false)
  }

  const deletePostHandler = (id) => {
    const newPosts = posts.filter((post) => post.id !== id)
    setPosts(newPosts)
  }

  const showModalHandler = () => {
    setModalIsShown(true)
  }

  const hideModalHandler = () => {
    setModalIsShown(false)
  }

  const updatedPostHandler = (caption, postId) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, caption}
      } else {
        return post
      }
    })
    setPosts(newPosts)
  }
  return (
    <Fragment>
      <Header foundProfile={foundProfile} />
      <OpenModalButton onShowModal={showModalHandler} />
      {modalIsShown && (
        <Modal onHideModal={hideModalHandler}>
          <PostForm onAddPost={addPostHandler} />
        </Modal>
      )}
      <main>
        <Posts
          onUpdatedPost={updatedPostHandler}
          onDeletePost={deletePostHandler}
          posts={posts}
        />
      </main>
    </Fragment>
  )
}

export default ProfilePage
