import { NIMMsgLogStatus, NIMMsgLogSubStatus, NIMMessageType } from "./msglog_def";

/** @enum NIMSessionType 会话类型 */
export enum NIMSessionType
{ 
	kNIMSessionTypeP2P			= 0,			/**< 个人，即点对点 */
	kNIMSessionTypeTeam			= 1,			/**< 群组 */
	kNIMSessionTypeSuperTeam	= 5,			/**< 超大群组 */
}

/** @enum NIMSessionCommand 会话操作命令 */
export enum NIMSessionCommand
{
	kNIMSessionCommandAdd				= 0,	/**< 添加会话项 */
	kNIMSessionCommandRemove			= 1,	/**< 删除单个会话项 */
	kNIMSessionCommandRemoveAll			= 2,	/**< 删除所有会话项 */
	kNIMSessionCommandRemoveAllP2P		= 3,	/**< 删除所有点对点的会话项 */
	kNIMSessionCommandRemoveAllTeam		= 4,	/**< 删除所有群的会话项 */
	kNIMSessionCommandMsgDeleted		= 5,	/**< 单个会话项的消息已删除 */
	kNIMSessionCommandAllMsgDeleted		= 6,	/**< 所有会话项的消息已删除 */
	kNIMSessionCommandAllP2PMsgDeleted	= 7,	/**< 所有点对点会话项的消息已删除 */
	kNIMSessionCommandAllTeamMsgDeleted	= 8,	/**< 所有群会话项的消息已删除 */
	kNIMSessionCommandUpdate			= 9,	/**< 更新会话项 */
	kNIMSessionCommandRemoveAllSuperTeam = 10,	/**< 删除所有超大群的会话项 */
	kNIMSessionCommandAllSuperTeamMsgDeleted = 11,	/**< 所有超大群会话项的消息已删除 */
}

export interface NIMSessionData {
	id: string;					/**< string, 会话id */
	type: NIMSessionType;			/**< int, 会话类型(见NIMSessionType 个人0 群组1 超大群5 etc) */
	unread_count: number;		/**< int, 本地消息历史中该会话未读消息数量 */
	command: number;			/**< int, 会话项操作命令NIMSessionCommand */
	msg_client_id: string;		/**< string, 本地消息历史中该会话最后一条消息的客户端ID唯一标识，即消息uuid */
	msg_from_account: string;	/**< string, 本地消息历史中该会话最后一条消息的发送方帐号 */
	msg_time: number;			/**< long, 本地消息历史中该会话最后一条消息的时间 */
	msg_type: number;			/**< int, 本地消息历史中该会话最后一条消息的类型 见NIMMessageType*/
	msg_body: string;			/**< string, 本地消息历史中该会话最后一条消息的内容 */
	msg_attach: string;			/**< string, 本地消息历史中该会话最后一条消息的attach */
	msg_status: NIMMsgLogStatus;			/**< int, 本地消息历史中该会话最后一条消息的状态，见NIMMsgLogStatus */
	msg_sub_status: NIMMsgLogSubStatus;		/**< int, 本地消息历史中该会话最后一条消息的子状态，见NIMMsgLogSubStatus */
	last_updated_msg: boolean; 	/**< bool, (批量)消息变更或增加时是否是最后一条变更的信息 */
	top: boolean;				/**< bool, 是否置顶 */
	extend_data: string;		/**< string, 本地扩展字段, 限4096 */
}

export interface NIMSessionList {
	count: number;					/**< int, 会话列表项数量 */
	unread_counts: number;			/**< int, 总未读数 */
	content: Array<NIMSessionData>;	/**< 会话列表项内容 */
}

export interface NIMSessionChangeCallback {
	(rescode: number, result: NIMSessionData, count: number): void;
}

export interface NIMQuerySessionListCallback {
	(count: number, result: NIMSessionList): void;
}

export interface NIMQuerySessionDataCallback {
	(rescode: number, result: NIMSessionData): void;
}

export interface NIMSessionAPI {
	RegChangeCb(cb: NIMSessionChangeCallback, jsonExtension: string): void;

	QueryLastFewSessionAsync(limit: number, cb: NIMQuerySessionListCallback, jsonExtension: string): void;

	QueryAllRecentSessionAsync(cb: NIMQuerySessionListCallback, jsonExtension: string): void;

	QueryAllRecentSessionAsync2(lastMsgExcludedType: NIMMessageType, cb:NIMQuerySessionListCallback, jsonExtension: string): void;

	DeleteRecentSession(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean;

	DeleteAllRecentSession(cb: NIMSessionChangeCallback, jsonExtension: string): void;

	SetUnreadCountZeroAsync(type: NIMSessionType, id: string, cb:NIMSessionChangeCallback, jsonExtension: string): boolean;

	SetSessionTop(type: NIMSessionType, id: string, top: boolean, cb: NIMSessionChangeCallback, jsonExtension: string): boolean;

	SetSessionExtendData(type: NIMSessionType, id: string, data: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean;

	SetAllUnreadCountZeroAsync(cb: NIMSessionChangeCallback, jsonExtension: string): boolean;

	QuerySessionDataById(type: NIMSessionType, id: string, cb: NIMQuerySessionDataCallback, jsonExtension: string): void;

	UnregSessionCb(): void;
}