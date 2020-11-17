import http from './axios'

//菜单管理

//添加
export function getMenuAdd(data) {
    return http.post('/api/menuadd', data)
}

//列表
export function getMenulist(params) {
    return http.get('/api/menulist', { params })
}

//获取一条
export function getMenuinfo(params) {
    return http.get('/api/menuinfo', { params })
}

//删除
export function getMenudelete(data) {
    return http.post('/api/menudelete', data)
}

//修改
export function getMenuedit(data) {
    return http.post('/api/menuedit', data)
}


//角色管理

//添加
export function getRoleadd(data) {
    return http.post('/api/roleadd', data)
}

//列表
export function getRolelist(params) {
    return http.get('/api/rolelist', { params })
}

//获取一条
export function getRoleinfo(params) {
    return http.get('/api/roleinfo', { params })
}

//修改
export function getRoleedit(data) {
    return http.post('/api/roleedit', data)
}

//删除
export function getRoledelete(data) {
    return http.post('/api/roledelete', data)
}


//管理员管理

//添加

export function getUseradd(data) {
    return http.post('/api/useradd', data)
}

//列表

export function getUserlist(params) {
    return http.get('/api/userlist', { params })
}

//获取一条

export function getUserinfo(params) {
    return http.get('/api/userinfo', { params })
}

//管理员总数

export function getUsercount(params) {
    return http.get('/api/usercount', { params })
}

//修改

export function getUseredit(data) {
    return http.post('/api/useredit', data)
}

//删除

export function getUserdelete(data) {
    return http.post('/api/userdelete', data)
}

//登录

export function getUserlogin(data) {
    return http.post('/api/userlogin', data)
}



//商品分类

//添加
export function getCateAdd(data) {
    return http.post('/api/cateadd', data)
}

//列表
export function getCatelist(params) {
    return http.get('/api/catelist', { params })
}

//获取一条
export function getCateinfo(params) {
    return http.get('/api/cateinfo', { params })
}

//删除
export function getCatedelete(data) {
    return http.post('/api/catedelete', data)
}

//修改
export function getCateedit(data) {
    return http.post('/api/cateedit', data)
}



//商品规格管理

//添加

export function getSpecsadd(data) {
    return http.post('/api/specsadd', data)
}

//列表

export function getSpecslist(params) {
    return http.get('/api/specslist', { params })
}

//获取一条

export function getSpecsinfo(params) {
    return http.get('/api/specsinfo', { params })
}

//管理员总数

export function getSpecscount(params) {
    return http.get('/api/specscount', { params })
}

//修改

export function getSpecsedit(data) {
    return http.post('/api/specsedit', data)
}

//删除

export function getSpecsdelete(data) {
    return http.post('/api/specsdelete', data)
}




//商品分类

//添加
export function getBannerAdd(data) {
    return http.post('/api/banneradd', data)
}

//列表
export function getBannerlist(params) {
    return http.get('/api/bannerlist', { params })
}

//获取一条
export function getBannerinfo(params) {
    return http.get('/api/bannerinfo', { params })
}

//删除
export function getBannerdelete(data) {
    return http.post('/api/bannerdelete', data)
}

//修改
export function getBanneredit(data) {
    return http.post('/api/banneredit', data)
}



//秒杀管理

//添加
export function getSeckAdd(data) {
    return http.post('/api/seckadd', data)
}

//列表
export function getSecklist(params) {
    return http.get('/api/secklist', { params })
}

//获取一条
export function getSeckinfo(params) {
    return http.get('/api/seckinfo', { params })
}

//删除
export function getSeckdelete(data) {
    return http.post('/api/seckdelete', data)
}

//修改
export function getSeckedit(data) {
    return http.post('/api/seckedit', data)
}



//会员管理

//列表
export function getMemberlist(params) {
    return http.get('/api/memberlist', { params })
}

//获取一条

export function getMemberinfo(params) {
    return http.get('/api/memberinfo', { params })
}

//修改

export function getMemberedit(data) {
    return http.post('/api/memberedit', data)
}


//商品管理

//添加

export function getGoodsadd(data) {
    return http.post('/api/goodsadd', data)
}

//商品总数

export function getgoodscount(params) {
    return http.get('/api/goodscount', { params })
}

//列表

export function getGoodslist(params) {
    return http.get('/api/goodslist', { params })
}

//获取一条

export function getGoodsinfo(params) {
    return http.get('/api/goodsinfo', { params })
}

//修改

export function getGoodsedit(data) {
    return http.post('/api/goodsedit', data)
}

//删除

export function getGoodsdelete(data) {
    return http.post('/api/goodsdelete', data)
}