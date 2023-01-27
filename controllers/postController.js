const posts = {
    1: {
        id: 1,
        title : "post 1",
        snippet : "snippet of post 1",
        body : "this is the body of post 1",
        comment: [{title: "Nice post", author: "jack"},{title: "good post", author: "rose"}]
    },
    2: {
        id: 2,
        title : "post 2",
        snippet : "snippet of post 2",
        body : "this is the body of post 2",
        comment: [{title: "Nice post", author: "jack"},{title: "good post", author: "rose"}]        
    },
    3: {
        id: 3,
        title : "post 3",
        snippet : "snippet of post 3",
        body : "this is the body of post 3",
        comment: [{title: "Nice post", author: "jack"},{title: "good post", author: "rose"}]
    },

}

exports.get_all_posts = function(req,res,next) {
    res.json(posts);
};

exports.get_a_post = function(req,res,next){
    const id = req.params.id;
    res.json(posts[id]);
}

exports.post_new_post = function(req,res,next){
    const {id, title, snippet, body} = req.body;
    posts[id] = {id, title, snippet, body};

    res.json(posts[id]);
}

exports.get_all_comments = function(req,res,next){
    const id = req.params.id;
    res.json(posts[id].comment);
}