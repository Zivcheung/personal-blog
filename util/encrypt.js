const crypto = require("crypto");

module.exports = (password,key="mimipao")=>{
    const shaHash = crypto.createHmac("sha256",key);
    shaHash.update(password);
    const encryPass = shaHash.digest("hex");
    return encryPass
}