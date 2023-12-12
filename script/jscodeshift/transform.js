module.exports = function(fileInfo, api, options) {

    return api.jscodeshifit(fileInfo.source)
    .findVariableDeclarators('NIMLogoutType')
    .renameTo('jiereal')
    .toSource();
  };