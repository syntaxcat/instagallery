import classes from "../Posts/Posts.module.css"
import PostItem from "./PostItem"

// for each post we will generate a costume component - postItem - all will have the same object structure

const Posts = (props) => {
  const postsList = props.posts.map((post) => (
    <PostItem
      onDeletePost={() => {
        props.onDeletePost(post.id)
      }}
      key={post.id}
      id={post.id}
      caption={post.caption}
    />
  ))

  return (
    <section className={classes.posts}>
      <ul>{postsList}</ul>
    </section>
  )
}

export default Posts
