// changelog.config.js
module.exports = {
  writerOpts: {
    // 按主版本号分组（如 v1.x.x, v2.x.x）
    groupBy: 'version-major',
    // 自定义变更类型的标题和排序
    types: [
      { type: 'feat', section: '✨ Features', hidden: false },
      { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
      { type: 'perf', section: '⚡ Performance Improvements', hidden: false },
      { type: 'refactor', section: '♻️ Code Refactoring', hidden: false },
      { type: 'docs', section: '📝 Documentation', hidden: false },
      { type: 'test', section: '✅ Tests', hidden: false },
      { type: 'build', section: '🏗️ Build System', hidden: false },
      { type: 'ci', section: '🔄 Continuous Integration', hidden: false },
      { type: 'chore', section: '🧹 Maintenance', hidden: false },
      { type: 'revert', section: '⏪ Reverts', hidden: false },
    ],
    // 自定义 commit 信息格式化
    transform: (commit) => {
      if (!commit.type) return null;
      
      // 移除不必要的提交（如 Merge 提交）
      if (commit.header.match(/^Merge pull request/) || 
          commit.header.match(/^Merge branch/)) {
        return null;
      }
      
      // 格式化 commit 信息
      commit.shortHash = commit.hash.substring(0, 7);
      return commit;
    },
  },
};