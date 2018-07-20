import axios from 'axios'

const api='/api';

// 发布
export const getFundsOrEquity = (id,type) => axios.get(api+'/productSellOperation/findByNameAndRoleIdAndType?roleId='+id+'&productType='+type);
export const getReleaseMsg = (id,type,productId) => axios.get(api+'/productSellOperation/findByProductIdAndTypeAndRoleId?roleId='+id+'&productType='+type+'&productId='+productId);
export const releaseFundsOrEquity = (data) => axios.post(api+'/productSellOperation/sell',data);

// home
export const getHomeFund = (page,size) => axios.get(api+'/productSell/fundSellPageQuery?page='+page+'&size='+size);
export const getHomeEquity = (page,size) => axios.get(api+'/productSell/projectSellPageQuery?page='+page+'&size='+size);

// detail
export const getDetailData = (id) => axios.get(api+'/productSell/findByProductId?id='+id);
export const getDetailStep = (id,productId) => axios.get(api+'/productSell/getStatus?productSellId='+productId+'&roleId='+id);
export const setDetailStep = (id,productId,status) => axios.get(api+'/productSell/updateStatus?productSellId='+productId+'&roleId='+id+'&status='+status);

// myTransfer
export const getBuyData = (id) => axios.get(api+'/productSellOperation/findMyBuybyRoleId?roleId='+id);
export const getSellData = (id) => axios.get(api+'/productSellOperation/findMySellByRoleId?roleId='+id);
