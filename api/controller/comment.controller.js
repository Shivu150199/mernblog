import Comment from "../model/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment = async (req, res, next) => {

    try {
        const { content, userId, postId } = req.body

        if (userId !== req.user.id) {
            return next(errorHandler('403', 'you are not authorised to create this'))
        }

        const newPost = new Comment({
            content,
            userId,
            postId
        });

        await newPost.save()
        res.status(200).json({
            status: 'success',
            data: newPost
        })

    } catch (err) {
        next(errorHandler(404, 'not able to create commnet'))
    }





}


export const getComments = async (req, res, next) => {


    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1
        })

        res.status(200).json({
            status: 'success',
            data: comments
        })
    }
    catch (err) {
        next(errorHandler(404, 'not able to get all commnets'))
    }

}

export const likeComment = async (req, res, next) => {

    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        console.log(comment.likes)

        const userIndex = comment.likes.indexOf(req.user.id)
        console.log(userIndex)
        if (userIndex === -1) {
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)

        } else {
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)


    } catch (err) {
        console.log(err)
        next(errorHandler(404, 'not able to like comment'))
    }

}


export const editComment = async (req, res, next) => {

    try {
        let comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(403, 'not able to find  the comment'))
        }
        if (comment.userId !== req.user.id && !req.user.admin) {
            return next(errorHandler(403, 'not allowed to edit comment'))
        }

        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content: req.body.content
        }, {
            new: true
        })

   
        res.status(200).json(editComment)


    } catch (err) {
        console.log(err)
        next(errorHandler(404, 'not able to edit the comment'))
    }

}