/**
 * @file nim_node_global_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_GLOBAL_HELPER_H
#define NIM_NODE_GLOBAL_HELPER_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
using namespace nim;
ReflectionDefinition_O(Global::CachedFileInfo, file_type_, file_path_, file_count_, file_total_size_);
ReflectionDefinition_O(Global::SDKDBErrorInfo, db_name_, error_code_, operation_, description_, attach_);

// Callback
CallbackSpecialization(Global::DetectProxyCallback);
CallbackSpecialization(Global::ExceptionCallback);
CallbackSpecialization(Global::GetCachedFileInfoCallback);
CallbackSpecialization(Global::DeleteCachedFileCallback);
CallbackSpecialization(Global::SDKDBErrorCallback);
#endif