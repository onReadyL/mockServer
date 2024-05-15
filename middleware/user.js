
exports.valiteFields = () => {
    return (req, res, next) => {
        console.log('验证注册信息符不符合规范');
        next();
    }
}

exports.valiteLoginInfo = () => {
    return (req, res, next) => {
        const { username } = req.body;
        if(!username){
            next(new Error('用户名必填'));
        }
        next()
    }
}

exports.setCookie = (cookieName = 'mockserverLogin', cookieValueName = 'username') => {
    return (req, res, next) => {
        const cookieValue = req.body[cookieValueName];
        res.cookie(cookieName, cookieValue, {
            maxAge: 864000,
            httpOnly: true
        });
        next()
    }
}

exports.clearCookie = (cookieName = 'mockserverLogin') => {
    return (req, res, next) => {
        res.clearCookie(cookieName);
        next();
    }
}

exports.valiteCookie = (cookieName = 'mockserverLogin') => {
    return (req, res, next) => {
        console.log(req.cookies)
        if(req.cookies[cookieName] === undefined){
            next(new Error('登录过期'))
        }
        next();
    }
}

exports.valiteUser = () => {
    return (req, res, next) => {
        console.log('验证是否存在当前用户');
        next();
    }
}

exports.encryptPassword = () => {
    return (req, res, next) => {
        console.log('密码加密');
        next();
    }
}