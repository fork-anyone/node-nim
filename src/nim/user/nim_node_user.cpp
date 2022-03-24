/**
 * @file nim_node_user.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_user.h"
#include "nim_node_user_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMUser, NIMUser, holder_service);
Napi::Object NIMUser::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMUser", env, exports,
        {RegApi("InitEventHandlers", &NIMUser::InitEventHandlers), RegApi("SetBlack", &User::SetBlack), RegApi("SetMute", &User::SetMute),
            RegApi("GetMutelist", &User::GetMutelist), RegApi("GetBlacklist", &User::GetBlacklist), RegApi("GetUserNameCard", &User::GetUserNameCard),
            RegApi("GetUserNameCardOnline", &User::GetUserNameCardOnline), RegApi("UpdateMyUserNameCard", &User::UpdateMyUserNameCard),
            RegApi("QueryUserListByKeyword", &User::QueryUserListByKeyword), RegApi("UpdatePushToken", &User::UpdatePushToken)});
}

void NIMUser::InitEventHandlers() {
    RegisterSDKNotifyCallback("special_relation_change", &nim::User::RegSpecialRelationshipChangedCb);
    RegisterSDKNotifyCallback("user_name_card_change", &nim::User::RegUserNameCardChangedCb);
}

NIMUser::NIMUser(const Napi::CallbackInfo& info)
    : BizService("NIMUser", info) {}

}  // namespace node_nim