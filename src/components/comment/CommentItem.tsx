import { ApolloCache, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Comment } from "../../interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../libs/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($shopId: Int!, $comment: String!) {
    createComment(shopId: $shopId, comment: $comment) {
      ok
      error
      id
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
      id
    }
  }
`;

const Main = styled.main``;
const CommentSection = styled.section`
  position: relative;
  height: 26rem;
`;

const SeeCommentSection = styled.section`
  height: 90%;
  padding: ${(props) => props.theme.mp.sm};
  overflow-y: scroll;
`;

const CommentBox = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.mp.sm};
  color: ${(props) => props.theme.color.main.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.mp.xxl};
  padding-bottom: ${(props) => props.theme.mp.sm};
  border-bottom: 1px solid ${(props) => props.theme.color.active.sm};
  &:last-child {
    border-bottom: 0;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarBox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  margin-right: ${(props) => props.theme.mp.sm};
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;

const NoAvatar = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const UserInfoBox = styled.div`
  margin-right: ${(props) => props.theme.mp.xxxxl};
  cursor: pointer;
`;
const Username = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const CommentSpan = styled.span`
  color: ${(props) => props.theme.color.main.lg};
`;

const CreateCommentForm = styled.form`
  display: flex;
  width: 70%;
  height: 10%;

  position: relative;
  margin: ${(props) => props.theme.mp.xl} auto;
`;
const Input = styled.input`
  width: 80%;
  padding: ${(props) => props.theme.mp.sm} ${(props) => props.theme.mp.sm};
  border: 1px solid ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.color.main.lg};
  &:focus {
    border: 2px solid ${(props) => props.theme.color.active.base};
  }
`;
const Button = styled.button`
  cursor: pointer;
  position: absolute;
  width: 20%;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    font-size: ${(props) => props.theme.fontSize.xs};
  }
`;

const DeleteBox = styled.span`
  display: inline-block;
  padding: ${(porpos) => porpos.theme.mp.xs};
  background-color: red;
  opacity: 0.5;
  color: white;
  font-size: ${(props) => props.theme.fontSize.xs};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

interface CommentItemProps {
  shopId?: number;
  comments?: Comment[];
}

interface CommentMutation {
  ok: boolean;
  error?: string;
}

interface CommentForm {
  comment: string;
  error?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ shopId, comments }) => {
  const navigate = useNavigate();
  const { user } = useUser({ isPrivate: true });
  const { register, handleSubmit, reset, getValues } = useForm<CommentForm>();

  const createCommentUpdate = (cache: ApolloCache<any>, result: any) => {
    const comment = getValues("comment");
    reset();
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    let newComment: any;
    if (ok && user) {
      newComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        comment,
        user: { ...user },
      };
    }

    cache.modify({
      id: `Shop:${shopId}`,
      fields: {
        comments: (prev) => [...prev, newComment],
      },
    });
  };

  const [createComment, { loading: createCommentLoading }] =
    useMutation<CommentMutation>(CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
    });

  const deleteCommentUpdate = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        deleteComment: { ok, id },
      },
    } = result;

    if (ok) {
      cache.modify({
        id: `Shop:${shopId}`,
        fields: {
          comments: (prev) => {
            const existComments = [...prev];
            const newComments = existComments.filter(
              (comment) => comment.__ref !== `Comment:${id}`
            );
            return newComments;
          },
        },
      });
    }
  };
  const [deleteComment, { loading: deleteCommentLoading }] =
    useMutation<CommentMutation>(DELETE_COMMENT_MUTATION, {
      update: deleteCommentUpdate,
    });

  const onDelete = (id: number) => {
    if (deleteCommentLoading) return;
    deleteComment({
      variables: {
        id,
      },
    });
  };

  const onValid = (data: CommentForm) => {
    if (createCommentLoading) return;
    createComment({
      variables: {
        comment: data.comment,
        shopId,
      },
    });
  };

  const onProfile = (id: number, username?: string) => {
    navigate(`/users/profile/${id}`, {
      state: {
        id,
        username,
      },
    });
  };

  return (
    <>
      <Main>
        <CommentSection>
          <SeeCommentSection>
            {comments?.map((comment) => (
              <CommentBox key={comment.id}>
                <UserBox>
                  <AvatarBox>
                    {comment?.user?.avatar ? (
                      <Avatar src={comment.user.avatar} alt="" />
                    ) : (
                      <NoAvatar>
                        <FontAwesomeIcon icon={faUser} />
                      </NoAvatar>
                    )}
                  </AvatarBox>
                  <UserInfoBox
                    onClick={() =>
                      onProfile(comment.user.id, comment.user.username)
                    }
                  >
                    <Username>{comment.user.username}</Username>
                  </UserInfoBox>
                  <CommentSpan>{comment.comment}</CommentSpan>
                </UserBox>
                {user?.id === comment.user.id && (
                  <DeleteBox onClick={() => onDelete(comment.id)}>
                    Delete
                  </DeleteBox>
                )}
              </CommentBox>
            ))}
          </SeeCommentSection>
          <CreateCommentForm onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("comment", { required: true })}
              placeholder="Wirte Comment..."
            />
            <Button>{createCommentLoading ? "Loading" : "Submit"}</Button>
          </CreateCommentForm>
        </CommentSection>
      </Main>
    </>
  );
};

export default CommentItem;
