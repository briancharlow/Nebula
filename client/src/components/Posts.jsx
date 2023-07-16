import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/posts.css';


const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5020/posts')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="posts">
            {/* {posts.map((post, index) => (
                <div className="post" key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))} */}
        </div>
    )
}

export default Posts