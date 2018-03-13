var FavoritesService = (function () {
    var CONFIG = {
        SESSION_STORAGE_NAME: 'favorite_pending_job',
        ADD_PATH: 'favorite/add',
        TOKEN: window.getCookieValue('COOKIE_TY.Entrance', 'tx'),
        XHR_ERROR_MESSAGE: 'Beklenmeyen bir hata oluştu.'
    };

    var sessionAddFavoriteCallBack = null;
    var firstCheckDone = false;
    var isUserValid = false;

    var init = function () {
        isUserValid = (CONFIG.TOKEN != null);

        handleJobFromSession();
    };

    var list = function (cb) {
        firstCheckDone = true;
        if (isUserValid) {
            var path = "/favorite/list?cacheBuster=" + Date.now();
            requestTo('get', path, "").done(function (response) {
                !!cb && cb(response);
            }).fail(function (xhr, text, err) {
                !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
            });
        }
    };
    
    var listByBoutiqueIdList = function (boutiqueList, cb) {
        firstCheckDone = true;
        if (isUserValid) {
            var data = { boutiqueIdList: boutiqueList, cacheBuster: Date.now() };
            var path = "/favorite/listByBoutiqueIdList";
            requestTo('get', path, data, true).done(function (response) {
                !!cb && cb(response);
            }).fail(function (xhr, text, err) {
                !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
            });
        }
    };

    var listByBoutiqueId = function (boutiqueId, cb) {
        firstCheckDone = true;
        if (isUserValid) {
            var path = "/favorite/listbyboutiqueid?cacheBuster=" + Date.now();
            var data = { boutiqueId: boutiqueId };
            requestTo('get', path, data).done(function (response) {
                !!cb && cb(response);
            }).fail(function (xhr, text, err) {
                !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
            });
        }
    };

    var add = function (productMainId, colorId, cb) {
        if (isUserValid) {
            var data = '{"ProductMainId": ' + productMainId + ', "ColorId": ' + colorId + '}';
            var path = "/favorite/add?cacheBuster=" + Date.now();
            requestTo('post', path, data).done(function (response) {
                !!cb && cb(response);
            }).fail(function (xhr, text, err) {
                !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
            });
        } else {
            setFavoriteProductToSession(productMainId, colorId);
            openLoginForm();
        }
    };

    var remove = function (productMainId, colorId, cb) {
        if (isUserValid) {
            var path = "/favorite/remove?productMainId=" + productMainId + "&colorId=" + colorId + "&cacheBuster=" + Date.now();
            requestTo('post', path, "").done(function (response) {
                !!cb && cb(response);
            }).fail(function (xhr, text, err) {
                !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
            });
        }
    };

    var isFavorited = function (productMainId, colorId, cb) {
        firstCheckDone = true;
        var data = { productMainId: productMainId, colorId: colorId, cacheBuster: Date.now() };
        var path = "/favorite/isfavorited";
        requestTo('get', path, data).done(function (response) {
            !!cb && cb(response);
        }).fail(function (xhr, text, err) {
            !!cb && cb(new CatalogResponseError(xhr.status, CONFIG.XHR_ERROR_MESSAGE));
        });
    };

    var handleJobFromSession = function () {
        if (isUserValid) {
            var favoriteProduct = getFavoriteProductFromSession();

            if (!!favoriteProduct) {
                add(favoriteProduct.productMainId, favoriteProduct.colorId, function (response) {
                    if (!!response && response.OperationStatus.IsSuccess) {
                        sessionStorage.removeItem(CONFIG.SESSION_STORAGE_NAME);
                        if (firstCheckDone){
                            sessionAddFavoriteCallBack && sessionAddFavoriteCallBack(favoriteProduct.productMainId, favoriteProduct.colorId);
                        }
                    }
                });
            }
        }
    };

    var registerSessionFavoriteCallback = function(fn) {
        if (typeof fn == 'function') {
            sessionAddFavoriteCallBack = fn;
        }
    }

    var openLoginForm = function () {
        AuthenticationPopupService.openLogin();
    };

    var getFavoriteProductFromSession = function () {
        var sessionItem = sessionStorage.getItem(CONFIG.SESSION_STORAGE_NAME);
        var pendingJob = sessionItem ? JSON.parse(sessionItem) : null;
        return pendingJob;
    };

    var setFavoriteProductToSession = function (productMainId, colorId) {
        sessionStorage.setItem(CONFIG.SESSION_STORAGE_NAME, JSON.stringify({
            productMainId: productMainId,
            colorId: colorId
        }));
    };

    var requestTo = function (type, path, data, isTraditional) {
        isTraditional = typeof isTraditional !== 'undefined' ? isTraditional : false;

        return $.ajax({
            type: type,
            url: path,
            dataType: "json",
            traditional: isTraditional,
            contentType: "application/json;charset=utf-8",
            data: data
        });
    };

    function CatalogResponseError(code, message) {
        this.IsSuccess = false;
        this.Erros = {
            ErrorCode: code,
            ErrorMessage: message
        };
    }

    init();

    return {
        list: list,
        listByBoutiqueId: listByBoutiqueId,
        remove: remove,
        add: add,
        isFavorited: isFavorited,
        listByBoutiqueIdList: listByBoutiqueIdList,
        registerSessionFavoriteCallback: registerSessionFavoriteCallback
    }
})();
