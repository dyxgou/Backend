import UserModel from "@models/UserModel";

export const sendRequestFriend = async (req, res) => {
  const { id: idUserToSendRequest } = req.params;
  const { idUserToAdd } = req.body;

  const sendRequest = await UserModel.findById(idUserToSendRequest, {
    _id: true,
    friends: true,
    friendsRequest: true,
  }).catch((err) => {});

  const getRequest = await UserModel.findById(idUserToAdd, {
    _id: true,
    friends: true,
    friendsPending: true,
  }).catch((err) => {});

  await sendRequest.updateOne({
    $push: {
      friendsRequest: getRequest?._id,
    },
  });

  await getRequest.updateOne({
    $push: {
      friendsPending: sendRequest?._id,
    },
  });

  return res.sendStatus(200);
};

export const acceptRequestFriend = async (req, res) => {
  const { id: idUserToAccepting } = req.params;
  const { idUserToAccept } = req.body;

  const acceptingRequest = await UserModel.findById(idUserToAccepting, {
    _id: true,
    friends: true,
    friendsPending: true,
  });

  const acceptRequest = await UserModel.findById(idUserToAccept, {
    _id: true,
    friends: true,
    friendsRequest: true,
  });

  await acceptingRequest?.updateOne({
    $pull: {
      friendsPending: acceptRequest?._id,
    },
    $push: {
      friends: acceptRequest?._id,
    },
  });

  await acceptRequest?.updateOne({
    $pull: {
      friendsRequest: acceptingRequest?._id,
    },
    $push: {
      friends: acceptingRequest?._id,
    },
  });

  return res.sendStatus(200);
};
