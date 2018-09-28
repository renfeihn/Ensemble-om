const isNull = function (obj) {
    return isNotNull(obj) ? false : true;
};

const isNotNull = function (obj) {
    if (null != obj && undefined != obj && '' != obj && 'undefined' != obj) {
        return true
    } else {
        return false;
    }

};

const nvl = function (source, target) {
    if (isNull(source)) {
        return target;
    }
    return source;
};
const Models = {
    nvl: nvl,
    isNull: isNull,
    isNotNull: isNotNull
};

module.exports = Models;