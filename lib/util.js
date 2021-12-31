const ora = require('ora')  // npm install ora   只能安装^5.0.0的版本

async function sleep(n) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, n)
  })
}
// 实现loading效果
async function wrapLoading(fn, message, ...args) {  // 制作了一个等待的loading
  const spinner = ora(message)
  spinner.start()  // 开启加载
  try {
    // 正常下载
    let repos = await fn(...args)  // axios.get()
    spinner.succeed()  // 成功
    return repos
  } catch(e) {
    // 失败了
    spinner.fail('request failed, refetch……')
    await sleep(1000)   // 必变频繁请求
    return wrapLoading(fn, message, ...args)  // 递归调用自己
  }
}

module.exports = {
  wrapLoading
}