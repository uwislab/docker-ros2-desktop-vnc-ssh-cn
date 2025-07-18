根据你提供的 GitHub Actions 配置文件，版本号的变化规则主要由 `TriPSs/conventional-changelog-action` 这个 action 控制，遵循 **Conventional Commits 规范**。具体来说，版本号的变化规则如下：


### 1. **版本号变化的触发条件**
- **当有新的提交推送到 `main` 或 `master` 分支时**，工作流会自动运行。
- action 会分析两次提交之间的所有 commit messages，根据 commit 类型决定是否需要升级版本号。


### 2. **版本号升级规则**
根据 Conventional Commits 规范，commit message 的类型决定了版本号的升级方式：
- **MAJOR 版本升级**（例如：`1.0.0` → `2.0.0`）：
  - 当 commit message 中包含 `BREAKING CHANGE` 关键词（无论 commit 类型是什么）。
  - 例如：`fix: update API endpoint BREAKING CHANGE: require new authentication`。

- **MINOR 版本升级**（例如：`1.0.0` → `1.1.0`）：
  - 当 commit 类型为 `feat`（新增功能）。
  - 例如：`feat: add user authentication`。

- **PATCH 版本升级**（例如：`1.0.0` → `1.0.1`）：
  - 当 commit 类型为 `fix`（修复 bug）、`perf`（性能优化）、`refactor`（重构）等其他类型（配置中列出的所有类型都会触发 PATCH 升级）。
  - 例如：`fix: resolve login error`。


### 3. **配置文件中的关键参数**
你的配置中与版本号变化相关的参数包括：
```yaml
version-file: 'VERSION.json'        # 版本号存储在 VERSION.json 文件中
version-pattern: '^v?(\d+\.\d+\.\d+)$'  # 版本号匹配规则（支持 v 前缀，如 v1.0.0）
version-prefix: 'v'                   # 版本标签前缀（发布时会自动添加 v）
```

- `version-file`: 指定版本号存储的文件路径。
- `version-pattern`: 定义版本号的格式（正则表达式），这里支持 `v1.0.0` 或 `1.0.0` 格式。
- `version-prefix`: 生成的 GitHub Release 标签会自动添加 `v` 前缀（如 `v1.0.0`）。


### 4. **示例场景**
假设当前版本是 `v1.0.0`，有以下几种情况：
1. **提交类型为 `fix`**：
   - Commit message: `fix: fix typo in README`
   - 新版本号：`v1.0.1`

2. **提交类型为 `feat`**：
   - Commit message: `feat: add pagination support`
   - 新版本号：`v1.1.0`

3. **提交包含 `BREAKING CHANGE`**：
   - Commit message: `refactor: rewrite API BREAKING CHANGE: remove deprecated endpoints`
   - 新版本号：`v2.0.0`


### 5. **其他注意事项**
- **CHANGELOG 生成**：action 会根据 commit messages 自动更新 `CHANGELOG.md`，并按类型（Features、Bug Fixes 等）分组展示。
- **自动提交**：更新后的 `CHANGELOG.md` 和 `VERSION.json` 会自动提交回仓库，并打上对应的版本标签（如 `v1.0.1`）。
- **GitHub Release**：配置中 `create-release: true` 会自动创建 GitHub Release，标题为 `Release v1.0.1`，内容来自 CHANGELOG。


如果你需要更精细地控制版本号变化规则，可以调整 `types` 参数中的 `hidden` 属性，或修改 `version-pattern` 和 `version-prefix`。