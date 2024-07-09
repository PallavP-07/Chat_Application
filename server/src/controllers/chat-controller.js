import { Chat } from "../models/chatModel.js";
import { emitEvent } from "../services/features.js";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHAT } from "../constants/events.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";


const newGroupChat = async (req, res, next) => {
  try {
    const { name, member } = req.body;
    if (member.length < 2) {
      return next(
        res.status(400).json({
          message: "Group chat must have 3 members.",
        })
      );
    }
    const oldGroupName = await Chat.findOne({ name });
    if (oldGroupName) {
      return next(
        res.status(400).json({
          message: "group already present.",
        })
      );
    }

    const allMember = [...member, req.user];
    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMember,
    });

    emitEvent(req, ALERT, allMember, `wellcome to ${name}group!`);
    emitEvent(req, REFETCH_CHAT, member);

    return res.status(200).json({
      success: true,
      message: "Group Created Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );
    //using reduser findout memebers
    // const transformedData = chats.map(({_id,groupChat,name,members})=>{
    //   return {
    //     _id,groupChat,name,
    //     members: members.reduce((accumulator,member) =>{
    //       if(member._id.toString() !== req.user.toString()){
    //         accumulator   .push(member._id);
    //       }
    //       return accumulator;
    //     }, []),

    //   };

    // });
    const transformedData = chats.map(({ _id, groupChat, name, members }) => {
      const filteredMembers = members
        .filter((member) => member._id.toString() !== req.user.toString())
        .map((members) => members._id);
      return {
        _id,
        groupChat,
        name,
        members: filteredMembers,
      };
    });

    return res.status(201).json({
      success: true,
      transformedData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");
    const groups = chats.map(({ _id, groupChat, name, members }) => {
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
      };
    });

    return res.status(201).json({
      success: true,
      groups,
    });
  } catch (error) {
    console.log(error);
  }
};
const addMember = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;
    if (!members || members.length < 1)
      return next(
        res.status(400).json({
          message: "please add member.",
        })
      );
    const chat = await Chat.findById(chatId);
    if (!chat)
      return next(
        res.status(400).json({
          message: "chat not found",
        })
      );

    if (!chat.groupChat)
      return next(
        res.status(400).json({
          message: "This is not a group chat",
        })
      );
    if (chat.creator.toString() !== req.user.toString())
      return next(
        res.status(403).json({
          message: "only creator can add memebers",
        })
      );

    const addMemeberPromis = members.map((i) => User.findById(i, "name"));
    const addNewMember = await Promise.all(addMemeberPromis);

    const newUniqueMember = addNewMember
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id);
    // chat.members.push(...addNewMember.map((i)=>i._id));
    chat.members.push(...newUniqueMember);
    if (chat.members.length > 100)
      return next(
        res.status(400).json({
          message: "only 100 members can join this group!",
        })
      );
    chat.save();
    const allUsersName = addNewMember.map((i) => i.name).join(",");
    emitEvent(req, ALERT, `you are added to ${allUsersName}`);
    emitEvent(req, REFETCH_CHAT, chat.members);
    return res.status(201).json({
      success: true,
      message: "member added successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

const removeMember = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;
    const [chat, userWillRemove] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);
    if (!chat) {
      return next(
        res.status(400).json({
          message: "chat not found",
        })
      );
    }

    if (!chat.groupChat) {
      return next(
        res.status(400).json({
          message: "This is not a group chat",
        })
      );
    }

    if (chat.members <= 3) {
      return next(
        res.status(400).json({
          message: "Group atleast have three members.",
        })
      );
    }

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );
    await chat.save();

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userWillRemove.name} removed from group.`
    );
    emitEvent(req, REFETCH_CHAT, chat.members);
    return res.status(201).json({
      success: true,
      message: "User removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const leaveGroup = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const chat = await Chat.findById(userId);

    if (!chat)
      return next(
        res.status(400).json({
          message: "chat not found",
        })
      );

    if (!chat.groupChat)
      return next(
        res.status(400).json({
          message: "This is not a group chat",
        })
      );
    const remainingMember = chat.members.filter(
      (member) => member.toString() !== req.user.toString()
    );

    if (chat.members < 3)
      return next(
        res.status(400).json({
          message: "Group atleast have three members.",
        })
      );
    if (chat.creator.toString() === req.user.toString()) {
      const randomElement = Math.floor(Math.random() * remainingMember.length);
      const newCreator = remainingMember[randomElement];
      chat.creator = newCreator;
    }

    chat.members = remainingMember;

    const [user] = await Promise.all([
      User.findById(req.user, "name"),
      chat.save(),
    ]);

    emitEvent(req, ALERT, chat.members, `${user} Leave group.`);
    emitEvent(req, REFETCH_CHAT, chat.members);
    return res.status(200).json({
      success: true,
      message: "User Leave The Group successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const sendAttachments = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user, "name"),
    ]);
    if (!chat) {
      return res.status(400).json({
        message: "chat not found!",
      });
    }
    const files = req.files || [];
    if (files.length < 1) {
      return res.status(400).json({
        message: "please attach any file!",
      });
    }
    const attachments = [];
    // const messageForRealTiem ={
    //   content:"",
    //   attachments,
    //   sender:{
    //     _id:me._id,
    //     name:me.name,
    //   },
    //   chat:chatId
    // }

    const messageForDB={
      content:"",
      attachments,
      sender:me._id,
      chat:chatId

    }
    const messageForRealTiem ={
     ...messageForDB,
      sender:{
        _id:me._id,
        name:me.name,
      },
     
    }
    const message =await Message.create(messageForDB)
    emitEvent(req,NEW_ATTACHMENT,chat.members,{
      message:messageForRealTiem,
      chatId
    })
    emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{
      chatId
    })
    return res.status(200).json({
      success: true,
      message: "User Leave The Group successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMember,
  removeMember,
  leaveGroup,
  sendAttachments,
};
