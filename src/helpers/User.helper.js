import React from "react";
import { Avatar, Tooltip } from "antd";
import axios from "axios";

const TooltipContainer = props => {
  const { isLoading, userName, userAvatar } = props;

  if (isLoading) {
    return (
      <Tooltip placement="rightTop" title="Loading...">
        <Avatar
          icon="user"
          size={64}
          alt="Avatar loading..."
          style={{ float: "left", marginRight: "16px" }}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip placement="rightTop" title={userName}>
      <Avatar
        src={userAvatar}
        size={64}
        alt="Avatar"
        style={{ float: "left", marginRight: "16px" }}
      />
    </Tooltip>
  );
};

class GetUser extends React.PureComponent {
  state = {
    avatar: null,
    username: "unknown",
    isLoading: true,
    errors: null
  };

  getPosts() {
    axios
      .get(`https://rickandmortyapi.com/api/character/${this.props.id}`)
      .then(response => {
        this.setState({
          ...this.state,
          avatar: response.data.image,
          username: response.data.name,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({ ...this.state, errors: error, isLoading: false })
      );
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { isLoading, avatar, username } = this.state;
    const { post } = this.props;

    return (
      <>
        <TooltipContainer
          isLoading={isLoading}
          userName={username}
          userAvatar={avatar}
        />
        <h3>{post}</h3>
        by {username}
      </>
    );
  }
}

export default GetUser;
