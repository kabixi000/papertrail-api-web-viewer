const tokenElm = document.getElementById('token')
const sysIdElm = document.getElementById('systemId')
const queryElm = document.getElementById('query')

const systemInfoResultElm = document.getElementById('sysInfoResult')
const systemInfoResultNameElm = document.getElementById('sysInfoResultName')
const searchResultElm = document.getElementById('searchResult')

const getSysInfoBtnElm = document.getElementById('getSysInfoBtn')
const searchBtnElm = document.getElementById('searchBtn')

const systemInfoPath = 'https://papertrailapp.com/api/v1/systems.json'
const searchPath = 'https://papertrailapp.com/api/v1/events/search.json'

const fetchOption = (token)=>{
  return {
    method: 'GET',
    headers: {
      'X-Papertrail-Token' : token
    }
  }
}

const downloadSysInfo = async () => {
  const systemInfoURL = new URL(systemInfoPath)
  const res = await fetch(systemInfoURL,fetchOption(tokenElm.value))
  const systemInfo = await res.json()
  return systemInfo
}

const downloadSearchResult = async (query,systemId=null) => {
  const searchURL = new URL(searchPath)
  if(systemId!==null){searchURL.searchParams.set('system_id',systemId)}
  searchURL.searchParams.set('q',query)
  searchURL.searchParams.set('limit',10000)
  const res = await fetch(searchURL,fetchOption(tokenElm.value))
  const searchResult = await res.json()
  return searchResult
}

getSysInfoBtnElm.addEventListener('click',async (e)=>{
  const systemInfo = await downloadSysInfo()
  systemInfoResultNameElm.value = systemInfo.map((info)=>{return info.name}).join('\n')
  systemInfoResultElm.value = JSON.stringify(systemInfo)
  console.log('SystemInfo\n',systemInfo)
})

searchBtnElm.addEventListener('click',async (e)=>{
  const query = queryElm.value
  const sysId = sysIdElm.value
  const searchResult = await downloadSearchResult(query,sysId)
  searchResultElm.value = JSON.stringify(searchResult)
  console.log('Search Result\n',searchResult)
})
