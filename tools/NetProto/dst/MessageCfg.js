const MessageCfg = {

	Heartbeat: {id: "Heartbeat", desc: "心跳", req: 101, rsp: 201, notify: 301,},

	ServerTime: {id: "ServerTime", desc: "服务器时间", req: 102, rsp: 202, notify: 302,},

	ThirdLogin: {id: "ThirdLogin", desc: "第三方登陆", req: 103, rsp: 203, notify: 303,},

	TokenLogin: {id: "TokenLogin", desc: "token登录", req: 104, rsp: 204, notify: 304,},

	GustLogin: {id: "GustLogin", desc: "游客登录", req: 105, rsp: 205, notify: 305,},

	AccountBind: {id: "AccountBind", desc: "账号绑定(针对游客登录的账号)", req: 106, rsp: 206, notify: 306,},

	KickOff: {id: "KickOff", desc: "被踢下线", req: 107, rsp: 207, notify: 307,},

	Chat: {id: "Chat", desc: "聊天", req: 108, rsp: 208, notify: 308,},

	CreateRoom: {id: "CreateRoom", desc: "创建房间", req: 109, rsp: 209, notify: 309,},

	EnterRoom: {id: "EnterRoom", desc: "进入房间", req: 110, rsp: 210, notify: 310,},

	RoomCard: {id: "RoomCard", desc: "房卡数量", req: 111, rsp: 211, notify: 311,},

	OffLine: {id: "OffLine", desc: "下线", req: 112, rsp: 212, notify: 312,},

	OnLine: {id: "OnLine", desc: "上线", req: 113, rsp: 213, notify: 313,},

	Announce: {id: "Announce", desc: "公告", req: 114, rsp: 214, notify: 314,},

	StandingsList: {id: "StandingsList", desc: "战绩", req: 115, rsp: 215, notify: 315,},

	StandingBrief: {id: "StandingBrief", desc: "单个房间总结算", req: 116, rsp: 216, notify: 316,},

	StandingDetail: {id: "StandingDetail", desc: "单个房间中每局的结算", req: 117, rsp: 217, notify: 317,},

	ReplayRecord: {id: "ReplayRecord", desc: "单局回放", req: 118, rsp: 218, notify: 318,},

	ShareRecord: {id: "ShareRecord", desc: "分享战绩", req: 119, rsp: 219, notify: 319,},

	ReplayRecordByCode: {id: "ReplayRecordByCode", desc: "通过分享码播放录像", req: 120, rsp: 220, notify: 320,},

	NewMail: {id: "NewMail", desc: "新邮件", req: 121, rsp: 221, notify: 321,},

	Mail: {id: "Mail", desc: "邮件", req: 122, rsp: 222, notify: 322,},

	MailList: {id: "MailList", desc: "邮件列表", req: 123, rsp: 223, notify: 323,},

	DelMail: {id: "DelMail", desc: "删除邮件", req: 124, rsp: 224, notify: 324,},

	WeChatInfo: {id: "WeChatInfo", desc: "微信信息", req: 125, rsp: 225, notify: 325,},

	Certification: {id: "Certification", desc: "实名认证", req: 126, rsp: 226, notify: 326,},

	WxPay: {id: "WxPay", desc: "生成微信支付订单", req: 127, rsp: 227, notify: 327,},

	AliPay: {id: "AliPay", desc: "生成阿里支付订单", req: 128, rsp: 228, notify: 328,},

	ApPay: {id: "ApPay", desc: "苹果支付", req: 129, rsp: 229, notify: 329,},

	WxShare: {id: "WxShare", desc: "微信分享", req: 130, rsp: 230, notify: 330,},

	Zhuang: {id: "Zhuang", desc: "本局庄", req: 400, rsp: 500, notify: 600,},

	LeaveRoom: {id: "LeaveRoom", desc: "离开房间", req: 401, rsp: 501, notify: 601,},

	DisbandRoomVote: {id: "DisbandRoomVote", desc: "解散房间投票", req: 402, rsp: 502, notify: 602,},

	DisbandRoomResult: {id: "DisbandRoomResult", desc: "解散房间投票结果", req: 403, rsp: 503, notify: 603,},

	PaiJuInfo: {id: "PaiJuInfo", desc: "进入房间时下发的牌局信息", req: 404, rsp: 504, notify: 604,},

	Ready: {id: "Ready", desc: "准备开局", req: 405, rsp: 505, notify: 605,},

	FaPai: {id: "FaPai", desc: "新一局发牌", req: 406, rsp: 506, notify: 606,},

	EhgTriCards: {id: "EhgTriCards", desc: "换三张", req: 407, rsp: 507, notify: 607,},

	DingQue: {id: "DingQue", desc: "定缺", req: 408, rsp: 508, notify: 608,},

	Mo: {id: "Mo", desc: "摸牌", req: 409, rsp: 509, notify: 609,},

	Ops: {id: "Ops", desc: "玩家操作", req: 410, rsp: 510, notify: 610,},

	Da: {id: "Da", desc: "玩家打牌", req: 411, rsp: 511, notify: 611,},

	Hu: {id: "Hu", desc: "玩家胡牌", req: 412, rsp: 512, notify: 612,},

	Gang: {id: "Gang", desc: "杠牌", req: 413, rsp: 513, notify: 613,},

	Peng: {id: "Peng", desc: "碰牌", req: 414, rsp: 514, notify: 614,},

	Pass: {id: "Pass", desc: "过牌", req: 415, rsp: 515, notify: 615,},

	RoundAcc: {id: "RoundAcc", desc: "当局结算", req: 416, rsp: 516, notify: 616,},

	RoomAcc: {id: "RoomAcc", desc: "总结算", req: 417, rsp: 517, notify: 617,},

	PaiTime: {id: "PaiTime", desc: "牌局阶段", req: 418, rsp: 518, notify: 618,},

	Bill: {id: "Bill", desc: "新账单记录", req: 419, rsp: 519, notify: 619,},

	UserScore: {id: "UserScore", desc: "房间中玩家的积分", req: 420, rsp: 520, notify: 620,},

};

module.exports = MessageCfg;
