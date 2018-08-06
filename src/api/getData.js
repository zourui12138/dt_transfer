import axios from 'axios'

const api='/api';

// 发布
export const getFundsOrEquity = (id,type) => axios.get(api+'/productSellOperation/findByNameAndRoleIdAndType?roleId='+id+'&productType='+type);
export const getReleaseMsg = (id,type,productId) => axios.get(api+'/productSellOperation/findByProductIdAndTypeAndRoleId?roleId='+id+'&productType='+type+'&productId='+productId);
export const releaseFundsOrEquity = (data) => axios.post(api+'/productSellOperation/sell',data);

// home
export const getHomeFund = (page,size) => axios.get(api+'/productSell/fundSellPageQuery?page='+page+'&size='+size);
export const getHomeProjects = (page,size) => axios.get(api+'/productSell/projectSellPageQuery?page='+page+'&size='+size);

// 转让搜索
export const getSearchConditions = () => axios.get(api+'/productSell/sellSearchConstant');
export const getAllList = (page,size,price,type,fundInvestmentDirection,fundInvestmentStage,address,industry,projectStage,rotation,searchValue,isSell) => axios.get(api+'/productSell/pageQuery?page='+page+'&size='+size+'&price='+price+'&type='+type+'&fundInvestmentDirection='+fundInvestmentDirection+'&fundInvestmentStage='+fundInvestmentStage+'&address='+address+'&industry='+industry+'&projectStage='+projectStage+'&rotation='+rotation+'&searchValue='+searchValue+'&isSell='+isSell);

// detail
export const getDetailData = (id) => axios.get(api+'/productSell/findByProductId?id='+id);
export const getDetailStep = (id,roleId) => axios.get(api+'/productSell/getStatus?productSellId='+id+'&roleId='+roleId);
export const setDetailStep = (productId,roleId,status,price) => axios.get(api+'/productSell/updateStatus?productSellId='+productId+'&roleId='+roleId+'&status='+status+'&price='+price);

// myTransfer
export const getBuyData = (id,page,size) => axios.post(api+'/productSellOperation/findMyBuybyRoleId',{roleId: id,page:page,size:size});
export const getSellData = (id,page,size) => axios.post(api+'/productSellOperation/findMySellByRoleId',{roleId: id,page:page,size:size});
