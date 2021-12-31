const { fetchRepoList, fetchTagList } = require('./request')
const Inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')  // npm install download-git-repo,不支持promise

const { wrapLoading } = require('./util')
class Creator {
  constructor(projectName, targetDir) {  // new的时候会调用构造函数
    // new的时候会调用雕凿函数
    // 给类传的参数，都要放在实例上
    this.name = projectName;
    this.target = targetDir;
  }
  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, 'waiting fetch template')
    // console.log('repos---', repos)
    if (!repos) return
    repos = repos.map(item => item.name)
    console.log('repos---', repos)
    let {repo} = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'please choose a template to create project'
    })
    console.log('repo---', repo)
    return repo
  }

  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, 'wait fetch tag', repo)
    if (!tags) return
    tags = tags.map(item => item.name)
    console.log('tags---', tags)
    const { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'please choose a tag to create project'
    })
    return tag
  }

  async create() {
    // 真实开始创建了
    // 1）先去拉去当前组织下的模板
    let repo = await this.fetchRepo()
    // 2）再通过模板找到版本号
    let tags = await this.fetchTag(repo)
    // 3）下载
    console.log('repo---', repo)
    console.log('tags---', tags)
  }
}

module.exports = Creator;
