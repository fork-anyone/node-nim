const NIMSession = require('../../js/nim').NIMSession
const NIMMsglog = require('../../js/nim').NIMMsgLog
const NIMTalk = require('../../js/nim').NIMTalk
const assert = require('assert')

const session = new NIMSession()
const msglog = new NIMMsglog()
const talk = new NIMTalk()
function testSession(test_info) {
    describe('********************Session********************', function () {
        describe('#regChangeCb', function () {
            it('regChangeCb', function () {
                session.regChangeCb(function (rescode, result, count) {

                }, '')
            })
        })
        describe('#regBadgeCountCb', function () {
            it('regBadgeCountCb', function () {
                session.regBadgeCountCb(function (result) {

                }, '')
            })
        })
        describe('#queryLastFewSessionAsync', function () {
            it('queryLastFewSessionAsync', function (done) {
                session.queryLastFewSessionAsync(1, function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllRecentSessionAsync', function () {
            it('queryAllRecentSessionAsync', function (done) {
                session.queryAllRecentSessionAsync([], function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#setUnreadCountZeroAsync', function () {
            it('setUnreadCountZeroAsync', function (done) {
                session.setUnreadCountZeroAsync(0, test_info.assistUser, function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#setMultiUnreadCountZeroAsync', function () {
            it('set multi unread coung zero should return 200', function (done) {
                const result = session.setMultiUnreadCountZeroAsync(false, [{
                    id: test_info.assistUser,
                    type: 0
                }], (res_code, sessionList, unreadCount) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
                assert.strictEqual(result, true)
            })
        })
        describe('#setAllUnreadCountZeroAsync', function () {
            it('setAllUnreadCountZeroAsync', function (done) {
                var once_flag = true
                session.setAllUnreadCountZeroAsync(function (rescode, result, count) {
                    if (once_flag) {
                        done()
                        once_flag = false
                    }
                }, '')
            })
        })
        describe('#setSessionTop', function () {
            it('setSessionTop', function (done) {
                session.setSessionTop(0, test_info.assistUser, true, function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#setSessionExtendData', function () {
            it('setSessionExtendData', function (done) {
                session.setSessionExtendData(0, test_info.assistUser, '', function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#querySessionDataById', function () {
            it('querySessionDataById', function (done) {
                session.querySessionDataById(0, test_info.assistUser, function (rescode, result) {
                    done()
                }, '')
            })
        })
        describe('#regSetToStickTopSessionNotifyCB', function () {
            it('regSetToStickTopSessionNotifyCB', function () {
                session.regSetToStickTopSessionNotifyCB(function (result) {
                }, '')
            })
        })
        describe('#regCancelStickTopSessionNotifyCB', function () {
            it('regCancelStickTopSessionNotifyCB', function () {
                session.regCancelStickTopSessionNotifyCB(function (session_id, session_type) {
                }, '')
            })
        })
        describe('#regUpdateStickTopSessionNotifyCB', function () {
            it('regUpdateStickTopSessionNotifyCB', function () {
                session.regUpdateStickTopSessionNotifyCB(function (result) {
                }, '')
            })
        })
        describe('#setToStickTopSession', function () {
            it('set stick top session should return 200', function (done) {
                session.setToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#updateToStickTopSession', function () {
            it('update stick top session should return 200', function (done) {
                session.updateToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#queryStickTopSessionList', function () {
            it('query stick top session list should return 200 and list size > 0', function (done) {
                session.queryStickTopSessionList((res_code, stickSessionList) => {
                    assert.strictEqual(res_code, 200)
                    assert.notStrictEqual(stickSessionList.length, 0)
                    done()
                })
            })
        })
        describe('#cancelToStickTopSession', function () {
            it('cancel stick top session should return 200', function (done) {
                session.cancelToStickTopSession(test_info.assistUser, 0, (res_code, sessionId, sessionType) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                })
            })
        })
        describe('#deleteSessionRoamingMessage', function () {
            it('delete roaming should return 200', function (done) {
                const result = session.deleteSessionRoamingMessage(test_info.assistUser, 0, (res_code, sessionType, sessionId) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#queryHasmoreRoammsg', function () {
            it('query session has more roaming msg should return 200', function (done) {
                session.queryHasmoreRoammsg(test_info.assistUser, 0, (res_code, info) => {
                    done()
                })
            })
        })
        describe('#updateHasmoreRoammsg', function () {
            it('update session has more roaming msg should return 200', function (done) {
                talk.sendMsg({
                    to_type: 0,
                    to_accid: test_info.assistUser,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'Send from NIM node test.',
                    client_msg_id: new Date().getTime().toString(),
                }, '', function () { })
                msglog.queryMsgAsync(test_info.assistUser, 0, 1, 0, (res_code, sessionId, sessionType, result) => {
                    assert.strictEqual(res_code, 200)
                    const message = result.content[0]
                    if (message === undefined) {
                        done()
                        return
                    }
                    session.updateHasmoreRoammsg(message, (res_code) => {
                        assert.strictEqual(res_code, 200)
                        done()
                    })
                }, '')
            })
        })
        describe('#queryAllHasmoreRoammsg', function () {
            it('query all session roaming msg should return 200', function (done) {
                session.queryAllHasmoreRoammsg((res_code, infos) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#deleteHasmoreRoammsg', function () {
            it('delete has more roam msg should return 200', function (done) {
                session.deleteHasmoreRoammsg(test_info.assistUser, 0, (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#deleteRecentSession', function () {
            it('deleteRecentSession', function (done) {
                session.deleteRecentSession(0, test_info.assistUser, function (rescode, result, count) {
                    done()
                }, false)
            })
        })
        describe('#deleteAllRecentSession', function () {
            it('deleteAllRecentSession', function (done) {
                session.deleteAllRecentSession(function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#unregSessionCb', function () {
            it('unregSessionCb', function () {
                session.unregSessionCb()
            })
        })
    })
}
exports.default = testSession