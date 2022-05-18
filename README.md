# NetEase IM Node.js addon wrapper

[![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)

## Table of Contents

- [NetEase IM Node.js addon wrapper](#netease-im-nodejs-addon-wrapper)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Build From Source](#build-from-source)
  - [Unit Test](#unit-test)
  - [Sample Code](#sample-code)
  - [Quick Start](#quick-start)

## Introduction

node-nim is a wrapper of [NetEase IM](https://netease.im/).   
For more detailed documentation, changelog and tech support. See https://dev.yunxin.163.com/. 

## Installation

node-nim runs on Node.js and is available as a NPM package. You can specify architecture and platform by `--arch` and `--platform` flags.

node-nim will download the nim SDK which has the same version, you can override the version by add `--nim-sdk-version` or `--nim-sdk-url` flag.

```
npm install node-nim --save-dev --arch=x64 --platform=win32 --nim-sdk-version=9.1.0
```

## Build From Source

Technically, nim sdk is shipped with a prebuilt node-nim.node binary file, so you don't need to build it yourself.  
But if you want to add some personal features or you just want to do so, feel free to build it!  
Build Requirements:

-   Node.js
-   npm
-   CMake
-   CMake supported generator(Unix Makefiles, Ninja, Visual Studio, Xcode...)

Now you are all set to build, run following command in the root directory of the project:

```cmake
cmake -S . -B build
cmake --build build --config Release
```

And voilà, you now have your own node-nim binary file in the `build` directory.

## Unit Test

Execute following script to run unit test, [check this](./test/test_all.js), and you can also get an coverage report under 'coverage'.

```
npm run coverage
```

## Sample Code

```js
const NIM = require('node-nim')
const assert = require('assert')
const client = new NIM.NIMClient()
const talk = new NIM.NIMTalk()
const result = client.init('app_key', 'app_data_dir', 'app_install_dir', {
    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
})

client.login(
    'app_key',
    'username',
    'password_in_md5',
    (result) => {
        assert.strictEqual(result.err_code, 200)
        if (loginResult.login_step === 3) {
            // login has 3 steps, step 3 succeeded
            talk.initEventHandlers() // init callbacks

            talk.on('receiveMsg', function (result) {
                console.log(result)
            })

            talk.sendMsg(
                {
                    session_type_: 0, // p2p
                    receiver_accid_: 'receiver_accid',
                    timetag_: new Date().getTime(),
                    type_: 0, // text message
                    content_: 'Send from NIM node quick start.',
                    client_msg_id_: new Date().getTime().toString() // use an uuid
                },
                '',
                function () {}
            )

            client.logout(
                1,
                (err_code) => {
                    assert.strictEqual(err_code, 200)
                },
                ''
            )

            client.cleanUp('')
        }
    },
    ''
)
```

## Quick Start

Check out this [quick start project](https://github.com/netease-im/node-nim-quick-start) and try out NIM's outstanding features!
